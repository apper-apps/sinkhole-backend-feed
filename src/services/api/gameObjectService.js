import { gameObjectData } from '@/services/mockData/gameObjects.json';

// Utility to create a delay for realistic loading
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class GameObjectService {
  constructor() {
    this.districts = [
      {
        name: 'Downtown',
        bounds: { x: 0, y: 0, widthRatio: 0.4, heightRatio: 0.4 },
        objectTypes: [
          { type: 'trash', weight: 20, minSize: 3, maxSize: 8, points: 10, color: '#666666', shape: 'circle' },
          { type: 'sign', weight: 25, minSize: 8, maxSize: 15, points: 25, color: '#ffff00', shape: 'square' },
          { type: 'drone', weight: 15, minSize: 12, maxSize: 20, points: 50, color: '#ff00ff', shape: 'triangle' },
          { type: 'hovercar', weight: 10, minSize: 18, maxSize: 30, points: 100, color: '#00ffff', shape: 'square' },
          { type: 'billboard', weight: 20, minSize: 25, maxSize: 40, points: 200, color: '#ff6600', shape: 'square' },
          { type: 'building', weight: 30, minSize: 35, maxSize: 60, points: 500, color: '#9900ff', shape: 'square' }
        ]
      },
      {
        name: 'Residential',
        bounds: { x: 0.4, y: 0, widthRatio: 0.6, heightRatio: 0.5 },
        objectTypes: [
          { type: 'trash', weight: 40, minSize: 3, maxSize: 8, points: 10, color: '#666666', shape: 'circle' },
          { type: 'sign', weight: 30, minSize: 8, maxSize: 15, points: 25, color: '#ffff00', shape: 'square' },
          { type: 'drone', weight: 5, minSize: 12, maxSize: 20, points: 50, color: '#ff00ff', shape: 'triangle' },
          { type: 'hovercar', weight: 15, minSize: 18, maxSize: 30, points: 100, color: '#00ffff', shape: 'square' },
          { type: 'billboard', weight: 5, minSize: 25, maxSize: 40, points: 200, color: '#ff6600', shape: 'square' },
          { type: 'building', weight: 10, minSize: 35, maxSize: 60, points: 500, color: '#9900ff', shape: 'square' }
        ]
      },
      {
        name: 'Industrial',
        bounds: { x: 0, y: 0.4, widthRatio: 0.3, heightRatio: 0.6 },
        objectTypes: [
          { type: 'trash', weight: 15, minSize: 3, maxSize: 8, points: 10, color: '#666666', shape: 'circle' },
          { type: 'sign', weight: 10, minSize: 8, maxSize: 15, points: 25, color: '#ffff00', shape: 'square' },
          { type: 'drone', weight: 25, minSize: 12, maxSize: 20, points: 50, color: '#ff00ff', shape: 'triangle' },
          { type: 'hovercar', weight: 5, minSize: 18, maxSize: 30, points: 100, color: '#00ffff', shape: 'square' },
          { type: 'billboard', weight: 10, minSize: 25, maxSize: 40, points: 200, color: '#ff6600', shape: 'square' },
          { type: 'building', weight: 35, minSize: 35, maxSize: 60, points: 500, color: '#9900ff', shape: 'square' }
        ]
      }
    ];
  }
async generateGameObjects(canvasWidth = window.innerWidth, canvasHeight = window.innerHeight) {
    await delay(300);
    
    const objects = [];
    let objectId = 1;
    
    // Generate objects for each district
    this.districts.forEach(district => {
      const districtBounds = {
        x: district.bounds.x * canvasWidth,
        y: district.bounds.y * canvasHeight,
        width: district.bounds.widthRatio * canvasWidth,
        height: district.bounds.heightRatio * canvasHeight
      };
      
      // Calculate total weight for this district
      const totalWeight = district.objectTypes.reduce((sum, type) => sum + type.weight, 0);
      
      // Generate objects based on weights
      district.objectTypes.forEach(objectType => {
        const count = Math.max(1, Math.floor((objectType.weight / totalWeight) * 15)); // Base 15 objects per district
        
        for (let i = 0; i < count; i++) {
          const size = Math.random() * (objectType.maxSize - objectType.minSize) + objectType.minSize;
          const obj = {
            Id: objectId++,
            type: objectType.type,
            district: district.name,
            position: {
              x: Math.random() * (districtBounds.width - 100) + districtBounds.x + 50,
              y: Math.random() * (districtBounds.height - 100) + districtBounds.y + 50
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