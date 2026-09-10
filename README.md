# 🚀 IT Asset Management System

A modern full-stack **IT Asset Management System** built with **Spring Boot**, **React**, **MySQL**, and **Docker**. The application enables organizations to efficiently manage employees, IT assets, issue reporting, work orders, and analytics through a secure role-based platform.

---

## ✨ Features

- 🔐 JWT Authentication & Authorization
- 👥 Role-Based Access Control (RBAC)
- 👨‍💼 Employee Management
- 💻 Equipment & Asset Management
- 🛠️ Issue Reporting & Tracking
- 📋 Work Order Management
- 📊 Dashboard & Analytics
- 🔔 Email Notifications
- 📄 Swagger/OpenAPI Documentation
- 🐳 Dockerized Deployment

---

## 🛠️ Tech Stack

### Backend

- Java 21
- Spring Boot
- Spring Security
- JWT Authentication
- Spring Data JPA
- Hibernate
- MySQL
- MapStruct
- Lombok
- Spring Mail
- Swagger / OpenAPI

### Frontend

- React
- Vite
- Material UI
- React Router
- Axios
- TanStack Query (React Query)
- React Hook Form
- Zustand

### DevOps

- Docker
- Docker Compose
- Nginx

---

# 🏗️ Architecture

```
                    React + Vite
                          │
                    Axios / JWT
                          │
                Spring Boot REST API
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
 Authentication      Business Logic     Security
        │                 │                 │
        └─────────────────┼─────────────────┘
                          │
                    Spring Data JPA
                          │
                        MySQL
```

---

# 📁 Project Structure

```
asset-management/
│
├── backend/
│   ├── src/main/java
│   │   ├── analytics
│   │   ├── auth
│   │   ├── common
│   │   ├── config
│   │   ├── dashboard
│   │   ├── email
│   │   ├── employee
│   │   ├── equipment
│   │   ├── exception
│   │   ├── issue
│   │   ├── report
│   │   ├── security
│   │   ├── user
│   │   ├── verification
│   │   └── workorder
│   │
│   └── src/main/resources
│
├── frontend/
│   ├── src
│   │   ├── api
│   │   ├── app
│   │   ├── components
│   │   ├── config
│   │   ├── constants
│   │   ├── features
│   │   ├── hooks
│   │   ├── pages
│   │   ├── routes
│   │   ├── theme
│   │   └── utils
│
├── docker-compose.yml
└── README.md
```

---

# 🚀 Getting Started

## Prerequisites

- Java 21
- Node.js 20+
- Maven
- Docker Desktop

---

## Clone Repository

```bash
git clone https://github.com/your-username/asset-management.git

cd asset-management
```

---

## Run with Docker

```bash
docker compose up --build
```

---

## Application URLs

| Service | URL |
|----------|-----|
| Frontend | http://localhost:3000 |
| Backend | http://localhost:8080 |
| Swagger UI | http://localhost:8080/swagger-ui/index.html |

---

# 📚 API Modules

- Authentication
- Users
- Employees
- Equipment
- Issues
- Work Orders
- Dashboard
- Analytics

---

# 🔐 Security

- JWT Authentication
- Stateless Session Management
- BCrypt Password Encryption
- Spring Security
- Role-Based Authorization
- Method-Level Security

---

# 📸 Screenshots

You can add screenshots here after deployment.

- Login Page
- Dashboard
- Employee Management
- Equipment Management
- Issues
- Work Orders
- Analytics Dashboard

---

# 🔮 Future Enhancements

- QR Code Asset Tracking
- Barcode Scanning
- File Uploads
- PDF & Excel Reports
- Real-Time Notifications
- Audit Logs
- Asset Maintenance Scheduler
- Dark Mode
- Mobile Responsive UI

---

# 👨‍💻 Author

**Aayush Soni**

---

# 📄 License

This project is licensed under the **MIT License**.

See the `LICENSE` file for details.