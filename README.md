# AdPulse - AI Powered Ad Campaign Dashboard

## About the Project

AdPulse is a full-stack web application built to manage and analyze digital advertising campaigns from one place.

The main idea behind this project was to create a dashboard where users can add campaigns, track their performance, manage customer information, and view useful insights through charts and analytics instead of looking at raw data.

I built this project to improve my understanding of the MERN stack and to get hands-on experience with frontend, backend, database management, REST APIs, authentication, and dashboard development.

---

## Features

- User Signup & Login
- Protected Routes
- Add, Update and Delete Campaigns
- Customer Management
- Dashboard with campaign statistics
- Performance Charts
- Monthly Trend Analysis
- Platform-wise Campaign Distribution
- AI Based Campaign Recommendations
- Export Campaign Data
- Responsive UI

---

## Tech Stack

### Frontend

- React.js
- Vite
- Axios
- Recharts
- CSS

### Backend

- Node.js
- Express.js

### Database

- MongoDB
- Mongoose

### Authentication

- JWT (JSON Web Token)

---

## Project Structure

```
ad-campaign-dashboard
│
├── client
│   ├── src
│   ├── public
│   └── package.json
│
├── server
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── config
│   └── server.js
│
└── README.md
```

---

## Installation

Clone the repository

```bash
git clone https://github.com/SAHIBAZAFRUL/ad-campaign-dashboard.git
```

Go to the project folder

```bash
cd ad-campaign-dashboard
```

Install frontend dependencies

```bash
cd client
npm install
```

Install backend dependencies

```bash
cd ../server
npm install
```

Create a `.env` file inside the server folder and add your MongoDB connection string.

Start the backend

```bash
npm run dev
```

Start the frontend

```bash
cd ../client
npm run dev
```

---

## What I Learned

While building this project, I learned:

- Building REST APIs using Express.js
- Connecting React with a Node backend
- Working with MongoDB using Mongoose
- Managing application state in React
- Creating reusable components
- Implementing JWT Authentication
- Handling CRUD operations
- Organizing a full-stack project using MVC architecture
- Displaying analytics using charts
- Improving UI by building a dashboard layout

---

## Future Improvements

Some features I would like to add in the future:

- Email notifications
- Campaign scheduling
- AI-based budget prediction
- Dark/Light mode
- Advanced filtering and search
- Role-based access for Admin and Users

---

## Author

**Sahiba Zafrul**

GitHub: https://github.com/SAHIBAZAFRUL
