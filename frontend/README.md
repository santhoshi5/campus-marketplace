# Campus Marketplace - React Frontend

Modern React frontend for the Campus Marketplace peer-to-peer student trading platform, powered by Vite, React Router, and Axios, connected directly to the Spring Boot backend (`http://localhost:8081`).

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js** v18+ (tested on v22.17.1)
- **Spring Boot Backend** running at `http://localhost:8081` with PostgreSQL

### 2. Install Dependencies
Open your terminal in the `frontend` folder:
```bash
cd frontend
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
The React frontend will be accessible at:
👉 **`http://localhost:5173`**

---

## 🔌 Backend API Connection Mapping

All endpoints directly connect to your Spring Boot backend:

| Module | Feature | Frontend Service | Backend API Endpoint |
|---|---|---|---|
| **Auth** | Student Registration | `authService.register` | `POST /api/auth/register` |
| **Auth** | Student Login | `authService.login` | `POST /api/auth/login` |
| **Products** | View All Listings | `productService.getAllProducts` | `GET /api/products` |
| **Products** | View Product by ID | `productService.getProductById` | `GET /api/products/{id}` |
| **Products** | Search by Title | `productService.searchProducts` | `GET /api/products/search?title={title}` |
| **Products** | Filter by Category | `productService.getProductsByCategory` | `GET /api/products/category/{category}` |
| **Products** | Add New Product | `productService.addProduct` | `POST /api/products` |
| **Products** | Update Product | `productService.updateProduct` | `PUT /api/products/{id}` |
| **Products** | Delete Product | `productService.deleteProduct` | `DELETE /api/products/{id}` |
| **Requests** | Send Buy Request | `requestService.createRequest` | `POST /api/requests` |
| **Requests** | View Buyer Requests | `requestService.getRequestsByBuyer` | `GET /api/requests/buyer/{email}` |
| **Requests** | View Seller Requests | `requestService.getRequestsBySeller` | `GET /api/requests/seller/{email}` |
| **Requests** | Update Request Status | `requestService.updateRequestStatus` | `PUT /api/requests/{id}/status?status=ACCEPTED\|REJECTED` |

---

## 📂 Project Architecture

```
frontend/
├── index.html                   # HTML template with Plus Jakarta Sans & SEO tags
├── vite.config.js               # Dev server configuration (Port 5173 & /api proxy)
├── package.json
├── .env                         # VITE_API_BASE_URL=http://localhost:8081
├── src/
│   ├── main.jsx                 # React root mounting
│   ├── App.jsx                  # Main router and AuthProvider wrapper
│   ├── index.css                # Master design system & CSS tokens
│   ├── api/
│   │   ├── axiosInstance.js     # Axios client with centralized error interceptors
│   │   ├── authService.js       # Auth APIs & localStorage session handling
│   │   ├── productService.js   # Product catalog, search, filter & CRUD APIs
│   │   └── requestService.js   # Buyer & Seller request exchange APIs
│   ├── context/
│   │   └── AuthContext.jsx      # Global user authentication state
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx       # Responsive navigation bar with student profile
│   │   │   └── Footer.jsx       # Project showcase footer with tech specs
│   │   ├── common/
│   │   │   ├── AlertBanner.jsx  # Dismissible feedback alerts
│   │   │   ├── Badge.jsx        # Status and condition badges
│   │   │   ├── EmptyState.jsx   # Friendly empty placeholders with action CTA
│   │   │   ├── LoadingSpinner.jsx # Clean animated loader
│   │   │   └── Modal.jsx        # Accessible dialog window
│   │   └── marketplace/
│   │       ├── CategoryFilter.jsx # Category pill selector
│   │       ├── ProductCard.jsx  # Modern product card with category gradient
│   │       └── SearchBar.jsx    # Title search input with clear trigger
│   └── pages/
│       ├── HomePage.jsx         # Hero showcase, categories & recent listings
│       ├── LoginPage.jsx        # Student login form
│       ├── RegisterPage.jsx     # Student registration form
│       ├── MarketplacePage.jsx  # Full catalog, search & filtering
│       ├── ProductDetailPage.jsx# Detailed specs & send request modal
│       ├── AddProductPage.jsx   # List item form
│       ├── BuyerRequestsPage.jsx# Sent requests tracker (Pending/Accepted/Rejected)
│       ├── SellerDashboardPage.jsx # Received requests with Accept/Reject actions
│       └── NotFoundPage.jsx     # 404 handler
```

---

## 🎨 Design Highlights
- **Curated Color System**: Indigo, Violet, Cyan, Emerald, and Amber accents.
- **Micro-Animations**: Card hover elevations, glowing gradient accents, smooth transitions.
- **Status Indicators**: Color-coded badges for `PENDING`, `ACCEPTED`, `REJECTED`, and `AVAILABLE`.
- **Zero Placeholders**: Thematic category icons and gradients for textbooks, electronics, instruments, stationery, and hostel gear.
