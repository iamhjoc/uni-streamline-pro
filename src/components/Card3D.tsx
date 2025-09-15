import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useMouse } from '@/hooks/useMouse';

interface Card3DProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  intensity?: number;
  enableParallax?: boolean;
}

export const Card3D: React.FC<Card3DProps> = ({
  children,
  className = '',
  intensity = 0.1,
  enableParallax = true,
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouse = useMouse();

  useEffect(() => {
    if (!enableParallax || !cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const offsetX = (mouse.x - centerX) * intensity;
    const offsetY = (mouse.y - centerY) * intensity;
    
    const rotateX = offsetY * 0.1;
    const rotateY = offsetX * 0.1;
    
    card.style.transform = `
      perspective(1000px) 
      rotateX(${rotateX}deg) 
      rotateY(${rotateY}deg) 
      translateZ(0px)
    `;
  }, [mouse.x, mouse.y, intensity, enableParallax]);

  return (
    <div
      ref={cardRef}
      className={cn(
        'card-3d card-depth transition-all duration-300 ease-out',
        'hover:animate-card-float',
        className
      )}
      onMouseLeave={() => {
        if (cardRef.current) {
          cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        }
      }}
      {...props}
    >
      {children}
    </div>
  );
};