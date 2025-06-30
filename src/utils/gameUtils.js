// Collision detection utilities
export const checkCircleCollision = (obj1, obj2) => {
  const dx = obj1.x - obj2.x;
  const dy = obj1.y - obj2.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance < (obj1.radius + obj2.radius);
};

// Vector utilities
export const getDistance = (pos1, pos2) => {
  const dx = pos1.x - pos2.x;
  const dy = pos1.y - pos2.y;
  return Math.sqrt(dx * dx + dy * dy);
};

export const normalizeVector = (vector) => {
  const length = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
  if (length === 0) return { x: 0, y: 0 };
  return { x: vector.x / length, y: vector.y / length };
};

// Game scoring utilities
export const calculateScore = (objectType, playerSize) => {
  const basePoints = {
    trash: 10,
    sign: 25,
    drone: 50,
    hovercar: 100,
    billboard: 200,
    building: 500
  };
  
  const sizeMultiplier = Math.max(1, Math.floor(playerSize / 20));
  return (basePoints[objectType] || 10) * sizeMultiplier;
};

// Random utilities
export const getRandomPosition = (width, height, margin = 50) => {
  return {
    x: Math.random() * (width - margin * 2) + margin,
    y: Math.random() * (height - margin * 2) + margin
  };
};

export const getRandomColor = () => {
  const colors = ['#00ffff', '#ff00ff', '#ffff00', '#ff6600', '#9900ff', '#00ff88'];
  return colors[Math.floor(Math.random() * colors.length)];
};

// Animation utilities
export const lerp = (start, end, factor) => {
  return start + (end - start) * factor;
};

export const easeOutCubic = (t) => {
  return 1 - Math.pow(1 - t, 3);
};

// Game state utilities
export const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export const formatScore = (score) => {
  return score.toLocaleString();
};

// Object generation utilities
export const generateObjectTypes = () => {
  return [
    { type: 'trash', minSize: 3, maxSize: 8, points: 10, color: '#666666', shape: 'circle', weight: 40 },
    { type: 'sign', minSize: 8, maxSize: 15, points: 25, color: '#ffff00', shape: 'square', weight: 30 },
    { type: 'drone', minSize: 12, maxSize: 20, points: 50, color: '#ff00ff', shape: 'triangle', weight: 20 },
    { type: 'hovercar', minSize: 18, maxSize: 30, points: 100, color: '#00ffff', shape: 'square', weight: 15 },
    { type: 'billboard', minSize: 25, maxSize: 40, points: 200, color: '#ff6600', shape: 'square', weight: 8 },
    { type: 'building', minSize: 35, maxSize: 60, points: 500, color: '#9900ff', shape: 'square', weight: 3 },
  ];
};

export const getRandomObjectType = () => {
  const types = generateObjectTypes();
  const totalWeight = types.reduce((sum, type) => sum + type.weight, 0);
  let random = Math.random() * totalWeight;
  
  for (const type of types) {
    random -= type.weight;
    if (random <= 0) {
      return type;
    }
  }
  
  return types[0]; // fallback
};