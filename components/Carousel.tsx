"use client"

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';

interface CarouselProps {
  baseWidth?: number;
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  loop?: boolean;
  round?: boolean;
}

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A modern e-commerce solution built with Next.js and Stripe integration.",
    image: "/placeholder.svg?height=300&width=400",
    tags: ["Next.js", "TypeScript", "Stripe", "Tailwind CSS"],
    link: "#",
  },
  {
    id: 2,
    title: "Task Management App",
    description: "Collaborative task management tool with real-time updates and team features.",
    image: "/placeholder.svg?height=300&width=400",
    tags: ["React", "Node.js", "Socket.io", "MongoDB"],
    link: "#",
  },
  {
    id: 3,
    title: "Portfolio Website",
    description: "Responsive portfolio website with smooth animations and modern design.",
    image: "/placeholder.svg?height=300&width=400",
    tags: ["Next.js", "Framer Motion", "Tailwind CSS"],
    link: "#",
  },
  {
    id: 4,
    title: "Weather Dashboard",
    description: "Real-time weather dashboard with location-based forecasts and analytics.",
    image: "/placeholder.svg?height=300&width=400",
    tags: ["React", "API Integration", "Chart.js", "CSS3"],
    link: "#",
  },
];

const Carousel: React.FC<CarouselProps> = ({
  baseWidth = 300,
  autoplay = true,
  autoplayDelay = 3000,
  pauseOnHover = true,
  loop = true,
  round = false
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const nextSlide = () => {
    if (loop) {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    } else {
      setCurrentIndex((prev) => Math.min(prev + 1, projects.length - 1));
    }
  };

  const prevSlide = () => {
    if (loop) {
      setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
    } else {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Handle swipe/drag functionality
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 100;
    if (info.offset.x > threshold) {
      prevSlide();
    } else if (info.offset.x < -threshold) {
      nextSlide();
    }
    setIsDragging(false);
  };

  // Autoplay functionality
  useEffect(() => {
    if (autoplay && !isHovered && !isDragging) {
      autoplayRef.current = setInterval(() => {
        nextSlide();
      }, autoplayDelay);
    }

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [autoplay, autoplayDelay, isHovered, isDragging, currentIndex]);

  const handleMouseEnter = () => {
    if (pauseOnHover) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) {
      setIsHovered(false);
    }
  };

  return (
    <div
      className="relative w-full h-full overflow-hidden cursor-grab active:cursor-grabbing"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Main carousel container */}
      <div className="relative h-full flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={handleDragEnd}
            whileDrag={{ scale: 0.95 }}
          >
            <div 
              className={`bg-white ${round ? 'rounded-full' : 'rounded-2xl'} overflow-hidden shadow-xl border border-gray-200 transform transition-transform duration-300 hover:shadow-2xl`}
              style={{ width: `${Math.min(baseWidth * 1.5, 500)}px`, maxWidth: '90%' }}
            >
              <a 
                href={projects[currentIndex].link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block"
              >
                {/* Project Image - Top */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={projects[currentIndex].image || "/placeholder.svg"}
                    alt={projects[currentIndex].title}
                    width={500}
                    height={312}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                </div>
                
                {/* Project Details - Bottom */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-black">{projects[currentIndex].title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{projects[currentIndex].description}</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {projects[currentIndex].tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center text-gray-500 text-sm">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      <span>View project</span>
                    </div>
                    <div className="text-xs text-gray-400">
                      {currentIndex + 1} / {projects.length}
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-black w-8' 
                : 'bg-black/30 hover:bg-black/50'
            }`}
          />
        ))}
      </div>

      {/* Swipe instruction */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 text-xs text-gray-400 text-center z-10">
        <div className="bg-white/80 backdrop-blur-sm rounded-full px-3 py-1">
          Swipe or drag to navigate
        </div>
      </div>
    </div>
  );
};

export default Carousel;
