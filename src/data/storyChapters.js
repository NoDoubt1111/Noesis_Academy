export const chapters = {
  intro: {
    id: 'intro',
    title: '🏰 The Academy of Patterns',
    text: 'You arrive at an ancient academy where mathematics shapes reality itself. The headmaster, a wise old wizard, greets you with concern in his eyes: "Welcome, young scholar. Our world is in chaos—the mathematical laws that govern nature are breaking down. Only by understanding and restoring these fundamental patterns can you save our realm from collapse. Are you ready to begin your quest?"',
    character: '🧙‍♂️',
    choices: [
      { text: '⚔️ Investigate the Haunted Parabola', next: 'ch1_parabola' },
      { text: '🌊 Explore the Sine Wave Forest', next: 'ch1_sine' }
    ]
  },
  
  ch1_parabola: {
    id: 'ch1_parabola',
    title: '⛲ The Haunted Parabola',
    text: 'In the grand courtyard, you discover an ancient fountain frozen in time. Its water once flowed in a perfect parabolic arc, but now it hangs motionless in mid-air, shimmering with unstable energy. A translucent ghost materializes beside you, pointing at glowing runes that read: y = ax² + bx + c. "The parameters have been corrupted by dark magic," it whispers urgently. "Only by restoring them to their true values can you release the fountain and continue your journey."',
    character: '👻',
    formula: {
      equation: 'a*x^2 + b*x + c',
      parameters: {
        a: { min: -2, max: 2, default: 1, step: 0.1 },
        b: { min: -5, max: 5, default: 0, step: 0.5 },
        c: { min: 0, max: 8, default: 2, step: 0.5 }
      },
      correctAnswer: { a: -0.5, b: 0, c: 4 },
      tolerance: 0.2,
      visualizationType: '2d-curve',
      storyClue: 'The fountain should peak at a height of 4 units and curve gently downward, creating a symmetrical arc.'
    },
    choices: [
      { text: '💎 Continue to the Crystal Caves', next: 'ch2_exponential' }
    ]
  },

  ch1_sine: {
    id: 'ch1_sine',
    title: '🌲 The Sine Wave Forest',
    text: 'You enter a mystical forest where ancient trees sway in perfect harmony with the wind. But something is terribly wrong—their movements are chaotic and unnatural. A beautiful dryad emerges from the largest tree, her form flickering: "Once, our dance followed the eternal rhythm of sin(x). Now the pattern is shattered. The amplitude and frequency have been twisted. Help us restore the natural oscillation: y = A·sin(B·x). Only then can our forest live in peace again."',
    character: '🧚',
    formula: {
      equation: 'A * sin(B * x)',
      parameters: {
        A: { min: 0.5, max: 3, default: 1, step: 0.1 },
        B: { min: 0.5, max: 2, default: 1, step: 0.1 }
      },
      correctAnswer: { A: 2, B: 1 },
      tolerance: 0.15,
      visualizationType: '2d-wave',
      storyClue: 'The trees should sway twice as high as their resting position, with a natural, gentle frequency of one complete cycle.'
    },
    choices: [
      { text: '🎲 Venture into the Probability Maze', next: 'ch2_exponential' }
    ]
  },

  ch2_exponential: {
    id: 'ch2_exponential',
    title: '💎 The Crystal Caves',
    text: 'Deep beneath the academy, you find caves filled with luminescent crystals. They grow exponentially, pulsing with magical energy. But their growth has accelerated dangerously—stalactites shoot down from the ceiling at alarming speeds, and the entire cavern trembles. A desperate miner rushes over: "The growth equation y = a·e^(bx) is inscribed on that wall! The crystals should grow steadily, starting from their natural size. Find the safe parameters before the entire cave system collapses!"',
    character: '⛏️',
    formula: {
      equation: 'a * exp(b * x)',
      parameters: {
        a: { min: 0.5, max: 2, default: 1, step: 0.1 },
        b: { min: 0.1, max: 1, default: 0.5, step: 0.05 }
      },
      correctAnswer: { a: 1, b: 0.5 },
      tolerance: 0.1,
      visualizationType: '2d-exponential',
      storyClue: 'The crystals should begin at their natural size of 1 unit and grow at a moderate, sustainable rate.'
    },
    choices: [
      { text: '⭐ Face the Final Restoration', next: 'finale' }
    ]
  },

  finale: {
    id: 'finale',
    title: '✨ The Great Restoration',
    text: 'You return to the academy\'s central tower. As you climb the spiral staircase, you feel the mathematical harmony you\'ve restored resonating through the very fabric of reality. The headmaster stands at the summit, his eyes glowing with approval. "You\'ve done it, young scholar. You haven\'t just solved equations—you\'ve understood the living mathematics that connects all things. The fountain flows, the forest dances, the crystals grow in peace. You are now a true Pattern Master. The world is in balance once more, thanks to you."',
    character: '⭐',
    isEnding: true
  }
};
