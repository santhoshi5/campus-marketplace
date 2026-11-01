import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ShieldCheck, Heart, Layers, Database, Code2 } from 'lucide-react';

const Footer = () => {
  return (
    <footer
      style={{
        background: '#ffffff',
        borderTop: '1px solid var(--neutral-200)',
        marginTop: 'auto',
      }}
    >
      <div
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          padding: '3rem 1.5rem 2rem',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '2.5rem',
            marginBottom: '2.5rem',
          }}
        >
          {/* Brand Col */}
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.625rem',
                marginBottom: '1rem',
              }}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'var(--gradient-brand)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                }}
              >
                <ShoppingBag size={18} />
              </div>
              <span style={{ fontSize: '1.25rem', fontWeight: 800 }}>
                Campus<span style={{ color: 'var(--primary)' }}>Cart</span>
              </span>
            </div>
            <p
              style={{
                fontSize: '0.875rem',
                color: 'var(--neutral-500)',
                lineHeight: 1.6,
                marginBottom: '1rem',
              }}
            >
              A verified peer-to-peer campus marketplace enabling students to buy, sell, and exchange books, electronics, and study materials safely.
            </p>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontSize: '0.75rem',
                color: 'var(--success)',
                background: 'var(--success-bg)',
                border: '1px solid var(--success-border)',
                padding: '0.25rem 0.5rem',
                borderRadius: 'var(--radius-sm)',
                fontWeight: 600,
              }}
            >
              <ShieldCheck size={14} /> Student Verified Ecosystem
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              style={{
                fontSize: '0.875rem',
                fontWeight: 700,
                color: 'var(--neutral-900)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '1rem',
              }}
            >
              Explore
            </h4>
            <ul
              style={{
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.65rem',
                fontSize: '0.875rem',
                color: 'var(--neutral-600)',
              }}
            >
              <li>
                <Link to="/marketplace" style={{ transition: 'color var(--transition-fast)' }}>
                  All Marketplace Listings
                </Link>
              </li>
              <li>
                <Link to="/add-product" style={{ transition: 'color var(--transition-fast)' }}>
                  Sell an Item
                </Link>
              </li>
              <li>
                <Link to="/buyer-requests" style={{ transition: 'color var(--transition-fast)' }}>
                  Track Sent Requests
                </Link>
              </li>
              <li>
                <Link to="/seller-dashboard" style={{ transition: 'color var(--transition-fast)' }}>
                  Seller Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Categories */}
          <div>
            <h4
              style={{
                fontSize: '0.875rem',
                fontWeight: 700,
                color: 'var(--neutral-900)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '1rem',
              }}
            >
              Popular Categories
            </h4>
            <ul
              style={{
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.65rem',
                fontSize: '0.875rem',
                color: 'var(--neutral-600)',
              }}
            >
              <li>
                <Link to="/marketplace?category=Books">Books & Textbooks</Link>
              </li>
              <li>
                <Link to="/marketplace?category=Electronics">Electronics & Laptops</Link>
              </li>
              <li>
                <Link to="/marketplace?category=Calculators">Calculators & Instruments</Link>
              </li>
              <li>
                <Link to="/marketplace?category=Hostel%20Essentials">Hostel Essentials</Link>
              </li>
            </ul>
          </div>

          {/* Tech Stack Specs (Great for portfolio & viva demonstration) */}
          <div>
            <h4
              style={{
                fontSize: '0.875rem',
                fontWeight: 700,
                color: 'var(--neutral-900)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '1rem',
              }}
            >
              Architecture & Stack
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.8125rem',
                  color: 'var(--neutral-600)',
                }}
              >
                <Code2 size={15} style={{ color: 'var(--primary)' }} />
                <span>Backend: Spring Boot 4.1.2 & Java 21</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.8125rem',
                  color: 'var(--neutral-600)',
                }}
              >
                <Database size={15} style={{ color: 'var(--secondary)' }} />
                <span>Database: PostgreSQL (Port 5433)</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.8125rem',
                  color: 'var(--neutral-600)',
                }}
              >
                <Layers size={15} style={{ color: '#ec4899' }} />
                <span>Frontend: React 19 + Vite</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: '1px solid var(--neutral-200)',
            paddingTop: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.8125rem',
            color: 'var(--neutral-400)',
          }}
        >
          <div>
            &copy; {new Date().getFullYear()} Campus Marketplace Project. All rights reserved.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            Built with <Heart size={14} style={{ color: '#ef4444', fill: '#ef4444' }} /> for University College Showcase
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
