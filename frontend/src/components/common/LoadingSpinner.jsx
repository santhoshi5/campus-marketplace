import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = ({ message = 'Loading...', size = 32, fullPage = false }) => {
  const content = (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.875rem',
        padding: '3rem 1rem',
        color: 'var(--neutral-500)',
      }}
    >
      <Loader2
        size={size}
        className="animate-spin"
        style={{ color: 'var(--primary)' }}
      />
      {message && (
        <p style={{ fontSize: '0.9375rem', fontWeight: 500, color: 'var(--neutral-600)' }}>
          {message}
        </p>
      )}
    </div>
  );

  if (fullPage) {
    return (
      <div
        style={{
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {content}
      </div>
    );
  }

  return content;
};

export default LoadingSpinner;
