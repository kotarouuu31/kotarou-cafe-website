"use client";

import { ReactNode, useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}

export const ScrollReveal = ({
  children,
  delay = 0,
  direction = 'up',
  className = '',
}: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const controls = useAnimation();

  const directionMap = {
    up: { y: 20 },
    down: { y: -20 },
    left: { x: 20 },
    right: { x: -20 },
  };

  useEffect(() => {
    if (isInView) {
      controls.start({
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
          duration: 0.6,
          delay: delay * 0.2,
          ease: [0.16, 1, 0.3, 1],
        },
      });
    }
  }, [isInView, controls, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        ...directionMap[direction],
      }}
      animate={controls}
      className={className}
    >
      {children}
    </motion.div>
  );
};
