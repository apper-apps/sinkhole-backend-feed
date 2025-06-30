import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';
import ScoreDisplay from '@/components/molecules/ScoreDisplay';
import ApperIcon from '@/components/ApperIcon';

const StartScreen = ({ onStart, highScore }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background via-surface/20 to-background relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary rounded-full opacity-20"
            animate={{
              x: [0, Math.random() * window.innerWidth],
              y: [0, Math.random() * window.innerHeight],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
            style={{
              left: Math.random() * window.innerWidth,
              top: Math.random() * window.innerHeight,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center space-y-8 z-10 px-4"
      >
        {/* Logo/Title */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="space-y-4"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="mx-auto w-24 h-24 rounded-full border-4 border-primary bg-background shadow-neon-strong flex items-center justify-center"
          >
            <ApperIcon name="Zap" size={40} className="text-primary" />
          </motion.div>
          
          <Text 
            variant="display" 
            size="6xl" 
            color="primary" 
            neon 
            className="font-black tracking-wider"
          >
            SINKHOLE
          </Text>
          
          <Text 
            variant="body" 
            size="lg" 
            color="secondary" 
            className="max-w-md mx-auto leading-relaxed"
          >
            Consume the neon city. Grow your void. Devour everything in your path.
          </Text>
        </motion.div>

        {/* High Score Display */}
        {highScore > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-surface/40 backdrop-blur-sm border border-primary/30 rounded-lg p-6 shadow-neon"
          >
            <ScoreDisplay score={highScore} label="High Score" animate={false} />
          </motion.div>
        )}

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="space-y-4 bg-surface/20 backdrop-blur-sm border border-secondary/20 rounded-lg p-6"
        >
          <Text variant="display" size="lg" color="accent" className="font-bold">
            How to Play
          </Text>
          <div className="space-y-2 text-left max-w-md">
            <div className="flex items-center space-x-3">
              <ApperIcon name="Mouse" size={20} className="text-primary flex-shrink-0" />
              <Text variant="body" size="sm" color="white">
                Move your mouse to control the sinkhole
              </Text>
            </div>
            <div className="flex items-center space-x-3">
              <ApperIcon name="Target" size={20} className="text-secondary flex-shrink-0" />
              <Text variant="body" size="sm" color="white">
                Consume objects smaller than your hole
              </Text>
            </div>
            <div className="flex items-center space-x-3">
              <ApperIcon name="TrendingUp" size={20} className="text-accent flex-shrink-0" />
              <Text variant="body" size="sm" color="white">
                Grow bigger and score points
              </Text>
            </div>
            <div className="flex items-center space-x-3">
              <ApperIcon name="Clock" size={20} className="text-warning flex-shrink-0" />
              <Text variant="body" size="sm" color="white">
                You have 2 minutes to score as much as possible
              </Text>
            </div>
          </div>
        </motion.div>

        {/* Start Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Button 
            onClick={onStart} 
            variant="primary" 
            size="xl"
            className="shadow-neon-strong animate-pulse-neon"
          >
            <span className="flex items-center space-x-2">
              <ApperIcon name="Play" size={24} />
              <span>START GAME</span>
            </span>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default StartScreen;