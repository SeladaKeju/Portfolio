"use client"

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';

interface MasonryItem {
  id: string;
  img: string;
  url: string;
  height: number;
  title?: string;
  description?: string;
  tags?: string[];
}

interface MasonryProps {
  items: MasonryItem[];
  ease?: string;
  duration?: number;
  stagger?: number;
  animateFrom?: 'bottom' | 'top' | 'left' | 'right';
  scaleOnHover?: boolean;
  hoverScale?: number;
  blurToFocus?: boolean;
  colorShiftOnHover?: boolean;
}

const Masonry: React.FC<MasonryProps> = ({
  items,
  ease = "easeOut",
  duration = 0.6,
  stagger = 0.05,
  animateFrom = "bottom",
  scaleOnHover = true,
  hoverScale = 0.95,
  blurToFocus = true,
  colorShiftOnHover = false
}) => {
  const [columns, setColumns] = useState(3);
  const containerRef = useRef<HTMLDivElement>(null);

  // Convert GSAP easing to Framer Motion easing
  const getEasing = (easeType: string) => {
    switch (easeType) {
      case 'power3.out':
        return [0.16, 1, 0.3, 1];
      case 'power2.out':
        return [0.25, 0.46, 0.45, 0.94];
      case 'power1.out':
        return [0.25, 0.46, 0.45, 0.94];
      default:
        return "easeOut";
    }
  };

  // Responsive columns
  useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth < 640) {
        setColumns(1);
      } else if (window.innerWidth < 1024) {
        setColumns(2);
      } else {
        setColumns(3);
      }
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  // Distribute items across columns
  const columnItems = Array.from({ length: columns }, () => [] as MasonryItem[]);
  items.forEach((item, index) => {
    columnItems[index % columns].push(item);
  });

  const getAnimationDirection = () => {
    switch (animateFrom) {
      case 'top':
        return { y: -50, opacity: 0 };
      case 'bottom':
        return { y: 50, opacity: 0 };
      case 'left':
        return { x: -50, opacity: 0 };
      case 'right':
        return { x: 50, opacity: 0 };
      default:
        return { y: 50, opacity: 0 };
    }
  };

  return (
    <div 
      ref={containerRef}
      className="grid gap-4 w-full"
      style={{ 
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
      }}
    >
      {columnItems.map((columnItems, columnIndex) => (
        <div key={columnIndex} className="flex flex-col gap-4">
          {columnItems.map((item, itemIndex) => (
            <motion.div
              key={item.id}
              initial={getAnimationDirection()}
              whileInView={{ 
                y: 0, 
                x: 0, 
                opacity: 1,
                filter: blurToFocus ? "blur(0px)" : "none"
              }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ 
                duration: duration,
                ease: getEasing(ease),
                delay: (columnIndex * columnItems.length + itemIndex) * stagger
              }}
              whileHover={scaleOnHover ? { 
                scale: hoverScale,
                filter: blurToFocus ? "blur(0px)" : colorShiftOnHover ? "saturate(1.2) brightness(1.1)" : "none",
                transition: { duration: 0.3 }
              } : {}}
              className="group cursor-pointer"
            >
              <a 
                href={item.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block"
              >
                <div 
                  className="relative overflow-hidden rounded-xl bg-gray-100 shadow-lg hover:shadow-xl transition-shadow duration-300"
                  style={{ height: `${item.height}px` }}
                >
                  <Image
                    src={item.img}
                    alt={item.title || `Project ${item.id}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  
                  {/* Overlay with project info */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      {item.title && (
                        <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                      )}
                      {item.description && (
                        <p className="text-sm opacity-90 mb-3 line-clamp-2">{item.description}</p>
                      )}
                      {item.tags && item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-2">
                          {item.tags.slice(0, 3).map((tag, index) => (
                            <span 
                              key={index}
                              className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                          {item.tags.length > 3 && (
                            <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs">
                              +{item.tags.length - 3}
                            </span>
                          )}
                        </div>
                      )}
                      <div className="flex items-center text-xs opacity-75">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        <span>View Project</span>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Masonry;
