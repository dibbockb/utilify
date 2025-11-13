# Utilify - Utility Bill Management System

**Live Site:** [https://b12a10-utility-management.web.app/home](https://b12a10-utility-management.web.app/home)

Utilify is a modern, user-friendly web application that simplifies paying utility bills — electricity, gas, water, internet, and mobile — all in one place. No queues, no hassle, just tap and pay.

---

## Features

- **One-Click Bill Payment** – Pay any utility bill in under 30 seconds.
- **Current Month Only** – Ensures accurate billing by restricting payments to the current month.
- **Secure Authentication** – Firebase-powered login via Email/Password or Google Sign-In.
- **Protected Routes** – Private access to bill details and payment using `PrivateRoute`.
- **Responsive Design** – Built with Tailwind CSS and DaisyUI for seamless experience on mobile (5 cm / 2 in screens) and desktop.
- **Interactive UI** – Hero carousel, category cards, recent bills grid, and smooth animations.
- **Real-time Data** – Fetches bills from backend at `https://b12a10-utility-management-server.vercel.app/`.

---

## Tech Stack

| Technology       | Version     | Purpose                     |
|------------------|-------------|-----------------------------|
| React            | ^19.1.1     | Frontend UI                 |
| Vite             | ^7.1.7      | Build tool & dev server     |
| Firebase         | ^12.5.0     | Auth & Hosting              |
| Tailwind CSS     | ^4.1.17     | Styling                     |
| DaisyUI          | ^5.4.7      | UI Components               |
| React Router     | ^7.9.5      | Navigation                  |
| SweetAlert2      | ^11.26.3    | Beautiful alerts            |
| Luxon            | ^3.7.2      | Date handling               |

---

## Project Structure

```
src/
├── Components/
│   ├── Bills.jsx           – List all bills with filtering
│   ├── BillDetails.jsx     – View & pay individual bill
│   ├── Home.jsx            – Hero carousel + categories + recent bills
│   ├── Login.jsx           – Email & Google login
│   ├── Register.jsx        – User registration
│   ├── MyBills.jsx         – User’s paid bills (placeholder)
│   ├── Navbar.jsx          – Responsive nav with auth state
│   ├── Footer.jsx          – Static footer
│   ├── Context.jsx         – Firebase Auth context
│   ├── PrivateRoute.jsx    – Route protection
│   └── Layout.jsx          – Shared layout
├── App.jsx                 – Router setup
├── main.jsx                – Entry point
├── index.css               – Global styles
└── App.css                 – Tailwind + custom styles
```

---

## Setup & Installation

1. **Clone the repo**
   ```bash
   git clone https://github.com/yourusername/utilify.git
   cd utilify
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run locally**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173)

4. **Build for production**
   ```bash
   npm run build
   ```

---

## Backend Requirement

The app expects a backend running at:
```
https://b12a10-utility-management-server.vercel.app/
```


---

## Deployment

Deployed using **Firebase Hosting**:

```bash
npm run build
firebase deploy
```

Current live URL: [https://b12a10-utility-management.web.app](https://b12a10-utility-management.web.app)

---

## Currency Handling

- All amounts shown in **Bangladeshi Taka (৳)** and **USD**
- Conversion: **1 USD = 125 ৳**

---

## Future Improvements

- [ ] Add payment history in `MyBills`
- [ ] PDF receipt download
- [ ] Dark mode toggle
- [ ] Push notifications for due bills
- [ ] Admin dashboard

---

## License

© 2025 Dibbo Chakraborty. All rights reserved.

> *"Pay your bills! Without headache!"* – Utilify

---
Made with ❤️ and a slight caffeine overdose.