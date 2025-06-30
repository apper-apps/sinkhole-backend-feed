import React, { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { gameObjectService } from "@/services/api/gameObjectService";

const GameCanvas = ({ score, setScore, playerRadius, setPlayerRadius, gameState, onDistrictChange }) => {
  const canvasRef = useRef(null);
  const animationFrameRef = useRef();
  const [gameObjects, setGameObjects] = useState([]);
  const [player, setPlayer] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);
  const [currentDistrict, setCurrentDistrict] = useState(null);
  // Initialize game objects
  useEffect(() => {
const initializeGame = async () => {
      try {
        const objects = await gameObjectService.generateGameObjects(window.innerWidth, window.innerHeight);
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

  // District detection
  const getDistrictFromPosition = (x, y) => {
    const districts = [
      { name: 'Downtown', bounds: { x: 0, y: 0, width: window.innerWidth * 0.4, height: window.innerHeight * 0.4 }, description: 'Business Core' },
      { name: 'Residential', bounds: { x: window.innerWidth * 0.4, y: 0, width: window.innerWidth * 0.6, height: window.innerHeight * 0.5 }, description: 'Living Areas' },
      { name: 'Industrial', bounds: { x: 0, y: window.innerHeight * 0.4, width: window.innerWidth * 0.3, height: window.innerHeight * 0.6 }, description: 'Factory Zone' },
      { name: 'Commercial', bounds: { x: window.innerWidth * 0.3, y: window.innerHeight * 0.5, width: window.innerWidth * 0.4, height: window.innerHeight * 0.5 }, description: 'Shopping District' },
      { name: 'Tech District', bounds: { x: window.innerWidth * 0.7, y: window.innerHeight * 0.5, width: window.innerWidth * 0.3, height: window.innerHeight * 0.5 }, description: 'Innovation Hub' }
    ];
    
    for (const district of districts) {
      if (x >= district.bounds.x && x <= district.bounds.x + district.bounds.width &&
          y >= district.bounds.y && y <= district.bounds.y + district.bounds.height) {
        return district;
      }
    }
    return null;
  };
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
};

    const interval = setInterval(updatePlayer, 16); // ~60fps
    return () => clearInterval(interval);
  }, [mousePos]);
  // Check district changes
  useEffect(() => {
    const district = getDistrictFromPosition(player.x, player.y);
    if (district && (!currentDistrict || currentDistrict.name !== district.name)) {
      setCurrentDistrict(district);
      onDistrictChange?.(district);
      
      // Show toast notification for district change
      if (currentDistrict) {
        toast.info(`Entering ${district.name}`, {
          autoClose: 2000,
          position: 'top-center'
        });
      }
    }
  }, [player, currentDistrict, onDistrictChange]);
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

      // Draw district boundaries
      const districts = [
        { name: 'Downtown', bounds: { x: 0, y: 0, width: canvas.width * 0.4, height: canvas.height * 0.4 }, color: '#ff6b6b' },
        { name: 'Residential', bounds: { x: canvas.width * 0.4, y: 0, width: canvas.width * 0.6, height: canvas.height * 0.5 }, color: '#4ecdc4' },
        { name: 'Industrial', bounds: { x: 0, y: canvas.height * 0.4, width: canvas.width * 0.3, height: canvas.height * 0.6 }, color: '#45b7d1' },
        { name: 'Commercial', bounds: { x: canvas.width * 0.3, y: canvas.height * 0.5, width: canvas.width * 0.4, height: canvas.height * 0.5 }, color: '#f9ca24' },
        { name: 'Tech District', bounds: { x: canvas.width * 0.7, y: canvas.height * 0.5, width: canvas.width * 0.3, height: canvas.height * 0.5 }, color: '#6c5ce7' }
      ];

      districts.forEach(district => {
        const isCurrentDistrict = currentDistrict?.name === district.name;
        ctx.strokeStyle = isCurrentDistrict ? district.color + '80' : district.color + '20';
        ctx.lineWidth = isCurrentDistrict ? 3 : 1;
        ctx.setLineDash(isCurrentDistrict ? [] : [5, 5]);
        
        ctx.beginPath();
        ctx.rect(district.bounds.x, district.bounds.y, district.bounds.width, district.bounds.height);
        ctx.stroke();
        
        // District label
        ctx.fillStyle = district.color + (isCurrentDistrict ? 'ff' : '60');
        ctx.font = isCurrentDistrict ? 'bold 16px Arial' : '12px Arial';
        ctx.fillText(
          district.name, 
          district.bounds.x + 10, 
          district.bounds.y + 25
        );
      });
      
      ctx.setLineDash([]); // Reset line dash
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