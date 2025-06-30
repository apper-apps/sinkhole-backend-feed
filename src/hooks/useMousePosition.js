import { useState, useEffect } from 'react';

const useMousePosition = (elementRef) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const element = elementRef?.current || window;

    const handleMouseMove = (event) => {
      if (elementRef?.current) {
        const rect = elementRef.current.getBoundingClientRect();
        const scaleX = elementRef.current.width / rect.width;
        const scaleY = elementRef.current.height / rect.height;
        
        setMousePosition({
          x: (event.clientX - rect.left) * scaleX,
          y: (event.clientY - rect.top) * scaleY
        });
      } else {
        setMousePosition({
          x: event.clientX,
          y: event.clientY
        });
      }
    };

    element.addEventListener('mousemove', handleMouseMove);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
    };
  }, [elementRef]);

  return mousePosition;
};

export default useMousePosition;