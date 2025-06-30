import { motion } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';

const Minimap = ({ player, districts, currentDistrict, canvasWidth, canvasHeight }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  
// Scale factor for minimap - more aggressive mobile scaling
  const scale = isMobile ? 0.12 : 0.2;
  const mapWidth = Math.min(canvasWidth * scale, isMobile ? 120 : 200);
  const mapHeight = Math.min(canvasHeight * scale, isMobile ? 80 : 150);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
className={`absolute bg-surface/80 backdrop-blur-sm border border-primary/30 rounded-lg shadow-neon ${
        isMobile ? 'top-2 left-2 p-2' : 'top-4 left-4 p-3'
      }`}
      style={{ 
        width: mapWidth + (isMobile ? 16 : 20), 
        height: mapHeight + (isMobile ? 24 : 40) 
      }}
>
      <div className={`text-primary font-bold text-center ${
        isMobile ? 'text-xs mb-1' : 'text-xs mb-2'
      }`}>
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
<div className={`text-white/70 font-medium ${
              isMobile ? 'text-xs p-0.5' : 'text-xs p-1'
            }`}>
              {district.name.split(' ')[0]}
            </div>
          </div>
        ))}
        
        {/* Player position */}
<motion.div
          className={`absolute bg-primary rounded-full shadow-lg ${
            isMobile ? 'w-1.5 h-1.5' : 'w-2 h-2'
          }`}
          style={{
            left: (player.x * scale) - (isMobile ? 3 : 4),
            top: (player.y * scale) - (isMobile ? 3 : 4)
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
      
<div className={`text-secondary text-center ${
        isMobile ? 'text-xs mt-0.5' : 'text-xs mt-1'
      }`}>
        {currentDistrict?.description || 'Exploring...'}
      </div>
    </motion.div>
  );
};

export default Minimap;