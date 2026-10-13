# Secure Authentication System

## Project Overview
The Secure Authentication System is a Node.js and Express.js REST API that provides user registration, login, JWT authentication, role-based authorization, and Passport Local authentication. MySQL is used as the database.

## Technologies Used
- Node.js
- Express.js
- MySQL
- mysql2
- bcryptjs for password hashing
- JSON Web Token (JWT)
- Passport.js and Passport Local
- Passport Google OAuth 2.0 (requires Google credentials)
- express-session
- dotenv
- cors

## Features
- User registration with password hashing.
- User login with JWT generation.
- Authentication using Bearer tokens.
- Role-based authorization for students, instructors, and administrators.
- Passport Local login.
- Session management using express-session.
- Google OAuth route configuration.
- Environment variables for configuration and secrets.

## Database
Database: `secure_auth_db`

The `users` table stores:
- `id`
- `name`
- `email`
- `password`
- `role`
- `googleId`
- `createdAt`

Supported roles: `student`, `instructor`, and `admin`.

## Installation and Setup

1. Install Node.js and MySQL.
2. Clone or download this project.
3. Open the project folder in a terminal.
4. Install dependencies:

   ```bash
   npm install
   ```

5. Create the MySQL database `secure_auth_db` and the required `users` table.
6. Create a `.env` file in the project root and configure the database settings, JWT secret, and session secret.
7. Start the development server:

   ```bash
   npm run dev
   ```

The API runs at `http://localhost:5000` when configured with the default port.

## API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/auth/register` | Register a user |
| POST | `/api/auth/login` | Login and receive a JWT |
| POST | `/api/auth/local-login` | Passport Local login |
| GET | `/api/auth/google` | Start Google OAuth |
| GET | `/api/auth/google/callback` | Handle Google OAuth callback |
| GET | `/api/student/dashboard` | Student-accessible dashboard |
| GET | `/api/instructor/courses` | Instructor/admin access |
| DELETE | `/api/admin/users/:id` | Admin-only user deletion |

## Authentication
For protected endpoints, send the JWT in the request header:

`Authorization: Bearer YOUR_JWT_TOKEN`

A missing or invalid token should return `401 Unauthorized`. An authenticated user without the required role should receive `403 Forbidden`.

## Google OAuth
Google OAuth requires a valid Google OAuth Client ID and Client Secret configured in the `.env` file. Google login has not been verified without these credentials.

## Security Notes
- Passwords are hashed before storage.
- Secrets and environment-specific settings belong in `.env`.
- The `.env` file must not be committed to GitHub.
- The `.gitignore` file excludes `.env` and `node_modules`.

## Database Choice
This project uses MySQL with `mysql2`, rather than MongoDB.

## Testing
The API can be tested using Postman. Test registration, successful and unsuccessful login, protected endpoints, and role-based access. Record actual test results before submission.
