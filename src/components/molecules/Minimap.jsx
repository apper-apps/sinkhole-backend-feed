import { motion } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';

const Minimap = ({ player, districts, currentDistrict, canvasWidth, canvasHeight }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  
  // Scale factor for minimap
  const scale = isMobile ? 0.15 : 0.2;
  const mapWidth = canvasWidth * scale;
  const mapHeight = canvasHeight * scale;
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="absolute top-4 left-4 bg-surface/80 backdrop-blur-sm border border-primary/30 rounded-lg p-3 shadow-neon"
      style={{ width: mapWidth + 20, height: mapHeight + 40 }}
    >
      <div className="text-xs text-primary font-bold mb-2 text-center">
        {currentDistrict?.name || 'Unknown District'}
      </div>
      
      <div 
        className="relative border border-primary/20 rounded"
        style={{ width: mapWidth, height: mapHeight }}
      >
        {/* District boundaries */}
        {districts.map((district, index) => (
          <div
            key={index}
            className={`absolute border-2 rounded ${
              currentDistrict?.name === district.name 
                ? 'border-accent bg-accent/20' 
                : 'border-gray-500/30 bg-gray-500/10'
            }`}
            style={{
              left: district.bounds.x * scale,
              top: district.bounds.y * scale,
              width: district.bounds.width * scale,
              height: district.bounds.height * scale
            }}
          >
            <div className="text-xs text-white/70 p-1 font-medium">
              {district.name.split(' ')[0]}
            </div>
          </div>
        ))}
        
        {/* Player position */}
        <motion.div
          className="absolute w-2 h-2 bg-primary rounded-full shadow-lg"
          style={{
            left: (player.x * scale) - 4,
            top: (player.y * scale) - 4
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [1, 0.7, 1]
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      
      <div className="text-xs text-secondary mt-1 text-center">
        {currentDistrict?.description || 'Exploring...'}
      </div>
    </motion.div>
  );
};

export default Minimap;