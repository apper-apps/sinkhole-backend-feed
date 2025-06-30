import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';
import ApperIcon from '@/components/ApperIcon';

const Empty = ({ 
  title = "Nothing Here",
  message = "The void is empty",
  actionText = "Start Game",
  onAction,
  icon = "Circle"
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-6 max-w-md"
      >
        {/* Empty State Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
          className="mx-auto"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-24 h-24 border-4 border-primary rounded-full bg-background shadow-neon-strong flex items-center justify-center"
          >
            <ApperIcon name={icon} size={40} className="text-primary opacity-60" />
          </motion.div>
        </motion.div>

        {/* Empty State Title */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Text variant="display" size="3xl" color="primary" neon className="font-bold">
            {title}
          </Text>
        </motion.div>

        {/* Empty State Message */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="space-y-4"
        >
          <Text variant="body" size="lg" color="white" className="leading-relaxed">
            {message}
          </Text>
          
          <div className="bg-surface/40 backdrop-blur-sm border border-secondary/30 rounded-lg p-4">
            <Text variant="body" size="sm" color="gray">
              The cyberpunk city awaits your consumption. Start the game to begin devouring the neon landscape.
            </Text>
          </div>
        </motion.div>

        {/* Action Button */}
        {onAction && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Button 
              onClick={onAction} 
              variant="primary" 
              size="lg"
              className="shadow-neon-strong animate-pulse-neon"
            >
              <span className="flex items-center space-x-2">
                <ApperIcon name="Play" size={20} />
                <span>{actionText}</span>
              </span>
            </Button>
          </motion.div>
        )}

        {/* Decorative Elements */}
        <div className="flex justify-center space-x-4 pt-4">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                delay: i * 0.3
              }}
              className="w-2 h-2 bg-secondary rounded-full"
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Empty;