import React, { useState } from 'react';
import FormulaVisualizer from './FormulaVisualizer';
import ThreeBackground from './ThreeBackground';
import Modal from './Modal'; 

function ChallengeInterface({ chapter, onSuccess, onHintUsed }) {
  const [params, setParams] = useState(
    Object.fromEntries(
      Object.entries(chapter.formula.parameters).map(([key, val]) => [key, val.default])
    )
  );
  const [hints, setHints] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [showAnswerModal, setShowAnswerModal] = useState(false);  // ADD THIS
  const [failed, setFailed] = useState(false);  // ADD THIS
  const MAX_ATTEMPTS = 3; 

  const handleParameterChange = (paramName, value) => {
    setParams(prev => ({ ...prev, [paramName]: value }));
  };

  const checkAnswer = () => {
  setAttempts(prev => prev + 1);
  const { correctAnswer, tolerance } = chapter.formula;
  
  const isCorrect = Object.keys(correctAnswer).every(key => 
    Math.abs(params[key] - correctAnswer[key]) <= tolerance
  );

  if (isCorrect) {
    setFeedback({ type: 'success', message: '✨ Perfect! You\'ve restored the mathematical balance!' });
    setTimeout(() => onSuccess(), 2000);
  } else {
    if (attempts + 1 >= MAX_ATTEMPTS) {
      setFailed(true);
      setShowAnswerModal(true);
      setFeedback({ 
        type: 'error', 
        message: `❌ Out of attempts! The correct answer has been revealed.` 
      });
    } else {
      setFeedback({ 
        type: 'error', 
        message: `❌ Not quite right. ${MAX_ATTEMPTS - (attempts + 1)} attempts remaining.` 
      });
    }
  }
};


const revealAnswer = () => {
  const { correctAnswer } = chapter.formula;
  setParams(correctAnswer);
  setShowAnswerModal(false);
  setTimeout(() => {
    setFeedback({ type: 'success', message: '✨ Pattern restored! Moving forward...' });
    setTimeout(() => onSuccess(), 2000);
  }, 500);
};


  const getHint = () => {
    const { correctAnswer } = chapter.formula;
    const wrongParams = Object.keys(correctAnswer).filter(
      key => Math.abs(params[key] - correctAnswer[key]) > 0.3
    );

    if (wrongParams.length > 0) {
      const param = wrongParams[0];
      const hint = `Try adjusting ${param}. It should be ${params[param] < correctAnswer[param] ? 'higher' : 'lower'}.`;
      setHints(prev => [...prev, hint]);
      if (onHintUsed) onHintUsed();
    } else {
      setHints(prev => [...prev, 'You\'re very close! Fine-tune the values a bit more.']);
    }
  };

  const containerStyle = {
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #0a0e27 100%)',
  padding: '2rem',
  position: 'relative'
   };

  const contentStyle = {
  maxWidth: '56rem',
  margin: '0 auto',
  position: 'relative',
  zIndex: 1,
  transform: 'translateZ(0)',  // ADD THIS
  transformStyle: 'preserve-3d'  // ADD THIS
  };

  
  const headerBoxStyle = {
  backgroundColor: 'rgba(15, 23, 42, 0.95)',
  backdropFilter: 'blur(20px)',
  borderRadius: '1.5rem',
  padding: '2rem',
  border: '1px solid rgba(14, 165, 233, 0.2)',
  boxShadow: `
    0 25px 50px -12px rgba(0, 0, 0, 0.8),
    0 0 30px rgba(14, 165, 233, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.1)
  `,
  marginBottom: '2rem'
   };

  const headerTitleStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    marginBottom: '1rem'
  };

  const titleStyle = {
    fontSize: '1.875rem',
    fontWeight: '700',
    color: 'white',
    margin: 0
  };

  const descriptionStyle = {
    fontSize: '1.25rem',
    color: '#e5e7eb',
    marginBottom: '1rem',
    lineHeight: '1.75'
  };

  const clueBoxStyle = {
    backgroundColor: 'rgba(234, 179, 8, 0.2)',
    border: '1px solid rgba(234, 179, 8, 0.5)',
    borderRadius: '0.5rem',
    padding: '1rem'
  };

  const clueTextStyle = {
    color: '#fef3c7',
    margin: 0
  };

  const buttonContainerStyle = {
    display: 'flex',
    gap: '1rem'
  };

  
  const checkButtonStyle = {
  flex: 1,
  background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
  color: '#0a0e27',
  fontWeight: '800',
  padding: '1.25rem 2rem',
  borderRadius: '1rem',
  border: '2px solid rgba(251, 191, 36, 0.5)',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  boxShadow: `
    0 15px 35px -10px rgba(251, 191, 36, 0.5),
    0 0 25px rgba(251, 191, 36, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.3)
  `,
  fontSize: '1.125rem',
  textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)'
  };

  
  const hintButtonStyle = {
  background: 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)',
  color: 'white',
  fontWeight: '700',
  padding: '1.25rem 2rem',
  borderRadius: '1rem',
  border: '2px solid rgba(6, 182, 212, 0.5)',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  fontSize: '1rem',
  boxShadow: `
    0 15px 35px -10px rgba(6, 182, 212, 0.4),
    0 0 20px rgba(6, 182, 212, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.2)
  `
  };


  const feedbackBoxStyle = (type) => ({
    borderRadius: '0.75rem',
    padding: '1rem',
    border: type === 'success' ? '1px solid #22c55e' : '1px solid #ef4444',
    backgroundColor: type === 'success' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)'
  });

  const feedbackTextStyle = {
    color: 'white',
    fontWeight: '600',
    fontSize: '1.125rem',
    margin: 0,
    whiteSpace: 'pre-line' // ✨ allows multi-line correct answer message
  };

  const hintBoxStyle = {
    backgroundColor: 'rgba(30, 58, 138, 0.3)',
    border: '1px solid rgba(59, 130, 246, 0.5)',
    borderRadius: '0.75rem',
    padding: '1rem'
  };

  const hintTextStyle = {
    color: '#e5e7eb',
    margin: 0
  };

  const hintLabelStyle = {
    color: '#93c5fd',
    fontWeight: '600'
  };

  const statsStyle = {
    textAlign: 'center',
    color: '#9ca3af',
    fontSize: '0.875rem'
  };

  // Answer Reveal Modal Content
  const AnswerModalContent = () => (
  <div style={{ textAlign: 'center' }}>
    <div style={{ 
      fontSize: '4rem', 
      marginBottom: '1rem',
      filter: 'drop-shadow(0 0 20px rgba(14, 165, 233, 0.6))',
      animation: 'pulse 2s infinite'
    }}>
      🔮
    </div>
    
    <h2 style={{ 
      color: '#0ea5e9', 
      fontSize: '2rem', 
      fontWeight: '800', 
      marginBottom: '1rem',
      textShadow: '0 0 20px rgba(14, 165, 233, 0.5)'
    }}>
      Pattern Revealed
    </h2>
    
    <p style={{ 
      color: '#94a3b8', 
      fontSize: '1.125rem', 
      marginBottom: '2rem',
      lineHeight: '1.6'
    }}>
      You've run out of attempts, but the journey must continue. 
      Here is the correct pattern:
    </p>
    
    <div style={{
      background: 'rgba(14, 165, 233, 0.1)',
      padding: '1.5rem',
      borderRadius: '1rem',
      border: '2px solid rgba(14, 165, 233, 0.3)',
      marginBottom: '2rem'
    }}>
      {Object.entries(chapter.formula.correctAnswer).map(([param, value]) => (
        <div key={param} style={{ 
          fontSize: '1.5rem', 
          color: '#0ea5e9', 
          fontWeight: '700',
          margin: '0.5rem 0',
          fontFamily: 'monospace'
        }}>
          {param} = {value.toFixed(2)}
        </div>
      ))}
    </div>
    
    <button
      onClick={revealAnswer}
      style={{
        background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
        color: 'white',
        border: 'none',
        padding: '1rem 3rem',
        fontSize: '1.125rem',
        fontWeight: '700',
        borderRadius: '1rem',
        cursor: 'pointer',
        boxShadow: '0 10px 30px rgba(14, 165, 233, 0.4)',
        transition: 'all 0.3s ease'
      }}
      onMouseEnter={(e) => {
        e.target.style.transform = 'scale(1.05)';
        e.target.style.boxShadow = '0 15px 40px rgba(14, 165, 233, 0.6)';
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = 'scale(1)';
        e.target.style.boxShadow = '0 10px 30px rgba(14, 165, 233, 0.4)';
      }}
    >
      ✨ Apply Pattern & Continue
    </button>
  </div>
);




  return (
    <div style={containerStyle}>
      <ThreeBackground />
      <style>{`
        button:hover {
          transform: scale(1.05);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
        button:active {
          transform: scale(0.95);
        }
      `}</style>

      <div style={contentStyle}>
        {/* Challenge Header */}
        <div style={headerBoxStyle}>
          <div style={headerTitleStyle}>
            <span style={{ fontSize: '2rem' }}>🎯</span>
            <h2 style={titleStyle}>Mathematical Challenge</h2>
          </div>

          <p style={descriptionStyle}>{chapter.text}</p>

          <div style={clueBoxStyle}>
            <p style={clueTextStyle}>
              <strong>Clue:</strong> {chapter.formula.storyClue}
            </p>
          </div>
        </div>

        {/* Visualizer */}
        <FormulaVisualizer
          formula={chapter.formula}
          currentParams={params}
          onParametersChange={handleParameterChange}
        />

        {/* Actions */}
        <div style={buttonContainerStyle}>
          <button onClick={checkAnswer} style={checkButtonStyle}>
            ✓ Check Answer
          </button>

          <button onClick={getHint} style={hintButtonStyle}>
            💡 Get Hint ({hints.length})
          </button>
        </div>

        {/* Feedback */}
        {feedback && (
          <div style={feedbackBoxStyle(feedback.type)}>
            <p style={feedbackTextStyle}>{feedback.message}</p>
          </div>
        )}

        {/* Hints */}
        {hints.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {hints.map((hint, idx) => (
              <div key={idx} style={hintBoxStyle}>
                <p style={hintTextStyle}>
                  <span style={hintLabelStyle}>Hint {idx + 1}:</span> {hint}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Stats */}
        <div style={statsStyle}>
          Attempts: {attempts}/3 | Hints Used: {hints.length}
        </div>
      </div>

      <Modal 
      isOpen={showAnswerModal} 
      onClose={() => setShowAnswerModal(false)}
      type="answer"
    >
      <AnswerModalContent />
    </Modal>
    </div>
  );
}

export default ChallengeInterface;
