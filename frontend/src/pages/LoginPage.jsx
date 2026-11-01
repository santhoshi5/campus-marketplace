import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AlertBanner from '../components/common/AlertBanner';
import { LogIn, Mail, Lock, Eye, EyeOff, ShoppingBag, ArrowRight } from 'lucide-react';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Return to page user wanted to visit before login
  const from = location.state?.from?.pathname || '/marketplace';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!email || !password) {
      setError('Please fill in both your student email and password.');
      return;
    }

    try {
      setSubmitting(true);
      const res = await login(email.trim(), password);
      setSuccess(res.message || 'Login successful! Redirecting...');
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 700);
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Invalid email or password. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      style={{
        minHeight: 'calc(100vh - 160px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2.5rem 1.5rem',
      }}
    >
      <div
        className="card"
        style={{
          maxWidth: '460px',
          width: '100%',
          padding: '2.5rem 2rem',
          boxShadow: 'var(--shadow-xl)',
          borderRadius: 'var(--radius-xl)',
        }}
      >
        {/* Header with Brand Icon */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '16px',
              background: 'var(--gradient-brand)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
              boxShadow: '0 6px 16px var(--primary-glow)',
            }}
          >
            <ShoppingBag size={26} />
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--neutral-900)' }}>
            Welcome Back
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--neutral-500)', marginTop: '0.25rem' }}>
            Sign in to your campus marketplace student account
          </p>
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

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="login-email">
              Student Email
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
                id="login-email"
                type="email"
                className="form-input"
                placeholder="student@college.edu"
                style={{ paddingLeft: '2.5rem' }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="login-password">
              Password
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
                <Lock size={18} />
              </div>
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                className="form-input"
                placeholder="Enter your password"
                style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                style={{
                  position: 'absolute',
                  right: '0.875rem',
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--neutral-400)',
                  cursor: 'pointer',
                  padding: '2px',
                  display: 'flex',
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block btn-lg"
            style={{ marginTop: '1.25rem' }}
            disabled={submitting}
          >
            {submitting ? (
              'Authenticating...'
            ) : (
              <>
                <LogIn size={18} /> Sign In
              </>
            )}
          </button>
        </form>

        {/* Footer Link */}
        <div
          style={{
            marginTop: '1.75rem',
            textAlign: 'center',
            fontSize: '0.875rem',
            color: 'var(--neutral-600)',
            borderTop: '1px solid var(--neutral-200)',
            paddingTop: '1.25rem',
          }}
        >
          Don't have an account yet?{' '}
          <Link
            to="/register"
            style={{
              color: 'var(--primary)',
              fontWeight: 700,
            }}
          >
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
