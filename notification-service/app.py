from flask import Flask
import pika
import pymongo

app = Flask(__name__)

client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["notification_db"]

def callback(ch, method, properties, body):
    db.notifications.insert_one({"message": body.decode()})
    print(f" [x] Received {body}")

connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
channel = connection.channel()
channel.queue_declare(queue='notification_queue')
channel.basic_consume(queue='notification_queue', on_message_callback=callback, auto_ack=True)

@app.route('/notifications')
def get_notifications():
    notifications = list(db.notifications.find({}, {'_id': 0}))
    return {"notifications": notifications}

app.run(port=3004)
