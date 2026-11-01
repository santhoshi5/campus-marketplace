import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import requestService from '../api/requestService';
import productService from '../api/productService';
import { StatusBadge } from '../components/common/Badge';
import LoadingSpinner from '../components/common/LoadingSpinner';
import AlertBanner from '../components/common/AlertBanner';
import EmptyState from '../components/common/EmptyState';
import { 
  Send, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Calendar, 
  ExternalLink, 
  ShoppingBag,
  MessageSquare, 
  LogIn,
  RefreshCw,
  Tag,
  Mail,
  HandCoins,
  Info
} from 'lucide-react';

const BuyerRequestsPage = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [requests, setRequests] = useState([]);
  const [productsMap, setProductsMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState('ALL'); // 'ALL' | 'PENDING' | 'ACCEPTED' | 'REJECTED'

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }
    fetchBuyerRequests();
  }, [user, isAuthenticated]);

  const fetchBuyerRequests = async () => {
    if (!user?.email) return;

    try {
      setLoading(true);
      setError(null);
      // Fetch buyer requests from backend: GET /api/requests/buyer/{email}
      const data = await requestService.getRequestsByBuyer(user.email);
      const reqList = Array.isArray(data) ? data : [];
      setRequests(reqList);

      // Fetch product details for these requests using existing GET /api/products/{id}
      if (reqList.length > 0) {
        const uniqueProductIds = [...new Set(reqList.map((r) => r.productId).filter(Boolean))];
        const productPromises = uniqueProductIds.map(async (pId) => {
          try {
            const p = await productService.getProductById(pId);
            return { id: pId, product: p };
          } catch {
            return { id: pId, product: null };
          }
        });

        const results = await Promise.all(productPromises);
        const map = {};
        results.forEach((res) => {
          if (res.product) {
            map[res.id] = res.product;
          }
        });
        setProductsMap(map);
      }
    } catch (err) {
      console.error('Failed to load buyer requests:', err);
      setError(
        err.message ||
        'Failed to fetch buyer requests. Verify Spring Boot is running on port 8081.'
      );
    } finally {
      setLoading(false);
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
            <Send size={28} />
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.75rem' }}>
            My Requests Portal
          </h2>
          <p style={{ color: 'var(--neutral-500)', marginBottom: '1.75rem', lineHeight: 1.5 }}>
            Please log in with your campus student account to track your sent buy requests and responses.
          </p>
          <Link
            to="/login"
            state={{ from: { pathname: '/buyer-requests' } }}
            className="btn btn-primary btn-lg"
            style={{ width: '100%' }}
          >
            <LogIn size={18} /> Sign In to View Requests
          </Link>
        </div>
      </div>
    );
  }

  const filteredRequests = requests.filter((req) => {
    if (statusFilter === 'ALL') return true;
    return (req.status || '').toUpperCase() === statusFilter;
  });

  return (
    <div className="page-wrapper">
      {/* Page Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '1.5rem',
        }}
      >
        <div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              color: 'var(--primary)',
              marginBottom: '0.25rem',
            }}
          >
            <Send size={14} /> My Buy Activity
          </div>
          <h1 className="section-title" style={{ fontSize: '1.875rem', marginBottom: '0.25rem' }}>
            My Requests
          </h1>
          <p style={{ color: 'var(--neutral-500)', fontSize: '0.9375rem' }}>
            Track requests sent from <strong style={{ color: 'var(--neutral-800)' }}>{user?.email}</strong>
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            onClick={fetchBuyerRequests}
            className="btn btn-secondary btn-sm"
            title="Refresh requests"
            disabled={loading}
          >
            <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
            <span>Refresh</span>
          </button>
          <Link to="/marketplace" className="btn btn-primary btn-sm">
            <ShoppingBag size={16} /> Explore Marketplace
          </Link>
        </div>
      </div>

      {/* Offline Payment Policy Notice */}
      <div
        style={{
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderLeft: '4px solid var(--primary)',
          borderRadius: 'var(--radius-md)',
          padding: '0.875rem 1.25rem',
          marginBottom: '1.5rem',
          fontSize: '0.8125rem',
          color: 'var(--neutral-600)',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '0.75rem',
        }}
      >
        <HandCoins size={18} style={{ color: 'var(--primary)', flexShrink: 0, marginTop: '2px' }} />
        <div>
          <strong>Campus Offline Handover Policy:</strong> Campus Marketplace only connects buyers and sellers and does not handle payments or delivery. When a seller accepts your request, reach out to them directly to arrange a safe in-person meeting on campus and pay via cash or UPI outside the application.
        </div>
      </div>

      {/* Filter Tabs */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          borderBottom: '1px solid var(--neutral-200)',
          paddingBottom: '0.75rem',
          marginBottom: '1.5rem',
          overflowX: 'auto',
        }}
      >
        {[
          { id: 'ALL', label: 'All Requests', count: requests.length },
          {
            id: 'PENDING',
            label: 'Pending',
            count: requests.filter((r) => (r.status || '').toUpperCase() === 'PENDING').length,
          },
          {
            id: 'ACCEPTED',
            label: 'Accepted',
            count: requests.filter((r) => (r.status || '').toUpperCase() === 'ACCEPTED').length,
          },
          {
            id: 'REJECTED',
            label: 'Rejected',
            count: requests.filter((r) => (r.status || '').toUpperCase() === 'REJECTED').length,
          },
        ].map((tab) => {
          const isActive = statusFilter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.875rem',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                background: isActive ? 'var(--neutral-900)' : 'transparent',
                color: isActive ? '#ffffff' : 'var(--neutral-600)',
                transition: 'all var(--transition-fast)',
              }}
            >
              <span>{tab.label}</span>
              <span
                style={{
                  fontSize: '0.75rem',
                  padding: '0.1rem 0.45rem',
                  borderRadius: 'var(--radius-full)',
                  background: isActive ? 'rgba(255, 255, 255, 0.2)' : 'var(--neutral-200)',
                  color: isActive ? '#ffffff' : 'var(--neutral-700)',
                }}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Error Banner */}
      {error && <AlertBanner type="error" message={error} onClose={() => setError(null)} />}

      {/* Requests List */}
      {loading ? (
        <LoadingSpinner message="Loading your requests from backend..." fullPage />
      ) : filteredRequests.length === 0 ? (
        <EmptyState
          icon={Send}
          title={
            statusFilter === 'ALL'
              ? 'No purchase requests found'
              : `No ${statusFilter.toLowerCase()} requests`
          }
          description="Browse campus listings and send a Request to Buy to connect with student sellers."
          actionLabel="Browse Marketplace"
          actionLink="/marketplace"
        />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {filteredRequests.map((req) => {
            const product = productsMap[req.productId];
            const isAccepted = (req.status || '').toUpperCase() === 'ACCEPTED';
            const isRejected = (req.status || '').toUpperCase() === 'REJECTED';
            const isPending = (req.status || '').toUpperCase() === 'PENDING';

            const formattedDate = req.createdAt
              ? new Date(req.createdAt).toLocaleString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })
              : null;

            return (
              <div
                key={req.id}
                className="card"
                style={{
                  padding: '1.5rem',
                  borderRadius: 'var(--radius-lg)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  borderLeft: isAccepted
                    ? '4px solid var(--success)'
                    : isRejected
                    ? '4px solid var(--danger)'
                    : '4px solid var(--warning)',
                }}
              >
                {/* Header: Product Title, Price, Status */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '0.75rem',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--neutral-400)', fontWeight: 600 }}>
                        REQUEST #{req.id} &bull; PRODUCT ID #{req.productId}
                      </span>
                      {product && (
                        <span
                          style={{
                            fontSize: '0.75rem',
                            padding: '0.15rem 0.5rem',
                            borderRadius: 'var(--radius-sm)',
                            background: 'var(--neutral-100)',
                            color: 'var(--neutral-600)',
                            fontWeight: 600,
                          }}
                        >
                          {product.category}
                        </span>
                      )}
                    </div>

                    <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--neutral-900)' }}>
                      {product ? product.title : `Product #${req.productId}`}
                    </h3>

                    {product && (
                      <div
                        style={{
                          fontSize: '1.125rem',
                          fontWeight: 800,
                          color: 'var(--primary)',
                          marginTop: '0.25rem',
                        }}
                      >
                        ₹{Number(product.price).toLocaleString('en-IN')}
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <StatusBadge status={req.status} />
                    {product && (
                      <Link
                        to={`/products/${product.id}`}
                        className="btn btn-secondary btn-sm"
                        title="View Product Details"
                      >
                        <span>View Item</span>
                        <ExternalLink size={14} />
                      </Link>
                    )}
                  </div>
                </div>

                {/* Message Box */}
                <div
                  style={{
                    background: 'var(--neutral-50)',
                    padding: '1rem 1.25rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--neutral-200)',
                  }}
                >
                  <div
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: 'var(--neutral-500)',
                      textTransform: 'uppercase',
                      marginBottom: '0.25rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                    }}
                  >
                    <MessageSquare size={13} /> Your Sent Message:
                  </div>
                  <p style={{ fontSize: '0.9375rem', color: 'var(--neutral-800)', lineHeight: 1.5 }}>
                    "{req.message || 'No additional message.'}"
                  </p>
                </div>

                {/* Status Guidance Banner */}
                {isAccepted && (
                  <div
                    style={{
                      background: 'var(--success-bg)',
                      border: '1px solid var(--success-border)',
                      color: 'var(--success-text)',
                      padding: '1rem 1.25rem',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.875rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.5rem',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700 }}>
                      <CheckCircle size={18} />
                      <span>Your request has been accepted! Contact the seller to arrange payment and collect your item.</span>
                    </div>

                    {product?.sellerEmail ? (
                      <div
                        style={{
                          background: '#ffffff',
                          padding: '0.625rem 0.875rem',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid var(--success-border)',
                          marginTop: '0.25rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          color: 'var(--neutral-800)',
                        }}
                      >
                        <Mail size={16} style={{ color: 'var(--success)' }} />
                        <span>
                          <strong>Seller Contact Email:</strong>{' '}
                          <a
                            href={`mailto:${product.sellerEmail}?subject=${encodeURIComponent('Campus Marketplace: Buy Request for ' + product.title)}`}
                            style={{
                              color: 'var(--primary)',
                              textDecoration: 'underline',
                              fontWeight: 700,
                            }}
                          >
                            {product.sellerEmail}
                          </a>
                        </span>
                      </div>
                    ) : (
                      <p style={{ fontSize: '0.8125rem', color: 'var(--neutral-600)' }}>
                        Contact the seller via their registered college email address to agree on a time and spot on campus.
                      </p>
                    )}

                    <div style={{ fontSize: '0.75rem', color: 'var(--neutral-500)', marginTop: '0.25rem' }}>
                      <em>Arrange payment (cash or UPI) directly upon item inspection. No payment is processed through this app.</em>
                    </div>
                  </div>
                )}

                {isRejected && (
                  <div
                    style={{
                      background: 'var(--danger-bg)',
                      border: '1px solid var(--danger-border)',
                      color: 'var(--danger-text)',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.875rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    <XCircle size={18} />
                    <span>This request was declined by the seller or the item may have been sold.</span>
                  </div>
                )}

                {isPending && (
                  <div
                    style={{
                      background: 'var(--warning-bg)',
                      border: '1px solid var(--warning-border)',
                      color: 'var(--warning-text)',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.8125rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    <Clock size={16} />
                    <span>Awaiting seller review. The seller will review your request and accept or reject.</span>
                  </div>
                )}

                {/* Footer Info */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '0.75rem',
                    color: 'var(--neutral-400)',
                    borderTop: '1px solid var(--neutral-100)',
                    paddingTop: '0.5rem',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                  }}
                >
                  <div>Sent by: {req.buyerEmail}</div>
                  {formattedDate && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Calendar size={13} />
                      <span>{formattedDate}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BuyerRequestsPage;
