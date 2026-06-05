# 🏠 Hostel Management System

A full-stack Hostel Management System built as a learning project to explore modern web development, database management, authentication, and role-based application design.

## 📖 About the Project

This project was developed as part of my learning journey in full-stack development. The goal was to understand how real-world management systems are designed and implemented using modern frontend and backend technologies.

The application provides separate workflows for hostel staff and students, helping streamline common hostel operations such as complaints, mess management, announcements, fines, lost & found tracking, and student management.

Rather than focusing only on tutorials, I wanted to build something practical that would expose me to:

- Authentication and authorization
- REST API development
- Database modeling
- Role-based dashboards
- Frontend routing
- State management concepts
- Real-world CRUD operations

---

## 🚀 Features

### 👨‍💼 Staff Module

- Student management
- Add and manage student records
- Complaint monitoring
- Fine management
- Hostel announcements
- Lost & Found management
- Room management
- Mess administration
- Weekly menu management
- Payment and refund tracking

### 👨‍🎓 Student Module

- Student dashboard
- Submit complaints
- View hostel announcements
- Access mess information
- Mess feedback and cancellation requests
- View fines
- Lost & Found access
- Profile management
- Fee-related information

### 🔐 Authentication

- Login system
- JWT-based authentication
- Protected routes
- Role-based access control

### 🤖 Guardian AI
An AI-powered assistant integrated into the hostel management system to help users with:

- Hostel-related queries
- Student support and guidance
- Information retrieval
- Complaint assistance
- Navigation through hostel services

This feature was developed to explore AI integration within a management system and improve the overall user experience.

---

## 🛠️ Tech Stack

### Frontend

- React
- React Router
- Axios
- Tailwind CSS
- Vite

### Backend

- Node.js
- Express.js

### Database

- MongoDB
- Mongoose

### Authentication

- JSON Web Tokens (JWT)
- bcrypt

### Additional Tools

- Multer
- Cloudinary
- Nodemon
- Git & GitHub

---

## 📂 Project Structure

```text
HostelManagement/
│
├── Frontend/
│   ├── src/
│   │   ├── Components/
│   │   │   ├── student/
│   │   │   ├── staff/
│   │   │   └── Login/
│   │   └── App.jsx
│   │
│   └── package.json
│
├── Backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   ├── utilities/
│   │   └── db/
│   │
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/shivansh0209/HostelManagement.git
```

### 2. Navigate to the Project

```bash
cd HostelManagement
```

---

## Backend Setup

### Navigate to Backend

```bash
cd Backend
```

### Install Dependencies

```bash
npm install
```

### Create Environment Variables

Create a `.env` file inside the Backend directory.

Example:

```env
PORT=8000
MONGODB_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_secret_key
ACCESS_TOKEN_EXPIRY=1d
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Start Backend Server

```bash
npm run dev
```

---

## Frontend Setup

### Navigate to Frontend

```bash
cd Frontend
```

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

---

## 🎯 Learning Outcomes

Through this project, I learned:

- Building REST APIs with Express
- MongoDB schema design using Mongoose
- JWT authentication implementation
- Password hashing with bcrypt
- Frontend routing using React Router
- API integration using Axios
- Organizing large React projects
- Middleware implementation
- File upload handling
- Cloudinary integration
- Role-based application design

---

## 🧩 Modules Implemented

### Student Management
Manage student details and records.

### Complaint System
Students can submit complaints while staff can monitor and manage them.

### Mess Management
- Weekly menu
- Feedback collection
- Cancellation requests

### Lost & Found
Track and manage lost and found items within the hostel.

### Fine Management
Maintain records of student fines.

### Announcements
Publish and manage hostel-wide announcements.

---

## 🔮 Future Improvements

Some features I would like to add in future versions:

- Room allocation automation
- Attendance tracking
- Email notifications
- Hostel fee payment gateway
- Analytics dashboard
- Mobile responsiveness improvements
- Admin role management
- Unit and integration testing
- Docker deployment
- CI/CD pipeline

---

## 📝 Challenges Faced

During development, I encountered several challenges:

- Designing database relationships
- Structuring backend controllers and routes
- Managing authentication flows
- Handling protected routes in React
- Organizing a growing codebase
- Integrating frontend and backend APIs

Solving these challenges helped me gain practical experience beyond tutorials.

---

## 🌱 Project Status

This project is primarily a learning-focused project and continues to evolve as I learn new concepts and best practices in software development.

---

## 👨‍💻 Author

**Shivansh Pandey**

GitHub: https://github.com/shivansh0209

---

## ⭐ Acknowledgement

This project was built to strengthen my understanding of full-stack development by working on a real-world problem and implementing features commonly found in hostel and campus management systems.
