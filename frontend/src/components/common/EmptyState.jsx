import React from 'react';
import { PackageOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const EmptyState = ({
  icon: Icon = PackageOpen,
  title = 'No items found',
  description = 'There are no listings matching your criteria at this moment.',
  actionLabel,
  actionLink,
  onAction,
}) => {
  return (
    <div
      style={{
        textAlign: 'center',
        padding: '3.5rem 1.5rem',
        background: '#ffffff',
        borderRadius: 'var(--radius-lg)',
        border: '1px dashed var(--neutral-300)',
        maxWidth: '540px',
        margin: '2rem auto',
      }}
    >
      <div
        style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background: 'var(--primary-light)',
          color: 'var(--primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.25rem',
        }}
      >
        <Icon size={32} />
      </div>
      <h3
        style={{
          fontSize: '1.25rem',
          fontWeight: 700,
          color: 'var(--neutral-800)',
          marginBottom: '0.5rem',
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: '0.9375rem',
          color: 'var(--neutral-500)',
          maxWidth: '380px',
          margin: '0 auto 1.5rem',
          lineHeight: 1.5,
        }}
      >
        {description}
      </p>

      {actionLabel && actionLink && (
        <Link to={actionLink} className="btn btn-primary">
          {actionLabel}
        </Link>
      )}

      {actionLabel && onAction && !actionLink && (
        <button onClick={onAction} className="btn btn-primary">
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
