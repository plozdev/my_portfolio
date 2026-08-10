# Plozdev Developer Portfolio 🚀

A high-performance, developer-focused interactive portfolio website showcasing professional experience, software engineering projects, and system design skills. Built with modern web standards, terminal aesthetics, and smooth micro-animations.

---

## 🛠️ Tech Stack & Architecture

- **Frontend**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) + [Vite](https://vite.dev/) (extremely fast Hot Module Replacement)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (modern responsive utility styling)
- **3D Background Canvas**: [Three.js](https://threejs.org/) (Interactive node network nodes rendering on the Hero section)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) (smooth fade-ins, dialog scaling, and page transitions)
- **Email Service Integration**: [Resend API](https://resend.com/) (securely routed via Vite reverse proxy server config)
- **Code Linter**: [Oxlint](https://oxc.rs/) (high-performance JavaScript/TypeScript linter)

---

## ✨ Features

- **`>_` Terminal Style Section Headers**: Unified visual language across all sections.
- **Interactive Hero**: Clean layout highlighting software engineering credentials alongside a 3D system network visualizer.
- **Scannable Experience Timeline**: Concise descriptions, location metadata, and technology badges for education and internships.
- **Refactored Projects Section**:
  - **Scrolling Previews**: Vertical screenshots auto-scroll dynamically inside cards on hover.
  - **SlideShow Detail Modal**: Seamless image slider with full-screen lightbox zoom mode.
  - **Tech Skills Dock**: Flexbox-based tech emblems displaying full-color brand logos.
- **Secure Contact Form**: Integrated with Resend API using local proxy rewrites to prevent browser CORS blockages and secure API key variables.

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed (v18+ recommended).

### 2. Installation
Clone the repository and install the dependencies:
```bash
npm install
```

### 3. Environment Variables Setup
Create a `.env` file in the root directory:
```env
# Resend API Secret Key
VITE_RESEND_API_KEY=re_your_api_key_here

# Resend verified sender email address (e.g. onboarding@resend.dev during testing)
VITE_RESEND_FROM=onboarding@resend.dev

# The email address that will receive contact form submissions
VITE_RESEND_TO=your_receiving_email@gmail.com
```

### 4. Running Locally
Start the development server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

### 5. Production Build
Generate optimized production bundles:
```bash
npm run build
```
The build artifacts will be output to the `/dist` directory.
