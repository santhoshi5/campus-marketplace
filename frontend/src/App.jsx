import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MarketplacePage from './pages/MarketplacePage';
import ProductDetailPage from './pages/ProductDetailPage';
import AddProductPage from './pages/AddProductPage';
import BuyerRequestsPage from './pages/BuyerRequestsPage';
import SellerDashboardPage from './pages/SellerDashboardPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="app-container">
          <Navbar />
          <main className="main-content">
            <Routes>
              {/* Home */}
              <Route path="/" element={<HomePage />} />

              {/* Auth */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* Marketplace Catalog & Details */}
              <Route path="/marketplace" element={<MarketplacePage />} />
              <Route path="/products/:id" element={<ProductDetailPage />} />

              {/* Add Product */}
              <Route path="/add-product" element={<AddProductPage />} />

              {/* Buyer & Seller Requests Management */}
              <Route path="/buyer-requests" element={<BuyerRequestsPage />} />
              <Route path="/seller-dashboard" element={<SellerDashboardPage />} />

              {/* Fallback 404 */}
              <Route path="/404" element={<NotFoundPage />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
