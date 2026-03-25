# 🎓 AttendFlow - Student Attendance Management System

![React](https://img.shields.io/badge/Frontend-React%2018-blue)
![Vite](https://img.shields.io/badge/Build-Vite-purple)
![Spring Boot](https://img.shields.io/badge/Backend-Spring%20Boot-green)
![License](https://img.shields.io/badge/License-MIT-yellow)

A **premium, modern, and interactive Student Attendance Management System** built with **React, Vite, and Spring Boot**.

---

## ✨ Features

* 📊 **Modern Dashboard** – Real-time stats (Total, Present, Absent, Late)
* 🎨 **Glassmorphic UI** – Dark mode + smooth animations
* ✅ **Attendance Marking** – Toggle Present / Absent / Late
* 🔍 **Live Search** – Search students instantly
* 📱 **Responsive Layout** – Sidebar-based navigation
* ⚡ **Fast Performance** – Powered by Vite + React

---

## 📸 Screenshots

> *(Add your project screenshots here for better presentation)*

---

## 🚀 Getting Started

### 🔹 Frontend Setup

#### Install Dependencies

```bash
npm install
```

#### Run Frontend

```bash
npm run dev
```

👉 Open: http://localhost:5173

---

### 🔹 Backend Setup (Spring Boot)

#### Navigate to Backend Folder

```bash
cd Student-Attendance-Management-System-main1
cd backend
```

#### Run Backend Server

```bash
mvn spring-boot:run
```

👉 Default Backend URL: http://localhost:8080

---

## 🛠️ Tech Stack

### Frontend

* React 18
* Vite
* Lucide React
* CSS (Glassmorphism UI)

### Backend

* Spring Boot
* Java
* Maven

### Database

* MySQL (or H2 for testing)

---

## 🗄️ Database Setup (MySQL)

1. Install MySQL
2. Create Database:

```sql
CREATE DATABASE attendance_db;
```

3. Update `application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/attendance_db
spring.datasource.username=root
spring.datasource.password=your_password

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

---

## 🔌 API Endpoints (Sample)

| Method | Endpoint           | Description            |
| ------ | ------------------ | ---------------------- |
| GET    | `/students`        | Get all students       |
| POST   | `/students`        | Add new student        |
| PUT    | `/attendance/{id}` | Update attendance      |
| GET    | `/attendance`      | Get attendance records |

---

## 📂 Project Structure

```
/frontend
  /src/components   → UI Components
  /src/App.jsx      → Main App

/backend
  /controller       → REST APIs
  /service          → Business Logic
  /repository       → Database Layer
  /model            → Entity Classes
```

---

## ⚙️ Requirements

* Node.js (v16+)
* Java (JDK 17 recommended)
* Maven
* MySQL

---

## 📌 Notes

* Run **frontend + backend together**
* Make sure backend runs on **port 8080**
* Update API URLs in frontend if needed

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first.

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 💡 Future Enhancements

* 📊 Analytics Dashboard
* 👨‍🏫 Teacher Login System
* 📅 Attendance Reports Export (PDF/Excel)
* 🔔 Notifications System

---

⭐ **If you like this project, don't forget to star the repo!**
