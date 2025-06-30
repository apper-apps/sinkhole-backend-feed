import { gameObjectData } from '@/services/mockData/gameObjects.json';

// Utility to create a delay for realistic loading
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class GameObjectService {
  constructor() {
    this.objectTypes = [
      { type: 'trash', minSize: 3, maxSize: 8, points: 10, color: '#666666', shape: 'circle' },
      { type: 'sign', minSize: 8, maxSize: 15, points: 25, color: '#ffff00', shape: 'square' },
      { type: 'drone', minSize: 12, maxSize: 20, points: 50, color: '#ff00ff', shape: 'triangle' },
      { type: 'hovercar', minSize: 18, maxSize: 30, points: 100, color: '#00ffff', shape: 'square' },
      { type: 'billboard', minSize: 25, maxSize: 40, points: 200, color: '#ff6600', shape: 'square' },
      { type: 'building', minSize: 35, maxSize: 60, points: 500, color: '#9900ff', shape: 'square' },
    ];
  }

  async generateGameObjects() {
    await delay(300);
    
    const objects = [];
    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;
    
    // Generate different quantities for each object type
    this.objectTypes.forEach((objectType, typeIndex) => {
      const count = Math.max(1, Math.floor((6 - typeIndex) * 3)); // More small objects, fewer large ones
      
      for (let i = 0; i < count; i++) {
        const size = Math.random() * (objectType.maxSize - objectType.minSize) + objectType.minSize;
        const obj = {
          Id: objects.length + 1,
          type: objectType.type,
          position: {
            x: Math.random() * (canvasWidth - 100) + 50,
            y: Math.random() * (canvasHeight - 100) + 50
          },
          size: size,
          points: objectType.points,
          color: objectType.color,
          shape: objectType.shape,
          isConsumable: true
        };
        
        objects.push(obj);
      }
    });

    // Shuffle objects to distribute them randomly
    return this.shuffleArray(objects);
  }

  shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  async getById(id) {
    await delay(200);
    const objects = await this.generateGameObjects();
    return objects.find(obj => obj.Id === parseInt(id)) || null;
  }

  async create(objectData) {
    await delay(250);
    const objects = await this.generateGameObjects();
    const maxId = objects.length > 0 ? Math.max(...objects.map(obj => obj.Id)) : 0;
    
    const newObject = {
      Id: maxId + 1,
      ...objectData,
      isConsumable: true
    };
    
    return newObject;
  }

  async update(id, updateData) {
    await delay(200);
    return {
      Id: parseInt(id),
      ...updateData
    };
  }

  async delete(id) {
    await delay(200);
    return { success: true, deletedId: parseInt(id) };
  }

  async getAll() {
    return this.generateGameObjects();
  }
}

export const gameObjectService = new GameObjectService();