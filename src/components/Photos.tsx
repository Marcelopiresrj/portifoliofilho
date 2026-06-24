import { useState, useEffect } from 'react';
import { fetchSiteSettings } from '../lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';

export default function Photos() {
  const defaultPhotos = [
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=500&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60"
  ];

  const [photos, setPhotos] = useState<string[]>(defaultPhotos);
  const [isLoading, setIsLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    fetchSiteSettings().then(data => {
      if (data && data.photos_urls && data.photos_urls.length > 0) {
        setPhotos(data.photos_urls);
        setActiveIndex(Math.floor(data.photos_urls.length / 2));
      } else {
        setActiveIndex(Math.floor(defaultPhotos.length / 2));
      }
      setIsLoading(false);
    }).catch(err => {
      console.error(err);
      setIsLoading(false);
    });
  }, []);

  const handleWheel = (e: React.WheelEvent) => {
    if (e.deltaY > 0 && activeIndex < photos.length - 1) {
      setActiveIndex(prev => prev + 1);
    } else if (e.deltaY < 0 && activeIndex > 0) {
      setActiveIndex(prev => prev - 1);
    }
  };

  const handleDragEnd = (_e: any, { offset, velocity }: any) => {
    const swipe = Math.abs(offset.x) * velocity.x;
    if (swipe < -100 && activeIndex < photos.length - 1) {
      setActiveIndex(prev => prev + 1);
    } else if (swipe > 100 && activeIndex > 0) {
      setActiveIndex(prev => prev - 1);
    }
  };

  return (
    <div className="flex h-full w-full bg-[#1e1e1e] text-gray-200 overflow-hidden">

      {/* Main Content Area - 3D Carousel */}
      <div 
        className="flex-1 relative flex justify-center items-center overflow-hidden bg-gradient-to-b from-[#1e1e1e] to-[#121212] select-none"
        onWheel={handleWheel}
        style={{ perspective: 1200 }}
      >
        {isLoading ? (
          <div className="flex gap-4">
            <div className="w-64 h-80 bg-gray-800 rounded-2xl animate-pulse border border-white/5" />
            <div className="w-64 h-80 bg-gray-800 rounded-2xl animate-pulse border border-white/5" />
            <div className="w-64 h-80 bg-gray-800 rounded-2xl animate-pulse border border-white/5" />
          </div>
        ) : (
          <div className="relative w-full h-full flex justify-center items-center" style={{ transformStyle: "preserve-3d" }}>
            <AnimatePresence initial={false}>
              {photos.map((src, idx) => {
                const offset = idx - activeIndex;
                const absOffset = Math.abs(offset);
                const isCenter = offset === 0;
                const zIndex = 50 - absOffset;
                
                const x = offset * 110; 
                const z = -absOffset * 150; 
                const rotateY = offset === 0 ? 0 : offset > 0 ? -60 : 60;
                const scale = offset === 0 ? 1 : 1 - (absOffset * 0.05);
                
                if (absOffset > 5) return null;

                return (
                  <motion.div
                    key={src + idx}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={handleDragEnd}
                    onClick={() => setActiveIndex(idx)}
                    initial={false}
                    animate={{
                      x,
                      z,
                      rotateY,
                      scale,
                      opacity: 1 - (absOffset * 0.15),
                      zIndex
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                      mass: 0.8
                    }}
                    className={`absolute w-[300px] h-[400px] md:w-[350px] md:h-[480px] rounded-2xl overflow-hidden shadow-2xl border flex-shrink-0 origin-center ${!isCenter ? 'cursor-pointer border-white/10' : 'cursor-grab active:cursor-grabbing border-white/30'}`}
                    style={{
                      transformStyle: "preserve-3d",
                      boxShadow: isCenter 
                        ? "0 30px 60px -12px rgba(0,0,0,0.9), 0 0 40px rgba(255,255,255,0.2)" 
                        : "0 20px 25px -5px rgba(0,0,0,0.8)",
                    }}
                  >
                    <img 
                      src={src} 
                      alt={`Gallery item ${idx + 1}`} 
                      className="w-full h-full object-cover pointer-events-none"
                    />
                    {/* Shadow overlay for depth */}
                    <div 
                      className="absolute inset-0 bg-black pointer-events-none transition-opacity duration-300"
                      style={{ opacity: isCenter ? 0 : 0.4 + (absOffset * 0.1) }}
                    />
                  </motion.div>
                );
              })}
            </AnimatePresence>
            
            {/* Pagination Dots */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 z-50">
              {photos.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${activeIndex === idx ? 'bg-white w-4' : 'bg-white/30 hover:bg-white/50'}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
