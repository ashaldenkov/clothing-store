# Fashion Store – MERN Fullstack E-commerce SPA

A full-stack MERN web application for a modern fasion store with a responsive design, smooth animations, and both admin and customer portals. Features secure authentication, Stripe payments, and product filtering.

## 🌐 Live Demo

👉 [View the website on Vercel](https://e-commerce-frontend-five-xi.vercel.app/)

👉 [View the admin panel on Vercel](https://e-commerce-admin-one-ashen.vercel.app/)


## 📦 Tech Stack

- **Frontend**: React(Pages Router), Vite, TailwindCSS, ShadCN, React Hook Form, Zod
- **Backend**: Node.js, Express, MongoDB, Mongoose, Cloudinary
- **Payments**: Stripe integration
- **Auth & State**: JWT-based Auth, React Query, ContextAPI
- **Deployment**: Vercel

## ✨ Features

### 👕 Customer Portal
- Mobile-friendly SPA with smooth transitions and animations
- Browse, search, and filter products by category or name
- Add to cart, manage items, and save cart across sessions
- Register/Login, place orders with Stripe, and view order history

### 🛠 Admin Panel
- Login-protected admin dashboard
- Add, remove or watch all products
- View and update order statuses

## 🔐 Authentication
- JSON Web Token (JWT) based auth
- Secure routes for admin and user features
- Cart persisted between sessions

## 📋 Forms & Validation
- Built with React Hook Form and Zod
- Robust client&server-side validation

## 💸 Payments
- Seamless checkout using Stripe
- Order data securely sent and saved after payment confirmation

## 🚀 Getting Started

```bash
git clone https://github.com/your-username/fashion-store.git
cd fashion-store/frontend
npm install
npm run dev
```
For backend setup, see /backend directory and set your environment variables.

## 📄 License
MIT
