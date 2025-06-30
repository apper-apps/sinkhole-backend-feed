import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { AnimatePresence, motion } from "framer-motion";
import GameOverScreen from "@/components/organisms/GameOverScreen";
import GameHUD from "@/components/organisms/GameHUD";
import StartScreen from "@/components/organisms/StartScreen";
import GameCanvas from "@/components/organisms/GameCanvas";

function App() {
  const [gameState, setGameState] = useState('start'); // 'start', 'playing', 'gameOver'
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(120); // 2 minutes
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('sinkhole-highscore');
    return saved ? parseInt(saved) : 0;
});
  const [playerRadius, setPlayerRadius] = useState(20);
  const [currentDistrict, setCurrentDistrict] = useState(null);
  const startGame = () => {
    setScore(0);
    setTimeRemaining(120);
    setPlayerRadius(20);
    setGameState('playing');
  };

  const endGame = () => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('sinkhole-highscore', score.toString());
    }
    setGameState('gameOver');
  };

  const resetGame = () => {
setGameState('start');
  };

  const handleDistrictChange = (district) => {
    if (!currentDistrict || currentDistrict.name !== district.name) {
      setCurrentDistrict(district);
    }
  };
  useEffect(() => {
    let interval;
    if (gameState === 'playing' && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            endGame();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
}, [gameState, timeRemaining]);

  // Reset district when game starts
  useEffect(() => {
    if (gameState === 'start') {
      setCurrentDistrict(null);
    }
  }, [gameState]);

  return (
    <div className="w-full h-screen bg-background overflow-hidden relative">
      <div className="game-grid absolute inset-0 pointer-events-none" />
      
      <AnimatePresence mode="wait">
        {gameState === 'start' && (
          <motion.div
            key="start"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 z-50"
          >
            <StartScreen onStart={startGame} highScore={highScore} />
          </motion.div>
        )}

{gameState === 'playing' && (
          <motion.div
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative w-full h-full"
          >
            <GameCanvas
              score={score}
              setScore={setScore}
              playerRadius={playerRadius}
              setPlayerRadius={setPlayerRadius}
              gameState={gameState}
              onDistrictChange={handleDistrictChange}
            />
            <GameHUD
              score={score}
              timeRemaining={timeRemaining}
              playerRadius={playerRadius}
              currentDistrict={currentDistrict}
            />
          </motion.div>
        )}
        {gameState === 'gameOver' && (
          <motion.div
            key="gameOver"
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -50 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute inset-0 z-50"
          >
<GameOverScreen
              score={score}
              highScore={highScore}
              onRestart={startGame}
              onMainMenu={resetGame}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        toastStyle={{
          background: 'linear-gradient(135deg, #1a1a2e 0%, #2d2d4a 100%)',
          border: '1px solid #00ffff',
          boxShadow: '0 0 15px rgba(0, 255, 255, 0.3)',
        }}
      />
    </div>
  );
}

export default App;