"use client";

import Image from 'next/image';
import { X, ArrowLeft, ArrowRight, Calendar } from 'lucide-react';
import { motion, AnimatePresence, useAnimationControls } from 'framer-motion';
import { LatteArtWork } from '@/types/latte-art';
import { useEffect, useState } from 'react';

interface LatteArtDetailProps {
  artwork: LatteArtWork | null;
  onClose: () => void;
}

export const LatteArtDetail = ({ artwork, onClose }: LatteArtDetailProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const controls = useAnimationControls();
  
  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);
  
  if (!artwork) return null;
  
  const images = [
    { type: 'after', url: artwork.imageUrl, label: 'After' },
    ...(artwork.beforeImageUrl ? [{ type: 'before', url: artwork.beforeImageUrl, label: 'Before' }] : [])
  ];

  const handlePrev = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    controls.start('slide');
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    controls.start('slide');
  };
  
  return (
    <AnimatePresence mode="wait">
      {artwork && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { delay: 0.2 } }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            <motion.div 
              className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0, transition: { delay: 0 } }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 bg-white/90 backdrop-blur-sm p-4 border-b flex justify-between items-center z-10">
                <div className="text-sm text-gray-500">
                  {new Date(artwork.createdAt).toLocaleDateString('ja-JP', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                <motion.button 
                  onClick={onClose}
                  whileTap={{ scale: 0.9 }}
                  className="p-1.5 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
                >
                  <X size={18} />
                </motion.button>
              </div>

              {/* Content */}
              <div className="p-4">
                {/* Image Gallery */}
                <div className="mb-6 relative group">
                  <motion.div 
                    className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-gray-100"
                    key={currentImageIndex}
                    variants={{
                      slide: {
                        x: [0, -10, 10, 0],
                        opacity: [1, 0.5, 0.5, 1],
                        transition: { duration: 0.5 }
                      }
                    }}
                    initial="slide"
                    animate={controls}
                  >
                    <Image
                      src={`https://source.unsplash.com/${images[currentImageIndex].url}`}
                      alt={`${images[currentImageIndex].label}: ${artwork.title}`}
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs px-2.5 py-1 rounded-full backdrop-blur-sm">
                      {images[currentImageIndex].label}
                    </div>
                  </motion.div>
                  
                  {images.length > 1 && (
                    <>
                      <motion.button 
                        onClick={handlePrev}
                        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-md"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ArrowLeft size={16} className="text-gray-800" />
                      </motion.button>
                      <motion.button 
                        onClick={handleNext}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-md"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ArrowRight size={16} className="text-gray-800" />
                      </motion.button>
                      
                      {/* Dots indicator */}
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-1.5">
                        {images.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              setCurrentImageIndex(index);
                              controls.start('slide');
                            }}
                            className={`w-2 h-2 rounded-full transition-all ${index === currentImageIndex ? 'bg-white w-6' : 'bg-white/50'}`}
                            aria-label={`View image ${index + 1}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Details */}
                <div className="space-y-5">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar size={16} className="mr-2 text-gray-500" />
                    <span>{new Date(artwork.createdAt).toLocaleDateString('ja-JP', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      weekday: 'short'
                    })}</span>
                  </div>

                  {artwork.description && (
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <h3 className="text-xs font-medium text-gray-500 mb-1">詳細</h3>
                      <p className="text-sm text-gray-800">{artwork.description}</p>
                    </div>
                  )}

                  {artwork.techniques && artwork.techniques.length > 0 && (
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <h3 className="text-xs font-medium text-gray-500 mb-2">使用した技法</h3>
                      <div className="flex flex-wrap gap-2">
                        {artwork.techniques.map((technique) => (
                          <motion.span 
                            key={technique} 
                            className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100"
                            whileHover={{ y: -1 }}
                          >
                            {technique}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  )}

                  {artwork.comment && (
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <h3 className="text-xs font-medium text-gray-500 mb-2">コメント</h3>
                      <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-line">
                        {artwork.comment}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LatteArtDetail;
