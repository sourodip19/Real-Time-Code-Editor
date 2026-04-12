# Real-Time Code Editor

> A scalable real-time collaborative code editor built with React, Monaco Editor, Node.js, Socket.io, Docker, Redis, and AWS ECS.

Users can join a shared room and edit code together in real time while learning how modern applications are containerized, scaled, and deployed.

---

## 🚀 Features

* Real-time collaborative code editing
* Multi-user room support
* Monaco Editor integration
* Live synchronization using Socket.io
* Redis-based scaling for multiple backend instances
* Dockerized frontend and backend
* AWS ECS deployment
* Microservice-ready architecture
* Easy local development setup

---

## 🛠 Tech Stack

### Frontend

* React.js
* Monaco Editor
* Socket.io Client
* Tailwind CSS

### Backend

* Node.js
* Express.js
* Socket.io
* Redis

### DevOps & Deployment

* Docker
* Docker Compose
* AWS ECS
* Amazon ECR

---

## 📚 What You Will Learn

This project helps you understand:

* What Docker is and why developers use it
* Difference between Containers and Virtual Machines
* What Docker Images and Dockerfiles are
* How to write your first Dockerfile
* How to build and run containers
* How Redis helps scale WebSocket applications
* How to deploy containerized apps to AWS ECS
* How real-world systems support multiple users simultaneously

---

## 🏗 Project Architecture

```text
User 1 ─┐
        ├── React Frontend ──> Socket.io ──> Express Backend
User 2 ─┘                                 │
                                          ▼
                                       Redis
                                          │
                                          ▼
                                Multiple Backend Instances
                                          │
                                          ▼
                                      AWS ECS
```

---

## 📁 Folder Structure

```text
realtime-code-editor/
│
├── client/                 # React + Monaco frontend
│   ├── src/
│   ├── Dockerfile
│   └── package.json
│
├── server/                 # Node + Express + Socket.io backend
│   ├── Dockerfile
│   ├── redis.js
│   └── package.json
│
├── docker-compose.yml
├── .env
└── README.md
```

---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/realtime-code-editor.git
cd realtime-code-editor
```

### 2. Install Dependencies

#### Frontend

```bash
cd client
npm install
```

#### Backend

```bash
cd ../server
npm install
```

---

## ▶️ Run Locally Without Docker

### Start Backend

```bash
cd server
npm run dev
```

### Start Frontend

```bash
cd client
npm start
```

Frontend:

```text
http://localhost:3000
```

Backend:

```text
http://localhost:5000
```

---

## 🐳 Docker Setup

### Backend Dockerfile

```dockerfile
FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
```

### Frontend Dockerfile

```dockerfile
FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

---

## 🐙 Docker Compose

```yaml
version: '3.8'

services:
  client:
    build: ./client
    ports:
      - "3000:3000"
    depends_on:
      - server

  server:
    build: ./server
    ports:
      - "5000:5000"
    depends_on:
      - redis

  redis:
    image: redis:7
    ports:
      - "6379:6379"
```

Run everything:

```bash
docker-compose up --build
```

---

## 🔄 Redis + Socket.io Scaling

When your backend is running on multiple containers or servers, WebSocket events from one server will not automatically reach users connected to another server.

Redis solves this problem by acting as a shared message broker.

```text
User A connected to Server 1
User B connected to Server 2

Without Redis:
User B does not receive User A's updates.

With Redis:
Server 1 sends the update to Redis.
Redis forwards the update to Server 2.
User B instantly sees the changes.
```

Example setup:

```js
const { createAdapter } = require('@socket.io/redis-adapter');
const { createClient } = require('redis');

const pubClient = createClient({ url: process.env.REDIS_URL });
const subClient = pubClient.duplicate();

await pubClient.connect();
await subClient.connect();

io.adapter(createAdapter(pubClient, subClient));
```

---

## ☁️ Deploying to AWS ECS

### Step 1: Build Docker Images

```bash
docker build -t realtime-editor-client ./client
docker build -t realtime-editor-server ./server
```

### Step 2: Push Images to Amazon ECR

```bash
aws ecr create-repository --repository-name realtime-editor-client
aws ecr create-repository --repository-name realtime-editor-server
```

```bash
docker tag realtime-editor-client:latest <your-ecr-url>/realtime-editor-client
docker push <your-ecr-url>/realtime-editor-client

docker tag realtime-editor-server:latest <your-ecr-url>/realtime-editor-server
docker push <your-ecr-url>/realtime-editor-server
```

### Step 3: Create ECS Task Definition

Include:

* Frontend container
* Backend container
* CPU and memory allocation
* Port mapping
* Environment variables

### Step 4: Deploy the ECS Service

Recommended setup:

* ECS Fargate
* Application Load Balancer
* Redis using Amazon ElastiCache
* Auto Scaling enabled

---

## 🔐 Environment Variables

```env
PORT=5000
CLIENT_URL=http://localhost:3000
REDIS_URL=redis://redis:6379
```

---

## 🚧 Future Improvements

* Run code inside secure Docker sandboxes
* Multi-file editing support
* Authentication using JWT or OAuth
* Save rooms and code history
* Cursor tracking for each user
* Voice and video collaboration
* Kubernetes deployment

---

## ⭐ Why This Project Matters

This project combines:

* Full-stack development
* Real-time systems
* Docker and containerization
* Redis and scalable WebSockets
* AWS cloud deployment
* System design and microservices

It is a strong portfolio project for developers who want to learn both development and DevOps.

---

## 📄 License

MIT License
