# AI Chatbot with Backend Integration

AI-powered chatbot with backend integration built using Spring Boot, enabling real-time conversations, RESTful API interactions, and dynamic data processing.

## Features

## System Architecture (ER Diagram & Design)

The system consists of the following microservices routed through an API Gateway:
1. `api-gateway` (Port 8080): Handles all incoming traffic and routes to respective microservices.
2. `auth-service` (Port 8081): Manages JWT generation, validation, and user registration/login.
3. `user-service` (Port 8082): Manages user profiles and internal queries.
4. `chatbot-service` (Port 8083): Core logic for handling conversations, messages, WebSocket streaming, and Claude AI API.
5. `analytics-service` (Port 8084): Listens to RabbitMQ events to store token usage and analytics.

### Database Schema Overview (MySQL)
* **user_db.users**: `id`, `username`, `email`, `password_hash`, `role`
* **chatbot_db.conversations**: `id`, `user_id`, `title`
* **chatbot_db.messages**: `id`, `conversation_id`, `sender` ('USER' or 'AI'), `content`
* **analytics_db.token_usage**: `id`, `user_id`, `conversation_id`, `prompt_tokens`, `completion_tokens`, `total_tokens`

## Getting Started

### Prerequisites
* Java 17
* Maven 3.8+
* Node.js 18+
* Docker & Docker Compose

### 1. Start Infrastructure
Start the required databases and message broker using Docker Compose:
```bash
docker-compose up -d
```
*This will spin up MySQL (Port 3306), Redis (Port 6379), and RabbitMQ (Port 5672/15672) and initialize the databases via `mysql-init/schema.sql`.*

### 2. Start Backend Microservices
In separate terminal windows, navigate to the `backend` directory and run each service:
```bash
cd backend/api-gateway && mvn spring-boot:run
cd backend/auth-service && mvn spring-boot:run
cd backend/user-service && mvn spring-boot:run
cd backend/chatbot-service && mvn spring-boot:run
cd backend/analytics-service && mvn spring-boot:run
```

### 3. Start Frontend
In a new terminal window:
```bash
cd frontend
npm install
npm run dev
```
Access the application at `http://localhost:5173`.

## REST API Documentation

### Auth Service (`/api/auth`)
* `POST /api/auth/register`: Register a new user. Body: `{ "username": "...", "email": "...", "password": "..." }`
* `POST /api/auth/login`: Login and receive JWT. Body: `{ "username": "...", "password": "..." }`

### Chatbot Service (`/api/chat`)
* `GET /api/chat/history`: Retrieve past conversations. (Requires JWT header)
* `POST /api/chat/message`: Send a new message. (Requires JWT header)
* `WS /ws/chat/{conversationId}`: WebSocket endpoint for real-time messaging.

## Advanced Features Implemented
* **RabbitMQ Event Handling**: The chatbot service publishes token usage events asynchronously so that chat latency is not affected. The analytics service consumes these events.
* **Global Exception Handling**: Structured error responses across all microservices.
* **Indexed Tables**: MySQL `schema.sql` includes indexing on foreign keys (`user_id`, `conversation_id`) to meet the `<50ms` query performance target.
>>>>>>> d6a5b36 (Initial commit of AIChatbot with backend integration project)
