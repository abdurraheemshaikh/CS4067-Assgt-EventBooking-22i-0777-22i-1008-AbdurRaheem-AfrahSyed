from flask import Flask, request, jsonify
import psycopg2
import pika

app = Flask(__name__)

# Connection to bookingdb for bookings
booking_conn = psycopg2.connect(
    database="bookingdb",
    user="postgres",
    password="678678",
    host="localhost",
    port="5432"
)
booking_cur = booking_conn.cursor()

# Connection to userdb for users
user_conn = psycopg2.connect(
    database="userdb",
    user="postgres",
    password="678678",
    host="localhost",
    port="5432"
)
user_cur = user_conn.cursor()

@app.route('/bookings', methods=['POST'])
def create_booking():
    try:
        data = request.json
        user_id = data.get('user_id')
        event_id = data.get('event_id')

        if not user_id or not event_id:
            return jsonify({'error': 'Missing user_id or event_id'}), 400

        # Check if user exists in userdb (explicit schema `public`)
        user_cur.execute('SELECT id FROM public.users WHERE id = %s', (user_id,))
        user = user_cur.fetchone()
        if not user:
            return jsonify({'error': 'User does not exist'}), 404

        # Insert booking into bookingdb
        booking_cur.execute('INSERT INTO bookings (user_id, event_id) VALUES (%s, %s) RETURNING id', (user_id, event_id))
        booking_id = booking_cur.fetchone()[0]
        booking_conn.commit()

        # Send notification to RabbitMQ
        connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
        channel = connection.channel()
        channel.queue_declare(queue='notification_queue')
        channel.basic_publish(exchange='', routing_key='notification_queue', body=f'Booking {booking_id} confirmed for user {user_id}')
        connection.close()

        return jsonify({'message': f'Booking {booking_id} confirmed and notification sent'}), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=3003)
