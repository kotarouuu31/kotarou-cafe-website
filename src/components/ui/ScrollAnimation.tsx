import { ReactNode, useEffect, useRef } from 'react';

interface ScrollAnimationProps {
  children: ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
  delay?: number;
}

/**
 * スクロールアニメーションコンポーネント
 * Intersection Observer APIを使用して要素が画面に入ったときにフェードインアニメーションを実行
 */
export function ScrollAnimation({
  children,
  className = '',
  threshold = 0.1,
  rootMargin = '0px',
  delay = 0
}: ScrollAnimationProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // reducedMotion対応
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 遅延を適用
            setTimeout(() => {
              section.classList.add('is-visible');
            }, delay);
            
            // 一度アニメーションが実行されたら監視を解除
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, [threshold, rootMargin, delay]);

  return (
    <div ref={sectionRef} className={`fade-in-section ${className}`}>
      {children}
    </div>
  );
}
