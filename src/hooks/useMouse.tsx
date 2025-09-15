import { useState, useEffect } from 'react';

export interface MousePosition {
  x: number;
  y: number;
}

export const useMouse = () => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: event.clientX,
        y: event.clientY,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return mousePosition;
};

export const useMouseParallax = (sensitivity: number = 0.05) => {
  const mouse = useMouse();
  const [transform, setTransform] = useState('');

  useEffect(() => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    const offsetX = (mouse.x - centerX) * sensitivity;
    const offsetY = (mouse.y - centerY) * sensitivity;
    
    setTransform(`translate3d(${offsetX}px, ${offsetY}px, 0) rotateX(${offsetY * 0.1}deg) rotateY(${offsetX * 0.1}deg)`);
  }, [mouse.x, mouse.y, sensitivity]);

  return transform;
};