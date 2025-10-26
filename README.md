# AyurLife - Ayurvedic Wellness Platform

![AyurLife Banner](https://img.shields.io/badge/AyurLife-Wellness%20Platform-10b981?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.3.1-61dafb?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178c6?style=flat-square&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.4.19-646cff?style=flat-square&logo=vite)
![License](https://img.shields.io/badge/License-Proprietary-red?style=flat-square)

## 📋 Table of Contents

- [Project Title](#project-title)
- [Description](#description)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation Steps](#installation-steps)
- [How to Run the Project](#how-to-run-the-project)
- [Project Structure](#project-structure)
- [Usage Guide](#usage-guide)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Troubleshooting](#troubleshooting)
- [License](#license)
- [Contact](#contact)

---

## 🏥 Project Title

**AyurLife - Ayurvedic Wellness Platform**

A comprehensive web application for personalized Ayurvedic health and wellness guidance.

---

## 📖 Description

AyurLife is a modern, full-featured web application designed to bring ancient Ayurvedic wisdom into the digital age. The platform helps users discover their unique Prakriti (Ayurvedic constitution) through a comprehensive assessment and provides personalized diet, lifestyle, and wellness recommendations based on their dosha composition (Vata, Pitta, Kapha).

### What is Prakriti?

Prakriti is your unique mind-body constitution determined at conception. Understanding your Prakriti helps you make informed decisions about diet, lifestyle, and health practices that align with your natural tendencies.

### Key Highlights

- 🧘 **Personalized Assessment**: Detailed questionnaire analyzing physical, mental, and behavioral characteristics
- 🥗 **Custom Recommendations**: Tailored diet plans, lifestyle suggestions, and wellness tips
- 📊 **User Dashboard**: Track your wellness journey and view detailed dosha analysis
- 👨‍⚕️ **Admin Panel**: Comprehensive user management and analytics (for administrators)
- 📱 **Responsive Design**: Seamless experience across desktop, tablet, and mobile devices
- 🎨 **Modern UI/UX**: Beautiful, intuitive interface built with modern design principles

---

## ✨ Features

### For Users

- **Prakriti Assessment Questionnaire**
  - 30+ comprehensive questions covering physical, mental, and behavioral traits
  - Real-time progress tracking
  - Instant results calculation

- **Personalized Dashboard**
  - Visual dosha composition chart
  - Detailed Prakriti analysis
  - Historical assessment tracking

- **Custom Recommendations**
  - Personalized diet plans based on your dosha
  - Lifestyle and daily routine suggestions
  - Seasonal wellness tips
  - Exercise and yoga recommendations

- **User Profile Management**
  - Secure authentication system
  - Profile customization
  - Assessment history

### For Administrators

- **User Management**
  - View all registered users
  - Monitor user activity
  - Access user assessment data

- **Analytics Dashboard**
  - User statistics and trends
  - Popular dosha distributions
  - Platform usage metrics

---

## 🛠️ Technologies Used

This project leverages modern web development technologies and best practices:

### Frontend Framework
- **React 18.3.1** - Modern UI library with hooks and functional components
- **TypeScript 5.8.3** - Type-safe JavaScript for better code quality
- **Vite 5.4.19** - Lightning-fast build tool and dev server

### UI/UX Libraries
- **shadcn/ui** - High-quality, accessible React components
- **Radix UI** - Unstyled, accessible component primitives
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **Lucide React** - Beautiful, consistent icon set

### State Management & Forms
- **React Hook Form 7.61.1** - Performant form validation
- **Zod 3.25.76** - TypeScript-first schema validation
- **TanStack Query 5.83.0** - Powerful data synchronization

### Routing & Navigation
- **React Router DOM 6.30.1** - Declarative routing for React

### Additional Libraries
- **date-fns** - Modern date utility library
- **Recharts** - Composable charting library
- **Sonner** - Toast notifications
- **next-themes** - Theme management (dark/light mode)

### Development Tools
- **ESLint** - Code linting and quality checks
- **PostCSS** - CSS transformations
- **Autoprefixer** - Automatic vendor prefixing

---

## 📥 Installation Steps

Follow these steps to set up the project on your local machine:

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16.0.0 or higher) - [Download here](https://nodejs.org/)
- **npm** (v7.0.0 or higher) or **yarn** (v1.22.0 or higher)
- **Git** - [Download here](https://git-scm.com/)

To verify your installations, run:

```bash
node --version
npm --version
git --version
```

### Step-by-Step Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/YOUR_USERNAME/ayurlife-health-app.git
   cd ayurlife-health-app
   ```

   Or if using SSH:

   ```bash
   git clone git@github.com:YOUR_USERNAME/ayurlife-health-app.git
   cd ayurlife-health-app
   ```

2. **Install Dependencies**

   Using npm:
   ```bash
   npm install
   ```

   Or using yarn:
   ```bash
   yarn install
   ```

   This will install all required dependencies listed in `package.json`.

3. **Verify Installation**

   Check if all dependencies are installed correctly:
   ```bash
   npm list --depth=0
   ```

---

## 🚀 How to Run the Project

### Development Mode

Start the development server with hot module replacement (HMR):

```bash
npm run dev
```

The application will be available at:
- **Local**: `http://localhost:8080`
- **Network**: `http://YOUR_IP:8080` (accessible from other devices on your network)

You should see output similar to:
```
VITE v5.4.19  ready in 940 ms

➜  Local:   http://localhost:8080/
➜  Network: http://192.168.1.5:8080/
```

### Production Build

Build the application for production:

```bash
npm run build
```

This creates an optimized production build in the `dist` directory.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

### Linting

Run ESLint to check code quality:

```bash
npm run lint
```

### Available Scripts Summary

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Create production build |
| `npm run build:dev` | Create development build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint for code quality checks |

---

## 📁 Project Structure

```
health-app/
├── public/                      # Static assets
│   ├── favicon.svg             # Application favicon
│   ├── placeholder.svg         # Placeholder images
│   └── robots.txt              # SEO robots file
│
├── src/                        # Source code
│   ├── components/             # Reusable React components
│   │   ├── ui/                # shadcn/ui components
│   │   └── Navbar.tsx         # Navigation component
│   │
│   ├── pages/                 # Page components (routes)
│   │   ├── Landing.tsx        # Landing/home page
│   │   ├── Login.tsx          # User login page
│   │   ├── Register.tsx       # User registration page
│   │   ├── Questionnaire.tsx  # Prakriti assessment
│   │   ├── Results.tsx        # Assessment results
│   │   ├── Dashboard.tsx      # User dashboard
│   │   ├── Admin.tsx          # Admin panel
│   │   ├── Index.tsx          # Main index page
│   │   └── NotFound.tsx       # 404 error page
│   │
│   ├── lib/                   # Utility functions and helpers
│   │   ├── utils.ts           # General utilities
│   │   ├── prakriti.ts        # Prakriti calculation logic
│   │   └── auth.ts            # Authentication helpers
│   │
│   ├── hooks/                 # Custom React hooks
│   │   ├── use-toast.ts       # Toast notification hook
│   │   └── use-mobile.tsx     # Mobile detection hook
│   │
│   ├── App.tsx                # Main App component
│   ├── App.css                # App-specific styles
│   ├── main.tsx               # Application entry point
│   ├── index.css              # Global styles
│   └── vite-env.d.ts          # Vite type definitions
│
├── index.html                  # HTML entry point
├── package.json                # Project dependencies and scripts
├── package-lock.json           # Locked dependency versions
├── tsconfig.json               # TypeScript configuration
├── tsconfig.app.json           # App-specific TS config
├── tsconfig.node.json          # Node-specific TS config
├── vite.config.ts              # Vite configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── postcss.config.js           # PostCSS configuration
├── eslint.config.js            # ESLint configuration
├── components.json             # shadcn/ui configuration
├── .gitignore                  # Git ignore rules
└── README.md                   # Project documentation (this file)
```

---

## 📘 Usage Guide

### For New Users

1. **Access the Application**
   - Open your browser and navigate to `http://localhost:8080`

2. **Register an Account**
   - Click on "Register" or "Get Started"
   - Fill in your details (name, email, password)
   - Submit the registration form

3. **Take the Prakriti Assessment**
   - Navigate to the Questionnaire page
   - Answer all questions honestly based on your natural tendencies
   - Questions cover physical characteristics, mental traits, and behavioral patterns
   - Submit your responses

4. **View Your Results**
   - See your dosha composition (Vata, Pitta, Kapha percentages)
   - Read detailed descriptions of your dominant dosha(s)
   - Access personalized recommendations

5. **Explore Your Dashboard**
   - View your complete Prakriti profile
   - Access diet and lifestyle recommendations
   - Track your wellness journey

### For Administrators

1. **Admin Login**
   - Use admin credentials to access the admin panel
   - Navigate to `/admin` route

2. **User Management**
   - View all registered users
   - Monitor user activity and assessments
   - Access user statistics

3. **Analytics**
   - View platform usage metrics
   - Analyze dosha distribution trends
   - Generate reports

---

## 🔌 API Documentation

### Authentication Endpoints

Currently, the application uses local storage for authentication. In production, integrate with a backend API:

```typescript
// Example API structure (to be implemented)
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me
```

### Assessment Endpoints

```typescript
// Example API structure (to be implemented)
POST /api/assessment/submit
GET  /api/assessment/results/:id
GET  /api/assessment/history
```

### User Endpoints

```typescript
// Example API structure (to be implemented)
GET  /api/users/profile
PUT  /api/users/profile
GET  /api/users/recommendations


### Environment Variables

For production deployment, set up the following environment variables:

```env
VITE_API_URL=your_api_url
VITE_APP_ENV=production
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. **Fork the Repository**
2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit Your Changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the Branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Code Style Guidelines

- Follow TypeScript best practices
- Use functional components with hooks
- Maintain consistent naming conventions
- Write meaningful commit messages
- Add comments for complex logic
- Ensure all tests pass before submitting

---

## 🐛 Troubleshooting

### Common Issues

**Issue: Port 8080 is already in use**
```bash
# Solution: Kill the process or use a different port
npx kill-port 8080
# Or modify vite.config.ts to use a different port
```

**Issue: Module not found errors**
```bash
# Solution: Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Issue: TypeScript errors**
```bash
# Solution: Restart TypeScript server
# In VS Code: Ctrl+Shift+P -> "TypeScript: Restart TS Server"
```

**Issue: Build fails**
```bash
# Solution: Check Node.js version and clean install
node --version  # Should be v16+
npm ci
npm run build
```

### Getting Help

If you encounter issues:
1. Check the [Issues](https://github.com/Kalpesh2005/ayurlife-health-app/issues) page
2. Search for similar problems
3. Create a new issue with detailed information

---

## 📄 License

This project is **proprietary and confidential**. All rights reserved.

Unauthorized copying, modification, distribution, or use of this software, via any medium, is strictly prohibited without explicit permission from the project owner.

---

## 📧 Contact

**Project Maintainer**: AyurLife Development Team

- **Email**: contact@ayurlife.com
- **GitHub**: [Kalpesh2005](https://github.com/Kalpesh2005)
- **Project Link**: [https://github.com/Kalpesh2005/ayurlife-health-app](https://github.com/Kalpesh2005/ayurlife-health-app)

---

## 🙏 Acknowledgments

- **Ayurvedic Wisdom**: Based on ancient Ayurvedic texts and principles
- **shadcn/ui**: For the beautiful component library
- **React Community**: For the amazing ecosystem
- **Open Source Contributors**: For the tools and libraries used in this project

---

<div align="center">

**Made with ❤️ for holistic wellness**

⭐ Star this repository if you find it helpful!

</div>
