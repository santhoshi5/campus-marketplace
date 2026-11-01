import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import requestService from '../api/requestService';
import productService from '../api/productService';
import { StatusBadge } from '../components/common/Badge';
import LoadingSpinner from '../components/common/LoadingSpinner';
import AlertBanner from '../components/common/AlertBanner';
import EmptyState from '../components/common/EmptyState';
import { 
  Store, 
  Check, 
  X, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Mail, 
  Calendar, 
  Package, 
  ExternalLink, 
  PlusCircle, 
  RefreshCw, 
  Trash2,
  Tag,
  AlertCircle,
  HandCoins,
  LogIn
} from 'lucide-react';

const SellerDashboardPage = () => {
  const { user, isAuthenticated } = useAuth();

  const [activeTab, setActiveTab] = useState('requests'); // 'requests' | 'listings'
  const [requests, setRequests] = useState([]);
  const [myProducts, setMyProducts] = useState([]);
  const [productsMap, setProductsMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState(null);
  const [error, setError] = useState(null);
  const [successBanner, setSuccessBanner] = useState(null);
  const [statusFilter, setStatusFilter] = useState('ALL');

  useEffect(() => {
    if (isAuthenticated && user?.email) {
      loadDashboardData();
    }
  }, [user, isAuthenticated]);

  const loadDashboardData = async () => {
    if (!user?.email) return;

    try {
      setLoading(true);
      setError(null);

      // Fetch received requests for this seller: GET /api/requests/seller/{email}
      const sellerRequests = await requestService.getRequestsBySeller(user.email);
      const reqList = Array.isArray(sellerRequests) ? sellerRequests : [];
      setRequests(reqList);

      // Fetch all products to filter seller's own listings and map product details
      const allProducts = await productService.getAllProducts();
      if (Array.isArray(allProducts)) {
        const owned = allProducts.filter(
          (p) => (p.sellerEmail || '').toLowerCase() === user.email.toLowerCase()
        );
        setMyProducts(owned);

        const map = {};
        allProducts.forEach((p) => {
          map[p.id] = p;
        });
        setProductsMap(map);
      }
    } catch (err) {
      console.error('Failed to load seller dashboard data:', err);
      setError(
        err.message ||
        'Failed to connect to backend server. Make sure Spring Boot is running on port 8081.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (requestId, newStatus) => {
    try {
      setActionLoadingId(requestId);
      setError(null);
      // PUT /api/requests/{id}/status?status=ACCEPTED or REJECTED
      await requestService.updateRequestStatus(requestId, newStatus);

      // Update in state
      setRequests((prev) =>
        prev.map((r) => (r.id === requestId ? { ...r, status: newStatus } : r))
      );

      setSuccessBanner(
        `Request #${requestId} marked as ${newStatus}! Refreshing data...`
      );

      // Refresh product/request information after action
      await loadDashboardData();
      setTimeout(() => setSuccessBanner(null), 4000);
    } catch (err) {
      console.error('Failed to update request status:', err);
      setError(err.message || `Failed to update status to ${newStatus}.`);
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleDeleteListing = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this listing?')) return;

    try {
      await productService.deleteProduct(productId);
      setMyProducts((prev) => prev.filter((p) => p.id !== productId));
      setSuccessBanner('Product listing deleted successfully.');
      await loadDashboardData();
      setTimeout(() => setSuccessBanner(null), 3000);
    } catch (err) {
      console.error('Failed to delete product:', err);
      setError(err.message || 'Failed to delete listing.');
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
            <Store size={28} />
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.75rem' }}>
            Seller Portal Login
          </h2>
          <p style={{ color: 'var(--neutral-500)', marginBottom: '1.75rem', lineHeight: 1.5 }}>
            Please sign in with your student account to manage your listings and respond to incoming buyer requests.
          </p>
          <Link
            to="/login"
            state={{ from: { pathname: '/seller-dashboard' } }}
            className="btn btn-primary btn-lg"
            style={{ width: '100%' }}
          >
            <LogIn size={18} /> Sign In to Seller Dashboard
          </Link>
        </div>
      </div>
    );
  }

  // Summary Metrics
  const totalRequests = requests.length;
  const pendingCount = requests.filter((r) => (r.status || '').toUpperCase() === 'PENDING').length;
  const acceptedCount = requests.filter((r) => (r.status || '').toUpperCase() === 'ACCEPTED').length;
  const rejectedCount = requests.filter((r) => (r.status || '').toUpperCase() === 'REJECTED').length;

  const filteredRequests = requests.filter((req) => {
    if (statusFilter === 'ALL') return true;
    return (req.status || '').toUpperCase() === statusFilter;
  });

  return (
    <div className="page-wrapper">
      {/* Header */}
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
            <Store size={14} /> Seller Management Portal
          </div>
          <h1 className="section-title" style={{ fontSize: '1.875rem', marginBottom: '0.25rem' }}>
            Seller Dashboard
          </h1>
          <p style={{ color: 'var(--neutral-500)', fontSize: '0.9375rem' }}>
            Logged in as <strong style={{ color: 'var(--neutral-800)' }}>{user?.email}</strong>
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            onClick={loadDashboardData}
            className="btn btn-secondary btn-sm"
            title="Refresh dashboard"
            disabled={loading}
          >
            <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
            <span>Refresh</span>
          </button>
          <Link to="/add-product" className="btn btn-primary btn-sm">
            <PlusCircle size={16} /> Post New Listing
          </Link>
        </div>
      </div>

      {/* Offline Workflow Guidance */}
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
          <strong>Offline Handover Guide:</strong> Once you <em>Accept</em> a request, the buyer will be provided your student email. Meet in a public campus location (library, cafeteria, department lounge) to hand over the item and receive payment (cash or UPI) directly from the buyer.
        </div>
      </div>

      {/* Metric Cards Row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.25rem',
          marginBottom: '2rem',
        }}
      >
        <div className="card" style={{ padding: '1.25rem', borderLeft: '4px solid var(--primary)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--neutral-400)', textTransform: 'uppercase' }}>
            Received Requests
          </div>
          <div style={{ fontSize: '1.875rem', fontWeight: 800, color: 'var(--neutral-900)', marginTop: '0.25rem' }}>
            {totalRequests}
          </div>
        </div>

        <div className="card" style={{ padding: '1.25rem', borderLeft: '4px solid var(--warning)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--neutral-400)', textTransform: 'uppercase' }}>
            Needs Action (Pending)
          </div>
          <div style={{ fontSize: '1.875rem', fontWeight: 800, color: 'var(--warning)', marginTop: '0.25rem' }}>
            {pendingCount}
          </div>
        </div>

        <div className="card" style={{ padding: '1.25rem', borderLeft: '4px solid var(--success)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--neutral-400)', textTransform: 'uppercase' }}>
            Accepted Deals
          </div>
          <div style={{ fontSize: '1.875rem', fontWeight: 800, color: 'var(--success)', marginTop: '0.25rem' }}>
            {acceptedCount}
          </div>
        </div>

        <div className="card" style={{ padding: '1.25rem', borderLeft: '4px solid var(--secondary)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--neutral-400)', textTransform: 'uppercase' }}>
            Active My Listings
          </div>
          <div style={{ fontSize: '1.875rem', fontWeight: 800, color: 'var(--secondary)', marginTop: '0.25rem' }}>
            {myProducts.length}
          </div>
        </div>
      </div>

      {/* Notifications */}
      {error && <AlertBanner type="error" message={error} onClose={() => setError(null)} />}
      {successBanner && <AlertBanner type="success" message={successBanner} onClose={() => setSuccessBanner(null)} />}

      {/* Main Tabs Navigation */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          borderBottom: '1px solid var(--neutral-200)',
          marginBottom: '1.5rem',
        }}
      >
        <button
          onClick={() => setActiveTab('requests')}
          style={{
            padding: '0.75rem 0.5rem',
            fontSize: '0.9375rem',
            fontWeight: 700,
            background: 'transparent',
            border: 'none',
            borderBottom: activeTab === 'requests' ? '2px solid var(--primary)' : '2px solid transparent',
            color: activeTab === 'requests' ? 'var(--primary)' : 'var(--neutral-500)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <span>Incoming Buyer Requests</span>
          <span
            style={{
              fontSize: '0.75rem',
              padding: '0.1rem 0.45rem',
              borderRadius: 'var(--radius-full)',
              background: activeTab === 'requests' ? 'var(--primary-light)' : 'var(--neutral-100)',
              color: activeTab === 'requests' ? 'var(--primary)' : 'var(--neutral-600)',
            }}
          >
            {totalRequests}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('listings')}
          style={{
            padding: '0.75rem 0.5rem',
            fontSize: '0.9375rem',
            fontWeight: 700,
            background: 'transparent',
            border: 'none',
            borderBottom: activeTab === 'listings' ? '2px solid var(--primary)' : '2px solid transparent',
            color: activeTab === 'listings' ? 'var(--primary)' : 'var(--neutral-500)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <span>My Listed Products</span>
          <span
            style={{
              fontSize: '0.75rem',
              padding: '0.1rem 0.45rem',
              borderRadius: 'var(--radius-full)',
              background: activeTab === 'listings' ? 'var(--primary-light)' : 'var(--neutral-100)',
              color: activeTab === 'listings' ? 'var(--primary)' : 'var(--neutral-600)',
            }}
          >
            {myProducts.length}
          </span>
        </button>
      </div>

      {loading ? (
        <LoadingSpinner message="Fetching seller records from backend..." fullPage />
      ) : activeTab === 'requests' ? (
        /* Requests Section */
        <div>
          {/* Sub Filter Status Pills */}
          <div
            style={{
              display: 'flex',
              gap: '0.5rem',
              marginBottom: '1.25rem',
              flexWrap: 'wrap',
            }}
          >
            {['ALL', 'PENDING', 'ACCEPTED', 'REJECTED'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                style={{
                  padding: '0.35rem 0.85rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: statusFilter === st ? '1px solid var(--neutral-800)' : '1px solid var(--neutral-200)',
                  background: statusFilter === st ? 'var(--neutral-800)' : '#ffffff',
                  color: statusFilter === st ? '#ffffff' : 'var(--neutral-600)',
                }}
              >
                {st === 'ALL' ? 'All Requests' : st}
              </button>
            ))}
          </div>

          {filteredRequests.length === 0 ? (
            <EmptyState
              icon={Store}
              title="No requests received yet"
              description={
                totalRequests === 0
                  ? "When students find your products in the marketplace and send buy requests, they will show up here."
                  : `No ${statusFilter.toLowerCase()} requests.`
              }
              actionLabel="Post Another Product"
              actionLink="/add-product"
            />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {filteredRequests.map((req) => {
                const product = productsMap[req.productId];
                const isPending = (req.status || '').toUpperCase() === 'PENDING';
                const isAccepted = (req.status || '').toUpperCase() === 'ACCEPTED';
                const isRejected = (req.status || '').toUpperCase() === 'REJECTED';
                const isActing = actionLoadingId === req.id;

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
                      borderLeft: isPending
                        ? '4px solid var(--warning)'
                        : isAccepted
                        ? '4px solid var(--success)'
                        : '4px solid var(--neutral-300)',
                    }}
                  >
                    {/* Top Row: Product Reference & Status */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '0.75rem',
                        marginBottom: '1rem',
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
                          {product ? product.title : `Product ID #${req.productId}`}
                        </h3>

                        {product && (
                          <div style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--primary)', marginTop: '0.25rem' }}>
                            ₹{Number(product.price).toLocaleString('en-IN')} (Offline Pay)
                          </div>
                        )}
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <StatusBadge status={req.status} />
                        {product && (
                          <Link
                            to={`/products/${product.id}`}
                            className="btn btn-secondary btn-sm"
                            title="View product details"
                          >
                            <ExternalLink size={14} />
                          </Link>
                        )}
                      </div>
                    </div>

                    {/* Buyer Info & Message */}
                    <div
                      style={{
                        background: 'var(--neutral-50)',
                        padding: '1rem 1.25rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--neutral-200)',
                        marginBottom: '1rem',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.4rem',
                          fontSize: '0.8125rem',
                          fontWeight: 600,
                          color: 'var(--neutral-700)',
                          marginBottom: '0.5rem',
                        }}
                      >
                        <Mail size={15} style={{ color: 'var(--primary)' }} />
                        <span>Buyer Student Email:</span>
                        <a
                          href={`mailto:${req.buyerEmail}?subject=${encodeURIComponent('Campus Marketplace: Response regarding ' + (product?.title || 'your request'))}`}
                          style={{
                            color: 'var(--primary)',
                            textDecoration: 'underline',
                            marginLeft: '0.25rem',
                          }}
                        >
                          {req.buyerEmail}
                        </a>
                      </div>

                      <p
                        style={{
                          fontSize: '0.9375rem',
                          color: 'var(--neutral-800)',
                          lineHeight: 1.5,
                          fontStyle: 'italic',
                        }}
                      >
                        "{req.message || 'No additional message provided.'}"
                      </p>
                    </div>

                    {/* Actions Row */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '1rem',
                        paddingTop: '0.75rem',
                        borderTop: '1px solid var(--neutral-100)',
                      }}
                    >
                      <div style={{ fontSize: '0.75rem', color: 'var(--neutral-400)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <Calendar size={13} />
                        <span>Received: {formattedDate || 'Recently'}</span>
                      </div>

                      {/* Accept & Reject Action Buttons */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                        {isPending && (
                          <>
                            <button
                              onClick={() => handleUpdateStatus(req.id, 'ACCEPTED')}
                              className="btn btn-success btn-sm"
                              disabled={isActing}
                            >
                              <Check size={15} />
                              {isActing ? 'Updating...' : 'Accept Request'}
                            </button>
                            <button
                              onClick={() => handleUpdateStatus(req.id, 'REJECTED')}
                              className="btn btn-outline-danger btn-sm"
                              disabled={isActing}
                            >
                              <X size={15} />
                              {isActing ? 'Updating...' : 'Reject Request'}
                            </button>
                          </>
                        )}

                        {isAccepted && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <span style={{ fontSize: '0.8125rem', color: 'var(--success)', fontWeight: 600 }}>
                              Accepted
                            </span>
                            <button
                              onClick={() => handleUpdateStatus(req.id, 'REJECTED')}
                              className="btn btn-secondary btn-sm"
                              style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
                              disabled={isActing}
                            >
                              Change to Reject
                            </button>
                          </div>
                        )}

                        {isRejected && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <span style={{ fontSize: '0.8125rem', color: 'var(--danger)', fontWeight: 600 }}>
                              Rejected
                            </span>
                            <button
                              onClick={() => handleUpdateStatus(req.id, 'ACCEPTED')}
                              className="btn btn-secondary btn-sm"
                              style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
                              disabled={isActing}
                            >
                              Change to Accept
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        /* My Listed Products Section */
        <div>
          {myProducts.length === 0 ? (
            <EmptyState
              icon={Package}
              title="No products listed yet"
              description="You have not published any items under your student email yet."
              actionLabel="Post an Item for Sale"
              actionLink="/add-product"
            />
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '1.5rem',
              }}
            >
              {myProducts.map((product) => (
                <div
                  key={product.id}
                  className="card"
                  style={{
                    padding: '1.25rem',
                    borderRadius: 'var(--radius-lg)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '0.5rem',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          color: 'var(--neutral-500)',
                        }}
                      >
                        {product.category}
                      </span>
                      <StatusBadge status={product.status || 'AVAILABLE'} />
                    </div>

                    <h4
                      style={{
                        fontSize: '1.0625rem',
                        fontWeight: 700,
                        color: 'var(--neutral-900)',
                        marginBottom: '0.5rem',
                      }}
                    >
                      {product.title}
                    </h4>

                    <div
                      style={{
                        fontSize: '1.25rem',
                        fontWeight: 800,
                        color: 'var(--primary)',
                        marginBottom: '0.5rem',
                      }}
                    >
                      ₹{Number(product.price).toLocaleString('en-IN')}
                    </div>

                    <p
                      style={{
                        fontSize: '0.8125rem',
                        color: 'var(--neutral-500)',
                        lineHeight: 1.4,
                        marginBottom: '1rem',
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                      }}
                    >
                      {product.description || 'No description provided.'}
                    </p>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      borderTop: '1px solid var(--neutral-100)',
                      paddingTop: '0.75rem',
                    }}
                  >
                    <Link
                      to={`/products/${product.id}`}
                      className="btn btn-secondary btn-sm"
                      style={{ flex: 1 }}
                    >
                      View Details
                    </Link>
                    <button
                      onClick={() => handleDeleteListing(product.id)}
                      className="btn btn-outline-danger btn-sm"
                      title="Delete Listing"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SellerDashboardPage;
