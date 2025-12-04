# MUSK.MH - Project Setup Guide

## 📁 New Project Structure

Your project is now organized into clear sections:

```
perfume-shop/
├── frontends/          # All React applications
│   ├── main/          # Main website
│   └── admin/         # Admin panel
├── backends/          # All backend servers
│   └── api/           # Express.js API
├── .github/           # GitHub configs
└── README.md          # Documentation
```

## 🚀 Quick Start (3 Steps)

### Step 1: Install Dependencies
```bash
cd frontends/main && npm install && cd ../..
cd frontends/admin && npm install && cd ../..
cd backends/api && npm install && cd ../..
```

### Step 2: Configure Environment
Create `.env` files:
- `backends/api/.env` - See README.md for details
- `frontends/admin/.env` - See README.md for details

### Step 3: Start Servers
Option A - Start all at once:
```bash
.\start-all.ps1
```

Option B - Start individually in 3 terminals:
```bash
# Terminal 1
cd frontends/main
npm run dev

# Terminal 2
cd frontends/admin
npm run dev

# Terminal 3
cd backends/api
npm run dev
```

## 📍 Access Points
- **Main Website**: http://localhost:5173
- **Admin Panel**: http://localhost:5174
- **Backend API**: http://localhost:6060

## 🛠 Common Tasks

### Build for Production
```bash
# Main website
cd frontends/main && npm run build

# Admin panel
cd frontends/admin && npm run build

# Backend (deploy to hosting platform)
cd backends/api
```

### Install New Package in Main Website
```bash
cd frontends/main
npm install package-name
```

### Install New Package in Admin Panel
```bash
cd frontends/admin
npm install package-name
```

### Install New Package in Backend
```bash
cd backends/api
npm install package-name
```

## 📚 File Locations

| What | Where |
|------|-------|
| Main website code | `frontends/main/src/` |
| Main website config | `frontends/main/vite.config.js` |
| Admin panel code | `frontends/admin/src/` |
| Admin panel config | `frontends/admin/vite.config.js` |
| Backend code | `backends/api/` |
| Backend routes | `backends/api/routes/` |
| Database schemas | `backends/api/database/` |

## 💡 Tips

- All three servers run on different ports (5173, 5174, 6060)
- You need all three running for the app to work fully
- Use `start-all.ps1` for easy multi-terminal startup
- Check the main `README.md` for more details

## ❓ Need Help?

Refer to individual README files:
- `frontends/main/` - Main website info
- `frontends/admin/` - Admin panel info
- `backends/api/` - Backend API info
- `.github/copilot-instructions.md` - Development guidelines
