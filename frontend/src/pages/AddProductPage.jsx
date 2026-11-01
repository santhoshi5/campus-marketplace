import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import productService from '../api/productService';
import AlertBanner from '../components/common/AlertBanner';
import { CATEGORY_OPTIONS } from '../components/marketplace/CategoryFilter';
import { 
  PackagePlus, 
  Tag, 
  DollarSign, 
  FileText, 
  Mail, 
  Sparkles, 
  CheckCircle2, 
  ArrowLeft,
  Info,
  LogIn,
  CameraOff
} from 'lucide-react';

const CONDITION_OPTIONS = [
  { value: 'NEW', label: 'NEW - Brand New / Unopened / Never Used' },
  { value: 'LIKE_NEW', label: 'LIKE_NEW - Barely used, flawless condition' },
  { value: 'GOOD', label: 'GOOD - Normal campus usage, works great' },
  { value: 'FAIR', label: 'FAIR - Noticeable wear, fully functional' },
];

const AddProductPage = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: 'Books',
    productCondition: 'GOOD',
    sellerEmail: user?.email || '',
    status: 'AVAILABLE',
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Auto-fill sellerEmail from logged-in user if available
  useEffect(() => {
    if (user?.email) {
      setFormData((prev) => ({ ...prev, sellerEmail: user.email }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!isAuthenticated) {
      setError('You must be logged in to post a product.');
      return;
    }

    // Validation
    if (!formData.title.trim()) {
      setError('Please provide a title for your product.');
      return;
    }
    if (!formData.price || Number(formData.price) <= 0) {
      setError('Please enter a valid price in INR greater than zero.');
      return;
    }
    if (!formData.sellerEmail.trim()) {
      setError('Seller student email is required so buyers can contact you.');
      return;
    }

    try {
      setSubmitting(true);
      const payload = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        price: parseFloat(formData.price),
        category: formData.category,
        productCondition: formData.productCondition,
        sellerEmail: formData.sellerEmail.trim(),
        status: 'AVAILABLE',
      };

      const created = await productService.addProduct(payload);
      setSuccess('Product listed successfully in the marketplace! Redirecting...');
      setTimeout(() => {
        if (created?.id) {
          navigate(`/products/${created.id}`);
        } else {
          navigate('/marketplace');
        }
      }, 900);
    } catch (err) {
      console.error('Failed to create product:', err);
      setError(
        err.message ||
        'Failed to add product. Please check your backend connection at http://localhost:8081.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="page-wrapper" style={{ maxWidth: '580px', textAlign: 'center', padding: '4rem 1.5rem' }}>
        <div className="card" style={{ padding: '3rem 2rem', borderRadius: 'var(--radius-xl)' }}>
          <div
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'var(--primary-light)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem',
            }}
          >
            <PackagePlus size={28} />
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.75rem' }}>
            Sign In to Sell Items
          </h2>
          <p style={{ color: 'var(--neutral-500)', marginBottom: '1.75rem', lineHeight: 1.5 }}>
            To list products and manage buyer requests on Campus Marketplace, please sign in with your student account.
          </p>
          <Link
            to="/login"
            state={{ from: { pathname: '/add-product' } }}
            className="btn btn-primary btn-lg"
            style={{ width: '100%' }}
          >
            <LogIn size={18} /> Sign In to Continue
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        {/* Navigation breadcrumb */}
        <div style={{ marginBottom: '1.25rem' }}>
          <Link
            to="/marketplace"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.875rem',
              fontWeight: 600,
              color: 'var(--neutral-500)',
            }}
          >
            <ArrowLeft size={16} /> Back to Marketplace
          </Link>
        </div>

        {/* Card Form */}
        <div
          className="card"
          style={{
            padding: '2.5rem 2rem',
            boxShadow: 'var(--shadow-md)',
            borderRadius: 'var(--radius-xl)',
          }}
        >
          {/* Header */}
          <div style={{ marginBottom: '2rem' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.35rem 0.75rem',
                borderRadius: 'var(--radius-full)',
                background: 'var(--primary-light)',
                color: 'var(--primary)',
                fontSize: '0.75rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                marginBottom: '0.75rem',
              }}
            >
              <PackagePlus size={14} /> Sell an Item
            </div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--neutral-900)' }}>
              Post a Product for Sale
            </h1>
            <p style={{ fontSize: '0.9375rem', color: 'var(--neutral-500)', marginTop: '0.25rem' }}>
              Listing will be associated with your student account: <strong>{user?.email}</strong>
            </p>
          </div>

          {/* Offline Handover & Image Info Notice */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              padding: '1rem 1.25rem',
              borderRadius: 'var(--radius-md)',
              background: 'var(--neutral-50)',
              border: '1px solid var(--neutral-200)',
              marginBottom: '1.5rem',
              fontSize: '0.8125rem',
              color: 'var(--neutral-600)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Info size={16} style={{ color: 'var(--primary)', flexShrink: 0 }} />
              <span>
                <strong>Offline Campus Handover:</strong> Campus Marketplace connects students directly. Payment (cash/UPI) and item collection happen directly between you and the buyer on campus.
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neutral-500)' }}>
              <CameraOff size={15} style={{ flexShrink: 0 }} />
              <span>
                Image uploads are not yet supported by the backend. Provide detailed descriptions of book editions, instrument brand, and condition.
              </span>
            </div>
          </div>

          {/* Feedback Banners */}
          {error && (
            <AlertBanner
              type="error"
              message={error}
              onClose={() => setError(null)}
            />
          )}
          {success && (
            <AlertBanner
              type="success"
              message={success}
            />
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Product Title */}
            <div className="form-group">
              <label className="form-label" htmlFor="title">
                Product Title *
              </label>
              <input
                id="title"
                name="title"
                type="text"
                className="form-input"
                placeholder="e.g. Higher Engineering Mathematics by B.S. Grewal (44th Ed.)"
                value={formData.title}
                onChange={handleChange}
                required
              />
              <span className="form-hint">
                Include author, edition, model, or subject for faster search matching.
              </span>
            </div>

            {/* Category & Condition Row */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '1rem',
              }}
            >
              {/* Category */}
              <div className="form-group">
                <label className="form-label" htmlFor="category">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  className="form-select"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  {CATEGORY_OPTIONS.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Product Condition: NEW, LIKE_NEW, GOOD, FAIR */}
              <div className="form-group">
                <label className="form-label" htmlFor="productCondition">
                  Condition *
                </label>
                <select
                  id="productCondition"
                  name="productCondition"
                  className="form-select"
                  value={formData.productCondition}
                  onChange={handleChange}
                  required
                >
                  {CONDITION_OPTIONS.map((cond) => (
                    <option key={cond.value} value={cond.value}>
                      {cond.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Price & Seller Email Row */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '1rem',
              }}
            >
              {/* Price in INR */}
              <div className="form-group">
                <label className="form-label" htmlFor="price">
                  Price in INR (₹) *
                </label>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <div
                    style={{
                      position: 'absolute',
                      left: '0.875rem',
                      color: 'var(--neutral-400)',
                      pointerEvents: 'none',
                      fontWeight: 700,
                    }}
                  >
                    ₹
                  </div>
                  <input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    min="1"
                    className="form-input"
                    placeholder="350.00"
                    style={{ paddingLeft: '2.25rem' }}
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Seller Email */}
              <div className="form-group">
                <label className="form-label" htmlFor="sellerEmail">
                  Seller Email *
                </label>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <div
                    style={{
                      position: 'absolute',
                      left: '0.875rem',
                      color: 'var(--neutral-400)',
                      pointerEvents: 'none',
                      display: 'flex',
                    }}
                  >
                    <Mail size={18} />
                  </div>
                  <input
                    id="sellerEmail"
                    name="sellerEmail"
                    type="email"
                    className="form-input"
                    style={{ paddingLeft: '2.5rem', background: 'var(--neutral-100)', cursor: 'not-allowed' }}
                    value={formData.sellerEmail}
                    readOnly
                    title="Automatically linked to your student login"
                    required
                  />
                </div>
                <span className="form-hint">
                  Auto-linked to your student account.
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="form-group">
              <label className="form-label" htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                className="form-textarea"
                placeholder="Describe the condition, notes or markings, meeting spot preferences on campus (e.g. Central Library, Mech Dept, Hostel 3), etc."
                value={formData.description}
                onChange={handleChange}
                rows={4}
              />
            </div>

            {/* Actions */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: '1rem',
                marginTop: '2rem',
                borderTop: '1px solid var(--neutral-200)',
                paddingTop: '1.5rem',
              }}
            >
              <Link to="/marketplace" className="btn btn-secondary">
                Cancel
              </Link>
              <button
                type="submit"
                className="btn btn-primary btn-lg"
                disabled={submitting}
              >
                {submitting ? (
                  'Publishing Listing...'
                ) : (
                  <>
                    <PackagePlus size={18} /> List Item for Sale
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;
