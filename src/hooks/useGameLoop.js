import { useState, useEffect, useCallback } from 'react';

const useGameLoop = (callback, isActive = true) => {
  const [lastTime, setLastTime] = useState(0);

  const gameLoop = useCallback((currentTime) => {
    if (!isActive) return;

    const deltaTime = currentTime - lastTime;
    
    if (deltaTime >= 16) { // ~60 FPS
      callback(deltaTime);
      setLastTime(currentTime);
    }

    requestAnimationFrame(gameLoop);
  }, [callback, lastTime, isActive]);

  useEffect(() => {
    if (isActive) {
      const animationId = requestAnimationFrame(gameLoop);
      return () => cancelAnimationFrame(animationId);
    }
  }, [gameLoop, isActive]);

  return null;
};

export default useGameLoop;