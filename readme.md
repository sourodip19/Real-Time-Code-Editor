Real-Time Code Editor

A full-stack, real-time collaborative code editor inspired by modern cloud-based coding platforms. This project demonstrates how multiple users can write and edit code simultaneously while learning Docker, scalable architecture, Redis, WebSockets, and AWS deployment.

Features
Real-time collaborative code editing
Multi-user room support
Monaco Editor integration
Live synchronization using Socket.io
Redis-based scaling for multiple server instances
Dockerized frontend and backend
Production deployment using AWS ECS
Microservice-ready architecture
Easy local development workflow
Tech Stack
Frontend
React.js
Monaco Editor
Socket.io Client
Tailwind CSS (optional)
Backend
Node.js
Express.js
Socket.io
Redis
DevOps & Deployment
Docker
Docker Compose
AWS ECS
Amazon ECR
What You Will Learn

By building this project, you will understand:

What Docker is and why developers use it
Containers vs Virtual Machines
How Docker Images and Dockerfiles work
Writing Dockerfiles using:
FROM
WORKDIR
COPY
RUN
CMD
Building and running containers
Connecting multiple containers with Docker Compose
Using Redis to scale WebSocket applications
Deploying containerized applications to AWS ECS
How real-world collaborative systems support multiple users simultaneously
Project Architecture
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
Folder Structure
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
├── README.md
└── .env
Getting Started
1. Clone the Repository
git clone https://github.com/your-username/realtime-code-editor.git
cd realtime-code-editor
2. Install Dependencies
Frontend
cd client
npm install
Backend
cd ../server
npm install
Running Locally Without Docker
Start Backend
cd server
npm run dev
Start Frontend
cd client
npm start

Frontend runs on:

http://localhost:3000

Backend runs on:

http://localhost:5000
Docker Setup
Backend Dockerfile
FROM node:20


WORKDIR /app


COPY package*.json ./
RUN npm install


COPY . .


EXPOSE 5000


CMD ["npm", "start"]
Frontend Dockerfile
FROM node:20


WORKDIR /app


COPY package*.json ./
RUN npm install


COPY . .


EXPOSE 3000


CMD ["npm", "start"]
Docker Compose
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

Run the full application:

docker-compose up --build
Redis + Socket.io Scaling

When your backend runs on multiple containers or servers, WebSocket events from one instance may not automatically reach users connected to another instance.

Redis solves this problem by acting as a shared message broker.

Example:

User A connected to Server 1
User B connected to Server 2


Without Redis:
- User B does not receive User A's changes


With Redis:
- Server 1 sends the update to Redis
- Redis forwards it to Server 2
- User B instantly sees the changes

Example Redis adapter setup:

const { createAdapter } = require('@socket.io/redis-adapter');
const { createClient } = require('redis');


const pubClient = createClient({ url: process.env.REDIS_URL });
const subClient = pubClient.duplicate();


await pubClient.connect();
await subClient.connect();


io.adapter(createAdapter(pubClient, subClient));
Deploying to AWS ECS
Step 1: Build Docker Images
docker build -t realtime-editor-client ./client
docker build -t realtime-editor-server ./server
Step 2: Push Images to Amazon ECR
aws ecr create-repository --repository-name realtime-editor-client
aws ecr create-repository --repository-name realtime-editor-server

Tag and push:

docker tag realtime-editor-client:latest <your-ecr-url>/realtime-editor-client
docker push <your-ecr-url>/realtime-editor-client


docker tag realtime-editor-server:latest <your-ecr-url>/realtime-editor-server
docker push <your-ecr-url>/realtime-editor-server
Step 3: Create ECS Task Definition

Include:

Frontend container
Backend container
Environment variables
CPU / Memory allocation
Port mapping
Step 4: Run ECS Service

Deploy the task definition into an ECS cluster and enable auto-scaling.

Recommended setup:

ECS Fargate
Application Load Balancer
Redis via Amazon ElastiCache
Auto Scaling enabled
Environment Variables
PORT=5000
CLIENT_URL=http://localhost:3000
REDIS_URL=redis://redis:6379
Future Improvements
Code execution using Docker sandboxing
File explorer and multi-file editing
Authentication with JWT / OAuth
Persistent rooms and saved code
Syntax highlighting for more languages
Cursor tracking for each user
Video / voice collaboration
Kubernetes deployment
Why This Project Matters

This project is more than just a code editor.

It teaches the same technologies used in modern production systems:

Real-time collaboration like Google Docs
Containerized services like modern startups
Scalable WebSocket architecture
Cloud deployment on AWS
Microservice communication using Redis

If you are learning full-stack development and DevOps, this project is a great portfolio piece because it combines frontend, backend, Docker, Redis, system design, and cloud deployment into one real-world application.

License

MIT License