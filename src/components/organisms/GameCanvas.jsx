import { useEffect, useRef, useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { gameObjectService } from '@/services/api/gameObjectService';

const GameCanvas = ({ score, setScore, playerRadius, setPlayerRadius, gameState }) => {
  const canvasRef = useRef(null);
  const animationFrameRef = useRef();
  const [gameObjects, setGameObjects] = useState([]);
  const [player, setPlayer] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);

  // Initialize game objects
  useEffect(() => {
    const initializeGame = async () => {
      try {
        const objects = await gameObjectService.generateGameObjects();
        setGameObjects(objects);
      } catch (error) {
        console.error('Error initializing game:', error);
        toast.error('Failed to initialize game objects');
      }
    };

    if (gameState === 'playing') {
      initializeGame();
      // Set initial player position to center
      const canvas = canvasRef.current;
      if (canvas) {
        setPlayer({
          x: canvas.width / 2,
          y: canvas.height / 2
        });
      }
    }
  }, [gameState]);

  // Handle mouse movement
  const handleMouseMove = useCallback((event) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    setMousePos({
      x: (event.clientX - rect.left) * scaleX,
      y: (event.clientY - rect.top) * scaleY
    });
  }, []);

  // Update player position (smooth following)
  useEffect(() => {
    const updatePlayer = () => {
      setPlayer(prev => ({
        x: prev.x + (mousePos.x - prev.x) * 0.1,
        y: prev.y + (mousePos.y - prev.y) * 0.1
      }));
    };

    const interval = setInterval(updatePlayer, 16); // ~60fps
    return () => clearInterval(interval);
  }, [mousePos]);

  // Create particle effect
  const createParticles = useCallback((x, y, color, count = 8) => {
    const newParticles = [];
    for (let i = 0; i < count; i++) {
      newParticles.push({
        x: x,
        y: y,
        vx: (Math.random() - 0.5) * 8,
        vy: (Math.random() - 0.5) * 8,
        color: color,
        life: 1.0,
        decay: 0.02
      });
    }
    setParticles(prev => [...prev, ...newParticles]);
  }, []);

  // Check collisions and consume objects
  useEffect(() => {
    const checkCollisions = () => {
      const consumedIds = [];
      
      gameObjects.forEach(obj => {
        const dx = player.x - obj.position.x;
        const dy = player.y - obj.position.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Can consume if object is smaller than player hole
        if (distance < playerRadius && obj.size < playerRadius) {
          consumedIds.push(obj.Id);
          
          // Create particle effect
          createParticles(obj.position.x, obj.position.y, obj.color, 6);
          
          // Update score and player size
          setScore(prev => prev + obj.points);
          setPlayerRadius(prev => Math.min(prev + obj.size * 0.1, 150)); // Cap at 150
          
          // Toast for significant objects
          if (obj.points >= 100) {
            toast.success(`Consumed ${obj.type}! +${obj.points} points`, {
              autoClose: 1500
            });
          }
        }
      });

      if (consumedIds.length > 0) {
        setGameObjects(prev => prev.filter(obj => !consumedIds.includes(obj.Id)));
      }
    };

    if (gameState === 'playing') {
      const interval = setInterval(checkCollisions, 16);
      return () => clearInterval(interval);
    }
  }, [player, gameObjects, playerRadius, gameState, setScore, setPlayerRadius, createParticles]);

  // Update particles
  useEffect(() => {
    const updateParticles = () => {
      setParticles(prev => 
        prev.map(particle => ({
          ...particle,
          x: particle.x + particle.vx,
          y: particle.y + particle.vy,
          vx: particle.vx * 0.98,
          vy: particle.vy * 0.98,
          life: particle.life - particle.decay
        })).filter(particle => particle.life > 0)
      );
    };

    const interval = setInterval(updateParticles, 16);
    return () => clearInterval(interval);
  }, []);

  // Render game
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    const render = () => {
      // Clear canvas
      ctx.fillStyle = '#0a0a0f';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid
      ctx.strokeStyle = 'rgba(0, 255, 255, 0.1)';
      ctx.lineWidth = 1;
      const gridSize = 50;
      
      for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw game objects
      gameObjects.forEach(obj => {
        const canConsume = obj.size < playerRadius;
        
        ctx.fillStyle = canConsume ? obj.color : obj.color + '80';
        ctx.strokeStyle = canConsume ? obj.color : obj.color + '40';
        ctx.lineWidth = 2;
        
        if (canConsume) {
          ctx.shadowColor = obj.color;
          ctx.shadowBlur = 10;
        }
        
        ctx.beginPath();
        
        // Different shapes for different object types
        if (obj.shape === 'circle') {
          ctx.arc(obj.position.x, obj.position.y, obj.size, 0, Math.PI * 2);
        } else if (obj.shape === 'square') {
          ctx.rect(
            obj.position.x - obj.size, 
            obj.position.y - obj.size, 
            obj.size * 2, 
            obj.size * 2
          );
        } else if (obj.shape === 'triangle') {
          ctx.moveTo(obj.position.x, obj.position.y - obj.size);
          ctx.lineTo(obj.position.x - obj.size, obj.position.y + obj.size);
          ctx.lineTo(obj.position.x + obj.size, obj.position.y + obj.size);
          ctx.closePath();
        }
        
        ctx.fill();
        ctx.stroke();
        ctx.shadowBlur = 0;
      });

      // Draw particles
      particles.forEach(particle => {
        ctx.fillStyle = particle.color + Math.floor(particle.life * 255).toString(16).padStart(2, '0');
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw player hole
      const gradient = ctx.createRadialGradient(
        player.x, player.y, 0,
        player.x, player.y, playerRadius
      );
      gradient.addColorStop(0, 'rgba(0, 0, 0, 1)');
      gradient.addColorStop(0.8, 'rgba(0, 0, 0, 0.8)');
      gradient.addColorStop(1, 'rgba(0, 255, 255, 0.6)');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(player.x, player.y, playerRadius, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw hole rim
      ctx.strokeStyle = '#00ffff';
      ctx.lineWidth = 3;
      ctx.shadowColor = '#00ffff';
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.arc(player.x, player.y, playerRadius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.shadowBlur = 0;

      animationFrameRef.current = requestAnimationFrame(render);
    };

    if (gameState === 'playing') {
      render();
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [gameObjects, player, playerRadius, particles, gameState]);

  // Handle canvas resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      onMouseMove={handleMouseMove}
      className="absolute inset-0 cursor-none"
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default GameCanvas;