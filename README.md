# 🚌 SwiftBus — Premium Bus Ticket Booking Web Platform

<div align="center">

  ![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)
  ![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
  ![MUI](https://img.shields.io/badge/Material--UI-v5-007FFF?style=for-the-badge&logo=mui&logoColor=white)
  ![Firebase](https://img.shields.io/badge/Firebase-v10-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
  ![Express.js](https://img.shields.io/badge/Express.js-Backend-000000?style=for-the-badge&logo=express&logoColor=white)
  ![License](https://img.shields.io/badge/License-ISC-blue?style=for-the-badge)

  <br />

  <h3>✨ Modern, Fast, and Seamless Bus Reservation System ✨</h3>

  <p align="center">
    <b>SwiftBus</b> is a full-featured, responsive React web application designed for booking bus tickets with ease. Built with modern UI components, glassmorphism design, real-time seat selection, multi-gateway payments, e-ticket generation, and automated email dispatches.
    <br />
    <br />
    <a href="#-key-features">Explore Features</a>
    ·
    <a href="#-getting-started">Getting Started</a>
    ·
    <a href="#-environment-configuration">Environment Setup</a>
    ·
    <a href="#-project-structure">Project Structure</a>
  </p>

</div>

---

## 📖 Table of Contents

- [✨ Key Features](#-key-features)
- [🛠 Tech Stack & Libraries](#-tech-stack--libraries)
- [📁 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
- [🔑 Environment Configuration](#-environment-configuration)
- [🗺 Route Map](#-route-map)
- [⚡ Mock Server & Database](#-mock-server--database)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## ✨ Key Features

### 🔍 1. Interactive Bus Search & Filtering
- Search routes by departure location, destination city, and journey date.
- Real-time filtering by bus operator, seating type (AC / Non-AC Sleeper / Seater), departure time, and price range.

### 💺 2. Live Seat Deck & Selection
- Visual representation of bus upper and lower decks.
- Real-time seat status tracking (Available, Selected, Booked).
- Instant total fare recalculation based on selected seat tier.

### 💳 3. Multi-Option Payment Gateway
- Supports Credit/Debit Cards, UPI / QR payments, Net Banking, and Mobile Wallets.
- Interactive multi-step checkout flow with real-time validation.

### 🎟️ 4. E-Ticket & Email Dispatch
- Automatic digital ticket (PNR, seat allocation, passenger info, QR code) generation.
- Instant automated email confirmation delivered directly to passenger inbox via **EmailJS**.
- PDF downloading and printing support.

### 🔐 5. Dual Authentication & User Profiles
- Integrated **Firebase Authentication** supporting Google Sign-In and Email/Password credentials.
- Optional **JWT-based Node.js backend authentication** included.

### 🌓 6. Dark & Light Theme Mode
- Context-driven theme switcher providing seamless toggle between dark mode and sleek light mode across all routes.

---

## 🛠 Tech Stack & Libraries

### **Frontend Core**
- **[React 18](https://reactjs.org/)** — UI Library
- **[React Router DOM v6](https://reactrouter.com/)** — Client-side Navigation
- **[Material-UI (MUI v5)](https://mui.com/) & [Emotion](https://emotion.sh/)** — Modern Component Architecture
- **[Bootstrap 5](https://getbootstrap.com/) & [React-Bootstrap](https://react-bootstrap.github.io/)** — Responsive Grid Layouts
- **[MDB React UI Kit](https://mdbootstrap.com/)** — Enhanced Material UI Components
- **[React Icons](https://react-icons.github.io/react-icons/) & FontAwesome** — Vector Icon Suite
- **[React Slick](https://react-slick.neostack.com/) & Slick Carousel** — Interactive Carousels & Trending Offers

### **Backend & Services**
- **[Express.js](https://expressjs.com/)** — Node.js REST API Server
- **[JSON Server](https://github.com/typicode/json-server)** — Mock REST Database (`db.json`)
- **[Firebase Authentication](https://firebase.google.com/)** — User Auth Service
- **[EmailJS](https://www.emailjs.com/)** — Client-side Email Service for E-Tickets

---

## 📁 Project Structure

```text
my-react-app/
├── public/                 # Static assets & index.html
├── src/
│   ├── assests/            # Static media & illustrations
│   ├── component/          # Reusable UI components
│   │   ├── carousel.js     # Banner slider
│   │   ├── navbar.js       # Navigation bar
│   │   ├── Gif.js          # Loaders & animations
│   │   └── transition.js   # Page transitions
│   ├── context/            # React Context API
│   │   └── BookingContext.js # Global state (Auth, Theme, Booking state)
│   ├── images/             # Local images & logos
│   ├── App.js              # Main App entry & routing definitions
│   ├── BusList.js          # Bus search & list display page
│   ├── HomePage.js         # Landing page with hero banner & features
│   ├── LoginPage.js        # User login modal/page
│   ├── SignUpPage.js       # New user registration page
│   ├── PaymentComponent.js # Checkout & payment gateway
│   ├── Seat.js             # Seat matrix & deck selector
│   ├── booked.js           # E-Ticket summary & downloadable pass
│   ├── paysuc.js           # Payment success confirmation page
│   ├── emailService.js     # EmailJS configuration & sender logic
│   ├── firebase.js         # Firebase initialized app & auth handlers
│   ├── about.js            # About company page
│   ├── contact.js          # Customer support & contact form
│   ├── cards.js            # Trending offers & discount cards
│   └── index.js            # Application DOM mount point
├── .env.example            # Environment variable template
├── db.json                 # Mock database for buses & bookings
├── server.js               # Express JWT authentication backend
└── package.json            # NPM dependencies & operational scripts
```

---

## 🚀 Getting Started

Follow these steps to set up and run SwiftBus locally on your machine.

### Prerequisites
Make sure you have the following installed:
- **[Node.js](https://nodejs.org/)** (v16.x or higher recommended)
- **[npm](https://www.npmjs.com/)** (v8.x or higher)

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/SwiftBus.git
cd SwiftBus/my-react-app
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables
Create a `.env` file in the root directory by copying `.env.example`:
```bash
cp .env.example .env
```
*(Refer to the [Environment Configuration](#-environment-configuration) section below to fill in your API keys).*

### 4. Start the Application

To run the full setup, you will start the React Development Server and (optionally) the Mock JSON Server:

#### Option A: Start React App
```bash
npm start
```
The application will launch at **`http://localhost:3000`**.

#### Option B: Start Mock JSON Server (For Buses DB)
In a separate terminal window:
```bash
npm run json-server
```
The mock API server will start on **`http://localhost:3001`**.

---

## 🔑 Environment Configuration

Configure your credentials in the `.env` file:

```env
# =========================================================
# FIREBASE AUTHENTICATION CONFIGURATION
# Fill in real keys from your Firebase Console (Project Settings -> General)
# =========================================================
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id

# =========================================================
# EMAILJS CONFIGURATION (FOR E-TICKET EMAIL DISPATCH)
# Fill in keys from EmailJS Dashboard (https://www.emailjs.com)
# =========================================================
REACT_APP_EMAILJS_SERVICE_ID=your_emailjs_service_id
REACT_APP_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
REACT_APP_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
```

---

## 🗺 Route Map

| Path | Component | Description |
| :--- | :--- | :--- |
| `/` | `HomePage` | Hero banner, quick search widget, trending offers |
| `/buslist` | `BusList` | Filterable list of available buses and schedules |
| `/seat` | `SeatSelection` | Interactive upper/lower deck seat selector |
| `/payy` | `PaymentComponent` | Checkout with Card, UPI, or NetBanking |
| `/paysuc` | `Paysuc` | Payment status & confirmation screen |
| `/ticket` | `BusTicket` | View E-Ticket, QR code & print/download |
| `/login` | `LoginPage` | User login (Firebase / JWT) |
| `/signup` | `SignUpPage` | New user account creation |
| `/about` | `About` | Company overview & service highlights |
| `/contact` | `ContactComponent` | Customer helpdesk & query submission form |

---

## ⚡ Mock Server & Database

SwiftBus uses `db.json` with `json-server` to mock live bus endpoints.

- **Bus List Endpoint**: `http://localhost:3001/buses`
- **Bookings Endpoint**: `http://localhost:3001/bookings`
- **Users Endpoint**: `http://localhost:3001/users`

You can also run the custom Node.js/Express auth backend:
```bash
node server.js
```

---

## 🤝 Contributing

Contributions are always welcome! Follow these steps to contribute:

1. **Fork** the repository.
2. Create a new feature branch: `git checkout -b feature/AmazingFeature`.
3. Commit your changes: `git commit -m 'Add some AmazingFeature'`.
4. Push to the branch: `git push origin feature/AmazingFeature`.
5. Open a **Pull Request**.

---

## 👨‍💻 Author & Developer

<div align="center">

  <img src="public/developer.png" alt="Lingeshsathyanarayana CM" width="160" style="border-radius: 50%; border: 4px solid #6366f1; box-shadow: 0 8px 24px rgba(0,0,0,0.15);" />

  ### **Lingeshsathyanarayana CM**
  *Founder & Chief Architect — SwiftBus*

  [![LinkedIn](https://img.shields.io/badge/LinkedIn-Profile-0A66C2?style=for-the-badge&logo=linkedin)](https://linkedin.com)
  [![GitHub](https://img.shields.io/badge/GitHub-Profile-181717?style=for-the-badge&logo=github)](https://github.com)

</div>

---

## 📄 License

Distributed under the **ISC License**. See `LICENSE` for more information.

<div align="center">
  <sub>Built with ❤️ by Lingeshsathyanarayana CM & the SwiftBus Engineering Team</sub>
</div>

