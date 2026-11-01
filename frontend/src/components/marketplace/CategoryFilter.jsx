import React from 'react';
import { 
  Sparkles, 
  BookOpen, 
  Laptop, 
  PenTool, 
  Calculator, 
  Home, 
  Bike, 
  Package 
} from 'lucide-react';

export const CATEGORIES = [
  { id: 'ALL', label: 'All Categories', icon: Sparkles },
  { id: 'Books', label: 'Books & Textbooks', icon: BookOpen },
  { id: 'Electronics', label: 'Electronics & Tech', icon: Laptop },
  { id: 'Stationery', label: 'Stationery & Art', icon: PenTool },
  { id: 'Calculators', label: 'Calculators & Drafters', icon: Calculator },
  { id: 'Hostel Essentials', label: 'Hostel Essentials', icon: Home },
  { id: 'Cycles & Sports', label: 'Cycles & Sports', icon: Bike },
  { id: 'Other', label: 'Other College Items', icon: Package },
];

export const CATEGORY_OPTIONS = [
  'Books',
  'Electronics',
  'Stationery',
  'Calculators',
  'Hostel Essentials',
  'Cycles & Sports',
  'Other',
];

const CategoryFilter = ({ activeCategory, onSelectCategory }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.625rem',
        overflowX: 'auto',
        paddingBottom: '0.5rem',
        marginBottom: '1.5rem',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
    >
      {CATEGORIES.map((cat) => {
        const Icon = cat.icon;
        const isActive =
          cat.id === 'ALL'
            ? !activeCategory || activeCategory === '' || activeCategory === 'ALL'
            : activeCategory?.toLowerCase() === cat.id.toLowerCase();

        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onSelectCategory(cat.id === 'ALL' ? '' : cat.id)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.6rem 1.1rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.875rem',
              fontWeight: 600,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              border: isActive
                ? '1px solid var(--primary)'
                : '1px solid var(--neutral-200)',
              background: isActive ? 'var(--primary)' : '#ffffff',
              color: isActive ? '#ffffff' : 'var(--neutral-700)',
              boxShadow: isActive
                ? '0 4px 12px var(--primary-glow)'
                : 'var(--shadow-xs)',
              transition: 'all var(--transition-fast)',
            }}
          >
            <Icon size={16} />
            <span>{cat.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default CategoryFilter;
