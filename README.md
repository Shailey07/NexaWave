# 🌊 NexaWave
> **A Dual-Mode Hyper-Local Discovery & Service Platform bridging Rural and Urban Economies.**

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## 📌 Overview
NexaWave is a full-stack digital ecosystem designed to empower local communities. It features a unique **Dual-Mode Interface** that automatically adapts to the user's environment:
- **🌾 Rural Mode:** Focuses on agricultural trade (0% commission), machinery rentals, and live weather/farming advisories.
- **🏙️ Urban Mode:** Focuses on verified home services, professional gigs, and quick local delivery.

By eliminating middlemen and integrating inclusive features like Voice/Video requirement posting, NexaWave brings the unorganized sector into the formal digital economy securely.

---

## 🚀 Key Features
- **Dynamic Dual-UI:** Seamlessly toggle between Rural and Urban modes with distinct color schemes and service categories.
- **Smart Bidding System:** Transparent peer-to-peer bidding for services, ensuring fair pricing for both consumers and providers.
- **Inclusive Accessibility:** Users can post requirements using Text, Voice, or Video notes.
- **Zero Commission Agri-Trade:** Farmers can list and sell their crops directly to buyers without any platform cuts.
- **Real-Time Weather Advisories:** Integrated with OpenWeatherMap to provide actionable smart-farming alerts.
- **Strict Data Privacy:** Full compliance with the DPDP Act 2023, featuring automated masking of sensitive KYC documents (Aadhaar/PAN).

---

## 💻 Tech Stack
### Frontend
- React.js (Vite)
- Tailwind CSS
- React Router DOM
- Axios & React Query

### Backend
- Node.js & Express.js
- TypeScript
- Prisma ORM
- PostgreSQL (Database)
- JWT Authentication

---

## 🛠️ Local Setup & Installation

To run NexaWave locally on your machine, follow these steps:

### 1. Clone the Repository
bash
git clone [https://github.com/Shailey07/NexaWave.git](https://github.com/Shailey07/NexaWave.git)
cd NexaWave


###2. Backend Setup (Port 5000)
Bash
cd nexawave-backend
npm install
Bash
npx prisma migrate dev --name init
npm run dev


3. Frontend Setup (Port 5173)
Open a new terminal window:
Bash
cd nexawave-frontend
npm install
npm run dev
