# Architecture Portfolio - Full Stack

This project is a complete full-stack MERN application for an architecture portfolio website, featuring a public-facing site and a comprehensive admin panel.

## Project Structure

- `/frontend`: Contains the React/Vite frontend application.
- `/backend`: Contains the Node.js/Express/MongoDB backend server.

## Features

- **Secure Authentication**: Login page with JWT-based auth.
- **Dashboard**: At-a-glance view of key metrics.
- **Full Project Management (CRUD)**:
  - List, search, filter, and sort projects.
  - Create new projects with multi-image uploads to Cloudinary.
  - Edit existing projects, including reordering, removing, and adding images.
  - Drag-and-drop image reordering.
- **Admin Management**: Manage site administrators.
- **Profile Management**: Admins can update their own profile and password.
- **Live API**: Fully integrated with a Node.js backend.
- **Responsive & Accessible**: Designed to work on all devices.

## Tech Stack

### Frontend
- React 19 + TypeScript
- Vite
- React Router
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express
- MongoDB with Mongoose
- Cloudinary for image hosting
- JSON Web Tokens (JWT) for authentication
- bcryptjs for password hashing

## Getting Started

### Prerequisites

- Node.js (LTS version)
- MongoDB instance (local or cloud)
- Cloudinary account

### Installation & Running

1.  **Clone the repository**.

2.  **Install all dependencies**:
    From the root directory, run:
    ```bash
    npm install
    ```
    This will install dependencies for both the `frontend` and `backend` workspaces.

3.  **Backend Environment Setup**:
    - Navigate to the `/backend` directory.
    - Create a `.env` file by copying `.env.example`.
    - Fill in your `MONGODB_URI`, `CLOUDINARY_*` credentials, and a `JWT_SECRET`.

4.  **Frontend Environment Setup**:
    - Navigate to the `/frontend` directory.
    - Create a `.env` file by copying `.env.example`.
    - Ensure `VITE_API_BASE_URL` points to your backend server (default is `http://localhost:5000/api`).

5.  **Run the application**:
    From the root directory, run:
    ```bash
    npm run dev
    ```
    This will start both the backend server (on port 5000) and the frontend dev server (on port 5173) concurrently.

    - Frontend is available at `http://localhost:5173`
    - Admin panel is at `http://localhost:5173/admin`
