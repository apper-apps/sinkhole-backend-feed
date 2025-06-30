import { motion } from 'framer-motion';
import Text from '@/components/atoms/Text';

const TimerDisplay = ({ timeRemaining }) => {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  
  const isLowTime = timeRemaining <= 30;
  const color = isLowTime ? 'error' : 'accent';

  return (
    <div className="flex flex-col items-center space-y-1">
      <Text variant="body" size="sm" color="gray" className="uppercase tracking-wider">
        Time
      </Text>
      <motion.div
        animate={isLowTime ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 1, repeat: isLowTime ? Infinity : 0 }}
      >
        <Text 
          variant="display" 
          size="2xl" 
          color={color}
          neon 
          className="font-black tabular-nums"
        >
          {formattedTime}
        </Text>
      </motion.div>
    </div>
  );
};

export default TimerDisplay;