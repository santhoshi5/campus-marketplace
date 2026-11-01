import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import productService from '../api/productService';
import ProductCard from '../components/marketplace/ProductCard';
import CategoryFilter from '../components/marketplace/CategoryFilter';
import SearchBar from '../components/marketplace/SearchBar';
import LoadingSpinner from '../components/common/LoadingSpinner';
import AlertBanner from '../components/common/AlertBanner';
import EmptyState from '../components/common/EmptyState';
import { 
  SlidersHorizontal, 
  PlusCircle, 
  RefreshCw, 
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Info
} from 'lucide-react';

const MarketplacePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // URL state
  const activeCategory = searchParams.get('category') || '';
  const activeSearch = searchParams.get('search') || '';

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('newest'); // 'newest' | 'price-asc' | 'price-desc'
  const [availabilityFilter, setAvailabilityFilter] = useState('all'); // 'all' | 'available'

  useEffect(() => {
    fetchProducts();
  }, [activeSearch, activeCategory]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      let data = [];

      if (activeSearch.trim()) {
        // Backend GET /api/products/search?title={title}
        data = await productService.searchProducts(activeSearch.trim());
        // If a category is also selected, filter in memory
        if (activeCategory) {
          data = data.filter(
            (p) => (p.category || '').toLowerCase() === activeCategory.toLowerCase()
          );
        }
      } else if (activeCategory) {
        // Backend GET /api/products/category/{category}
        try {
          data = await productService.getProductsByCategory(activeCategory);
        } catch {
          data = [];
        }

        // Case-resilient fallback: If 0 items returned (e.g. casing difference in backend repository query), fetch all and filter case-insensitively
        if (!data || data.length === 0) {
          const all = await productService.getAllProducts();
          data = (all || []).filter(
            (p) => (p.category || '').toLowerCase() === activeCategory.toLowerCase()
          );
        }
      } else {
        // Backend GET /api/products
        data = await productService.getAllProducts();
      }

      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to load marketplace products:', err);
      setError(
        err.message ||
        'Could not fetch products from backend. Please verify Spring Boot is running on port 8081.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (term) => {
    const newParams = new URLSearchParams(searchParams);
    if (term) {
      newParams.set('search', term);
    } else {
      newParams.delete('search');
    }
    setSearchParams(newParams);
  };

  const handleSelectCategory = (catId) => {
    const newParams = new URLSearchParams(searchParams);
    if (catId) {
      newParams.set('category', catId);
    } else {
      newParams.delete('category');
    }
    setSearchParams(newParams);
  };

  const handleResetFilters = () => {
    setSearchParams(new URLSearchParams());
    setSortBy('newest');
    setAvailabilityFilter('all');
  };

  // Filter by availability if requested
  const filteredProducts = products.filter((p) => {
    if (availabilityFilter === 'available') {
      return (p.status || 'AVAILABLE').toUpperCase() === 'AVAILABLE';
    }
    return true;
  });

  // Sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') {
      return Number(a.price) - Number(b.price);
    }
    if (sortBy === 'price-desc') {
      return Number(b.price) - Number(a.price);
    }
    // Newest: prefer createdAt if present, fallback to ID descending
    if (a.createdAt && b.createdAt) {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    return (b.id || 0) - (a.id || 0);
  });

  return (
    <div className="page-wrapper">
      {/* Header Banner */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          marginBottom: '2rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div>
            <h1 className="section-title" style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>
              Campus Marketplace
            </h1>
            <p style={{ color: 'var(--neutral-500)', fontSize: '0.9375rem' }}>
              Discover textbooks, tech gear, and campus essentials posted by college peers
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              onClick={fetchProducts}
              className="btn btn-secondary btn-sm"
              title="Refresh listings"
              disabled={loading}
            >
              <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
              <span>Refresh</span>
            </button>
            <Link to="/add-product" className="btn btn-primary btn-sm">
              <PlusCircle size={16} /> Post Listing
            </Link>
          </div>
        </div>

        {/* Offline Payment Transparency Alert */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.625rem',
            padding: '0.75rem 1rem',
            background: 'var(--neutral-50)',
            border: '1px solid var(--neutral-200)',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.8125rem',
            color: 'var(--neutral-600)',
          }}
        >
          <Info size={16} style={{ color: 'var(--primary)', flexShrink: 0 }} />
          <span>
            <strong>Peer-to-Peer Campus Trading:</strong> Campus Marketplace connects student buyers and sellers directly. Payment is completed in person (cash or UPI) upon item inspection on campus.
          </span>
        </div>

        {/* Search bar & Controls row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ flex: 1, minWidth: '280px' }}>
            <SearchBar
              onSearch={handleSearch}
              initialValue={activeSearch}
              placeholder="Search listings by title (e.g. Java Programming, Calculus, Drafter, iPad)..."
            />
          </div>

          {/* Availability Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <label
              htmlFor="avail-select"
              style={{
                fontSize: '0.875rem',
                fontWeight: 600,
                color: 'var(--neutral-600)',
              }}
            >
              Availability:
            </label>
            <select
              id="avail-select"
              value={availabilityFilter}
              onChange={(e) => setAvailabilityFilter(e.target.value)}
              className="form-select"
              style={{
                width: 'auto',
                padding: '0.5rem 0.85rem',
                fontSize: '0.875rem',
                borderRadius: 'var(--radius-lg)',
              }}
            >
              <option value="all">All Items</option>
              <option value="available">Available Only</option>
            </select>
          </div>

          {/* Sort Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <label
              htmlFor="sort-select"
              style={{
                fontSize: '0.875rem',
                fontWeight: 600,
                color: 'var(--neutral-600)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
              }}
            >
              <SlidersHorizontal size={14} /> Sort:
            </label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="form-select"
              style={{
                width: 'auto',
                padding: '0.5rem 0.85rem',
                fontSize: '0.875rem',
                borderRadius: 'var(--radius-lg)',
              }}
            >
              <option value="newest">Recently Listed</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Categories Filter Pills */}
      <CategoryFilter
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
      />

      {/* Active Filter Summary Tags */}
      {(activeSearch || activeCategory || availabilityFilter !== 'all') && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '1.5rem',
            flexWrap: 'wrap',
          }}
        >
          <span style={{ fontSize: '0.875rem', color: 'var(--neutral-500)', fontWeight: 600 }}>
            Active filters:
          </span>
          {activeSearch && (
            <span
              style={{
                fontSize: '0.8125rem',
                padding: '0.2rem 0.6rem',
                borderRadius: 'var(--radius-full)',
                background: 'var(--neutral-200)',
                color: 'var(--neutral-800)',
                fontWeight: 500,
              }}
            >
              Search: "{activeSearch}"
            </span>
          )}
          {activeCategory && (
            <span
              style={{
                fontSize: '0.8125rem',
                padding: '0.2rem 0.6rem',
                borderRadius: 'var(--radius-full)',
                background: 'var(--primary-light)',
                color: 'var(--primary)',
                fontWeight: 600,
              }}
            >
              Category: {activeCategory}
            </span>
          )}
          {availabilityFilter === 'available' && (
            <span
              style={{
                fontSize: '0.8125rem',
                padding: '0.2rem 0.6rem',
                borderRadius: 'var(--radius-full)',
                background: 'var(--success-bg)',
                color: 'var(--success-text)',
                fontWeight: 600,
              }}
            >
              Available Only
            </span>
          )}
          <button
            onClick={handleResetFilters}
            className="btn btn-secondary btn-sm"
            style={{
              padding: '0.2rem 0.6rem',
              fontSize: '0.75rem',
              height: 'auto',
            }}
          >
            <RotateCcw size={12} /> Clear all filters
          </button>
        </div>
      )}

      {/* Error Banner */}
      {error && (
        <AlertBanner
          type="error"
          message={error}
          onClose={() => setError(null)}
        />
      )}

      {/* Product Grid Area */}
      {loading ? (
        <LoadingSpinner message="Fetching campus marketplace listings from backend..." fullPage />
      ) : sortedProducts.length === 0 ? (
        <EmptyState
          title="No products found"
          description={
            activeSearch || activeCategory || availabilityFilter !== 'all'
              ? "We couldn't find any products matching your active filters. Try another category or keyword."
              : 'There are currently no active products in the marketplace.'
          }
          actionLabel={activeSearch || activeCategory || availabilityFilter !== 'all' ? 'Reset Filters' : 'Post an Item for Sale'}
          actionLink={activeSearch || activeCategory || availabilityFilter !== 'all' ? null : '/add-product'}
          onAction={activeSearch || activeCategory || availabilityFilter !== 'all' ? handleResetFilters : null}
        />
      ) : (
        <>
          <div
            style={{
              fontSize: '0.875rem',
              color: 'var(--neutral-500)',
              marginBottom: '1rem',
              fontWeight: 600,
            }}
          >
            Showing {sortedProducts.length} {sortedProducts.length === 1 ? 'listing' : 'listings'}
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MarketplacePage;
