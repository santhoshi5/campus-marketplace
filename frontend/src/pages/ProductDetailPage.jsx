import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import productService from '../api/productService';
import requestService from '../api/requestService';
import { getCategoryMeta } from '../components/marketplace/ProductCard';
import { StatusBadge, ConditionBadge } from '../components/common/Badge';
import LoadingSpinner from '../components/common/LoadingSpinner';
import AlertBanner from '../components/common/AlertBanner';
import Modal from '../components/common/Modal';
import { 
  ArrowLeft, 
  Send, 
  Mail, 
  Calendar, 
  ShieldCheck, 
  Trash2, 
  Tag, 
  User, 
  AlertCircle,
  CheckCircle2,
  Clock,
  Sparkles,
  MapPin,
  Info,
  DollarSign,
  HandCoins,
  Ban
} from 'lucide-react';

const ProductDetailPage = () => {
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Request Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [buyerEmail, setBuyerEmail] = useState('');
  const [requestMessage, setRequestMessage] = useState('');
  const [submittingRequest, setSubmittingRequest] = useState(false);
  const [requestError, setRequestError] = useState(null);
  const [requestSuccess, setRequestSuccess] = useState(null);

  // Delete State
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  useEffect(() => {
    if (user?.email) {
      setBuyerEmail(user.email);
    }
  }, [user]);

  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await productService.getProductById(id);
      if (!data) {
        setError('Product listing not found or has been removed.');
      } else {
        setProduct(data);
      }
    } catch (err) {
      console.error('Failed to load product:', err);
      setError(
        err.message ||
        'Could not load product details. Please ensure Spring Boot is running at http://localhost:8081.'
      );
    } finally {
      setLoading(false);
    }
  };

  const isOwner = Boolean(
    user?.email &&
    product?.sellerEmail &&
    user.email.toLowerCase() === product.sellerEmail.toLowerCase()
  );

  const isAvailable = (product?.status || 'AVAILABLE').toUpperCase() === 'AVAILABLE';

  const handleOpenRequestModal = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: `/products/${id}` } } });
      return;
    }
    if (isOwner) {
      return;
    }
    if (!isAvailable) {
      return;
    }
    setRequestError(null);
    setRequestSuccess(null);
    setRequestMessage('Hi! I am interested in purchasing this item. Where and when can we meet on campus?');
    setIsModalOpen(true);
  };

  const handleSendRequest = async (e) => {
    e.preventDefault();
    setRequestError(null);
    setRequestSuccess(null);

    const emailToSend = buyerEmail || user?.email;
    if (!emailToSend) {
      setRequestError('Please provide your buyer student email address.');
      return;
    }

    try {
      setSubmittingRequest(true);
      await requestService.createRequest({
        productId: Number(id),
        buyerEmail: emailToSend.trim(),
        message: requestMessage.trim() || 'I am interested in buying this product.',
      });
      setRequestSuccess('Purchase request sent successfully! You can track the status in your My Requests dashboard.');
      setTimeout(() => {
        setIsModalOpen(false);
        navigate('/buyer-requests');
      }, 1400);
    } catch (err) {
      console.error('Failed to send request:', err);
      setRequestError(err.message || 'Failed to submit request. Please try again.');
    } finally {
      setSubmittingRequest(false);
    }
  };

  const handleDeleteProduct = async () => {
    if (!window.confirm('Are you sure you want to delete this listing? This action cannot be undone.')) {
      return;
    }
    try {
      setDeleting(true);
      await productService.deleteProduct(id);
      navigate('/marketplace');
    } catch (err) {
      console.error('Failed to delete product:', err);
      alert(err.message || 'Failed to delete listing.');
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading product details..." fullPage />;
  }

  if (error || !product) {
    return (
      <div className="page-wrapper" style={{ maxWidth: '640px' }}>
        <AlertBanner type="error" message={error || 'Product listing not found.'} />
        <Link to="/marketplace" className="btn btn-secondary">
          <ArrowLeft size={16} /> Back to Marketplace
        </Link>
      </div>
    );
  }

  const meta = getCategoryMeta(product.category);
  const IconComponent = meta.icon;

  const formattedDate = product.createdAt
    ? new Date(product.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Recently';

  return (
    <div className="page-wrapper">
      {/* Top back breadcrumb */}
      <div style={{ marginBottom: '1.5rem' }}>
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

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(300px, 1.2fr) minmax(280px, 0.8fr)',
          gap: '2rem',
          alignItems: 'start',
        }}
      >
        {/* Left Column: Visual Hero, Description & Offline Payment Notice */}
        <div>
          {/* Visual Showcase Banner */}
          <div
            className="card"
            style={{
              height: '300px',
              background: meta.gradient,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              marginBottom: '2rem',
              color: '#ffffff',
              boxShadow: 'var(--shadow-md)',
            }}
          >
            {/* Background geometric accents */}
            <div
              style={{
                position: 'absolute',
                width: '260px',
                height: '260px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.1)',
                top: '-70px',
                right: '-70px',
              }}
            />
            <div
              style={{
                position: 'absolute',
                width: '180px',
                height: '180px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.08)',
                bottom: '-50px',
                left: '-50px',
              }}
            />

            <div
              style={{
                width: '90px',
                height: '90px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.22)',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
              }}
            >
              <IconComponent size={48} />
            </div>

            <div
              style={{
                fontSize: '1.25rem',
                fontWeight: 700,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              {product.category || 'Product'}
            </div>

            <div
              style={{
                position: 'absolute',
                bottom: '1rem',
                left: '1.25rem',
                display: 'flex',
                gap: '0.5rem',
              }}
            >
              <StatusBadge status={product.status || 'AVAILABLE'} />
            </div>
          </div>

          {/* Offline Payment Information Callout */}
          <div
            style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderLeft: '4px solid var(--primary)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.25rem 1.5rem',
              marginBottom: '2rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <HandCoins size={20} style={{ color: 'var(--primary)' }} />
              <h4 style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--neutral-900)' }}>
                Offline Payment & Campus Handover Workflow
              </h4>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--neutral-600)', lineHeight: 1.55 }}>
              Campus Marketplace connects students directly and <strong>does not process online payments or deliveries</strong>. When you send a <em>Request to Buy</em>, the seller can accept your request. Once accepted, you arrange an in-person campus meeting (e.g. library, cafeteria, or hostel lounge) to inspect the item and conclude payment via cash or UPI directly.
            </p>
          </div>

          {/* Detailed Description Card */}
          <div
            className="card"
            style={{
              padding: '2rem',
              borderRadius: 'var(--radius-xl)',
            }}
          >
            <h3
              style={{
                fontSize: '1.25rem',
                fontWeight: 700,
                color: 'var(--neutral-900)',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <Tag size={18} style={{ color: 'var(--primary)' }} />
              About This Item
            </h3>

            <p
              style={{
                fontSize: '1rem',
                color: 'var(--neutral-700)',
                lineHeight: 1.7,
                whiteSpace: 'pre-wrap',
                marginBottom: '2rem',
              }}
            >
              {product.description || 'The seller did not provide a detailed description for this item.'}
            </p>

            {/* Product Specifications Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                gap: '1rem',
                background: 'var(--neutral-50)',
                padding: '1.25rem',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--neutral-200)',
              }}
            >
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--neutral-400)', fontWeight: 600 }}>
                  CATEGORY
                </span>
                <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--neutral-800)', marginTop: '2px' }}>
                  {product.category}
                </div>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--neutral-400)', fontWeight: 600 }}>
                  CONDITION
                </span>
                <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--neutral-800)', marginTop: '2px' }}>
                  {product.productCondition}
                </div>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--neutral-400)', fontWeight: 600 }}>
                  AVAILABILITY
                </span>
                <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: isAvailable ? 'var(--success)' : 'var(--danger)', marginTop: '2px' }}>
                  {product.status || 'AVAILABLE'}
                </div>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--neutral-400)', fontWeight: 600 }}>
                  POSTED ON
                </span>
                <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--neutral-800)', marginTop: '2px' }}>
                  {formattedDate}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Pricing, Seller Info & Action Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Main Action Box */}
          <div
            className="card"
            style={{
              padding: '2rem',
              borderRadius: 'var(--radius-xl)',
              boxShadow: 'var(--shadow-lg)',
              border: '1px solid var(--neutral-200)',
            }}
          >
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <ConditionBadge condition={product.productCondition} />
                <span style={{ fontSize: '0.75rem', color: 'var(--neutral-400)' }}>
                  Listing ID #{product.id}
                </span>
              </div>
              <h1
                style={{
                  fontSize: '1.625rem',
                  fontWeight: 800,
                  color: 'var(--neutral-900)',
                  lineHeight: 1.25,
                }}
              >
                {product.title}
              </h1>
            </div>

            {/* Price Tag in INR */}
            <div
              style={{
                background: 'var(--primary-light)',
                padding: '1rem 1.25rem',
                borderRadius: 'var(--radius-lg)',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--primary-dark)' }}>
                  Price (INR)
                </span>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)' }}>
                  ₹{Number(product.price).toLocaleString('en-IN')}
                </div>
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--neutral-500)' }}>
                Offline Direct Pay
              </span>
            </div>

            {/* Action Buttons with Safety Validations */}
            {isOwner ? (
              /* Seller viewing own product */
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div
                  style={{
                    padding: '0.875rem',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--warning-bg)',
                    border: '1px solid var(--warning-border)',
                    color: 'var(--warning-text)',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    textAlign: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <Ban size={16} />
                  <span>You are the seller of this listing. You cannot purchase your own product.</span>
                </div>
                <Link to="/seller-dashboard" className="btn btn-primary btn-block">
                  Go to Seller Dashboard
                </Link>
                <button
                  onClick={handleDeleteProduct}
                  className="btn btn-outline-danger btn-block"
                  disabled={deleting}
                >
                  <Trash2 size={16} /> {deleting ? 'Deleting...' : 'Delete Listing'}
                </button>
              </div>
            ) : !isAvailable ? (
              /* Unavailable product */
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div
                  style={{
                    padding: '0.875rem',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--neutral-100)',
                    border: '1px solid var(--neutral-300)',
                    color: 'var(--neutral-600)',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    textAlign: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <AlertCircle size={16} />
                  <span>This product is currently unavailable or already sold.</span>
                </div>
                <button
                  className="btn btn-secondary btn-block btn-lg"
                  disabled
                  style={{ opacity: 0.5, cursor: 'not-allowed' }}
                >
                  Request to Buy (Unavailable)
                </button>
              </div>
            ) : (
              /* Available product: Request to Buy */
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <button
                  onClick={handleOpenRequestModal}
                  className="btn btn-primary btn-block btn-lg"
                  style={{ fontWeight: 700 }}
                >
                  <Send size={18} /> Request to Buy
                </button>

                {!isAuthenticated && (
                  <p
                    style={{
                      fontSize: '0.75rem',
                      color: 'var(--neutral-500)',
                      textAlign: 'center',
                      marginTop: '0.25rem',
                    }}
                  >
                    You will be prompted to log in to submit a buy request.
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Seller Information Card */}
          <div
            className="card"
            style={{
              padding: '1.5rem',
              borderRadius: 'var(--radius-xl)',
            }}
          >
            <h4
              style={{
                fontSize: '0.9375rem',
                fontWeight: 700,
                color: 'var(--neutral-900)',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
              }}
            >
              <User size={16} style={{ color: 'var(--primary)' }} />
              Seller Contact Information
            </h4>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: 'var(--primary-light)',
                  color: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '1.125rem',
                  flexShrink: 0,
                }}
              >
                {(product.sellerEmail || 'S')[0].toUpperCase()}
              </div>
              <div style={{ overflow: 'hidden' }}>
                <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--neutral-800)' }}>
                  Student Seller
                </div>
                <div
                  style={{
                    fontSize: '0.8125rem',
                    color: 'var(--neutral-500)',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                  }}
                  title={product.sellerEmail}
                >
                  {product.sellerEmail}
                </div>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                paddingTop: '0.75rem',
                borderTop: '1px solid var(--neutral-100)',
                fontSize: '0.8125rem',
                color: 'var(--neutral-600)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShieldCheck size={16} style={{ color: 'var(--success)' }} />
                <span>Verified Campus Student Listing</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={16} style={{ color: 'var(--neutral-400)' }} />
                <span>Offline exchange arranged on campus</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Send Purchase Request Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Send Request to Buy"
        footer={
          <>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setIsModalOpen(false)}
              disabled={submittingRequest}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSendRequest}
              disabled={submittingRequest}
            >
              {submittingRequest ? (
                'Submitting Request...'
              ) : (
                <>
                  <Send size={16} /> Submit Buy Request
                </>
              )}
            </button>
          </>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {requestError && <AlertBanner type="error" message={requestError} />}
          {requestSuccess && <AlertBanner type="success" message={requestSuccess} />}

          <div
            style={{
              padding: '0.875rem',
              borderRadius: 'var(--radius-md)',
              background: 'var(--neutral-50)',
              border: '1px solid var(--neutral-200)',
            }}
          >
            <div style={{ fontSize: '0.75rem', color: 'var(--neutral-500)', fontWeight: 600 }}>
              REQUESTING ITEM
            </div>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--neutral-900)' }}>
              {product.title}
            </div>
            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--primary)', marginTop: '2px' }}>
              ₹{Number(product.price).toLocaleString('en-IN')} (Offline Payment)
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" htmlFor="buyerEmail">
              Your Student Email (Buyer) *
            </label>
            <input
              id="buyerEmail"
              type="email"
              className="form-input"
              value={buyerEmail}
              onChange={(e) => setBuyerEmail(e.target.value)}
              placeholder="your.email@college.edu"
              required
            />
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" htmlFor="requestMessage">
              Message for Seller (Optional)
            </label>
            <textarea
              id="requestMessage"
              className="form-textarea"
              rows={4}
              value={requestMessage}
              onChange={(e) => setRequestMessage(e.target.value)}
              placeholder="e.g., Hi! I am interested in purchasing this. Can we meet near the central library tomorrow around 3 PM?"
            />
            <span className="form-hint">
              Optional: suggest a meeting spot on campus or your preferred times.
            </span>
          </div>
        </div>
      </Modal>

      {/* Responsive layout breakpoint */}
      <style>{`
        @media (max-width: 860px) {
          .page-wrapper > div:nth-child(2) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductDetailPage;
