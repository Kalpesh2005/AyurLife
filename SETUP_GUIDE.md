# AyurLife Setup Guide

Complete guide for setting up the AyurLife project from scratch.

## Table of Contents

1. [System Requirements](#system-requirements)
2. [Initial Setup](#initial-setup)
3. [Development Environment](#development-environment)
4. [Running the Application](#running-the-application)
5. [Building for Production](#building-for-production)
6. [Deployment](#deployment)
7. [Troubleshooting](#troubleshooting)

---

## System Requirements

### Minimum Requirements

- **Operating System**: Windows 10/11, macOS 10.15+, or Linux (Ubuntu 20.04+)
- **RAM**: 4 GB minimum, 8 GB recommended
- **Disk Space**: 500 MB for project files + dependencies
- **Internet Connection**: Required for initial setup

### Required Software

1. **Node.js** (v16.0.0 or higher)
   - Download: https://nodejs.org/
   - Verify: `node --version`
   - Recommended: v18.x or v20.x LTS

2. **npm** (v7.0.0 or higher) or **yarn** (v1.22.0 or higher)
   - Comes with Node.js
   - Verify: `npm --version`
   - Alternative: `yarn --version`

3. **Git** (v2.30.0 or higher)
   - Download: https://git-scm.com/
   - Verify: `git --version`

### Recommended Tools

- **VS Code**: https://code.visualstudio.com/
- **VS Code Extensions**:
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
  - TypeScript and JavaScript Language Features
  - GitLens

---

## Initial Setup

### Step 1: Clone the Repository

#### Using HTTPS:
```bash
git clone https://github.com/YOUR_USERNAME/ayurlife-health-app.git
cd ayurlife-health-app
```

#### Using SSH:
```bash
git clone git@github.com:YOUR_USERNAME/ayurlife-health-app.git
cd ayurlife-health-app
```

#### Verify Clone:
```bash
ls -la
# You should see package.json, src/, public/, etc.
```

### Step 2: Install Dependencies

#### Using npm:
```bash
npm install
```

#### Using yarn:
```bash
yarn install
```

#### Verify Installation:
```bash
npm list --depth=0
# Should show all installed packages without errors
```

### Step 3: Verify Project Structure

Ensure the following directories and files exist:

```
health-app/
├── .github/
│   ├── ISSUE_TEMPLATE/
│   └── pull_request_template.md
├── public/
│   ├── favicon.svg
│   ├── placeholder.svg
│   └── robots.txt
├── src/
│   ├── components/
│   ├── pages/
│   ├── lib/
│   ├── hooks/
│   └── main.tsx
├── .gitignore
├── CHANGELOG.md
├── CONTRIBUTING.md
├── DOCUMENTATION.md
├── LICENSE
├── README.md
├── SETUP_GUIDE.md (this file)
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.ts
```

---

## Development Environment

### VS Code Configuration

Create `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ]
}
```

Create `.vscode/extensions.json`:

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next"
  ]
}
```

### Environment Variables (Optional)

Create `.env.local` for local development:

```env
# API Configuration (when backend is ready)
VITE_API_URL=http://localhost:3000/api
VITE_APP_ENV=development

# Feature Flags
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_DEBUG=true
```

**Note**: Never commit `.env.local` to Git. It's already in `.gitignore`.

---

## Running the Application

### Development Mode

Start the development server:

```bash
npm run dev
```

**Expected Output:**
```
VITE v5.4.19  ready in 940 ms

➜  Local:   http://localhost:8080/
➜  Network: http://192.168.1.5:8080/
```

**Access the Application:**
- Open browser: http://localhost:8080
- The app will hot-reload on file changes

### Development with Custom Port

If port 8080 is in use, modify `vite.config.ts`:

```typescript
export default defineConfig({
  server: {
    host: "::",
    port: 3000, // Change to desired port
  },
  // ... rest of config
});
```

### Running Linter

Check code quality:

```bash
npm run lint
```

Fix auto-fixable issues:

```bash
npm run lint -- --fix
```

---

## Building for Production

### Create Production Build

```bash
npm run build
```

**Output:**
- Build files will be in `dist/` directory
- Optimized and minified assets
- Ready for deployment

### Preview Production Build

Test the production build locally:

```bash
npm run preview
```

Access at: http://localhost:4173

### Build Analysis

Check bundle size and composition:

```bash
npm run build -- --mode production
```

Look for:
- Total bundle size
- Chunk sizes
- Large dependencies

---

## Deployment

### Deploy to Vercel

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```

4. **Production Deployment:**
   ```bash
   vercel --prod
   ```

### Deploy to Netlify

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify:**
   ```bash
   netlify login
   ```

3. **Build the Project:**
   ```bash
   npm run build
   ```

4. **Deploy:**
   ```bash
   netlify deploy --prod --dir=dist
   ```

### Deploy to GitHub Pages

1. **Install gh-pages:**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json:**
   ```json
   {
     "homepage": "https://YOUR_USERNAME.github.io/ayurlife-health-app",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Update vite.config.ts:**
   ```typescript
   export default defineConfig({
     base: '/ayurlife-health-app/',
     // ... rest of config
   });
   ```

4. **Deploy:**
   ```bash
   npm run deploy
   ```

### Environment Variables for Production

Set these in your hosting platform:

```env
VITE_API_URL=https://api.yourdomain.com
VITE_APP_ENV=production
```

---

## Troubleshooting

### Common Issues and Solutions

#### Issue 1: Port Already in Use

**Error:**
```
Port 8080 is already in use
```

**Solutions:**

**Option A - Kill the process:**
```bash
# Windows
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:8080 | xargs kill -9
```

**Option B - Use different port:**
Modify `vite.config.ts` as shown above.

#### Issue 2: Module Not Found

**Error:**
```
Cannot find module '@/components/...'
```

**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### Issue 3: TypeScript Errors

**Error:**
```
Type errors in various files
```

**Solutions:**

1. **Restart TypeScript Server (VS Code):**
   - Press `Ctrl+Shift+P`
   - Type "TypeScript: Restart TS Server"
   - Press Enter

2. **Clear TypeScript Cache:**
   ```bash
   rm -rf node_modules/.cache
   ```

3. **Verify tsconfig.json:**
   Ensure paths are correct

#### Issue 4: Build Fails

**Error:**
```
Build failed with errors
```

**Solutions:**

1. **Check Node Version:**
   ```bash
   node --version
   # Should be v16+
   ```

2. **Clean Install:**
   ```bash
   rm -rf node_modules package-lock.json dist
   npm install
   npm run build
   ```

3. **Check for Syntax Errors:**
   ```bash
   npm run lint
   ```

#### Issue 5: Styles Not Loading

**Error:**
Tailwind classes not applying

**Solutions:**

1. **Verify tailwind.config.ts:**
   ```typescript
   content: [
     "./index.html",
     "./src/**/*.{js,ts,jsx,tsx}",
   ],
   ```

2. **Check index.css imports:**
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

3. **Restart dev server:**
   ```bash
   # Stop server (Ctrl+C)
   npm run dev
   ```

#### Issue 6: Git Issues

**Error:**
```
Permission denied (publickey)
```

**Solution:**
Use HTTPS instead of SSH, or set up SSH keys:
```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
# Add key to GitHub: Settings → SSH Keys
```

---

## Performance Tips

### Development

1. **Use Fast Refresh:**
   - Enabled by default in Vite
   - Preserves component state on hot reload

2. **Optimize Imports:**
   ```typescript
   // ❌ Don't import entire library
   import _ from 'lodash';
   
   // ✅ Import specific functions
   import { debounce } from 'lodash';
   ```

3. **Use React DevTools:**
   - Install browser extension
   - Profile component renders
   - Identify performance bottlenecks

### Production

1. **Code Splitting:**
   ```typescript
   const Dashboard = lazy(() => import('./pages/Dashboard'));
   ```

2. **Image Optimization:**
   - Use WebP format
   - Compress images
   - Lazy load images

3. **Bundle Analysis:**
   ```bash
   npm run build -- --mode production
   ```

---

## Next Steps

After successful setup:

1. ✅ Read [README.md](README.md) for project overview
2. ✅ Review [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines
3. ✅ Check [DOCUMENTATION.md](DOCUMENTATION.md) for technical details
4. ✅ Explore the codebase in `src/`
5. ✅ Run the application and test features
6. ✅ Make your first contribution!

---

## Getting Help

If you encounter issues not covered here:

1. **Check Documentation:**
   - README.md
   - DOCUMENTATION.md
   - CONTRIBUTING.md

2. **Search Issues:**
   - GitHub Issues page
   - Look for similar problems

3. **Ask for Help:**
   - Open a new issue
   - Provide detailed information
   - Include error messages and logs

4. **Contact Maintainers:**
   - Email: contact@ayurlife.com
   - GitHub: @YOUR_USERNAME

---

**Happy Coding! 🚀**
