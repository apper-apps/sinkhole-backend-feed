import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';
import ScoreDisplay from '@/components/molecules/ScoreDisplay';
import ApperIcon from '@/components/ApperIcon';

const GameOverScreen = ({ score, highScore, onRestart, onMainMenu }) => {
  const isNewHighScore = score === highScore && score > 0;

  return (
    <div className="flex items-center justify-center min-h-screen bg-background/90 backdrop-blur-sm relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full opacity-30"
            animate={{
              x: [0, Math.random() * window.innerWidth],
              y: [window.innerHeight, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            style={{
              left: Math.random() * window.innerWidth,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center space-y-8 z-10 px-4 max-w-lg mx-auto"
      >
        {/* Game Over Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-4"
        >
          {isNewHighScore && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3, type: "spring" }}
              className="flex items-center justify-center space-x-2 text-accent"
            >
              <ApperIcon name="Crown" size={32} className="text-accent animate-glow" />
              <Text variant="display" size="xl" color="accent" neon className="font-bold">
                NEW HIGH SCORE!
              </Text>
              <ApperIcon name="Crown" size={32} className="text-accent animate-glow" />
            </motion.div>
          )}
          
          <Text 
            variant="display" 
            size="4xl" 
            color="error" 
            neon 
            className="font-black"
          >
            GAME OVER
          </Text>
        </motion.div>

        {/* Score Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-6"
        >
          <div className="bg-surface/60 backdrop-blur-sm border border-primary/40 rounded-lg p-6 shadow-neon-strong">
            <ScoreDisplay score={score} label="Final Score" animate={false} />
          </div>
          
          {highScore > 0 && !isNewHighScore && (
            <div className="bg-surface/40 backdrop-blur-sm border border-secondary/30 rounded-lg p-4 shadow-neon">
              <ScoreDisplay score={highScore} label="High Score" animate={false} />
            </div>
          )}
        </motion.div>

        {/* Performance Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="space-y-2"
        >
          <Text variant="body" size="lg" color="white" className="font-medium">
            {isNewHighScore ? "Incredible performance!" : 
             score > 5000 ? "Excellent work!" : 
             score > 2500 ? "Great job!" : 
             score > 1000 ? "Good effort!" : 
             "Keep practicing!"}
          </Text>
          
          <Text variant="body" size="sm" color="gray" className="max-w-md mx-auto">
            {score > 5000 ? "You've mastered the cyberpunk void!" :
             score > 2500 ? "Your consumption skills are impressive." :
             score > 1000 ? "You're getting the hang of it." :
             "Try consuming smaller objects first to grow faster."}
          </Text>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button 
            onClick={onRestart} 
            variant="primary" 
            size="lg"
            className="shadow-neon-strong"
          >
            <span className="flex items-center space-x-2">
              <ApperIcon name="RotateCcw" size={20} />
              <span>PLAY AGAIN</span>
            </span>
          </Button>
          
          <Button 
            onClick={onMainMenu} 
            variant="ghost" 
            size="lg"
          >
            <span className="flex items-center space-x-2">
              <ApperIcon name="Home" size={20} />
              <span>MAIN MENU</span>
            </span>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default GameOverScreen;