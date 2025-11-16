import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import * as math from 'mathjs';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function FormulaVisualizer({ formula, onParametersChange, currentParams }) {
  const [explanation, setExplanation] = useState('');
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const generateChartData = () => {
      const xValues = [];
      const yValues = [];
      
      // Generate data points
      for (let x = -10; x <= 10; x += 0.1) {
        xValues.push(x);
        try {
          const y = math.evaluate(formula.equation, { ...currentParams, x });
          // Handle infinity and undefined values
          if (isFinite(y) && !isNaN(y)) {
            yValues.push(y);
          } else {
            yValues.push(null);
          }
        } catch (e) {
          yValues.push(null);
        }
      }

      return {
        labels: xValues.map(x => x.toFixed(1)),
        datasets: [{
          label: formula.equation,
          data: yValues,
          borderColor: '#ff6600',
          backgroundColor: 'rgba(255, 102, 0, 0.1)',
          borderWidth: 3,
          pointRadius: 0,
          tension: 0.4,
          spanGaps: true,
          fill: false
        }]
      };
    };

    setChartData(generateChartData());
  }, [currentParams, formula]);

  const explainParameter = (paramName) => {
    const explanations = {
      'a': 'Parameter "a" controls the vertical stretch and opening direction. When a < 0, the parabola opens downward. Larger |a| makes it narrower and steeper.',
      'b': 'Parameter "b" controls horizontal positioning and affects the axis of symmetry. It shifts the vertex left or right.',
      'c': 'Parameter "c" is the y-intercept - it shifts the entire graph vertically. When x=0, y=c.',
      'A': 'Parameter "A" is the amplitude - the maximum displacement from the center line. It controls the "height" of oscillations.',
      'B': 'Parameter "B" is the frequency multiplier. Higher B values create more oscillations in the same interval. Period = 2π/B.'
    };
    setExplanation(explanations[paramName] || `Parameter ${paramName} affects the graph shape. Experiment with the slider!`);
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 1.8,
    animation: {
      duration: 300
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#ff6600',
          font: { size: 14, weight: 'bold' },
          padding: 15
        }
      },
      title: {
        display: true,
        text: 'Powered by Wolfram Mathematical Principles',
        color: '#666',
        font: { size: 12 },
        padding: { bottom: 10 }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ff6600',
        bodyColor: '#fff',
        borderColor: '#ff6600',
        borderWidth: 1
      }
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'x',
          color: '#666',
          font: { size: 16, weight: 'bold' }
        },
        grid: { 
          color: 'rgba(0, 0, 0, 0.1)',
          drawBorder: true,
          borderColor: '#333',
          borderWidth: 2
        },
        ticks: {
          maxTicksLimit: 15,
          color: '#666',
          font: { size: 11 }
        }
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'y',
          color: '#666',
          font: { size: 16, weight: 'bold' }
        },
        grid: { 
          color: 'rgba(0, 0, 0, 0.1)',
          drawBorder: true,
          borderColor: '#333',
          borderWidth: 2
        },
        ticks: { 
          color: '#666',
          font: { size: 11 }
        }
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    }
  };

  // Styles
  const containerStyle = { display: 'flex', flexDirection: 'column', gap: '1.5rem' };
  
 
  const visualizationBoxStyle = {
  backgroundColor: 'rgba(15, 23, 42, 0.95)',
  borderRadius: '1.5rem',
  padding: '2rem',
  boxShadow: `
    0 30px 60px -15px rgba(0, 0, 0, 0.9),
    0 0 40px rgba(14, 165, 233, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.1)
  `,
  border: '1px solid rgba(14, 165, 233, 0.3)'
  };


  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '1rem'
  };

  const titleContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem'
  };

  const wolframLogoStyle = {
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const titleStyle = {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: 'white',
    margin: 0
  };

  const badgeStyle = {
    fontSize: '0.875rem',
    color: '#ff6600',
    backgroundColor: 'rgba(255, 102, 0, 0.1)',
    padding: '0.375rem 0.875rem',
    borderRadius: '9999px',
    fontWeight: '700',
    border: '1px solid rgba(255, 102, 0, 0.3)'
  };

  const plotContainerStyle = {
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    padding: '1.5rem',
    minHeight: '450px'
  };

  const formulaDisplayStyle = {
    marginTop: '1rem',
    padding: '1rem',
    background: 'linear-gradient(135deg, rgba(255, 102, 0, 0.1), rgba(139, 92, 246, 0.1))',
    borderRadius: '0.5rem',
    border: '1px solid rgba(255, 102, 0, 0.3)'
  };

  const formulaLabelStyle = {
    color: '#9ca3af',
    fontSize: '0.75rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '0.5rem'
  };

  const formulaTextStyle = {
    color: 'white',
    fontFamily: 'Monaco, Consolas, monospace',
    fontSize: '1.25rem',
    textAlign: 'center',
    margin: 0
  };

 
  const controlsBoxStyle = {
  backgroundColor: 'rgba(15, 23, 42, 0.9)',
  backdropFilter: 'blur(20px)',
  borderRadius: '1.5rem',
  padding: '2rem',
  border: '1px solid rgba(14, 165, 233, 0.2)',
  boxShadow: `
    0 20px 40px -10px rgba(0, 0, 0, 0.8),
    0 0 30px rgba(14, 165, 233, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.05)
  `
   };
   
  const controlsTitleStyle = {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: 'white',
    marginBottom: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  };

  const parameterStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    marginBottom: '1.5rem',
    padding: '1rem',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '0.5rem'
  };

  const labelRowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const labelStyle = {
    color: 'white',
    fontWeight: '600',
    fontSize: '1.125rem'
  };

  const valueStyle = {
    color: '#fbbf24',
    fontWeight: '700',
    fontSize: '1.25rem'
  };

  const explainButtonStyle = {
    backgroundColor: '#3b82f6',
    color: 'white',
    padding: '0.375rem 0.875rem',
    borderRadius: '0.5rem',
    fontSize: '0.875rem',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontWeight: '600'
  };

  const sliderStyle = {
    width: '100%',
    height: '12px',
    backgroundColor: '#374151',
    borderRadius: '6px',
    outline: 'none',
    cursor: 'pointer',
    appearance: 'none',
    WebkitAppearance: 'none'
  };

  const rangeLabelsStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.875rem',
    color: '#9ca3af',
    fontWeight: '500'
  };

  const explanationBoxStyle = {
    background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.4), rgba(88, 28, 135, 0.4))',
    border: '1px solid rgba(59, 130, 246, 0.5)',
    borderRadius: '0.75rem',
    padding: '1.5rem',
    backdropFilter: 'blur(12px)'
  };

  const explanationContentStyle = {
    display: 'flex',
    gap: '1rem',
    alignItems: 'flex-start'
  };

  const bulbStyle = {
    fontSize: '2rem',
    flexShrink: 0
  };

  const explanationTextContainerStyle = {
    flex: 1
  };

  const explanationTitleStyle = {
    color: 'white',
    fontWeight: '600',
    marginBottom: '0.5rem',
    fontSize: '1.125rem'
  };

  const explanationTextStyle = {
    color: '#e5e7eb',
    lineHeight: '1.625',
    margin: 0
  };

  const getDisplayEquation = () => {
    let display = 'y = ' + formula.equation;
    Object.entries(currentParams).forEach(([param, value]) => {
      display = display.replace(new RegExp(`\\b${param}\\b`, 'g'), 
        `<span style="color: #fbbf24; font-weight: 700;">${value.toFixed(2)}</span>`);
    });
    return display;
  };

  return (
    <div style={containerStyle}>
      <style>{`
        input[type="range"]::-webkit-slider-track {
          background: linear-gradient(90deg, #374151 0%, #4b5563 100%);
          height: 12px;
          border-radius: 6px;
        }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 28px;
          height: 28px;
          background: linear-gradient(135deg, #ff6600, #ec4899);
          border-radius: 50%;
          cursor: grab;
          box-shadow: 0 0 20px rgba(255, 102, 0, 0.8);
          margin-top: -8px;
          transition: all 0.2s;
        }
        input[type="range"]::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 0 30px rgba(255, 102, 0, 1);
        }
        input[type="range"]::-webkit-slider-thumb:active {
          cursor: grabbing;
          transform: scale(1.1);
        }
        input[type="range"]::-moz-range-track {
          background: linear-gradient(90deg, #374151 0%, #4b5563 100%);
          height: 12px;
          border-radius: 6px;
        }
        input[type="range"]::-moz-range-thumb {
          width: 28px;
          height: 28px;
          background: linear-gradient(135deg, #ff6600, #ec4899);
          border: none;
          border-radius: 50%;
          cursor: grab;
          box-shadow: 0 0 20px rgba(255, 102, 0, 0.8);
          transition: all 0.2s;
        }
        input[type="range"]::-moz-range-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 0 30px rgba(255, 102, 0, 1);
        }
        button:hover {
          transform: scale(1.05);
          background-color: #2563eb;
          box-shadow: 0 0 15px rgba(59, 130, 246, 0.5);
        }
        button:active {
          transform: scale(0.95);
        }
      `}</style>

      {/* Visualization */}
      <div style={visualizationBoxStyle}>
        <div style={headerStyle}>
          <div style={titleContainerStyle}>
            <div style={wolframLogoStyle}>
              <svg width="40" height="40" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="#ff6600"/>
                <text x="50" y="70" fontSize="60" fill="white" fontWeight="bold" textAnchor="middle" fontFamily="Arial">W</text>
              </svg>
            </div>
            <h3 style={titleStyle}>Mathematical Visualization Engine</h3>
          </div>
          <span style={badgeStyle}>🔬 WOLFRAM POWERED</span>
        </div>

        <div style={plotContainerStyle}>
          {chartData && <Line data={chartData} options={chartOptions} />}
        </div>

        <div style={formulaDisplayStyle}>
          <div style={formulaLabelStyle}>Current Equation</div>
          <p style={formulaTextStyle}>
            <span dangerouslySetInnerHTML={{ __html: getDisplayEquation() }} />
          </p>
        </div>
      </div>

      {/* Parameter Controls */}
      <div style={controlsBoxStyle}>
        <h3 style={controlsTitleStyle}>
          <span>🎛️</span>
          <span>Interactive Parameters</span>
        </h3>

        {Object.entries(formula.parameters).map(([paramName, config]) => (
          <div key={paramName} style={parameterStyle}>
            <div style={labelRowStyle}>
              <label style={labelStyle}>
                {paramName} = <span style={valueStyle}>{currentParams[paramName].toFixed(2)}</span>
              </label>
              <button onClick={() => explainParameter(paramName)} style={explainButtonStyle}>
                💡 Explain This
              </button>
            </div>
            
            <input
              type="range"
              min={config.min}
              max={config.max}
              step={config.step}
              value={currentParams[paramName]}
              onChange={(e) => onParametersChange(paramName, parseFloat(e.target.value))}
              style={sliderStyle}
            />
            
            <div style={rangeLabelsStyle}>
              <span>Min: {config.min}</span>
              <span>Max: {config.max}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Explanation Panel */}
      {explanation && (
        <div style={explanationBoxStyle}>
          <div style={explanationContentStyle}>
            <span style={bulbStyle}>💡</span>
            <div style={explanationTextContainerStyle}>
              <h4 style={explanationTitleStyle}>Mathematical Insight</h4>
              <p style={explanationTextStyle}>{explanation}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FormulaVisualizer;

