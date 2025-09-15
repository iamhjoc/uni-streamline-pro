import React, { useEffect, useState } from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AnimatedIconProps {
  icon: LucideIcon;
  className?: string;
  glowType?: 'primary' | 'success' | 'warning' | 'destructive' | 'accent';
  animationType?: 'float' | 'bounce' | 'pulse' | 'none';
  delay?: number;
}

export const AnimatedIcon: React.FC<AnimatedIconProps> = ({
  icon: Icon,
  className = '',
  glowType = 'primary',
  animationType = 'bounce',
  delay = 0,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const getGlowClass = () => {
    switch (glowType) {
      case 'primary':
        return 'icon-primary-glow';
      case 'success':
        return 'icon-success-glow';
      case 'warning':
        return 'icon-warning-glow';
      case 'destructive':
        return 'icon-destructive-glow';
      case 'accent':
        return 'icon-accent-glow';
      default:
        return 'icon-primary-glow';
    }
  };

  const getAnimationClass = () => {
    if (!isLoaded || animationType === 'none') return '';
    
    switch (animationType) {
      case 'float':
        return 'animate-icon-float';
      case 'bounce':
        return 'icon-bounce';
      case 'pulse':
        return 'icon-pulse';
      default:
        return 'icon-bounce';
    }
  };

  return (
    <Icon 
      className={cn(
        'transition-all duration-300 ease-out cursor-pointer',
        getGlowClass(),
        getAnimationClass(),
        className
      )}
    />
  );
};