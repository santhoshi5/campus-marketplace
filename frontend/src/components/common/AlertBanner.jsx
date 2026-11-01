import React from 'react';
import { AlertCircle, CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';

const AlertBanner = ({ type = 'info', message, onClose }) => {
  if (!message) return null;

  const iconMap = {
    error: <AlertCircle size={20} style={{ flexShrink: 0, marginTop: '2px' }} />,
    success: <CheckCircle2 size={20} style={{ flexShrink: 0, marginTop: '2px' }} />,
    warning: <AlertTriangle size={20} style={{ flexShrink: 0, marginTop: '2px' }} />,
    info: <Info size={20} style={{ flexShrink: 0, marginTop: '2px' }} />,
  };

  return (
    <div className={`alert alert-${type}`} role="alert">
      {iconMap[type] || iconMap.info}
      <div style={{ flex: 1, fontWeight: 500 }}>{message}</div>
      {onClose && (
        <button
          onClick={onClose}
          type="button"
          aria-label="Close notification"
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '2px',
            color: 'inherit',
            opacity: 0.7,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};

export default AlertBanner;
