import React from 'react';
import { Clock, CheckCircle, XCircle, Sparkles, Check, AlertCircle } from 'lucide-react';

export const StatusBadge = ({ status }) => {
  const norm = (status || '').toUpperCase();

  if (norm === 'PENDING') {
    return (
      <span className="badge badge-pending">
        <Clock size={12} /> Pending
      </span>
    );
  }
  if (norm === 'ACCEPTED') {
    return (
      <span className="badge badge-accepted">
        <CheckCircle size={12} /> Accepted
      </span>
    );
  }
  if (norm === 'REJECTED') {
    return (
      <span className="badge badge-rejected">
        <XCircle size={12} /> Rejected
      </span>
    );
  }
  if (norm === 'AVAILABLE') {
    return (
      <span className="badge badge-available">
        <Check size={12} /> Available
      </span>
    );
  }
  if (norm === 'UNAVAILABLE' || norm === 'SOLD') {
    return (
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.35rem',
          padding: '0.25rem 0.65rem',
          fontSize: '0.75rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          borderRadius: 'var(--radius-full)',
          background: 'var(--neutral-200)',
          color: 'var(--neutral-600)',
          border: '1px solid var(--neutral-300)',
        }}
      >
        <AlertCircle size={12} /> Unavailable
      </span>
    );
  }

  return <span className="badge badge-neutral">{status || 'UNKNOWN'}</span>;
};

export const ConditionBadge = ({ condition }) => {
  if (!condition) return null;

  const norm = condition.toUpperCase().replace(/\s+/g, '_');

  let label = condition;
  let bg = 'var(--neutral-100)';
  let color = 'var(--neutral-700)';
  let border = 'var(--neutral-200)';

  if (norm === 'NEW' || norm === 'BRAND_NEW') {
    label = 'Brand New';
    bg = 'var(--success-bg)';
    color = 'var(--success-text)';
    border = 'var(--success-border)';
  } else if (norm === 'LIKE_NEW') {
    label = 'Like New';
    bg = 'var(--secondary-light)';
    color = '#0369a1';
    border = '#bae6fd';
  } else if (norm === 'GOOD') {
    label = 'Good Condition';
    bg = 'var(--primary-light)';
    color = 'var(--primary-dark)';
    border = '#c7d2fe';
  } else if (norm === 'FAIR') {
    label = 'Fair Condition';
    bg = 'var(--warning-bg)';
    color = 'var(--warning-text)';
    border = 'var(--warning-border)';
  }

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.3rem',
        fontSize: '0.75rem',
        fontWeight: 700,
        padding: '0.2rem 0.6rem',
        borderRadius: 'var(--radius-sm)',
        background: bg,
        color: color,
        border: `1px solid ${border}`,
        letterSpacing: '0.02em',
      }}
    >
      <Sparkles size={11} />
      {label}
    </span>
  );
};

export default { StatusBadge, ConditionBadge };
