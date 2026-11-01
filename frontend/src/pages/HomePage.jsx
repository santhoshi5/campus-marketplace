import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  ShoppingBag, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  Users, 
  Search, 
  PlusCircle, 
  HandCoins,
  CheckCircle2,
  BookOpen
} from 'lucide-react';

const HomePage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [heroSearch, setHeroSearch] = useState('');

  const handleHeroSearchSubmit = (e) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      navigate(`/marketplace?search=${encodeURIComponent(heroSearch.trim())}`);
    } else {
      navigate('/marketplace');
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section
        style={{
          background: 'radial-gradient(ellipse at 50% -10%, rgba(99, 102, 241, 0.18), rgba(248, 250, 252, 0) 70%), #ffffff',
          borderBottom: '1px solid var(--neutral-200)',
          padding: '5rem 1.5rem 4.5rem',
        }}
      >
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          {/* Top Pill */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.4rem 1rem',
              borderRadius: 'var(--radius-full)',
              background: 'var(--primary-light)',
              color: 'var(--primary)',
              fontSize: '0.8125rem',
              fontWeight: 700,
              marginBottom: '1.5rem',
              border: '1px solid #c7d2fe',
            }}
          >
            <Sparkles size={15} />
            <span>Official Peer-to-Peer Student Marketplace</span>
          </div>

          {/* Main Headline */}
          <h1
            style={{
              fontSize: 'clamp(2.25rem, 5vw, 3.75rem)',
              fontWeight: 800,
              letterSpacing: '-0.035em',
              lineHeight: 1.15,
              color: 'var(--neutral-900)',
              marginBottom: '1.25rem',
            }}
          >
            Buy, Sell & Exchange <br />
            <span className="gradient-text">Campus Essentials</span> With Peers
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: '1.125rem',
              color: 'var(--neutral-600)',
              maxWidth: '680px',
              margin: '0 auto 2.5rem',
              lineHeight: 1.6,
            }}
          >
            Save on textbooks, engineering calculators, laptops, hostel furniture, and lab gear directly from seniors and classmates.
          </p>

          {/* Hero Search Box */}
          <form
            onSubmit={handleHeroSearchSubmit}
            style={{
              display: 'flex',
              maxWidth: '620px',
              margin: '0 auto 2rem',
              background: '#ffffff',
              padding: '0.4rem',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--neutral-300)',
              boxShadow: '0 12px 30px -8px rgba(15, 23, 42, 0.1)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                paddingLeft: '1rem',
                color: 'var(--neutral-400)',
              }}
            >
              <Search size={20} />
            </div>
            <input
              type="text"
              placeholder="Search engineering books, iPad, cycles, calculators..."
              value={heroSearch}
              onChange={(e) => setHeroSearch(e.target.value)}
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                padding: '0.75rem 1rem',
                fontSize: '0.9375rem',
                color: 'var(--neutral-900)',
                background: 'transparent',
              }}
            />
            <button type="submit" className="btn btn-primary" style={{ borderRadius: 'var(--radius-lg)' }}>
              Explore
            </button>
          </form>

          {/* Quick Action Buttons */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              flexWrap: 'wrap',
            }}
          >
            <Link to="/marketplace" className="btn btn-primary btn-lg">
              <ShoppingBag size={18} />
              Browse All Listings
            </Link>

            <Link to="/add-product" className="btn btn-secondary btn-lg">
              <PlusCircle size={18} />
              Sell an Item
            </Link>

            {!isAuthenticated && (
              <Link to="/register" className="btn btn-outline-primary btn-lg">
                Join CampusCart
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Trust & Highlights Bar */}
      <section
        style={{
          borderBottom: '1px solid var(--neutral-200)',
          background: '#ffffff',
          padding: '2rem 1.5rem',
        }}
      >
        <div
          style={{
            maxWidth: '1240px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.75rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '12px',
                background: 'var(--primary-light)',
                color: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Users size={22} />
            </div>
            <div>
              <h4 style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--neutral-900)' }}>
                College Student Network
              </h4>
              <p style={{ fontSize: '0.8125rem', color: 'var(--neutral-500)', marginTop: '2px' }}>
                Direct peer-to-peer exchanges on campus grounds
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '12px',
                background: 'var(--success-bg)',
                color: 'var(--success)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Zap size={22} />
            </div>
            <div>
              <h4 style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--neutral-900)' }}>
                Direct Request System
              </h4>
              <p style={{ fontSize: '0.8125rem', color: 'var(--neutral-500)', marginTop: '2px' }}>
                Send buy requests with optional personalized messages
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '12px',
                background: 'var(--secondary-light)',
                color: 'var(--secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <HandCoins size={22} />
            </div>
            <div>
              <h4 style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--neutral-900)' }}>
                Zero Platform Fees
              </h4>
              <p style={{ fontSize: '0.8125rem', color: 'var(--neutral-500)', marginTop: '2px' }}>
                100% of the sale price goes directly to the student seller
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <div className="page-wrapper" style={{ paddingBottom: '5rem' }}>
        {/* How It Works Section */}
        <div
          style={{
            background: 'var(--gradient-subtle)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid #e0e7ff',
            padding: '3.5rem 2rem',
            textAlign: 'center',
            marginBottom: '3rem',
          }}
        >
          <h2 style={{ fontSize: '1.875rem', fontWeight: 800, color: 'var(--neutral-900)', marginBottom: '0.5rem' }}>
            How CampusCart Works
          </h2>
          <p style={{ color: 'var(--neutral-600)', maxWidth: '580px', margin: '0 auto 2.5rem', fontSize: '0.9375rem' }}>
            Simple, transparent, peer-to-peer student transactions designed specifically for campus life.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.75rem',
              textAlign: 'left',
            }}
          >
            <div
              style={{
                background: '#ffffff',
                padding: '2rem 1.75rem',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-sm)',
                border: '1px solid var(--neutral-200)',
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'var(--primary)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '1rem',
                  marginBottom: '1.25rem',
                }}
              >
                1
              </div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--neutral-900)' }}>
                List Your Item
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--neutral-500)', lineHeight: 1.6 }}>
                Post your textbooks, engineering tools, lab calculators, or dorm gear with condition details, price in INR, and your student email in 60 seconds.
              </p>
            </div>

            <div
              style={{
                background: '#ffffff',
                padding: '2rem 1.75rem',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-sm)',
                border: '1px solid var(--neutral-200)',
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'var(--secondary)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '1rem',
                  marginBottom: '1.25rem',
                }}
              >
                2
              </div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--neutral-900)' }}>
                Receive Direct Requests
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--neutral-500)', lineHeight: 1.6 }}>
                Interested student buyers send a "Request to Buy" with an optional meeting note. Review incoming requests in your Seller Dashboard and Accept or Reject with one click.
              </p>
            </div>

            <div
              style={{
                background: '#ffffff',
                padding: '2rem 1.75rem',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-sm)',
                border: '1px solid var(--neutral-200)',
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'var(--success)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '1rem',
                  marginBottom: '1.25rem',
                }}
              >
                3
              </div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--neutral-900)' }}>
                Offline Campus Handover
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--neutral-500)', lineHeight: 1.6 }}>
                Once accepted, the buyer contacts the seller. Coordinate a meeting spot on campus (library, canteen, hostel lounge) to inspect the item and conclude direct payment (cash or UPI).
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action Card */}
        <div
          style={{
            background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
            borderRadius: 'var(--radius-xl)',
            padding: '3rem 2rem',
            textAlign: 'center',
            color: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: 'var(--shadow-lg)',
          }}
        >
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              background: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.25rem',
            }}
          >
            <ShoppingBag size={28} />
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.75rem' }}>
            Ready to explore campus listings?
          </h2>
          <p style={{ color: 'var(--neutral-400)', maxWidth: '520px', margin: '0 auto 2rem', fontSize: '0.9375rem', lineHeight: 1.6 }}>
            Browse through student listings, filter by categories, search by item title, or post your own unused supplies for peers to purchase.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link to="/marketplace" className="btn btn-primary btn-lg">
              Explore Marketplace <ArrowRight size={18} />
            </Link>
            <Link to="/add-product" className="btn btn-secondary btn-lg" style={{ background: 'transparent', color: '#ffffff', borderColor: 'rgba(255, 255, 255, 0.3)' }}>
              <PlusCircle size={18} /> Sell an Item
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
