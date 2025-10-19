# ⚖️ LexPath

![Build Status](https://img.shields.io/badge/build-passing-brightgreen) ![License](https://img.shields.io/badge/license-MIT-blue) ![Node.js](https://img.shields.io/badge/node-%3E%3D14-339933) ![Postgres](https://img.shields.io/badge/postgres-%3E%3D12-336791) ![React](https://img.shields.io/badge/react-%5E18-61DAFB) ![Tailwind CSS](https://img.shields.io/badge/tailwindcss-%5E3-38B2AC) ![npm](https://img.shields.io/badge/npm-%3E%3D8-CB3837)

## 🚀 Overview

**LexPath** is a career & education platform built exclusively for law students and aspirants. It helps users explore law career paths, discover law colleges, track law entrance exams, and apply for legal jobs & internships — all in one place.

This repository contains a full-stack web application with separate `frontend` (React + Tailwind + shadcn/ui) and `backend` (Express + PostgreSQL) folders.

## ✨ Features

* 🔐 Authentication & Authorization (JWT-based; roles: `student`, `admin`)
* 🏫 Law Colleges Directory (filter, search & save favorites)
* 🎓 Career Guidance (detailed law career paths with skills & education)
* 📝 Exam Tracker (CLAT, AILET, LSAT, MH CET Law, etc.)
* 💼 Jobs & Internships (apply to law firms, clerkships, NGOs)
* 📌 Student Dashboard (saved careers, colleges, exams, applications)
* 🛠 Admin Dashboard (manage careers, colleges, exams, jobs, users)
* 🖼 Profile Image Upload during signup (Multer)

## 🏗 Tech Stack

**Frontend**

* React
* Tailwind CSS + shadcn/ui
* Axios
* React Router DOM

**Backend**

* Node.js + Express
* PostgreSQL (pg)
* JWT for auth
* bcrypt for passwords
* Multer for image upload

## 🛠 Getting Started (Developer)

> Clone the repo and run the backend & frontend locally.

### 1) Clone

```bash
git clone https://github.com/Ayush-Sakpal/lexpath.git
cd lexpath
```

### 2) Backend setup

```bash
cd backend
npm install
```

Create a `.env` file at `backend/.env` with the following example values:

```
PORT=5000
DATABASE_URL=postgres://username:password@localhost:5432/lexpath
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

**Database**

* Ensure PostgreSQL is installed and a database named `lexpath` is created (or change DB name in `DATABASE_URL`).
* If you use a migrations tool (Knex / sequelize / prisma / typeorm), run the migrations to create the tables.

Example (if using `node-pg-migrate` or a migration script):

```bash
npm run migrate
# or
npx prisma migrate deploy
```

Start the backend server in development:

```bash
npm run dev
```

### 3) Frontend setup

```bash
cd ../frontend
npm install
npm run dev
```

Open `http://localhost:3000` (or the dev server port) to view the app.

## 🔐 Auth & Roles

* JWT-based authentication (`/api/auth/signup`, `/api/auth/login`).
* Roles: `student`, `admin` (use role checks in middleware to protect admin routes).

## 🗂 Database Schema (Simplified)

* `users` — id, name, email, password_hash, role, profile_image_url, created_at
* `careers` — id, title, field, specialization, summary, description, skills_required (jsonb), education_path (jsonb)
* `colleges` — id, name, type, location, city, state, country, established_year
* `exams` — id, name, level, mode, conducting_body, eligibility, exam_date, application_start
* `jobs` — id, title, organisation, location, role_type, industry, experience_level, skills_required (jsonb)
* `user_saved_careers`, `user_saved_colleges`, `user_saved_exams`, `user_job_applications` — mapping tables to track student activity

## 🧩 Frontend Notes

* Use `axios` instance with base URL set to backend API and attach `Authorization: Bearer <token>` header.
* Protect routes on the frontend using a simple auth context that stores `user` + `token` in `localStorage`.
* Use `shadcn/ui` components for consistent UI primitives (cards, buttons, inputs).
* Implement a `ProfileImageUpload` component that posts to `/api/upload` (Multer-backed endpoint) and returns a hosted URL.

## ✅ Admin Dashboard (in progress)

Admin can manage careers, colleges, exams, jobs and users. Protect admin pages with server-side role check and client-side route guard.

## 🔮 Roadmap

* AI-powered law career recommendations (based on profile, interests & skills)
* Mock tests & practice resources integration
* Interview & CV builder for law internships
* Email notifications and reminders for exam dates & application deadlines

## 📸 Screenshots

### Homepage
![Homepage](client/src/assets/homepage1.png)

### Student Dashboard
![Student Dashboard](client/src/assets/studentdashboard.png)

### Student Career Page
![Student Career Page](client/src/assets/studentCareerspage.png)

### Student College Page
![Student College Page](client/src/assets/studentCollegepage.png)

### Student Jobs Page
![Student Jobs Page](client/src/assets/studentJobspage.png)

### Login Page
![Login Page](client/src/assets/loginpage.png)

### Signup Page
![Signup Page](client/src/assets/signuppage.png)

### Admin Career Management
![Admin Career Page](client/src/assets/adminCareerspage.png)

### Admin College Management
![Admin College Page](client/src/assets/adminCollegespage.png)

### Admin Exam Management
![Admin Exam Page](client/src/assets/adminExamspage.png)

### Admin Jobs Management
![Admin Jobs Page](client/src/assets/adminJobspage.png)

## 🧾 License

MIT License © 2025 LexPath

---

**Made with ⚖️ for aspiring lawyers**
