import React, { useState, useEffect } from 'react';
import ThreeBackground from './ThreeBackground';
import Modal from './Modal'; 


function StoryView({ chapter, onChoice }) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [showChoices, setShowChoices] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

 useEffect(() => {
  let index = 0;
  setDisplayedText('');
  setIsTyping(true);
  setShowChoices(false);
  
  // Check if it's the ending chapter
  if (chapter.isEnding) {
    setTimeout(() => setShowCelebration(true), 1000);
  }
  
  const interval = setInterval(() => {
    if (index < chapter.text.length) {
      setDisplayedText(chapter.text.slice(0, index + 1));
      index++;
    } else {
      setIsTyping(false);
      setTimeout(() => setShowChoices(true), 500);
      clearInterval(interval);
    }
  }, 30);

  return () => clearInterval(interval);
}, [chapter.text, chapter.isEnding]);


  // Styles
  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #0a0e27 100%)',
    padding: '2rem',
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
    position: 'relative',
    overflow: 'hidden'
  };

  const backgroundPattern = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `
      radial-gradient(circle at 20% 50%, rgba(14, 165, 233, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(251, 191, 36, 0.05) 0%, transparent 50%)
    `,
    pointerEvents: 'none'
  };

  const contentStyle = {
    maxWidth: '56rem',
    margin: '0 auto',
    position: 'relative',
    zIndex: 1,
    transform: 'translateZ(0)',
    transformStyle: 'preserve-3d'
  };

  const titleBoxStyle = {
    textAlign: 'center',
    marginBottom: '2rem',
    perspective: '1000px'
  };

  const titleInnerStyle = {
    display: 'inline-block',
    backgroundColor: 'rgba(15, 23, 42, 0.9)',
    backdropFilter: 'blur(20px)',
    borderRadius: '1.5rem',
    padding: '1.5rem 3rem',
    border: '2px solid rgba(14, 165, 233, 0.3)',
    boxShadow: `
      0 20px 50px -12px rgba(0, 0, 0, 0.8),
      0 0 30px rgba(14, 165, 233, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.1)
    `,
    transform: 'translateZ(50px)',
    transition: 'transform 0.3s ease'
  };

  const titleStyle = {
    fontSize: '2.5rem',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #0ea5e9 0%, #fbbf24 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    textShadow: '0 0 30px rgba(14, 165, 233, 0.3)',
    margin: 0,
    letterSpacing: '0.02em'
  };

  const cardStyle = {
    backgroundColor: 'rgba(15, 23, 42, 0.95)',
    backdropFilter: 'blur(20px)',
    borderRadius: '2rem',
    padding: '3rem',
    boxShadow: `
      0 30px 60px -15px rgba(0, 0, 0, 0.9),
      0 0 40px rgba(14, 165, 233, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.1),
      inset 0 -1px 0 rgba(0, 0, 0, 0.5)
    `,
    border: '1px solid rgba(14, 165, 233, 0.2)',
    marginBottom: '2rem',
    position: 'relative',
    transform: 'translateZ(0)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
  };

  const emojiContainerStyle = {
    fontSize: '8rem',
    textAlign: 'center',
    marginBottom: '2rem',
    filter: 'drop-shadow(0 10px 30px rgba(14, 165, 233, 0.3))',
    animation: 'float 3s ease-in-out infinite'
  };

  const textContainerStyle = {
    position: 'relative',
    padding: '2.5rem',
    backgroundColor: 'rgba(10, 14, 39, 0.7)',
    borderRadius: '1.5rem',
    border: '2px solid rgba(14, 165, 233, 0.4)',
    boxShadow: `
      0 15px 40px rgba(0, 0, 0, 0.6),
      inset 0 1px 0 rgba(255, 255, 255, 0.1),
      0 0 30px rgba(14, 165, 233, 0.3)
    `,
    marginBottom: '2rem',
    minHeight: '280px',
    display: 'flex',
    alignItems: 'center',
    backdropFilter: 'blur(15px)',
    transform: 'translateZ(20px)',
    transition: 'all 0.3s ease'
  };

  const speechBubbleArrowStyle = {
    position: 'absolute',
    top: '-12px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: 0,
    height: 0,
    borderLeft: '18px solid transparent',
    borderRight: '18px solid transparent',
    borderBottom: '18px solid rgba(14, 165, 233, 0.4)',
    filter: 'drop-shadow(0 -5px 10px rgba(14, 165, 233, 0.2))'
  };

  const characterNameStyle = {
    position: 'absolute',
    top: '-2rem',
    left: '2rem',
    background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
    padding: '0.5rem 1.5rem',
    borderRadius: '1rem',
    fontSize: '0.875rem',
    fontWeight: '800',
    color: 'white',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    boxShadow: `
      0 5px 20px rgba(14, 165, 233, 0.5),
      inset 0 1px 0 rgba(255, 255, 255, 0.3)
    `,
    border: '2px solid rgba(255, 255, 255, 0.2)',
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
    zIndex: 10
  };

  const textStyle = {
    fontSize: '1.4rem',
    color: '#f1f5f9',
    lineHeight: '2',
    textShadow: `
      0 2px 8px rgba(0, 0, 0, 0.9),
      0 0 20px rgba(14, 165, 233, 0.4)
    `,
    fontWeight: '500',
    letterSpacing: '0.03em',
    position: 'relative',
    width: '100%',
    padding: '0.5rem'
  };

  const cursorStyle = {
    color: '#fbbf24',
    animation: 'pulse 0.8s infinite, glow 2s ease-in-out infinite',
    fontSize: '1.6rem',
    fontWeight: 'bold',
    marginLeft: '4px',
    display: 'inline-block'
  };

  const buttonContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    marginTop: '2rem'
  };

  const buttonStyle = {
    width: '100%',
    background: 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)',
    color: 'white',
    fontWeight: '700',
    fontSize: '1.25rem',
    padding: '1.5rem 2rem',
    borderRadius: '1rem',
    border: '2px solid rgba(6, 182, 212, 0.5)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: `
      0 15px 35px -10px rgba(6, 182, 212, 0.4),
      0 0 20px rgba(6, 182, 212, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.2)
    `,
    position: 'relative',
    overflow: 'hidden',
    transform: 'translateZ(20px)'
  };

  const endingContainerStyle = {
    textAlign: 'center',
    marginTop: '2rem'
  };

  const endingEmojiStyle = {
    fontSize: '5rem',
    marginBottom: '1.5rem',
    filter: 'drop-shadow(0 0 30px #fbbf24)',
    animation: 'bounce 2s infinite'
  };

  const endingTitleStyle = {
    fontSize: '2rem',
    color: '#fbbf24',
    fontWeight: '800',
    marginBottom: '1rem',
    textShadow: '0 0 20px rgba(251, 191, 36, 0.5)'
  };

  const endingTextStyle = {
    color: '#94a3b8',
    marginBottom: '2rem',
    fontSize: '1.125rem'
  };

  const playAgainButtonStyle = {
    background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
    color: '#0a0e27',
    fontWeight: '800',
    padding: '1.25rem 3rem',
    borderRadius: '1rem',
    border: '2px solid rgba(251, 191, 36, 0.5)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontSize: '1.125rem',
    boxShadow: `
      0 20px 40px -10px rgba(251, 191, 36, 0.5),
      0 0 30px rgba(251, 191, 36, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.3)
    `,
    textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
    transform: 'translateZ(30px)'
  };

  // Helper function to get character name
  const getCharacterName = () => {
    const names = {
      '🧙‍♂️': 'Headmaster',
      '👻': 'Guardian Spirit',
      '🧚': 'Dryad',
      '⛏️': 'Crystal Miner',
      '⭐': 'Pattern Master'
    };
    return names[chapter.character] || 'Unknown';
  };

  // Celebration Modal Content
const CelebrationModalContent = () => {
  // Generate confetti
  const confetti = [];
  for (let i = 0; i < 50; i++) {
    confetti.push(
      <div
        key={i}
        className="confetti"
        style={{
          left: `${Math.random() * 100}%`,
          top: `-20px`,
          backgroundColor: ['#fbbf24', '#f59e0b', '#0ea5e9', '#06b6d4'][Math.floor(Math.random() * 4)],
          animationDelay: `${Math.random() * 0.5}s`,
          animationDuration: `${2 + Math.random() * 2}s`
        }}
      />
    );
  }

  return (
    <div style={{ textAlign: 'center', position: 'relative' }}>
      {confetti}
      
      <div style={{ 
        fontSize: '6rem', 
        marginBottom: '1rem',
        animation: 'bounce 1s infinite',
        filter: 'drop-shadow(0 0 30px rgba(251, 191, 36, 0.8))'
      }}>
        🏆
      </div>
      
      <h2 style={{ 
        color: '#0a0e27', 
        fontSize: '3rem', 
        fontWeight: '900', 
        marginBottom: '1rem',
        textShadow: '2px 2px 0px rgba(255, 255, 255, 0.5)',
        letterSpacing: '0.02em'
      }}>
        LEGENDARY!
      </h2>
      
      <p style={{ 
        color: '#0a0e27', 
        fontSize: '1.5rem', 
        fontWeight: '700',
        marginBottom: '1rem'
      }}>
        Quest Complete
      </p>
      
      <p style={{ 
        color: 'rgba(10, 14, 39, 0.8)', 
        fontSize: '1.125rem', 
        marginBottom: '2rem',
        lineHeight: '1.6',
        maxWidth: '400px',
        margin: '0 auto 2rem'
      }}>
        You've mastered the patterns and restored balance to the mathematical realm. 
        You are now a true <strong>Pattern Master</strong>!
      </p>
      
      <div style={{
        background: 'rgba(10, 14, 39, 0.1)',
        padding: '1.5rem',
        borderRadius: '1rem',
        marginBottom: '2rem',
        border: '2px solid rgba(10, 14, 39, 0.2)'
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>⭐⭐⭐</div>
        <div style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0a0e27' }}>
          Perfect Score Achieved!
        </div>
      </div>
      
      <button
        onClick={() => window.location.reload()}
        style={{
          background: 'linear-gradient(135deg, #0a0e27, #1e293b)',
          color: '#fbbf24',
          border: '2px solid #0a0e27',
          padding: '1.25rem 3rem',
          fontSize: '1.25rem',
          fontWeight: '800',
          borderRadius: '1rem',
          cursor: 'pointer',
          boxShadow: '0 10px 30px rgba(10, 14, 39, 0.5)',
          transition: 'all 0.3s ease',
          textShadow: '0 0 10px rgba(251, 191, 36, 0.5)'
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'scale(1.05)';
          e.target.style.boxShadow = '0 15px 40px rgba(10, 14, 39, 0.7)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'scale(1)';
          e.target.style.boxShadow = '0 10px 30px rgba(10, 14, 39, 0.5)';
        }}
      >
        🔄 Begin New Quest
      </button>
    </div>
  );
};


  return (
    <div style={containerStyle}>
      <ThreeBackground />
      <div style={backgroundPattern}></div>
      
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @keyframes glow {
          0%, 100% { filter: drop-shadow(0 0 10px #fbbf24); }
          50% { filter: drop-shadow(0 0 20px #fbbf24); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-30px); }
        }
        @keyframes slideIn {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        button:hover {
          transform: translateZ(30px) scale(1.05) !important;
          box-shadow: 
            0 25px 50px -10px rgba(6, 182, 212, 0.6),
            0 0 40px rgba(6, 182, 212, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.3) !important;
        }
        button:active {
          transform: translateZ(10px) scale(0.98) !important;
        }
        button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: left 0.5s;
        }
        button:hover::before {
          left: 100%;
        }
      `}</style>
      
      <div style={contentStyle}>
        <div style={titleBoxStyle}>
          <div style={titleInnerStyle}>
            <h1 style={titleStyle}>{chapter.title}</h1>
          </div>
        </div>

        <div style={cardStyle}>
          <div style={emojiContainerStyle}>{chapter.character}</div>
          
          <div style={textContainerStyle}>
            <div style={speechBubbleArrowStyle}></div>
            <div style={characterNameStyle}>{getCharacterName()}</div>
            
            <div style={textStyle}>
              {displayedText}
              {isTyping && <span style={cursorStyle}>▊</span>}
            </div>
          </div>

          {showChoices && !chapter.isEnding && chapter.choices && (
            <div style={buttonContainerStyle}>
              {chapter.choices.map((choice, idx) => (
                <button
                  key={idx}
                  onClick={() => onChoice(choice)}
                  style={{
                    ...buttonStyle,
                    animation: `slideIn 0.5s ease-out ${idx * 0.1}s backwards`
                  }}
                >
                  {choice.text}
                </button>
              ))}
            </div>
          )}

          {chapter.isEnding && showChoices && (
            <div style={endingContainerStyle}>
              <div>
                <div style={endingEmojiStyle}>🎉</div>
                <p style={endingTitleStyle}>Quest Complete!</p>
                <p style={endingTextStyle}>You are now a Pattern Master</p>
              </div>
              <button
                onClick={() => window.location.reload()}
                style={playAgainButtonStyle}
              >
                🔄 New Journey
              </button>
            </div>
          )}
        </div>
      </div>
     <Modal 
      isOpen={showCelebration} 
      onClose={() => setShowCelebration(false)}
      type="celebration"
    >
      <CelebrationModalContent />
    </Modal>
    </div>
  );
}

export default StoryView;