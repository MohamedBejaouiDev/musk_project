# MUSK.MH - Luxury Perfume E-Commerce Platform

A modern, fully-featured e-commerce web application for luxury perfumes built with React 18, Vite, and Tailwind CSS v4.


---

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Quick Start](#-quick-start)
- [Technologies & Architecture](#-technologies--architecture)
- [Project Structure](#-project-structure)
- [State Management](#-state-management)
- [Data Management](#-data-management)
- [Design System](#-design-system)
- [Evaluation Criteria](#-evaluation-criteria)

---

## 🎯 Project Overview

This project is a **Front-End E-Commerce Challenge** developed over three weeks to demonstrate proficiency in modern web development using React. The application provides a complete shopping experience for luxury perfumes, including product browsing, advanced filtering, cart management, user authentication, and checkout simulation.
---

## 🚀 Quick Start

### Prerequisites
- Node.js v16 or higher
- npm or yarn

### Installation & Launch

```bash
# 1. Clone the repository
git clone https://github.com/MohamedBejaouiDev/musk_project.git
cd perfume-shop

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open browser at http://localhost:5173
```

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🛠 Technologies & Architecture

### Core Technologies

#### Framework & Build Tools
- **React 18** - Modern UI library with hooks and concurrent features
- **Vite** - Next-generation frontend build tool with lightning-fast HMR
- **React Router DOM v6** - Declarative client-side routing

#### Styling & UI
- **Tailwind CSS v4** - Utility-first CSS framework with custom configuration
- **Framer Motion** - Production-ready animation library for smooth transitions
- **Lucide React** - Beautiful, consistent icon library

#### State Management
- **React Context API** - Global state management for shopping cart
- **Custom Hooks** - Reusable logic (useCart)

#### Data Persistence
- **localStorage** - Client-side storage for cart and authentication

### Why These Technologies?

**React 18**: Chosen for its component-based architecture, hooks system, and excellent performance with concurrent rendering.

**Vite**: Selected over Create React App for its instant server start, lightning-fast HMR, and optimized production builds.

**Tailwind CSS v4**: Provides rapid UI development with utility classes while maintaining consistency and reducing CSS bundle size.

**Context API**: Perfect for this scale - simpler than Redux, no external dependencies, built-in React feature.

**Framer Motion**: Industry-standard animation library that provides smooth, performant animations with minimal code.

**localStorage**: Ideal for front-end only projects - no backend required, data persists across sessions, simple API.

---

## ✨ Features Implementation

### 1. Home Page ✅ 

**Hero Section**
- Animated hero banner with gradient background
- Call-to-action button with hover effects
- Responsive typography and layout

**Carousel/Slider**
- Auto-rotating promotional slides (3 slides)
- Manual navigation with arrow buttons
- Dot indicators for slide position
- Smooth transitions with Framer Motion
- Auto-play with 5-second intervals


**Featured Products**
- Multiple product sections (Featured Collection, Best Sellers, New Arrivals)
- 8+ products per section
- Responsive grid layout (1-4 columns based on screen size)
- Product cards with images, ratings, prices, and badges

**Brand Bar**
- Animated brand logo carousel
- luxury brand logos (Chanel, Dior, Gucci, etc.)
- Infinite scroll animation in opposite directions
- Hover effects with scale and opacity

**Navigation**
- Sticky header with smooth scroll
- Hash-based navigation for sections
- Mobile-responsive hamburger menu

### 2. Product Catalog ✅ 

**Product Display**
- 20 luxury perfumes with real data
- Responsive grid: 1 column (mobile) → 2 columns (tablet) → 3 columns (desktop)
- Each card displays:
  - High-quality product image
  - Brand name 
  - Product title 
  - Star rating 
  - Price (with discount if applicable)
  - Stock status
  - Promotional badges 
  - Discount percentage 
  - Add to Cart button

**Advanced Filtering System**
- **Search**: Real-time search by product name or brand
- **Category Filter**: Radio buttons for 6 categories + "All"
- **Price Range**: Slider from $0 to $500 with live preview
- **Rating Filter**: Range-based (All, 4-5★, 3-4★, 2-3★)
- Filters work in combination
- Results update instantly

**Sorting Options**
- Featured (default)
- Price: Low to High
- Price: High to Low
- Highest Rated

**Pagination**
- 12 products per page
- Previous/Next buttons
- Numbered page buttons
- Disabled states for edge cases
- Resets to page 1 when filters change

**Responsive Design**
- Sidebar filters: Full width on mobile, fixed sidebar on desktop
- Grid adjusts: 1 → 2 → 3 columns
- Text sizes scale appropriately
- Touch-friendly buttons and inputs

### 3. Product Detail Page ✅ 

**Image Gallery**
- 3 high-resolution images per product
- Large main image display
- Thumbnail selection with active border
- Click to switch images
- Fallback: Duplicates first image if fewer than 3

**Product Information**
- Brand name 
- Product title 
- Promotional badge 
- Star rating with review count
- Price display:
  - Discounted price (red, large) if promotion active
  - Original price (strikethrough, gray)
  - Discount percentage badge (red)
- Full product description
- Stock availability status

**Technical Specifications**
- Size (ml)
- Concentration type (Eau de Parfum, Eau de Toilette, etc.)
- Category
- Stock quantity

**Fragrance Notes**
- Top notes (opening scents)
- Heart notes (middle scents)
- Base notes (lasting scents)

**Quantity Selector**
- Increment/decrement buttons
- Minimum: 1
- Maximum: Available stock
- Real-time validation

**Add to Cart**
- Calculates total price (quantity × discounted price)
- Stock validation
- Toast notification on success/error
- Disabled if out of stock

**Similar Products**
- 4 products from same category
- Excludes current product
- Uses FeaturedProducts component for consistency

### 4. Shopping Cart ✅ 

**Cart Items Display**
- Product thumbnail (clickable to detail page)
- Brand and product name
- Unit price
- Quantity controls:
  - Decrement button (removes if quantity = 1)
  - Current quantity display
  - Increment button (validates against stock)
- Subtotal per item (price × quantity)
- Remove button (trash icon)

**Order Summary**
- Subtotal 
- Shipping: FREE
- Total amount 

**Cart Features**
- Persistent storage (localStorage)
- Stock validation on quantity changes
- Toast notifications for errors
- Empty cart state with illustration
- "Continue Shopping" link
- "Clear Cart" button
- "Proceed to Checkout" button

**Checkout Flow**
- Shipping address form (Name, Email, Address, City, Postal Code)
- Payment form simulation:
  - Card number input
  - Expiry date (MM/YY)
  - CVV (3 digits)
  - Cardholder name
- Order summary in checkout
- "Back to Cart" option
- Order confirmation page
- Cart cleared on successful order

### 5. Authentication ✅

**Login Page**
- Email input with validation
- Password input (type="password")
- Form validation:
  - Required fields
  - Email format check
  - User existence check
  - Password match verification
- Toast notifications for errors
- Redirect to home on success
- Session management (localStorage)

**Signup Page**
- Registration form fields:
  - First name (required)
  - Last name (required)
  - Email (required, format validation, uniqueness check)
  - Password (required, min 6 characters)
  - Confirm password (must match)
  - Address (required)
- Real-time validation
- Email uniqueness check against existing users
- Password confirmation match
- Toast notifications
- Auto-login after signup
- Redirect to home

**Session Management**
- localStorage-based authentication
- User data structure:
  ```javascript
  {
    id: timestamp,
    firstName: string,
    lastName: string,
    email: string,
    password: string ,
    address: string
  }
  ```
- Current user stored separately
- Custom 'authChange' event for cross-component sync
- Header updates on login/logout
- Logout clears session and redirects

### 6. Checkout Process ✅ 

**Checkout Page**
- Order summary with all cart items
- Shipping address form
- Payment form (mockup):
  - Card number (16 digits)
  - Expiry date (MM/YY format)
  - CVV (3 digits, maxLength validation)
  - Cardholder name
- Total calculation with shipping
- Form validation (HTML5 required attributes)
- "Back to Cart" button
- "Pay" button with total amount

**Order Confirmation**
- Success message
- Order details display
- Cart automatically cleared
- Return to shop button

### 7. Design & UX ✅ 

**Responsive Design**
- Mobile-first approach
- Breakpoints:
  - Mobile: < 640px
  - Tablet: 640px - 1024px
  - Desktop: > 1024px
- Flexible layouts with Tailwind grid/flex
- Responsive typography (text-sm → text-lg)
- Touch-friendly buttons (min 44px height)
- Hamburger menu on mobile

**Visual Consistency**
- Color scheme:
  - Primary: #AF8D64 (Luxury Gold)
  - Background: #F9FAFB (Light Gray)
  - Text: #111827 (Dark Gray)
  - Success: #10B981 (Green)
  - Error: #EF4444 (Red)
- Typography: Montserrat font family
- Consistent spacing (Tailwind scale)
- Unified button styles
- Card shadows and hover effects

**Accessibility**
- Proper color contrasts (WCAG AA)
- Form labels for all inputs
- Alt text for images
- Keyboard navigation support
- Focus states on interactive elements
- Semantic HTML structure

**User Feedback**
- Toast notification system:
  - Success messages (green)
  - Error messages (red)
  - Auto-dismiss after 3 seconds
  - Slide-in animation
  - Close button
- Loading states (if needed)
- Empty states (cart, search results)
- Disabled button states
- Hover effects on interactive elements

**Smooth Animations**
- Framer Motion transitions:
  - Fade in on page load
  - Slide in for cards
  - Scale on hover
  - Stagger for lists
- CSS transitions for buttons
- Smooth scroll for navigation
- Carousel auto-play

---

## 📁 Project Structure

```
perfume-shop/
├── public/                          # Static public assets
│   ├── images/                      # Public images
│   └── vite.svg                     # Vite logo
│
├── src/
│   ├── assets/                      # Static assets (imported in code)
│   │   ├── logo.png                 # Brand logo (used in header & favicon)
│   │   ├── heroPic.png              # Hero section background
│   │   ├── blog1.jpg                # Blog/carousel image 1
│   │   ├── blog2.jpg                # Blog/carousel image 2
│   │   ├── blog3.jpg                # Blog/carousel image 3
│   │   └── [Brand logos]            # Chanel, Dior, Gucci, Armani, etc.
│   │
│   ├── components/                  # React components
│   │   ├── layout/                  # Layout components
│   │   │   ├── AppLayout.jsx        # Main layout wrapper with Header/Footer
│   │   │   ├── Header.jsx           # Navigation bar with auth & cart
│   │   │   └── Footer.jsx           # Site footer with links
│   │   │
│   │   ├── HeroSection.jsx          # Animated hero banner
│   │   ├── HeroCarousel.jsx         # Auto-rotating promotional slider
│   │   ├── CategoryCards.jsx        # 6 clickable category cards
│   │   ├── FeaturedProducts.jsx     # Reusable product grid component
│   │   ├── ShopPage.jsx             # Product catalog with filters
│   │   ├── ProductDetailPage.jsx    # Product details with gallery
│   │   ├── CartPage.jsx             # Shopping cart & checkout
│   │   ├── LoginPage.jsx            # User login form
│   │   ├── SignUpPage.jsx           # User registration form
│   │   ├── Toast.jsx                # Notification component
│   │   ├── BrandBar.jsx             # Animated brand logo carousel
│   │   ├── BlogSection.jsx          # Content section with image
│   │   ├── AboutUs.jsx              # About section
│   │   └── GetInTouch.jsx           # Contact form
│   │
│   ├── data/                        # Static JSON data
│   │   ├── products.json            # 20 luxury perfumes with full details
│   │   └── categories.json          # 6 fragrance categories
│   │
│   ├── pages/                       # Page-level components
│   │   └── Home.jsx                 # Homepage composition
│   │
│   ├── services/                    # Service layer
│   │   ├── storage.js               # localStorage abstraction
│   │   ├── http.js                  # HTTP utilities (future use)
│   │   └── products.js              # Product service (future use)
│   │
│   ├── state/                       # State management
│   │   └── CartContext.jsx          # Shopping cart context & reducer
│   │
│   ├── utils/                       # Utility functions
│   │   └── toastEmitter.js          # Event emitter for toast notifications
│   │
│   ├── App.jsx                      # Main app component with routes
│   ├── main.jsx                     # Application entry point
│   ├── index.css                    # Global styles & Tailwind imports
│   └── App.css                      # Additional app styles
│
├── .gitignore                       # Git ignore rules
├── eslint.config.js                 # ESLint configuration
├── index.html                       # HTML template with favicon
├── package.json                     # Dependencies & scripts
├── package-lock.json                # Locked dependency versions
├── README.md                        # Project documentation
├── tailwind.config.js               # Tailwind CSS configuration
└── vite.config.js                   # Vite build configuration
```

### Architecture Explanation

**Component Organization**
- `layout/`: Shared layout components (Header, Footer, AppLayout)
- `components/`: Feature-specific components
- `pages/`: Page compositions that combine multiple components

**Data Layer**
- `data/`: Static JSON files (products, categories)
- `services/`: Abstraction for data operations (storage, HTTP)
- `state/`: Global state management (Context API)

**Utilities**
- `utils/`: Helper functions and event emitters

**Separation of Concerns**
- Components focus on UI rendering
- Services handle data operations
- State management isolated in Context
- Utilities provide reusable logic

---

## 🔄 State Management

### Cart Context Architecture

**Why Context API?**
- Built-in React feature (no external dependencies)
- Perfect for medium-scale applications
- Simpler than Redux for this use case
- Provides global state without prop drilling


**Cart Reducer Actions**
- `ADD_ITEM`: Adds product or increases quantity
- `REMOVE_ITEM`: Removes product from cart
- `UPDATE_QUANTITY`: Changes product quantity
- `CLEAR_CART`: Empties entire cart

**Stock Validation**
- Checks stock before adding items
- Validates quantity updates against available stock
- Shows toast notifications for errors
- Prevents over-ordering

**Persistence**
- Syncs to localStorage on every state change
- Loads from localStorage on app start
- Survives page refreshes
- Clears on order completion


## 💾 Data Management

### Mock Data Strategy

Since this is a **front-end only** project, all data is managed using:

1. **Static JSON Files** (`src/data/`)
2. **localStorage** (client-side persistence)

### Products Data Structure

```json
{
  "id": 1,
  "title": "Sauvage",
  "brand": "Dior",
  "categoryId": 3,
  "price": 135.00,
  "discount": 15,
  "badge": "Best Seller",
  "stock": 25,
  "images": [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg",
    "https://example.com/image3.jpg"
  ],
  "description": "A radically fresh composition...",
  "specs": {
    "topNotes": ["Calabrian Bergamot", "Pepper"],
    "heartNotes": ["Sichuan Pepper", "Lavender"],
    "baseNotes": ["Ambroxan", "Cedar"],
    "sizeMl": 100,
    "concentration": "Eau de Toilette"
  },
  "rating": {
    "average": 4.8,
    "count": 2847
  },
  "popularity": 98,
  "createdAt": "2024-01-15"
}
```

**Field Explanations**
- `id`: Unique identifier
- `categoryId`: Links to categories.json
- `discount`: Percentage off (10, 15, 20)
- `badge`: "New" or "Best Seller"
- `images`: Array of 2-3 high-quality URLs
- `specs`: Detailed fragrance information
- `rating`: Average score + review count
- `popularity`: Used for sorting

### Categories Data

```json
{
  "id": 1,
  "name": "Floral",
  "slug": "floral"
}
```

### localStorage Structure

**Shopping Cart**
```javascript
localStorage.cart = [
  {
    id: 1,
    title: "Sauvage",
    brand: "Dior",
    price: 135.00,
    quantity: 2,
    image: "url",
    stock: 25,
    discount: 15
  }
]
```

**User Authentication**
```javascript
// All registered users
localStorage.users = [
  {
    id: 1234567890,
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    password: "password123",
    address: "123 Main St, City"
  }
]

// Current logged-in user (password excluded)
localStorage.currentUser = {
  id: 1234567890,
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com"
}
```

### Storage Service

**Abstraction Layer** (`services/storage.js`)
```javascript
export const storage = {
  get: (key) => JSON.parse(localStorage.getItem(key)),
  set: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
  remove: (key) => localStorage.removeItem(key)
}
```

**Benefits**
- Centralized storage logic
- Error handling
- Easy to swap storage mechanism
- Consistent API across app

---

## 🎨 Design System

### Color Palette

**Primary Colors**
- `#AF8D64` - Luxury Gold (buttons, accents, hover states)
- `#9a7a50` - Dark Gold (button hover)

**Neutral Colors**
- `#F9FAFB` - Background Gray (page backgrounds)
- `#FFFFFF` - White (cards, modals)
- `#111827` - Dark Gray (primary text)
- `#6B7280` - Medium Gray (secondary text)
- `#E5E7EB` - Light Gray (borders)

**Semantic Colors**
- `#10B981` - Success Green (toast, badges)
- `#EF4444` - Error Red (toast, discounts)
- `#F59E0B` - Warning Amber (badges)

### Typography

**Font Family**
- Montserrat (Google Fonts)
- Weights: 400 (Regular), 600 (Semibold), 900 (Black)

**Scale**
- `text-xs`: 0.75rem (12px) - Labels, badges
- `text-sm`: 0.875rem (14px) - Body text, buttons
- `text-base`: 1rem (16px) - Default text
- `text-lg`: 1.125rem (18px) - Subheadings
- `text-xl`: 1.25rem (20px) - Card titles
- `text-2xl`: 1.5rem (24px) - Section titles
- `text-4xl`: 2.25rem (36px) - Page headings

### Spacing

**Tailwind Scale** (used consistently)
- `gap-2`: 0.5rem (8px)
- `gap-4`: 1rem (16px)
- `gap-6`: 1.5rem (24px)
- `gap-8`: 2rem (32px)

### Components

**Buttons**
- Primary: Gold background, white text, rounded-lg
- Secondary: Gray background, dark text, rounded-lg
- Hover: Darker shade, smooth transition
- Disabled: Gray background, reduced opacity

**Cards**
- White background
- Shadow on default, shadow-lg on hover
- Rounded-lg corners
- Padding: p-4 or p-6

**Inputs**
- Border: border-gray-300
- Focus: border-[#AF8D64]
- Rounded-lg
- Padding: px-4 py-3

**Animations**
- Fade in: opacity 0 → 1
- Slide in: translateX/Y with opacity
- Scale: 0.9 → 1 on mount
- Hover: scale-105, shadow-lg
- Duration: 0.3s ease-out

### Responsive Breakpoints

```javascript
// Tailwind breakpoints
sm: '640px'   // Tablet
md: '768px'   // Small desktop
lg: '1024px'  // Desktop
xl: '1280px'  // Large desktop
2xl: '1536px' // Extra large
```

**Usage Pattern**
- Mobile-first (default styles)
- Add `lg:` prefix for desktop
- Grid: `grid-cols-1 lg:grid-cols-3`
- Text: `text-sm lg:text-base`

---


**This README includes**
- Installation instructions
- Technology explanations
- Feature breakdown
- Architecture details
- Code examples
- Design system

---


## 🚦 Application Routes

```
/                    → Home page
/shop                → Product catalog
/product/:id         → Product details
/cart                → Shopping cart & checkout
/login               → User login
/signup              → User registration
```

**Route Structure**
- `/login` and `/signup`: Standalone (no Header/Footer)
- All other routes: Wrapped in AppLayout (with Header/Footer)

---

## 🚀 Deployment


- **Netlify** - Easy drag-and-drop deployment

## 📝 Development Notes

### Design Patterns Used

1. **Component Composition**: Building complex UIs from simple, reusable components
2. **Context API Pattern**: Global state without prop drilling
3. **Custom Hooks**: Encapsulating reusable logic (useCart)
4. **Observer Pattern**: Event emitter for cross-component communication
5. **Service Layer**: Abstracting storage operations
6. **Reducer Pattern**: Predictable state updates with actions

### Key Technical Decisions

**Why useReducer over useState for cart?**
- Complex state logic with multiple actions
- Predictable state updates
- Easier to test and debug
- Scales better for future features

**Why localStorage over sessionStorage?**
- Cart persists across browser sessions
- Better user experience
- Users expect cart to remain

**Why Framer Motion over CSS animations?**
- More powerful and flexible
- Better performance
- Easier to orchestrate complex animations
- Industry standard

---
