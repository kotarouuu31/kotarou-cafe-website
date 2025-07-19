import { useEffect, useRef } from 'react';

interface ScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  delay?: number;
  staggerDelay?: number;
  animationClass?: string;
}

/**
 * スクロール時のフェードインアニメーションを実装するカスタムフック
 * Intersection Observer APIを使用して要素が画面に入ったときにアニメーションを実行
 */
export const useScrollAnimation = <T extends HTMLElement>(
  options: ScrollAnimationOptions = {}
) => {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    delay = 0,
    staggerDelay = 100,
    animationClass = 'animate-fade-in'
  } = options;
  
  const elementRef = useRef<T | null>(null);
  const childrenRefs = useRef<HTMLElement[]>([]);

  useEffect(() => {
    // reducedMotion対応
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const element = elementRef.current;
    if (!element) return;

    const children = Array.from(element.children) as HTMLElement[];
    childrenRefs.current = children;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          // 親要素のアニメーション
          if (entry.target === element) {
            setTimeout(() => {
              element.classList.add(animationClass);
            }, delay);
          }

          // 子要素のアニメーション（stagger effect）
          if (children.length > 0) {
            children.forEach((child, index) => {
              setTimeout(() => {
                child.classList.add(animationClass);
              }, delay + (index * staggerDelay));
            });
          }

          // 一度アニメーションが実行されたら監視を解除
          observer.unobserve(entry.target);
        });
      },
      { threshold, rootMargin }
    );

    // 親要素を監視
    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [threshold, rootMargin, delay, staggerDelay, animationClass]);

  return { ref: elementRef };
};
