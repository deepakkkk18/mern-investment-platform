# 🚀 Investment & Referral Platform (MERN Stack)

A complete MERN Stack based Investment & Multi-Level Referral Platform with Daily ROI Calculation, Referral Income Distribution, Dashboard Analytics, and Automated Cron Job Processing.

---

# 📌 Project Overview

This platform allows users to:

- Register and Login securely
- Create investment plans
- Earn daily ROI
- Receive multi-level referral commissions
- Track ROI history
- Track referral income history
- View referral network tree
- Monitor dashboard analytics
- Automatically receive ROI through cron jobs

---

# 🛠 Technologies Used

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs
- node-cron

## Frontend

- React.js
- React Router DOM
- Axios
- Recharts
- CSS Inline Styling

---

# 📂 Project Structure

```
mern-investment-platform/

├── backend
│   ├── config
│   │   └── db.js
│   │
│   ├── controllers
│   │   ├── authController.js
│   │   ├── dashboardController.js
│   │   ├── investmentController.js
│   │   └── referralController.js
│   │
│   ├── models
│   │   ├── User.js
│   │   ├── Investment.js
│   │   ├── ROIHistory.js
│   │   └── ReferralIncome.js
│   │
│   ├── middleware
│   │   └── authMiddleware.js
│   │
│   ├── routes
│   │   ├── authRoutes.js
│   │   ├── dashboardRoutes.js
│   │   ├── investmentRoutes.js
│   │   └── referralRoutes.js
│   │
│   ├── services
│   │   └── roiService.js
│   │
│   ├── cron
│   │   └── roiCron.js
│   │
│   ├── .env
│   └── server.js
│
├── frontend
│   ├── public
│   └── src
│       ├── pages
│       ├── components
│       └── services
│
└── README.md
```

---

# ✨ Features

## 🔐 Authentication Module

- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Logout Functionality

---

## 💰 Investment Module

- Create Investment
- View Investments
- Investment Dashboard
- Investment Tracking
- Active Investment Count

---

## 📈 ROI Module

- Daily ROI Calculation
- ROI History
- ROI Dashboard
- Automatic ROI Credit
- Duplicate ROI Prevention

---

## 👥 Referral Module

- Multi-Level Referral Income
- Direct Referral Team
- Referral Tree
- Referral Income History
- Referral Tracking

---

## 📊 Dashboard Module

- Wallet Balance
- Total ROI
- Referral Income
- Active Investments
- Total Investments
- Referral Code
- Earnings Analytics Chart
- Responsive Dashboard Cards

---

## 🌳 Referral Tree

- Recursive Referral Tree
- Multi-Level User Structure
- Team Visualization
- Level Tracking

---

# ⏰ Cron Job Functionality

The system automatically:

- Runs every day at 12:00 AM
- Calculates daily ROI
- Credits user wallet balance
- Updates total ROI
- Stores ROI history
- Prevents duplicate ROI credit

---

# 🔑 Environment Variables

Create a `.env` file inside backend folder:

```env
PORT=5000

MONGO_URI=mongodb://127.0.0.1:27017/investment_platform

JWT_SECRET=deepak_secret_key
```

---

# ⚙️ Installation

## Backend Setup

```bash
cd backend

npm install

npm start
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm start
```

---

# 🔗 API Endpoints

## Authentication

### Register User

```http
POST /api/auth/register
```

### Login User

```http
POST /api/auth/login
```

---

## Dashboard

### Get Dashboard Data

```http
GET /api/dashboard
```

---

## Investments

### Create Investment

```http
POST /api/investments/create
```

### Get My Investments

```http
GET /api/investments/my-investments
```

### Credit ROI

```http
POST /api/investments/credit-roi/:investmentId
```

### ROI History

```http
GET /api/investments/roi-history
```

### Referral Income History

```http
GET /api/investments/referral-income-history
```

---

## Referral

### Direct Referrals

```http
GET /api/referrals/direct-referrals
```

### Referral Tree

```http
GET /api/referrals/referral-tree
```

### Referral Income

```http
GET /api/referrals/my-income
```

---

# 📱 Frontend Pages

- Login Page
- Register Page
- Dashboard Page
- Create Investment Page
- My Investments Page
- ROI History Page
- Referral Income History Page
- Direct Referral Team Page
- Referral Tree Page

---

# 🔒 Security Features

- JWT Authentication
- Password Hashing using bcryptjs
- Protected API Routes
- Protected React Routes
- Authorization Middleware

---

# 📈 Business Logic

### ROI Calculation

```text
Daily ROI =
Investment Amount × ROI Percentage / 100
```

## Assumptions Made During Development

- ROI is credited once daily using a cron job.
- Referral income is distributed up to 3 levels.
- Wallet balance includes ROI and referral income.
- Duplicate ROI credits are prevented.
- MongoDB Atlas can be used for production deployment.
- JWT authentication is used for API security.



### Referral Income

```text
Level 1 = 5%
Level 2 = 3%
Level 3 = 2%
```

---

# 📋 Development Assumptions

- ROI is credited automatically by cron jobs.
- Duplicate ROI entries are prevented.
- Referral income supports multiple levels.
- Dashboard analytics are generated dynamically.
- Application is responsive for desktop and mobile devices.
- JWT authentication secures all protected APIs.

---

# 👨‍💻 Developer

Deepak Kumar Bind

This project was developed as part of a MERN Stack technical assessment. The platform implements investment management, ROI processing, referral income distribution, dashboard analytics, and automated cron-based ROI crediting.

---
# Project Notes

This project was built following the assessment requirements. Additional improvements such as enhanced UI/UX, deployment, and advanced analytics can be implemented in future versions.
