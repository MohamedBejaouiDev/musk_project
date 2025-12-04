# Admin Panel

Professional admin panel for managing the perfume shop.

## Features

- **Product Management**: Add, edit, delete, and set promotions for products
- **User Management**: View all registered users and delete accounts (except admin)
- **Real-time Search**: Instant search for products and users
- **Professional UI**: Sidebar navigation, luxury gold design matching main site

## Prerequisites

- Node.js 16+
- Admin API service running on port 6060

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `.env` file:
   ```env
   VITE_ADMIN_API_URL=http://localhost:6060
   ```

3. Start the admin panel:
   ```bash
   npm run dev
   ```
   Or use the startup script:
   ```bash
   .\start-admin.ps1
   ```

## Default Credentials

- **Email**: admin@admin.com
- **Password**: 123456789

## URLs

- **Admin Panel**: http://localhost:5174
- **Admin API**: http://localhost:6060

## Project Structure

```
admin-panel/
├── public/               # Static assets
├── src/
│   ├── components/       # Reusable components
│   │   ├── Sidebar.jsx   # Navigation sidebar
│   │   └── Layout.jsx    # Page layout wrapper
│   ├── pages/           # Page components
│   │   ├── Login.jsx    # Login page
│   │   ├── Dashboard.jsx # Products management
│   │   └── Users.jsx    # Users management
│   ├── services/        # API services
│   │   └── api.js       # API client
│   ├── App.jsx          # Route configuration
│   ├── main.jsx         # App entry point
│   └── index.css        # Global styles
├── .env                 # Environment variables
├── vite.config.js       # Vite configuration
└── package.json         # Dependencies
```

## Pages

### Login (`/login`)
- Admin authentication
- Seed admin button for first-time setup
- Credential display

### Products (`/`)
- Product list table with images
- Real-time search (300ms debounce)
- Add/Edit/Delete products
- Set promotions (badge & discount)
- Stock status indicators

### Users (`/users`)
- User list with avatars
- Real-time search by name or email
- View user details (name, email, join date, role)
- Delete users (admin account protected)
- Role badges (Admin/Customer)

## Technologies

- **React 18** - UI framework
- **Vite** - Build tool
- **React Router** - Client-side routing
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **Tailwind CSS v4** - Styling (via PostCSS)
- **Montserrat Font** - Typography

## Development

- Hot reload enabled
- ESLint configured
- Error boundaries in place

## Security

- JWT authentication required for all API calls
- Admin-only routes protected by `RequireAdmin` guard
- Token stored in localStorage
- Admin email check on backend (`admin@admin.com`)

## Troubleshooting

### Port Already in Use
Run the startup script which will automatically kill conflicting processes:
```bash
.\start-admin.ps1
```

### CORS Errors
Ensure the admin API is running and allows origin `http://localhost:5174`

### Login Fails
1. Check if admin API is running on port 6060
2. Verify credentials: `admin@admin.com` / `123456789`
3. Use "Seed Admin" button on login page to create admin user

## Design

The admin panel uses the same design language as the main site:
- **Font**: Montserrat
- **Primary Color**: #AF8D64 (luxury gold)
- **Layout**: Sidebar + main content area
- **Spacing**: Consistent padding and margins
- **Animations**: Smooth transitions with Framer Motion
