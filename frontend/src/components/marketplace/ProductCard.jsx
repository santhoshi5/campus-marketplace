import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Laptop, 
  Calculator, 
  Home, 
  Bike, 
  PenTool, 
  Package, 
  ArrowRight,
  Mail,
  Calendar
} from 'lucide-react';
import { ConditionBadge, StatusBadge } from '../common/Badge';

// Helper to provide a vibrant thematic icon and gradient for category
export const getCategoryMeta = (category = '') => {
  const norm = category.toLowerCase();
  if (norm.includes('book') || norm.includes('textbook') || norm.includes('note')) {
    return {
      icon: BookOpen,
      gradient: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
      color: '#6366f1',
    };
  }
  if (norm.includes('elect') || norm.includes('tech') || norm.includes('laptop') || norm.includes('phone')) {
    return {
      icon: Laptop,
      gradient: 'linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)',
      color: '#0ea5e9',
    };
  }
  if (norm.includes('calc') || norm.includes('drafter') || norm.includes('tool') || norm.includes('instrument')) {
    return {
      icon: Calculator,
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)',
      color: '#f59e0b',
    };
  }
  if (norm.includes('hostel') || norm.includes('room') || norm.includes('mattress') || norm.includes('bed')) {
    return {
      icon: Home,
      gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      color: '#10b981',
    };
  }
  if (norm.includes('cycle') || norm.includes('bike') || norm.includes('sport')) {
    return {
      icon: Bike,
      gradient: 'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)',
      color: '#ec4899',
    };
  }
  if (norm.includes('stationery') || norm.includes('pen') || norm.includes('notebook')) {
    return {
      icon: PenTool,
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
      color: '#8b5cf6',
    };
  }
  return {
    icon: Package,
    gradient: 'linear-gradient(135deg, #64748b 0%, #475569 100%)',
    color: '#64748b',
  };
};

const ProductCard = ({ product }) => {
  const { id, title, description, price, category, productCondition, sellerEmail, status, createdAt } = product;
  const meta = getCategoryMeta(category);
  const IconComponent = meta.icon;

  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      })
    : null;

  return (
    <div
      className="card card-hoverable"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: '#ffffff',
      }}
    >
      {/* Category Visual Header */}
      <div
        style={{
          height: '130px',
          background: meta.gradient,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem',
          overflow: 'hidden',
        }}
      >
        {/* Subtle decorative circles */}
        <div
          style={{
            position: 'absolute',
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.12)',
            top: '-30px',
            right: '-30px',
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.08)',
            bottom: '-20px',
            left: '-20px',
          }}
        />

        {/* Center icon */}
        <div
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.25)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          }}
        >
          <IconComponent size={28} />
        </div>

        {/* Status badge in top right */}
        <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
          <StatusBadge status={status || 'AVAILABLE'} />
        </div>

        {/* Category label in top left */}
        <div
          style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            background: 'rgba(0, 0, 0, 0.35)',
            backdropFilter: 'blur(4px)',
            color: '#ffffff',
            fontSize: '0.7rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            padding: '0.2rem 0.55rem',
            borderRadius: 'var(--radius-full)',
          }}
        >
          {category || 'Item'}
        </div>
      </div>

      {/* Card Content */}
      <div
        style={{
          padding: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        }}
      >
        {/* Price & Condition */}
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            marginBottom: '0.5rem',
          }}
        >
          <div
            style={{
              fontSize: '1.375rem',
              fontWeight: 800,
              color: 'var(--neutral-900)',
            }}
          >
            ₹{Number(price).toLocaleString('en-IN')}
          </div>
          <ConditionBadge condition={productCondition} />
        </div>

        {/* Title */}
        <h4
          style={{
            fontSize: '1.0625rem',
            fontWeight: 700,
            color: 'var(--neutral-900)',
            marginBottom: '0.5rem',
            lineHeight: 1.35,
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            minHeight: '2.7rem',
          }}
          title={title}
        >
          {title}
        </h4>

        {/* Description snippet */}
        <p
          style={{
            fontSize: '0.875rem',
            color: 'var(--neutral-500)',
            lineHeight: 1.5,
            marginBottom: '1rem',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            minHeight: '2.6rem',
          }}
        >
          {description || 'No detailed description provided.'}
        </p>

        {/* Seller Info & Date Footer */}
        <div
          style={{
            marginTop: 'auto',
            paddingTop: '0.75rem',
            borderTop: '1px solid var(--neutral-100)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.75rem',
            color: 'var(--neutral-500)',
            marginBottom: '1rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              maxWidth: '160px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
            title={sellerEmail}
          >
            <Mail size={13} style={{ flexShrink: 0 }} />
            <span>{sellerEmail}</span>
          </div>

          {formattedDate && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Calendar size={13} />
              <span>{formattedDate}</span>
            </div>
          )}
        </div>

        {/* View Details CTA */}
        <Link
          to={`/products/${id}`}
          className="btn btn-secondary btn-block"
          style={{
            fontWeight: 600,
            justifyContent: 'space-between',
          }}
        >
          <span>View Details</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
