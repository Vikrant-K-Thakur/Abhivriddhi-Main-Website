# Abhivriddhi — Official Website

The official website of **Abhivriddhi**, the Student Training & Development Committee of VIT Pune.

This repository contains two projects:

| Folder | Stack | Purpose |
|--------|-------|---------|
| `main-website/` | React + Vite | Public-facing website |
| `admin/` | Next.js 15 | Admin panel for event & attendance management |

---

## Main Website (`main-website/`)

Built with **React + Vite**.

### Getting Started

```bash
cd main-website
npm install
npm run dev
```

Runs at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Pages

- `/` — Home
- `/about` — About Abhivriddhi
- `/events` — Featured Events
- `/team` — Team (Coming Soon)
- `/sponsors` — Our Sponsors
- `/contact` — Contact Us

### Custom Font

The navbar and loader use a custom font **Saman** located at:
```
main-website/src/fonts/SAMAN___.woff2
```

---

## Admin Panel (`admin/`)

Built with **Next.js 15** + MongoDB.

### Getting Started

```bash
cd admin
npm install
npm run dev
```

Runs at `http://localhost:3000`

### Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```env
# MongoDB (Atlas for production, local for development)
MONGODB_URI=mongodb://localhost:27017/qr-attendance

# Email Config (Gmail)
EMAIL=your@gmail.com
EMAIL_PASSWORD=your_app_password

# JWT Secret
JWT_SECRET=your_jwt_secret

# Seed Key (used once to create first admin)
SEED_KEY=your_seed_key
```

### First Time Setup — Create Admin Account

Run the dev server, then send a **POST** request to:

```
POST http://localhost:3000/api/auth/seed
```

```json
{
  "name": "Your Name",
  "email": "your@email.com",
  "password": "yourpassword",
  "seedKey": "your_seed_key_from_env"
}
```

This only needs to be done **once**. After that, login at `http://localhost:3000/login` directly.

### Features

- Admin login with JWT authentication
- Add & manage event participants
- QR code based attendance marking
- Send event tickets via email
- Send certificates via email
- Attendance reports & export

### Build for Production

```bash
npm run build
npm start
```

> **Note:** Always run `npm run build` before `npm start`. Use `npm run dev` during development.

---

## Project Structure

```
website/
├── main-website/       # React + Vite public website
│   ├── src/
│   │   ├── components/ # Navbar, Footer, Hero, etc.
│   │   ├── pages/      # About, Events, Team, Sponsors, Contact
│   │   └── assets/     # Images, videos, fonts
│   └── public/         # Static assets, sponsor logos
│
└── admin/              # Next.js admin panel
    ├── app/            # Next.js app router pages & API routes
    ├── components/     # UI components
    └── lib/            # DB connection, models, auth utils
```

---

## Tech Stack

**Main Website**
- React 18
- Vite
- React Router DOM

**Admin Panel**
- Next.js 15
- MongoDB + Mongoose
- JWT Authentication
- Tailwind CSS
- Nodemailer (email)
- QR Code scanning

---

## Team

Built by the **Abhivriddhi Technical Team 2026**  
VIT Pune, Bibwewadi, Pune, Maharashtra
