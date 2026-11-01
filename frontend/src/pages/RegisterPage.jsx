import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AlertBanner from '../components/common/AlertBanner';
import { UserPlus, User, Mail, Lock, Eye, EyeOff, ShieldCheck, Check } from 'lucide-react';

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!fullName.trim() || !email.trim() || !password) {
      setError('Please fill in all required registration fields.');
      return;
    }

    if (password.length < 4) {
      setError('Password should be at least 4 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please re-enter.');
      return;
    }

    try {
      setSubmitting(true);
      const res = await register(fullName.trim(), email.trim(), password);
      setSuccess(res.message || 'Registration successful! Directing to Marketplace...');
      setTimeout(() => {
        navigate('/marketplace');
      }, 900);
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.message || 'Registration failed. Email might already be taken.');
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
          maxWidth: '500px',
          width: '100%',
          padding: '2.5rem 2rem',
          boxShadow: 'var(--shadow-xl)',
          borderRadius: 'var(--radius-xl)',
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
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
            <UserPlus size={26} />
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--neutral-900)' }}>
            Create Student Account
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--neutral-500)', marginTop: '0.25rem' }}>
            Join your university campus marketplace community
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

        {/* Registration Form */}
        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="form-group">
            <label className="form-label" htmlFor="reg-fullname">
              Full Name
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
                <User size={18} />
              </div>
              <input
                id="reg-fullname"
                type="text"
                className="form-input"
                placeholder="Alex Morgan"
                style={{ paddingLeft: '2.5rem' }}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Student Email */}
          <div className="form-group">
            <label className="form-label" htmlFor="reg-email">
              College Email Address
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
                id="reg-email"
                type="email"
                className="form-input"
                placeholder="alex.morgan@college.edu"
                style={{ paddingLeft: '2.5rem' }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <span className="form-hint">
              Used for buyer inquiries and product request notifications.
            </span>
          </div>

          {/* Password */}
          <div className="form-group">
            <label className="form-label" htmlFor="reg-password">
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
                id="reg-password"
                type={showPassword ? 'text' : 'password'}
                className="form-input"
                placeholder="Create a secure password"
                style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
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

          {/* Confirm Password */}
          <div className="form-group">
            <label className="form-label" htmlFor="reg-confirmpassword">
              Confirm Password
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
                id="reg-confirmpassword"
                type={showPassword ? 'text' : 'password'}
                className="form-input"
                placeholder="Confirm your password"
                style={{ paddingLeft: '2.5rem' }}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn btn-primary btn-block btn-lg"
            style={{ marginTop: '1.5rem' }}
            disabled={submitting}
          >
            {submitting ? (
              'Creating Student Profile...'
            ) : (
              <>
                <UserPlus size={18} /> Register Student Account
              </>
            )}
          </button>
        </form>

        {/* Existing account link */}
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
          Already have an account?{' '}
          <Link
            to="/login"
            style={{
              color: 'var(--primary)',
              fontWeight: 700,
            }}
          >
            Sign In here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
