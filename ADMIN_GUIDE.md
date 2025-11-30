# Admin System - Quick Start Guide

## 🚀 Quick Start (Recommended)

Run the master startup script to start both API and Panel:

```powershell
.\start-admin-system.ps1
```

This will:
1. Clean up any processes on ports 6060, 5174, 5175
2. Check environment files
3. Start Admin API on port 6060
4. Start Admin Panel on port 5174
5. Display access information

## 🔧 Manual Start

### Option 1: Individual Scripts

**Start Admin API:**
```powershell
cd product-crud-service
.\start-api.ps1
```

**Start Admin Panel (in new terminal):**
```powershell
cd admin-panel
.\start-admin.ps1
```

### Option 2: NPM Commands

**Admin API:**
```powershell
cd product-crud-service
npm run dev
```

**Admin Panel:**
```powershell
cd admin-panel
npm run dev
```

## 📋 Access Information

- **Admin Panel**: http://localhost:5174
- **Admin API**: http://localhost:6060
- **Default Credentials**: 
  - Email: `admin@admin.com`
  - Password: `123456789`

## 📁 Project Structure

```
perfume-shop/
├── admin-panel/              # React admin UI
│   ├── src/
│   │   ├── components/       # Sidebar, Layout
│   │   ├── pages/           # Login, Dashboard, Users
│   │   └── services/        # API client
│   ├── .env                 # VITE_ADMIN_API_URL=http://localhost:6060
│   ├── start-admin.ps1      # Startup script
│   └── README.md            # Detailed docs
│
├── product-crud-service/     # Express API
│   ├── controllers/         # Auth, Products, Users
│   ├── routes/             # API routes
│   ├── middleware/         # Auth, Validation
│   ├── .env                # Supabase, JWT config
│   └── start-api.ps1       # Startup script
│
└── start-admin-system.ps1   # Master startup script
```

## 🎯 Features

### Admin Panel (`admin-panel/`)
- **Products Management**: Add, edit, delete, set promotions
- **Users Management**: View users, delete accounts (admin protected)
- **Real-time Search**: Instant product/user filtering
- **Sidebar Navigation**: Easy switching between pages
- **Luxury Design**: Montserrat font, gold accents (#AF8D64)

### Admin API (`product-crud-service/`)
- **Authentication**: JWT with role-based access
- **Product CRUD**: Full product lifecycle management
- **User Management**: View and delete users
- **Security**: Joi validation, rate limiting, CORS
- **Database**: Supabase PostgreSQL

## 🔒 Security

- Admin-only endpoints protected by middleware
- JWT authentication required
- Admin role checked by email (`admin@admin.com`)
- CORS configured for localhost:5173, 5174, 5175
- Password hashing with bcryptjs
- Input validation with Joi

## 🛠️ Troubleshooting

### Port Already in Use
The startup scripts automatically handle port conflicts. Just run:
```powershell
.\start-admin-system.ps1
```

### CORS Errors
1. Check both services are running
2. Verify admin panel URL matches CORS config
3. Clear browser cache and retry

### Login Fails
1. Click "Seed Admin" button on login page
2. Or manually register via API:
   ```bash
   curl -X POST http://localhost:6060/auth/register \
     -H "Content-Type: application/json" \
     -d '{"firstName":"Admin","lastName":"User","email":"admin@admin.com","password":"123456789"}'
   ```

### API Not Starting
Check `.env` file exists in `product-crud-service/` with:
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `JWT_SECRET`

## 📦 Dependencies

**Admin Panel:**
- React 18, Vite, React Router
- Framer Motion, Lucide React
- Tailwind CSS v4

**Admin API:**
- Express, Supabase, JWT
- bcryptjs, Joi, CORS
- express-rate-limit

## 🔄 Development Workflow

1. **Start System**: `.\start-admin-system.ps1`
2. **Make Changes**: Edit files in `admin-panel/src/` or `product-crud-service/`
3. **Hot Reload**: Both services auto-reload on changes
4. **Test**: Login and verify features work
5. **Stop**: Press `Ctrl+C` in terminal

## 📚 Documentation

- **Admin Panel**: See `admin-panel/README.md`
- **Admin API**: See `product-crud-service/README.md` (if exists)
- **Main App**: See root `README.md`

## 🎨 Design Guidelines

- Use Montserrat font throughout
- Primary color: #AF8D64 (luxury gold)
- Maintain consistent spacing (px-6, py-4)
- Use Lucide icons for all UI elements
- Follow Tailwind utility-first approach

## 🚦 Status Indicators

- **Green badges**: Active/Available (e.g., in stock, admin)
- **Red badges**: Inactive/Unavailable (e.g., out of stock)
- **Yellow badges**: Promotions/Special (e.g., badges)
- **Blue badges**: Standard status (e.g., customer role)
- **Purple badges**: Premium status (e.g., admin role)
