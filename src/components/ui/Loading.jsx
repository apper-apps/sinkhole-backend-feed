import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Loading = ({ message = "Loading game..." }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <motion.div
        className="flex flex-col items-center space-y-6"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Spinning loader */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="relative"
        >
          <div className="w-16 h-16 border-4 border-surface rounded-full"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-2 w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
            <ApperIcon name="Zap" size={20} className="text-primary" />
          </div>
        </motion.div>

        {/* Loading text */}
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-center space-y-2"
        >
          <p className="text-lg font-display font-bold text-primary neon-text">
            {message}
          </p>
          <p className="text-sm text-gray-400">
            Initializing cyberpunk void...
          </p>
        </motion.div>

        {/* Loading bars */}
        <div className="flex space-x-1">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-8 bg-primary rounded-full"
              animate={{ scaleY: [0.3, 1, 0.3] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Loading;