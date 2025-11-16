import React from 'react';

function Modal({ isOpen, onClose, children, type = 'default' }) {
  if (!isOpen) return null;

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    backdropFilter: 'blur(10px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    animation: 'fadeIn 0.3s ease-out',
    padding: '2rem'
  };

  const getModalStyle = () => {
    const baseStyle = {
      position: 'relative',
      borderRadius: '2rem',
      padding: '3rem',
      maxWidth: '600px',
      width: '100%',
      animation: 'scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
      boxShadow: '0 30px 60px rgba(0, 0, 0, 0.5)',
      border: '2px solid'
    };

    if (type === 'celebration') {
      return {
        ...baseStyle,
        background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.95), rgba(245, 158, 11, 0.95))',
        borderColor: '#fbbf24',
        boxShadow: `
          0 30px 60px rgba(251, 191, 36, 0.4),
          0 0 100px rgba(251, 191, 36, 0.3),
          inset 0 1px 0 rgba(255, 255, 255, 0.3)
        `
      };
    } else if (type === 'answer') {
      return {
        ...baseStyle,
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.98), rgba(30, 41, 59, 0.98))',
        borderColor: '#0ea5e9',
        boxShadow: `
          0 30px 60px rgba(14, 165, 233, 0.4),
          0 0 80px rgba(14, 165, 233, 0.2),
          inset 0 1px 0 rgba(255, 255, 255, 0.1)
        `
      };
    }
    return baseStyle;
  };

  const closeButtonStyle = {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    background: 'rgba(0, 0, 0, 0.3)',
    border: 'none',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    fontSize: '1.5rem',
    cursor: 'pointer',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)'
  };

  return (
    <div style={overlayStyle} onClick={onClose}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { 
            transform: scale(0.8) translateY(20px);
            opacity: 0;
          }
          to { 
            transform: scale(1) translateY(0);
            opacity: 1;
          }
        }
        @keyframes confetti {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        .confetti {
          position: absolute;
          width: 10px;
          height: 10px;
          animation: confetti 3s ease-out forwards;
        }
      `}</style>
      
      <div style={getModalStyle()} onClick={(e) => e.stopPropagation()}>
        <button 
          onClick={onClose} 
          style={closeButtonStyle}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(239, 68, 68, 0.8)';
            e.target.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(0, 0, 0, 0.3)';
            e.target.style.transform = 'scale(1)';
          }}
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;