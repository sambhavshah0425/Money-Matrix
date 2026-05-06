# Money Matrix 💸

Money Matrix is a full-stack expense tracking web application that helps users manage their finances, track transactions, and visualize their spending habits.

## 🚀 Live Demo
- **Frontend**: [https://money-matrix-one.vercel.app](https://money-matrix-one.vercel.app)
- **Backend API**: [https://money-matrix-j46u.onrender.com](https://money-matrix-j46u.onrender.com)

## 🛠️ Tech Stack

**Frontend:**
- React 19
- Vite
- React Router DOM (Navigation)
- Recharts (Data Visualization)
- Axios (API Client)

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose (Database)
- JSON Web Tokens (JWT) for Authentication
- Bcrypt.js (Password Hashing)
- Cors

## ✨ Features
- **User Authentication**: Secure signup and login functionality using JWT.
- **Transaction Management**: Add, view, update, and delete daily expenses and income.
- **Visual Insights**: Interactive charts to visualize spending categories and trends.
- **Responsive Design**: Accessible on both desktop and mobile devices.
- **Secure**: Passwords are cryptographically hashed before being stored.

## 📂 Project Structure
This is a monorepo containing both the frontend and backend codebases:
- `/client` - The Vite + React frontend application.
- `/server` - The Node.js + Express backend API.

## 💻 Local Development Setup

### Prerequisites
- Node.js installed on your machine
- A MongoDB cluster (e.g., MongoDB Atlas)

### 1. Clone the repository
```bash
git clone https://github.com/sambhavshah0425/Money-Matrix.git
cd Money-Matrix
```

### 2. Backend Setup
```bash
cd server
npm install
```
Create a `.env` file in the `/server` directory and add the following variables:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```
Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal window and navigate to the client folder:
```bash
cd client
npm install
```
Create a `.env` file in the `/client` directory and add your backend URL:
```env
VITE_API_URL=http://localhost:5000/api
```
Start the frontend development server:
```bash
npm run dev
```

## 🚀 Deployment
- **Frontend** is configured to be deployed on **Vercel** (Set Root Directory to `client`).
- **Backend** is configured to be deployed on **Render** (Set Root Directory to `server`).
