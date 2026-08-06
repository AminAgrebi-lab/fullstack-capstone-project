# 🎁 GiftLink - Fullstack Gift Sharing Platform

GiftLink is a full-stack web application designed to allow users to share, browse, and search for household gifts.

The application provides a complete full-stack experience with a RESTful Backend API, responsive React Frontend, MongoDB database integration, and cloud deployment using Docker, Kubernetes, and IBM Cloud Code Engine.

---

## 🚀 Key Features

- **User Authentication**
  - Secure registration and login system using JWT (JSON Web Tokens).

- **Gift Management**
  - Browse available gifts with information such as name, category, description, and condition.

- **Smart Search**
  - Search and filter gifts by:
    - Category
    - Condition
    - Age
    - Name

- **Sentiment Analysis**
  - Microservice implementation for analyzing user feedback.

- **Containerized Architecture**
  - Docker-based application components prepared for Kubernetes deployment.

---

## 🛠️ Tech Stack & Tools

### Frontend
- React.js
- HTML5
- CSS3
- Bootstrap

### Backend
- Node.js
- Express.js
- RESTful API

### Database
- MongoDB

### DevOps & Cloud
- Docker
- Kubernetes
- IBM Cloud Code Engine
- IBM Container Registry (ICR)

### Testing & Development Tools
- Postman
- cURL
- Git
- GitHub Actions (CI/CD)

---

## 📁 Repository Structure

```text
fullstack-capstone-project/
│
├── giftlink-backend/          # Express REST API and database models
│   ├── models/                # MongoDB schemas
│   ├── routes/                # Authentication, gifts, and search endpoints
│   └── util/                  # MongoDB data import scripts
│
├── giftlink-frontend/         # React frontend application
│
├── giftwebsite/               # Express production frontend server
│
├── sentiment/                 # Sentiment analysis microservice
│
└── deploymongo.yml             # Kubernetes MongoDB deployment
```

---

# ⚙️ Local Development Setup

## Prerequisites

Install the following tools:

- Node.js (v18+)
- Docker
- Kubernetes CLI (`kubectl`)
- MongoDB (local installation or Docker container)

---

## Environment Variables

Create a `.env` file inside:

```
giftlink-backend/
```

Add:

```env
MONGO_URL=mongodb://localhost:27017
JWT_SECRET=your_jwt_secret_key
PORT=3060
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/fullstack-capstone-project.git

cd fullstack-capstone-project
```

### Backend Setup

```bash
cd giftlink-backend

npm install
```

Import MongoDB data:

```bash
cd util/import-mongo

npm start
```

### Frontend Setup

```bash
cd ../../../giftlink-frontend

npm install
```

---

# ▶️ Running the Application

## Start Backend

Backend server:

```
http://localhost:3060
```

Run:

```bash
cd giftlink-backend

npm start
```

---

## Start Frontend

Frontend application:

```
http://localhost:3000
```

Run:

```bash
cd giftlink-frontend

npm start
```

---

# 🐳 Containerization & Kubernetes Deployment

## Deploy MongoDB with Kubernetes

```bash
kubectl apply -f deploymongo.yml
```

---

## Build and Push Docker Images

### Backend Image

```bash
docker build -t us.icr.io/<YOUR_NAMESPACE>/giftapp ./giftlink-backend

docker push us.icr.io/<YOUR_NAMESPACE>/giftapp
```

### Frontend Image

```bash
docker build -t us.icr.io/<YOUR_NAMESPACE>/giftwebsite ./giftwebsite

docker push us.icr.io/<YOUR_NAMESPACE>/giftwebsite
```

---

# ☁️ IBM Cloud Code Engine Deployment

Deploy frontend application:

```bash
ibmcloud ce application create \
--name giftwebsite \
--image us.icr.io/<YOUR_NAMESPACE>/giftwebsite \
--registry-secret icr-secret \
--port 9000
```

---

# 🔗 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/gifts` | Get all available gifts |
| GET | `/api/gifts/:id` | Get gift details |
| GET | `/api/search` | Search gifts by filters |
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and receive JWT token |

---

# 🧪 Testing

The API can be tested using:

- Postman
- cURL

Example:

```bash
curl http://localhost:3060/api/gifts
```

---

# 📌 Future Improvements

- Add user profile management
- Add favorites and wishlist functionality
- Improve sentiment analysis model
- Add complete CI/CD deployment pipeline

---

# 📜 License

This project was developed as part of the Fullstack Developer Capstone Course.

---

⭐ If you find this project useful, consider giving it a star!
