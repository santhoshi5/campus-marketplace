import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div
      style={{
        minHeight: '65vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '3rem 1.5rem',
      }}
    >
      <div style={{ maxWidth: '480px' }}>
        <div
          style={{
            fontSize: '5rem',
            fontWeight: 800,
            lineHeight: 1,
            color: 'var(--primary)',
            marginBottom: '1rem',
          }}
        >
          404
        </div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--neutral-900)', marginBottom: '0.75rem' }}>
          Page Not Found
        </h2>
        <p style={{ color: 'var(--neutral-500)', marginBottom: '2rem', lineHeight: 1.6 }}>
          The page you are looking for does not exist or may have been moved. Return to the campus marketplace to keep exploring.
        </p>
        <Link to="/" className="btn btn-primary btn-lg">
          <ArrowLeft size={18} /> Return to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
