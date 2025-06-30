import { motion } from 'framer-motion';
import ScoreDisplay from '@/components/molecules/ScoreDisplay';
import TimerDisplay from '@/components/molecules/TimerDisplay';
import SizeIndicator from '@/components/molecules/SizeIndicator';
import Minimap from '@/components/molecules/Minimap';
import { useMediaQuery } from 'react-responsive';
const GameHUD = ({ score, timeRemaining, playerRadius, currentDistrict }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  
  // District definitions for minimap
  const districts = [
    {
      name: 'Downtown',
      bounds: { x: 0, y: 0, width: window.innerWidth * 0.4, height: window.innerHeight * 0.4 },
      description: 'Business Core'
    },
    {
      name: 'Residential',
      bounds: { x: window.innerWidth * 0.4, y: 0, width: window.innerWidth * 0.6, height: window.innerHeight * 0.5 },
      description: 'Living Areas'
    },
    {
      name: 'Industrial',
      bounds: { x: 0, y: window.innerHeight * 0.4, width: window.innerWidth * 0.3, height: window.innerHeight * 0.6 },
      description: 'Factory Zone'
    },
    {
      name: 'Commercial',
      bounds: { x: window.innerWidth * 0.3, y: window.innerHeight * 0.5, width: window.innerWidth * 0.4, height: window.innerHeight * 0.5 },
      description: 'Shopping District'
    },
    {
      name: 'Tech District',
      bounds: { x: window.innerWidth * 0.7, y: window.innerHeight * 0.5, width: window.innerWidth * 0.3, height: window.innerHeight * 0.5 },
      description: 'Innovation Hub'
    }
  ];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="absolute top-0 left-0 right-0 z-20 pointer-events-none"
>
      {/* Minimap - only show on desktop or when not in mobile view */}
      {!isMobile && (
        <Minimap
          player={{ x: 0, y: 0 }} // Will be updated by GameCanvas
          districts={districts}
          currentDistrict={currentDistrict}
          canvasWidth={window.innerWidth}
          canvasHeight={window.innerHeight}
        />
      )}
      
<div className={`hidden md:flex justify-between items-start ${isMobile ? 'p-2' : 'p-6'}`}>
        {/* Left Side - Score */}
        <motion.div
          className="bg-surface/60 backdrop-blur-sm border border-primary/30 rounded-lg p-4 shadow-neon"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <ScoreDisplay score={score} />
        </motion.div>

        {/* Center - Timer */}
        <motion.div
          className="bg-surface/60 backdrop-blur-sm border border-accent/30 rounded-lg p-4 shadow-neon"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <TimerDisplay timeRemaining={timeRemaining} />
        </motion.div>

        {/* Right Side - Size Indicator */}
        <motion.div
          className="bg-surface/60 backdrop-blur-sm border border-secondary/30 rounded-lg p-4 shadow-neon"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <SizeIndicator radius={playerRadius} />
        </motion.div>
      </div>

{/* Mobile Layout - Bottom HUD for smaller screens */}
      <div className="md:hidden absolute bottom-2 left-2 right-2">
        <div className="bg-surface/90 backdrop-blur-sm border border-primary/30 rounded-lg p-2 shadow-neon">
          <div className="flex justify-between items-center text-xs">
            <div className="text-center flex-1">
              <ScoreDisplay score={score} />
            </div>
            <div className="text-center flex-1">
              <TimerDisplay timeRemaining={timeRemaining} />
            </div>
            <div className="text-center flex-1">
              <SizeIndicator radius={playerRadius} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default GameHUD;