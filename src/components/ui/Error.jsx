import { motion } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';
import ApperIcon from '@/components/ApperIcon';

const Error = ({
  message = "Something went wrong",
  onRetry,
  showRetry = true,
  title = "Error"
}) => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className={`text-center max-w-md ${isMobile ? 'space-y-4' : 'space-y-6'}`}
      >
        {/* Error Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
className={`mx-auto bg-error/20 rounded-full flex items-center justify-center border-2 border-error shadow-neon ${
            isMobile ? 'w-16 h-16' : 'w-20 h-20'
          }`}
        >
          <ApperIcon name="AlertTriangle" size={isMobile ? 32 : 40} className="text-error" />
        </motion.div>

        {/* Error Title */}
<Text 
          variant="display" 
          size={isMobile ? "xl" : "2xl"} 
          color="error" 
          neon 
          className="font-bold"
        >
          {title}
        </Text>

{/* Error Message */}
        <Text 
          variant="body" 
          size={isMobile ? "sm" : "base"} 
          color="white" 
          className="leading-relaxed"
        >
          {message}
        </Text>

        {/* Additional Info */}
<div className={`bg-surface/40 backdrop-blur-sm border border-error/30 rounded-lg ${
          isMobile ? 'p-3' : 'p-4'
        }`}>
          <Text variant="body" size={isMobile ? "xs" : "sm"} color="gray">
            The cyberpunk void encountered an unexpected error. Please try again or refresh the page.
          </Text>
        </div>

        {/* Retry Button */}
        {showRetry && onRetry && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
<Button 
              onClick={onRetry} 
              variant="primary" 
              size={isMobile ? "base" : "lg"}
              className={`shadow-neon ${isMobile ? 'min-h-[48px]' : ''}`}
            >
              <span className="flex items-center space-x-2">
                <ApperIcon name="RotateCcw" size={20} />
                <span>Try Again</span>
              </span>
            </Button>
          </motion.div>
        )}

        {/* Help Text */}
        <Text variant="body" size="xs" color="gray" className="italic">
          If the problem persists, try refreshing your browser
        </Text>
      </motion.div>
    </div>
  );
};

export default Error;