

# 📅 EventLy - Backend (Express + MongoDB) 🎉

![EventLy](https://i.ibb.co/84gS2WFg/evently-frontend1.png) 

---

## 🔗 Live Project Links

* 🌐 **Frontend (Firebase)**: [https://evently-client.web.app](https://evently-client.web.app)
* ⚙️ **Backend (Vercel)**: [https://evently-server.vercel.app](https://evently-server.vercel.app)

---

## 📖 Project Overview

**EventLy** is a robust **Event Management Web API** built using the **MERN stack**. It enables authenticated users to create, update, delete, and join events. The application is fully protected using **JWT-based authentication**, with clean modular code and clear REST API structure.

It includes:

* Custom user registration & login (no third-party auth provider)
* JWT token generation & verification
* Full CRUD operations for events
* Filtering by user
* Join event (one-time only per user)
* Role-safe data access (only authenticated users can access private routes)

---

## 🛠️ Tech Stack

| Layer      | Technology                            |
| ---------- | ------------------------------------- |
| Backend    | Node.js, Express.js                   |
| Database   | MongoDB, Mongoose                     |
| Auth       | Custom JWT with bcrypt.js             |
| Validation | Mongoose + Validator.js               |
| Deployment | Vercel (Backend), Firebase (Frontend) |

---

## 🌟 Key Features

### 🔐 Authentication

* Custom registration & login
* Passwords hashed with **bcryptjs**
* JWT tokens issued & verified securely
* User data excluded from password fields

### 📅 Event Management

* Create, view, update & delete events
* One user = one join per event
* Attendee counter updated dynamically
* Filter events by posted user ID
* Join event only once per user

### 📁 Modular Architecture

* MVC structure with **clean separation**
* `routes/`, `controllers/`, `models/`, `services/`, `utils/`
* JWT logic extracted into utility and service files

---

## 🧩 Folder Structure

```bash
src/
├── config/
│   ├── index.js              # Environment configurations
│   └── jwt.config.js         # JWT secret/token logic
├── db/
│   └── db.js                 # MongoDB connection logic
├── modules/
│   ├── event/                # Event model/controller/routes
│   └── user/                 # User model/controller/routes
├── routes/
│   └── routers.js            # Main route handler
├── services/
│   └── getJwtToken.js        # JWT token generation logic
├── utils/
│   └── authMiddleware.js     # JWT token verification middleware
└── server.js                 # Main entry point
```

---

## 🚀 Getting Started (Local Development)

### ✅ Prerequisites

* Node.js (v18+)
* MongoDB (local or cloud)
* Vercel CLI (optional for deploy)

---

### 📦 1. Install Dependencies

```bash
npm install
```

---

### ⚙️ 2. Setup Environment

Create a `.env` file in the root and add:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
```

Generate your `JWT_SECRET` from Node REPL:

```bash
node
> require('crypto').randomBytes(32).toString('hex')
```

---

### 🧪 3. Run the Server

```bash
npm run dev
```

Server runs at:
📍 `http://localhost:5000`

---

## 📬 API Endpoints

### 🔑 Auth Routes (`/api/user`)

| Method | Endpoint      | Description                |
| ------ | ------------- | -------------------------- |
| POST   | `/user`       | Register a new user        |
| POST   | `/user/login` | Login and receive token    |
| GET    | `/user/jwt`   | Get current user via token |

### 📅 Event Routes (`/api/event`)

| Method | Endpoint            | Description                            |
| ------ | ------------------- | -------------------------------------- |
| GET    | `/event`            | Get all events (with posted user info) |
| POST   | `/event`            | Create a new event                     |
| GET    | `/event/:id`        | Get events posted by a specific user   |
| GET    | `/event/single/:id` | Get a single event by ID               |
| POST   | `/event/:id`        | Join an event by ID                    |
| PATCH  | `/event/:id`        | Update an event by ID                  |
| DELETE | `/event/:id`        | Delete an event by ID                  |

> 🔐 All `/event` routes are **protected by JWT**.

---

## 🔒 Security Features

* **JWT Authentication** middleware (`authMiddleware.js`)
* Passwords are hashed before saving
* Tokens are stored in localStorage and validated on each request
* Only joined users can update/join/delete their own events

---

## 🧠 Known Limitations

* No email verification in place (can be added later)
* No admin role or RBAC (Role-Based Access Control)
* Image URL validation on registration is currently commented

---

## 🧪 Sample Request

### 🔐 Register User

```json
POST /api/user
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Aa@123456",
  "photoURL": "https://i.ibb.co/avatar.png"
}
```

### 🔑 Login

```json
POST /api/user/login
{
  "email": "john@example.com",
  "password": "Aa@123456"
}
```

### 📅 Create Event

```json
POST /api/event
{
  "title": "Tech Conference 2025",
  "postedBy": "USER_OBJECT_ID",
  "dateTime": "2025-12-20T18:00:00Z",
  "location": "Dhaka",
  "description": "Join us for an amazing tech summit!"
}
```

---

## 🌐 Deployment on Vercel

Backend is successfully deployed at:

> 🔗 [https://evently-server.vercel.app](https://evently-server.vercel.app)

Vercel handles:

* Automatic deployment on push
* Serverless functions
* Environment variable support

---

## 🤝 Acknowledgments

Thanks to all open-source tools and libraries used in this project — especially:

* **Express.js**
* **Mongoose**
* **bcryptjs**
* **jsonwebtoken**
* **validator**

---

## 📧 Contact

**Rownak Abdullah Omi**
📩 [rownakabdullahomi@gmail.com](mailto:rownakabdullahomi@gmail.com)

---

> ⭐ Star this repo if you found it helpful!

---

## 🤝 Thank You!

Happy Coding 🚀