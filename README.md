# Hi there, I'm Hoang Mai (plozdev) 👋

Welcome to my personal developer portfolio repository! I am a **Backend & Mobile Systems Engineer** studying at **FPT University Ho Chi Minh City**, focused on backend system architecture, native Android & multiplatform development, AI integrations, and high-concurrency systems.

🌐 **[View Live Official Portfolio](https://plozdev.github.io/my_portfolio/)**

---

## 🚀 About Me

- 🎓 **Education**: Software Engineering student at **FPT University Ho Chi Minh City** (Sep 2024 – Aug 2027).
- 🏆 **Achievements & Hackathons**:
  - **Top 500 (Silver Tier)** Nationwide — **AI Riser Vietnam 2026** (*Anti-Scam & Inclusive Access tracks* organized by Google Developer Groups & Google) with **AnTâm.AI**.
  - **Top 59** — **2025 ICPC Asia Ho Chi Minh City Regional Contest**.
  - **Top 18** — **2025 ICPC Vietnam Southern Provincial Programming Contest**.
  - **Top 3 Finalist** — **FPTU AI Innovation Hackathon Summer 2025** (*Team Softelligence*).
  - **FPT University Talent Scholarship** (70% award for academic excellence).
- 👥 **Community Leadership**:
  - **Southern Regional Lead** — **GDGoC Hackathon Vietnam 2026** (*Feb 2026 – May 2026*): Co-organized a nationwide hackathon engaging 300+ teams; led southern-region operations and partner coordination.
  - **Chapter Lead** — **Google Developer Groups on Campus (GDGoC) at FPTU HCMC**: Led a 50+ member developer community and organized technical workshops; chapter ranked #1 nationwide among GDGoC communities in AI Riser Vietnam 2026.
- 💻 **Core Focus**: Architecting high-concurrency backend services, rolling cryptographic credential systems, accessible Android apps with Jetpack Compose & Gemini AI, and multiplatform software engineering.

---

## 🛠️ Core Tech Stack

<table>
  <tr>
    <td valign="top" width="33%">
      <strong>Backend &amp; Systems</strong><br>
      - ☕ Java 21, Spring Boot 3.4<br>
      - 🛡️ Spring Security, Spring Modulith<br>
      - 🐘 PostgreSQL (Supabase / Docker)<br>
      - 📡 Server-Sent Events (SSE)<br>
      - ⚙️ C++ / NDK native cryptographic routines<br>
      - 🐳 Docker, Docker Compose
    </td>
    <td valign="top" width="33%">
      <strong>Android &amp; Multiplatform</strong><br>
      - 📱 Kotlin, Android SDK<br>
      - 🎨 Jetpack Compose, Material 3<br>
      - 🌐 Compose Multiplatform (KMP)<br>
      - 🔄 Coroutines &amp; Flow<br>
      - 💾 Room DB, WorkManager, Retrofit<br>
      - 🔊 Text-to-Speech (TTS), Haptic Engine
    </td>
    <td valign="top" width="33%">
      <strong>AI &amp; Web Frontend</strong><br>
      - 🤖 Google Gemini AI (Multimodal API)<br>
      - ⚛️ React 19, TypeScript, Vite<br>
      - 💨 Tailwind CSS v4, Framer Motion<br>
      - 🕸️ Three.js (3D Interactive Visuals)<br>
      - 🎯 Custom Spring-Physics Cursor<br>
      - 🧰 Git, GitHub Actions, Linux
    </td>
  </tr>
</table>

---

## ⚡ Featured Projects

### 1. [CyberPass – Dynamic QR Ticketing & Access Control System](https://github.com/plozdev/dynamic-qr-ticketing)
*Secure event ticketing platform with rotating dynamic QR codes and real-time gate check-in synchronization.*
- **Problem Solved**: Anti-counterfeiting, screenshot reuse, and replay attack prevention for high-turnout event ticketing.
- **Key Solutions**:
  - **30s Rotating Dynamic QR**: Native **C++/NDK** TOTP cryptographic engine with HMAC fallback to generate rolling on-device tokens.
  - **Instant Invalidation & Replay Defense**: Spring Boot backend validates tokens against time-windows and immediately revokes checked-in tickets.
  - **Live State Sync**: Real-time push notifications from physical gate scanners to attendee mobile wallets via **Server-Sent Events (SSE)**.
  - **Full-Stack Ecosystem**: React 19 event discovery & management portal + native Android ticket wallet.
- **Tech Stack**: Java 21, Spring Boot 3.4 (Spring Modulith), C++ (NDK), Kotlin, Jetpack Compose, SSE, React 19, PostgreSQL, Docker.
- **Links**: 💻 [GitHub Repository](https://github.com/plozdev/dynamic-qr-ticketing) | 🎥 [YouTube Video Demo](https://www.youtube.com/watch?v=FQS_ODJHf4s)

---

### 2. [AnTâm.AI – Proactive Anti-Scam Android Assistant](https://github.com/plozdev/AnTamAI)
*AI-assisted mobile security application protecting users against fraudulent banking receipts, fake links, and phishing SMS.*
- **Honors**: **Top 500 (Silver Tier) Nationwide** at **AI Riser Vietnam 2026** (Anti-Scam & Inclusive Access tracks).
- **Key Solutions**:
  - **Multimodal AI Threat Analysis**: Powered by **Google Gemini API** to dissect suspicious message texts, phishing URLs, and fraudulent payment confirmation screenshots.
  - **Two-Stage SMS Screening**: Battery-efficient background heuristics via **SMS BroadcastReceiver** and **WorkManager**, escalating suspicious messages for cloud AI verification only when warranted.
  - **Senior-Friendly Accessibility**: High-contrast typography, large touch targets with Material 3, and integrated native Vietnamese **Text-to-Speech (TTS)** guidance.
  - **Receipt Balance Reminder**: Actively guides users to verify actual banking balances rather than relying solely on transfer images.
- **Tech Stack**: Kotlin, Jetpack Compose, Material 3, Google Gemini API, Room DB, WorkManager, Retrofit, Coroutines/Flow, TTS.
- **Links**: 💻 [GitHub Repository](https://github.com/plozdev/AnTamAI) | 🎥 [YouTube Video Demo](https://youtu.be/AnYKgnJpMAI)

---

### 3. [SwipeGallery – Tinder-Style Gesture Photo Cleanup](https://github.com/plozdev/SwipeGallery)
*High-performance, gesture-driven photo triage & gallery management mobile app built with Compose Multiplatform.*
- **Key Solutions**:
  - **60fps Card Drag Gestures**: Directional tilt rotation with spring-physics fly-in undo animations to restore photos smoothly.
  - **Safe Staging Queue**: Staged deleted photos into a protected review batch with confirmation dialogs to prevent accidental loss.
  - **Hardware Haptic Feedback**: Cross-platform vibration feedback on swipe triggers and toggle actions.
  - **100% Offline & Privacy-First**: Zero network permissions required; direct integration with native Android MediaStore & iOS Photos.
- **Tech Stack**: Kotlin, Compose Multiplatform, Jetpack Compose, Material 3, Coroutines & Flow, Android SDK, Haptic Engine, Coil.
- **Links**: 💻 [GitHub Repository](https://github.com/plozdev/SwipeGallery) | 📦 [Download APK Release](https://github.com/plozdev/SwipeGallery/releases/latest)

---

### 4. [Developer Portfolio](https://github.com/plozdev/my_portfolio)
*Cyber-themed personal engineering portfolio featuring interactive 3D terminal mockups, multi-format media showcase, and responsive layouts.*
- **Tech Stack**: React 19, TypeScript, Vite, Tailwind CSS v4, Framer Motion, Three.js.
- **Links**: 🌐 [Live Demo](https://plozdev.github.io/my_portfolio/) | 💻 [GitHub Repository](https://github.com/plozdev/my_portfolio)

---

## 🎨 Portfolio Architecture & UI Highlights

- **Unified Media Showcase**: Embedded responsive YouTube demo player (1080p 60fps) + interactive scene walkthrough with dynamic device switching (Smartphone Mockup for Android apps & macOS Browser Window for Web dashboards).
- **Consistent Tech Stack System**: Vector SVG icons and semantic badge pills for 100% uniform visual presentation across all modal specifications.
- **3D Terminal HUD**: Volumetric sci-fi terminal playground with holographic mouse glare and dynamic tilt physics.
- **Interactive Trailing Cursor**: 60fps spring-physics trailing cursor with dynamic hover target expansion.

---

## 📬 Connect With Me

- 🌐 **Portfolio Website**: [plozdev.github.io/my_portfolio](https://plozdev.github.io/my_portfolio/)
- 📧 **Email**: [hoangmai.it.dev@gmail.com](mailto:hoangmai.it.dev@gmail.com)
- 💼 **LinkedIn**: [Hoang Mai](https://www.linkedin.com/in/hoangmai-it/)
- 🐙 **GitHub**: [github.com/plozdev](https://github.com/plozdev)

---

<details>
<summary>🛠️ <strong>Local Development Setup</strong></summary>

### 1. Installation
```bash
npm install
```

### 2. Configuration (.env)
Create a `.env` file in the root directory:
```env
VITE_RESEND_API_KEY=your_resend_api_key
VITE_RESEND_FROM=onboarding@resend.dev
VITE_RESEND_TO=hoangmai.it.dev@gmail.com
```

### 3. Local Dev Server
```bash
npm run dev
```

### 4. Build for Production
```bash
npm run build
```
</details>
