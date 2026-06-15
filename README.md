# 🚀 Anonymous Feedback Platform

A production-ready **Anonymous Feedback Application** built with **Next.js, MongoDB, NextAuth, OpenAI, and TypeScript**. This platform allows users to receive anonymous feedback through a personalized public profile link while maintaining security, scalability, and a modern user experience.

## 🌟 Features

### 🔐 Secure Authentication & Verification

* User authentication using **NextAuth (Auth.js)**.
* Secure signup and login flow.
* Email verification using **OTP-based verification**.
* Email delivery powered by **Resend**.

### 💬 Anonymous Messaging System

* Receive anonymous messages through a unique public URL.
* Personalized feedback page for every user.
* No sender identity is revealed.

### 📊 User Dashboard

* Manage received messages.
* View message history.
* Delete unwanted messages.
* Toggle message acceptance on/off.
* Real-time feedback management.

### 🤖 AI-Powered Message Suggestions

* Integrated with **OpenAI (ChatGPT)**.
* Generates smart feedback suggestions.
* Improves engagement and user interaction.

### 🛡️ Data Validation & Form Handling

* Schema validation using **Zod**.
* Efficient form management with **React Hook Form**.
* Strong client-side and server-side validation.

### 🎨 Modern UI/UX

* Beautiful and responsive interface.
* Built using **shadcn/ui** components.
* Mobile-friendly and accessible design.

### 🗄️ Database Management

* MongoDB integration with optimized connection handling.
* Scalable database architecture.
* Industry-standard data modeling practices.

## 🏗️ Tech Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* shadcn/ui

### Backend

* Next.js API Routes
* NextAuth (Auth.js)

### Database

* MongoDB
* Mongoose

### Validation & Forms

* Zod
* React Hook Form

### Email Services

* Resend

### AI Integration

* OpenAI API

## 📌 Key Learning Outcomes

This project demonstrates:

* Full-Stack Application Development
* Authentication & Authorization
* Email Verification Workflows
* Database Design & Modeling
* API Development
* Form Validation
* AI Integration
* Production-Level Next.js Practices
* Clean Project Architecture
* Real-World Freelance Project Workflow

## 🚀 Getting Started

### Clone the Repository

```bash
git clone https://github.com/Ronak-Malik/anonymous-feedback-platform.git
```

### Install Dependencies

```bash
npm install
```

### Setup Environment Variables

Create a `.env.local` file and add:

```env
MONGODB_URI=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
RESEND_API_KEY=
OPENAI_API_KEY=
```

### Run the Development Server

```bash
npm run dev
```

Visit:

```bash
http://localhost:3000
```

## 📸 Application Flow

1. User signs up.
2. Email OTP verification is completed.
3. User receives a unique public profile URL.
4. Anyone can send anonymous feedback through the link.
5. User manages feedback from the dashboard.
6. AI-generated message suggestions enhance user engagement.

## 🎯 Project Highlights

* Production-ready architecture.
* Secure authentication and verification.
* AI-powered user experience.
* Scalable MongoDB integration.
* Modern UI with shadcn/ui.
* Real-world freelance-grade project implementation.



⭐ If you found this project useful, consider giving it a star on GitHub!
