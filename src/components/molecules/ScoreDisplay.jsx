import { motion } from 'framer-motion';
import Text from '@/components/atoms/Text';

const ScoreDisplay = ({ score, label = "Score", animate = true }) => {
  return (
    <div className="flex flex-col items-center space-y-1">
      <Text variant="body" size="sm" color="gray" className="uppercase tracking-wider">
        {label}
      </Text>
      <motion.div
        key={score}
        initial={animate ? { scale: 1.2, opacity: 0.8 } : false}
        animate={animate ? { scale: 1, opacity: 1 } : false}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <Text 
          variant="display" 
          size="3xl" 
          color="primary" 
          neon 
          className="font-black"
        >
          {score.toLocaleString()}
        </Text>
      </motion.div>
    </div>
  );
};

export default ScoreDisplay;