# 🎟️ Microservices-Based Event Booking System

This project implements an **Event Booking System** using **FastAPI, Express.js, MongoDB, PostgreSQL, and RabbitMQ**. It allows users to book event tickets, handle payments, and receive notifications via RabbitMQ.

---

## ⚡ **Overview**
This project is a microservices-based event booking system using FastAPI, Express.js, PostgreSQL, MongoDB, RabbitMQ, and Pika for messaging. The system consists of:<br>
1. User Service (FastAPI + PostgreSQL)<br>
2. Event Service (Express.js + MongoDB)<br>
3. Booking Service (FastAPI + PostgreSQL)<br>
4. Notification Service (FastAPI + MongoDB + RabbitMQ)<br>

## 🚀 **Tech Stack**
| Service         | Technology Stack                          |
|----------------|----------------------------------|
| **User Service**  | FastAPI, PostgreSQL (user authentication) |
| **Event Service**  | Node.js, Express, MongoDB (stores events) |
| **Booking Service** | FastAPI, PostgreSQL, RabbitMQ (handles bookings) |
| **Notification Service** | FastAPI, RabbitMQ, MongoDB (sends notifications) |

## 📂 **Architecture**
🔹 User Service (FastAPI, PostgreSQL)<br>
Handles user registration & authentication<br>
Exposes APIs for fetching and managing users<br>
Stores data in PostgreSQL<br>
<br>
🔹 Event Service (Express.js, MongoDB)<br>
Manages event listings<br>
Stores event data in MongoDB<br>
Provides event availability APIs<br>
<br>
🔹 Booking Service (FastAPI, PostgreSQL, RabbitMQ)<br>
Handles event ticket booking<br>
Stores bookings in PostgreSQL<br>
Communicates with Event Service for ticket availability<br>
Sends booking confirmations via RabbitMQ<br>
<br>
🔹 Notification Service (FastAPI, MongoDB, RabbitMQ)<br>
Listens to RabbitMQ for new bookings<br>
Stores notifications in MongoDB<br>
Provides API to fetch notifications<br>
<br>

## 🛠 **Setup Guide**
Run the following command in your terminal to install all dependencies:<br>
pip install fastapi uvicorn pydantic psycopg2 pika requests pymongo<br>
net start RabbitMQ  

### Start User Service
uvicorn user_service:app --host 0.0.0.0 --port 3001 --reload

### Start Event Service
node event_service.js

### Start Booking Service
uvicorn booking_service:app --host 0.0.0.0 --port 3003 --reload

### Start Notification Service
uvicorn notification_service:app --host 0.0.0.0 --port 3004 --reload
