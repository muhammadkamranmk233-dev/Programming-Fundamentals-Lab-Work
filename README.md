# Global Scholarship Finder

A modern responsive full-stack web application that recommends fully funded Bachelor's scholarships, with a special focus on opportunities that do not require IELTS or accept MOI/alternative English proof.

## Project Structure

```
.
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── seed
│   ├── package.json
│   └── server.js
└── frontend
    ├── src
    │   ├── components
    │   ├── context
    │   ├── services
    │   ├── utils
    │   ├── App.jsx
    │   └── main.jsx
    └── package.json
```

## Features Implemented

- User profile form (name, email, citizenship, qualification, field, preferred country, English status, fully funded budget, GPA/percentage).
- Scholarship matching endpoint against MongoDB data.
- Search filters by country, field, IELTS requirement, deadline, fully funded status.
- Modern UI with hero section, dashboard, scholarship cards.
- Dark/light mode toggle.
- Favorites save action.
- Email alerts subscription action.
- Deadline countdown in each card.
- Scholarship comparison tool.
- Admin panel for login and scholarship creation.
- Security with Helmet, rate limiting, request validation, and JWT-protected admin routes.

## Sample Scholarships Included

- Stipendium Hungaricum
- Chinese Government Scholarship (CSC)
- Türkiye Burslari
- Italian DSU Scholarship
- Kazakhstan Government Scholarship
- TaiwanICDF Scholarship

## Backend Setup

1. Install dependencies:
   ```bash
   cd backend
   npm install
   ```

2. Configure environment:
   ```bash
   cp .env.example .env
   ```
   Update values in `.env` if needed.

3. Seed scholarship data:
   ```bash
   npm run seed
   ```

4. Start backend server:
   ```bash
   npm run dev
   ```

Backend runs at `http://localhost:5000`.

## Frontend Setup

1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```

2. (Optional) Set API URL:
   ```bash
   echo "VITE_API_BASE=http://localhost:5000/api" > .env
   ```

3. Start frontend:
   ```bash
   npm run dev
   ```

Frontend runs at `http://localhost:5173`.

## API Overview

### Public/User APIs

- `GET /api/scholarships` - list scholarships with filters.
- `POST /api/scholarships/match` - get matches based on user profile.
- `POST /api/scholarships/profile` - create/update user profile.
- `POST /api/scholarships/favorites` - toggle favorite scholarship.
- `POST /api/scholarships/alerts` - enable/disable email alerts.
- `GET /api/scholarships/compare?ids=<id1,id2,...>` - comparison dataset.

### Admin APIs

- `POST /api/admin/login` - admin authentication.
- `POST /api/admin/scholarships` - add scholarship (JWT required).
- `PUT /api/admin/scholarships/:id` - edit scholarship (JWT required).
- `PATCH /api/admin/scholarships/:id/deadline` - update deadline (JWT required).

## Notes

- This is a starter implementation with production-ready architecture patterns.
- You can extend it with real email delivery services (e.g., SendGrid) and persistent auth users.
