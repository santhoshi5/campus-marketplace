import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';

const SearchBar = ({ onSearch, initialValue = '', placeholder = 'Search by title, e.g., Engineering Mathematics, iPad, Drafter...' }) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);

  useEffect(() => {
    setSearchTerm(initialValue);
  }, [initialValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm.trim());
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        maxWidth: '720px',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: '1.1rem',
          color: 'var(--neutral-400)',
          display: 'flex',
          alignItems: 'center',
          pointerEvents: 'none',
        }}
      >
        <Search size={20} />
      </div>

      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '0.875rem 6.5rem 0.875rem 3rem',
          fontSize: '0.9375rem',
          color: 'var(--neutral-900)',
          backgroundColor: '#ffffff',
          border: '1px solid var(--neutral-300)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-sm)',
          outline: 'none',
          transition: 'all var(--transition-fast)',
        }}
        onFocus={(e) => {
          e.target.style.borderColor = 'var(--primary)';
          e.target.style.boxShadow = '0 0 0 4px var(--primary-light), var(--shadow-md)';
        }}
        onBlur={(e) => {
          e.target.style.borderColor = 'var(--neutral-300)';
          e.target.style.boxShadow = 'var(--shadow-sm)';
        }}
      />

      {searchTerm && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear search"
          style={{
            position: 'absolute',
            right: '4.8rem',
            background: 'transparent',
            border: 'none',
            color: 'var(--neutral-400)',
            cursor: 'pointer',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <X size={18} />
        </button>
      )}

      <button
        type="submit"
        className="btn btn-primary btn-sm"
        style={{
          position: 'absolute',
          right: '0.5rem',
          borderRadius: 'var(--radius-lg)',
          padding: '0.55rem 1rem',
        }}
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
