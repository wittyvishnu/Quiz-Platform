QuizPlatform

  QuizPlatform
  A modern, interactive quiz platform built with Next.js and Node.js



  
    QuizPlatform is designed for creating, sharing, and analyzing quizzes. It's perfect for educators, trainers, and marketers looking to engage their audience with powerful analytics and a seamless user experience.
  


Features

  ✔ User Authentication: Secure signup with email verification using OTP.
  ✔ Quiz Creation: Intuitive interface to create quizzes with customizable questions.
  ✔ Real-time Analytics: Track participant responses and performance.
  ✔ Shareable Quizzes: Generate links to share quizzes anywhere.
  ✔ Responsive Design: Works on desktops, tablets, and mobile devices.
  ✔ Secure & Reliable: Uses Clerk for authentication and Supabase for database management.


Project Structure
The project is split into two main directories:

frontend/ (Next.js app)
backend/ (Node.js server)

Getting Started
Prerequisites

Node.js (v18 or higher)
npm, Yarn, or pnpm
Clerk account (for frontend)
Supabase account (for backend)
SendGrid account (for backend)

Frontend Setup

Navigate to the frontend directory:
cd frontend


Install dependencies:
npm install

Or:
yarn install

Or:
pnpm install


Set up environment variables: Create a .env.local file in the frontend/ directory:
NEXT_PUBLIC_Backend_URL=http://localhost:5000


Run the frontend development server:
npm run dev

Or:
yarn dev

Or:
pnpm dev


Open http://localhost:3000 in your browser.


Backend Setup

Navigate to the backend directory:
cd backend


Install dependencies:
npm install

Or:
yarn install

Or:
pnpm install


Set up environment variables: Create a .env file in the backend/ directory:
SUPABASE_URL=https://your-supabase-project-url.supabase.co
SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_KEY=your-supabase-service-key
SENDGRID_USER=your-sendgrid-username
SENDGRID_PASS=your-sendgrid-password
EMAIL_FROM=noreply@yourdomain.com
PORT=5000
JWT_SECRET=your-secure-jwt-secret
APP_URL=http://localhost:3000


Set up Supabase database: Create a users table with the following schema:
CREATE TABLE users (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT NOT NULL,
  password TEXT NOT NULL,
  role TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


Run the backend server:
npm run dev

Or:
yarn dev

Or:
pnpm dev

The backend will run on http://localhost:5000.


Building for Production
Frontend
cd frontend
npm run build
npm run start

Backend
cd backend
npm run build
npm run start

Folder Structure
Frontend
frontend/
├── app/                    # Next.js app directory
│   ├── page.js             # Homepage component
│   └── ...                 # Other pages/routes
├── components/             # Reusable React components
│   ├── signup/             # Signup-related components
│   ├── ui/                 # UI components
│   ├── Footer.jsx          # Footer component
│   └── ...                 # Other components
├── public/                 # Static assets
├── .env.local              # Environment variables
├── .gitignore              # Git ignore file
├── next.config.js          # Next.js configuration
├── package.json            # Dependencies and scripts
└── README.md               # Project documentation

Backend
backend/
├── src/
│   ├── routes/
│   │   └── auth.js        # Authentication routes
│   ├── utils/
│   │   ├── email.js       # SendGrid email utility
│   │   └── jwt.js         # JWT utility
│   ├── index.js           # Main server file
│   └── .env               # Environment variables
├── package.json           # Dependencies and scripts
└── README.md              # Backend documentation

Technologies Used
Frontend

Framework: Next.js (App Router), React
Styling: Tailwind CSS
Authentication: Clerk
State Management: React hooks
Icons: Lucide React
Notifications: React Hot Toast
Build Tools: TypeScript, ESLint

Backend

Framework: Node.js, Express
Database: Supabase (PostgreSQL)
Email Service: SendGrid
Authentication: JWT
Password Hashing: bcryptjs
Environment Management: dotenv
Development Tools: Nodemon

Usage
Sign Up

Navigate to the signup page (e.g., /signup).
Enter your details and agree to the terms.
Verify your email using the OTP sent to your inbox.

Create a Quiz

Navigate to the dashboard (/dashboard).
Use the quiz builder to create questions and customize settings.

Share and Analyze

Share the quiz link with participants.
View real-time analytics on the dashboard.

Contributing

Fork the repository.
Create a new branch (git checkout -b feature/your-feature).
Make your changes and commit them (git commit -m "Add your feature").
Push to the branch (git push origin feature/your-feature).
Open a Pull Request with a detailed description.

Ensure your code follows the project's ESLint rules and passes all tests before submitting a PR.
License
This project is licensed under the MIT License. See the LICENSE file for details.
Contact
For questions or support, reach out to vishnuwitty@gmail.com.
Built with ❤️ by vishnu
