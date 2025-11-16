import React, { useState, useEffect } from 'react';
import StoryView from './components/StoryView';
import ChallengeInterface from './components/ChallengeInterface';
import { chapters } from './data/storyChapters';

function App() {
  const [currentChapterId, setCurrentChapterId] = useState('intro');
  const [mode, setMode] = useState('story');
  const [progress, setProgress] = useState({ completed: [], score: 0, hintsUsed: 0 });

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    try {
      const result = await window.storage?.get('mathquest_progress');
      if (result?.value) {
        setProgress(JSON.parse(result.value));
      }
    } catch (e) {
      console.log('Starting fresh game');
    }
  };

  const saveProgress = async (newProgress) => {
    setProgress(newProgress);
    try {
      await window.storage?.set('mathquest_progress', JSON.stringify(newProgress));
    } catch (e) {
      console.log('Could not save progress');
    }
  };

  const handleChoice = (choice) => {
    const currentChapter = chapters[currentChapterId];
    
    if (currentChapter.formula) {
      setMode('challenge');
    } else {
      setCurrentChapterId(choice.next);
      setMode('story');
    }
  };

  const handleChallengeSuccess = () => {
    const newProgress = {
      completed: [...progress.completed, currentChapterId],
      score: progress.score + 100,
      hintsUsed: progress.hintsUsed
    };
    saveProgress(newProgress);
    
    const currentChapter = chapters[currentChapterId];
    if (currentChapter.choices?.[0]?.next) {
      setCurrentChapterId(currentChapter.choices[0].next);
      setMode('story');
    }
  };

  const handleHintUsed = () => {
    const newProgress = {
      ...progress,
      hintsUsed: progress.hintsUsed + 1
    };
    saveProgress(newProgress);
  };

  const currentChapter = chapters[currentChapterId];

  if (!currentChapter) {
    return <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl mb-4">🎉 Congratulations!</h1>
        <h1 className="text-4xl font-bold text-red-600">Tailwind Working!</h1>
        <p className="text-xl mb-6">You've completed MathQuest!</p>
        <button 
          onClick={() => {
            setCurrentChapterId('intro');
            setMode('story');
            saveProgress({ completed: [], score: 0, hintsUsed: 0 });
          }}
          className="bg-purple-500 hover:bg-purple-600 px-8 py-3 rounded-lg font-bold"
        >
          Play Again
        </button>
      </div>
    </div>;
  }

  return (
    <div className="App">
      {mode === 'story' ? (
        <StoryView 
          chapter={currentChapter}
          onChoice={handleChoice}
        />
      ) : (
        <ChallengeInterface
          chapter={currentChapter}
          onSuccess={handleChallengeSuccess}
          onHintUsed={handleHintUsed}
        />
      )}

      {/* Progress HUD */}
      <div className="fixed top-4 right-4 bg-black/70 backdrop-blur px-6 py-3 rounded-full text-white font-semibold shadow-2xl border border-white/20">
        ⭐ {progress.score} | 📚 {progress.completed.length}/3
      </div>

      {/* Reset button */}
      <button
        onClick={() => {
          if (window.confirm('Reset all progress?')) {
            setCurrentChapterId('intro');
            setMode('story');
            saveProgress({ completed: [], score: 0, hintsUsed: 0 });
          }
        }}
        className="fixed bottom-4 right-4 bg-red-500/80 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
      >
        🔄 Reset
      </button>
    </div>
  );
}

export default App;