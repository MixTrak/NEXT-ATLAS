# Next Atlas – Login & Signup Page

[![Next.js](https://img.shields.io/badge/Next.js-000000?logo=next.js\&logoColor=white)](https://nextjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb\&logoColor=white)](https://www.mongodb.com/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?logo=vercel\&logoColor=white)](https://next-atlas-lovat.vercel.app/)

A simple yet secure **authentication system** built with **Next.js** and **MongoDB**.
This project provides a clean and minimal **login and signup workflow**, perfect as a starter template or for integrating into larger applications.

🔗 **Live Demo:** [next-atlas-lovat.vercel.app](https://next-atlas-lovat.vercel.app/)

---

## 🚀 Features

* 🔐 **User Authentication** – Secure login & signup with password encryption.
* 📦 **MongoDB Integration** – Store and manage user accounts in a database.
* ⚡ **Next.js API Routes** – Handle authentication logic server-side.
* 🎨 **Responsive UI** – Minimal, modern, and mobile-friendly design.
* 🧩 **Reusable Components** – Easy to extend and scale.

---

## 🛠️ Tech Stack

<div align="left">  
  <img src="https://skillicons.dev/icons?i=nextjs,mongodb,typescript,tailwind,vercel,git,github" />  
</div>  

* **Frontend:** Next.js + TailwindCSS
* **Backend:** Next.js API Routes with MongoDB
* **Deployment:** Vercel

---

## 📂 Project Structure

```
├── components     # Reusable UI components (Forms, Inputs, etc.)
├── lib            # Database connection and configs
├── pages          # Next.js pages (login, signup, api routes)
├── public         # Static assets
├── styles         # Global styles
└── utils          # Helper functions
```

---

## 🔧 Getting Started

Follow these steps to run the project locally:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/next-atlas.git
   cd next-atlas
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file in the root directory and add:

   ```env
   MONGODB_URI=your_mongodb_connection_string
   NEXTAUTH_SECRET=your_secret_key
   ```

4. **Run the development server:**

   ```bash
   npm run dev
   ```

5. Open your browser at:

   ```
   http://localhost:3000
   ```

---

## 🤝 Contributing

Contributions are welcome!
If you’d like to improve the UI, add new features, or fix bugs:

1. Fork the repo
2. Create a new branch
3. Make your changes
4. Submit a pull request

---

Would you like me to also **add a "Future Improvements" section** (like password reset, OAuth login, dark mode) so it looks like a roadmap?
