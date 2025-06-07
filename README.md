# 🎉 QuizPlatform

A modern, interactive quiz platform built with Next.js and Node.js  
**QuizPlatform** is designed for creating, sharing, and analyzing quizzes. It's perfect for educators, trainers, and marketers looking to engage their audience with powerful analytics and a seamless user experience.

---

## ✨ Features

- **User Authentication**: Secure signup with email verification using OTP  
- **Quiz Creation**: Intuitive interface to create quizzes with customizable questions  
- **Real-time Analytics**: Track participant responses and performance  
- **Shareable Quizzes**: Generate links to share quizzes anywhere  
- **Responsive Design**: Works on desktops, tablets, and mobile devices  
- **Secure & Reliable**:  Supabase for database management

---

## 📂 Project Structure

The project is split into two main directories:

- `frontend/` (Next.js app)  
- `backend/` (Node.js server)

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)  
- npm, Yarn, or pnpm  
- Supabase account (for backend)  
- SendGrid account (for backend)

---




## 💻 Technologies Used

### Frontend
- **Framework:** Next.js (App Router), React  
- **Styling:** Tailwind CSS    
- **State Management:** React hooks  
- **Icons:** Lucide React  
- **Notifications:** React Hot Toast  
- **Build Tools:** TypeScript, ESLint  

### Backend
- **Framework:** Node.js, Express  
- **Database:** Supabase (PostgreSQL)  
- **Email Service:** SendGrid  
- **Authentication:** JWT  
- **Password Hashing:** bcryptjs  
- **Environment Management:** dotenv  
- **Development Tools:** Nodemon  

### 🖥️ Frontend Setup

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install  # or yarn install / pnpm install

```
### 🖥️ Backend Setup
```bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install  # or yarn install / pnpm install
```

### Create .env file in backend/ directory:

```bash
SUPABASE_URL=https://your-supabase-project-url.supabase.co
SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_KEY=your-supabase-service-key
SENDGRID_USER=your-sendgrid-username
SENDGRID_PASS=your-sendgrid-password
EMAIL_FROM=noreply@yourdomain.com
PORT=5000
JWT_SECRET=your-secure-jwt-secret
APP_URL=frontend-url || localhost
```

### Create .env file in frontend/ directory:

```bash
NEXT_PUBLIC_Backend_URL=backend-url || localhost

```

## 🛠️ Building for Production

### Frontend

```bash
cd frontend
npm run build
npm run start
```
### Backend

```bash
cd backend
npm run build
npm run start
```

## 📜 License

This project is licensed under the **MIT License**.  
See the [LICENSE](./LICENSE) file for details.

## 📧 Contact

For questions or support, reach out to **[vishnuwitty@gmail.com](mailto:vishnuwitty@gmail.com)**  
Built with ❤️ by **Vishnu**


