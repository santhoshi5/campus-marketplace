import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  ShoppingBag, 
  PlusCircle, 
  Send, 
  Store, 
  LogIn, 
  UserPlus, 
  LogOut, 
  Menu, 
  X,
  Compass
} from 'lucide-react';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--neutral-200)',
      }}
    >
      <div
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          padding: '0.875rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Brand Logo */}
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.625rem',
            textDecoration: 'none',
          }}
          onClick={closeMenu}
        >
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'var(--gradient-brand)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: '0 4px 10px var(--primary-glow)',
            }}
          >
            <ShoppingBag size={20} />
          </div>
          <div>
            <span
              style={{
                fontSize: '1.25rem',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                color: 'var(--neutral-900)',
              }}
            >
              Campus<span style={{ color: 'var(--primary)' }}>Cart</span>
            </span>
            <span
              style={{
                display: 'block',
                fontSize: '0.65rem',
                fontWeight: 600,
                color: 'var(--neutral-400)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginTop: '-2px',
              }}
            >
              Student Marketplace
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
          }}
          className="desktop-nav"
        >
          <NavLink
            to="/"
            end
            style={({ isActive }) => ({
              fontSize: '0.9375rem',
              fontWeight: 600,
              color: isActive ? 'var(--primary)' : 'var(--neutral-600)',
              transition: 'color var(--transition-fast)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
            })}
          >
            Home
          </NavLink>

          <NavLink
            to="/marketplace"
            style={({ isActive }) => ({
              fontSize: '0.9375rem',
              fontWeight: 600,
              color: isActive ? 'var(--primary)' : 'var(--neutral-600)',
              transition: 'color var(--transition-fast)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
            })}
          >
            <Compass size={16} />
            Marketplace
          </NavLink>

          {isAuthenticated && (
            <>
              <NavLink
                to="/buyer-requests"
                style={({ isActive }) => ({
                  fontSize: '0.9375rem',
                  fontWeight: 600,
                  color: isActive ? 'var(--primary)' : 'var(--neutral-600)',
                  transition: 'color var(--transition-fast)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                })}
              >
                <Send size={16} />
                My Requests
              </NavLink>

              <NavLink
                to="/seller-dashboard"
                style={({ isActive }) => ({
                  fontSize: '0.9375rem',
                  fontWeight: 600,
                  color: isActive ? 'var(--primary)' : 'var(--neutral-600)',
                  transition: 'color var(--transition-fast)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                })}
              >
                <Store size={16} />
                Seller Dashboard
              </NavLink>
            </>
          )}
        </div>

        {/* Action Buttons / Auth Controls */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.875rem',
          }}
          className="desktop-actions"
        >
          <Link
            to="/add-product"
            className="btn btn-secondary btn-sm"
            style={{
              borderColor: 'var(--primary)',
              color: 'var(--primary)',
              fontWeight: 600,
            }}
          >
            <PlusCircle size={16} />
            Sell Item
          </Link>

          {isAuthenticated ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                paddingLeft: '0.5rem',
                borderLeft: '1px solid var(--neutral-200)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'var(--primary-light)',
                    color: 'var(--primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.8125rem',
                  }}
                  title={user?.email}
                >
                  {(user?.fullName || user?.email || 'U')[0].toUpperCase()}
                </div>
                <div style={{ lineHeight: 1.2 }}>
                  <div
                    style={{
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      color: 'var(--neutral-800)',
                      maxWidth: '120px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {user?.fullName || 'Student'}
                  </div>
                  <div
                    style={{
                      fontSize: '0.75rem',
                      color: 'var(--neutral-400)',
                      maxWidth: '120px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {user?.email}
                  </div>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="btn btn-secondary btn-sm"
                title="Logout"
                style={{ padding: '0.4rem 0.6rem' }}
              >
                <LogOut size={15} />
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
              <Link to="/login" className="btn btn-secondary btn-sm">
                <LogIn size={15} />
                Sign In
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm">
                <UserPlus size={15} />
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          type="button"
          aria-label="Toggle mobile menu"
          className="mobile-toggle"
          style={{
            display: 'none',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '0.35rem',
            color: 'var(--neutral-700)',
          }}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            borderTop: '1px solid var(--neutral-200)',
            backgroundColor: '#ffffff',
            padding: '1.25rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          <NavLink
            to="/"
            end
            onClick={closeMenu}
            style={{ fontWeight: 600, color: 'var(--neutral-800)', padding: '0.5rem 0' }}
          >
            Home
          </NavLink>
          <NavLink
            to="/marketplace"
            onClick={closeMenu}
            style={{ fontWeight: 600, color: 'var(--neutral-800)', padding: '0.5rem 0' }}
          >
            Marketplace
          </NavLink>
          <Link
            to="/add-product"
            onClick={closeMenu}
            style={{ fontWeight: 600, color: 'var(--primary)', padding: '0.5rem 0' }}
          >
            + Post Product for Sale
          </Link>

          {isAuthenticated ? (
            <>
              <NavLink
                to="/buyer-requests"
                onClick={closeMenu}
                style={{ fontWeight: 600, color: 'var(--neutral-800)', padding: '0.5rem 0' }}
              >
                My Requests (Buyer)
              </NavLink>
              <NavLink
                to="/seller-dashboard"
                onClick={closeMenu}
                style={{ fontWeight: 600, color: 'var(--neutral-800)', padding: '0.5rem 0' }}
              >
                Seller Dashboard
              </NavLink>
              <div
                style={{
                  borderTop: '1px solid var(--neutral-200)',
                  paddingTop: '0.75rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{user?.fullName}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--neutral-500)' }}>{user?.email}</div>
                </div>
                <button onClick={handleLogout} className="btn btn-outline-danger btn-sm">
                  <LogOut size={14} /> Logout
                </button>
              </div>
            </>
          ) : (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                borderTop: '1px solid var(--neutral-200)',
                paddingTop: '1rem',
              }}
            >
              <Link to="/login" onClick={closeMenu} className="btn btn-secondary btn-block">
                <LogIn size={15} /> Sign In
              </Link>
              <Link to="/register" onClick={closeMenu} className="btn btn-primary btn-block">
                <UserPlus size={15} /> Register New Account
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Media query styling for responsive toggle */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav, .desktop-actions {
            display: none !important;
          }
          .mobile-toggle {
            display: block !important;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
