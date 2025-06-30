import { motion } from 'framer-motion';
import ScoreDisplay from '@/components/molecules/ScoreDisplay';
import TimerDisplay from '@/components/molecules/TimerDisplay';
import SizeIndicator from '@/components/molecules/SizeIndicator';

const GameHUD = ({ score, timeRemaining, playerRadius }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="absolute top-0 left-0 right-0 z-20 pointer-events-none"
    >
      <div className="flex justify-between items-start p-6">
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
      <div className="md:hidden absolute bottom-6 left-6 right-6">
        <div className="bg-surface/80 backdrop-blur-sm border border-primary/30 rounded-lg p-4 shadow-neon">
          <div className="flex justify-between items-center">
            <div className="text-center">
              <ScoreDisplay score={score} />
            </div>
            <div className="text-center">
              <TimerDisplay timeRemaining={timeRemaining} />
            </div>
            <div className="text-center">
              <SizeIndicator radius={playerRadius} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default GameHUD;