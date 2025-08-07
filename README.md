# 🩺 Aushadhi Mitra

**Aushadhi Mitra** is a government-style medical portal built using **Next.js** and **MongoDB**, designed to help citizens easily access affordable medicines, locate nearby Jan Aushadhi stores, and explore government health schemes. It empowers users with essential tools like medicine search, symptom checker, facility locator, and purchase confirmation via email.


---

## 📌 Features

- 🔍 **Medicine Search** – Search by name or disease to get pricing, usage, and alternatives.
- 🛒 **Purchase Confirmation** – Submit name, address, and email to receive order confirmation via email.
- 📍 **Nearby Locator** – Locate Jan Aushadhi stores, clinics, hospitals using Overpass API & Nominatim.
- 📑 **Government Scheme Tracker** – Explore health schemes by category (e.g., Women, Seniors).
- 🧠 **AI-Powered Symptom Checker** – Get condition suggestions based on symptom input using AI.
- 🔐 **User Authentication** – Secure login & registration with protected routes.
- 📱 **Responsive Design** – Mobile-friendly and clean UI with Tailwind CSS.

---

## 🖼️ Screenshots



![Homepage](./public/screenshots/homepage.PNG)
![Medicine Search](./public/screenshots/Medicine-search.PNG)
![Schemes](./public/screenshots/Schemes.PNG)
![Symptom Checker](./public/screenshots/symptom-checker.PNG)
![Profile](./public/screenshots/Profile.PNG)

---

## 🛠️ Tech Stack

- **Frontend**: Next.js (App Router), TypeScript, Tailwind CSS
- **Backend**: Node.js, API Routes, MongoDB
- **Email**: Nodemailer (Gmail SMTP)
- **Geo APIs**: OpenStreetMap + Overpass API + Nominatim
- **AI**: Gemini or AI71 for symptom checking

---


---

## 🧪 Installation

```bash
# Clone the repo
git clone https://github.com/your-username/aushadhi-mitra.git

# Navigate into the project
cd aushadhi-mitra

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env

# Run the development server
npm run dev
```

---

## 🔐 .env Configuration

Rename `.env.example` to `.env` and update values:

```env
MONGODB_URI=mongodb+srv://your_user:password@cluster.mongodb.net/aushadhi
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password

```
> ⚠️ Use Gmail App Passwords if using Gmail for Nodemailer.


---

## 🌐 Acknowledgments

- [Jan Aushadhi Scheme](https://janaushadhi.gov.in/)
- [OpenStreetMap](https://www.openstreetmap.org/)
- [Gemini AI / AI71](https://ai.google.dev/)
- [Next.js Documentation](https://nextjs.org/)
- [MongoDB Atlas](https://www.mongodb.com/atlas)

---

> 🔗 **Built with ❤️ for public health and affordable access to medicine.**
