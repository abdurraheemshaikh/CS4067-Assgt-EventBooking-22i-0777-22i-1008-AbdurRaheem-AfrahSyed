# 🎟️ Event Booking Microservices

This project implements an **Event Booking System** using **FastAPI, Express.js, MongoDB, PostgreSQL, and RabbitMQ**. It allows users to book event tickets, handle payments, and receive notifications via RabbitMQ.

---

## ⚡ **Architecture Overview**
The system follows a **microservices architecture**, where each service is independent and communicates via REST APIs and **RabbitMQ** (for async messaging).

## 🚀 **Tech Stack**
| Service         | Technology Stack                          |
|----------------|----------------------------------|
| **User Service**  | FastAPI, PostgreSQL (user authentication) |
| **Event Service**  | Node.js, Express, MongoDB (stores events) |
| **Booking Service** | FastAPI, PostgreSQL, RabbitMQ (handles bookings) |
| **Notification Service** | FastAPI, RabbitMQ, MongoDB (sends notifications) |

## 🛠 **Setup Guide**
Run the following command in your terminal to install all dependencies:
pip install fastapi uvicorn pydantic psycopg2 pika requests pymongo
net start RabbitMQ  
