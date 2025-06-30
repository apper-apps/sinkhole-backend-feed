import { motion } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import Text from '@/components/atoms/Text';

const SizeIndicator = ({ radius }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const sizeLevel = Math.floor(radius / 10);
  const progress = ((radius % 10) / 10) * 100;

return (
    <div className={`flex flex-col items-center ${isMobile ? 'space-y-1' : 'space-y-2'}`}>
      <Text 
        variant="body" 
        size={isMobile ? "xs" : "sm"} 
        color="gray" 
        className="uppercase tracking-wider"
      >
        Size Level
      </Text>
<Text 
        variant="display" 
        size={isMobile ? "lg" : "xl"} 
        color="secondary" 
        neon 
        className="font-black"
      >
        {sizeLevel}
      </Text>
      <div className={`bg-surface border border-secondary/30 rounded-full overflow-hidden ${
        isMobile ? 'w-16 h-1.5' : 'w-24 h-2'
      }`}>
        <motion.div
          className="h-full bg-gradient-to-r from-secondary to-magenta-300 shadow-neon"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

export default SizeIndicator;