"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface BlurTextProps {
  text: string
  delay?: number
  animateBy?: 'words' | 'characters'
  direction?: 'top' | 'bottom' | 'left' | 'right'
  onAnimationComplete?: () => void
  className?: string
}

export default function BlurText({
  text,
  delay = 100,
  animateBy = 'words',
  direction = 'top',
  onAnimationComplete,
  className = ''
}: BlurTextProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const words = text.split(' ')
  const characters = text.split('')

  const getDirection = () => {
    switch (direction) {
      case 'top':
        return { y: -50 }
      case 'bottom':
        return { y: 50 }
      case 'left':
        return { x: -50 }
      case 'right':
        return { x: 50 }
      default:
        return { y: -50 }
    }
  }

  const variants = {
    hidden: {
      opacity: 0,
      filter: 'blur(10px)',
      ...getDirection()
    },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      x: 0,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut'
      }
    }
  }

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: delay / 1000,
        onComplete: onAnimationComplete
      }
    }
  }

  if (animateBy === 'words') {
    return (
      <motion.div
        className={className}
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        {words.map((word, index) => (
          <motion.span
            key={index}
            variants={variants}
            className="inline-block mr-2"
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    )
  }

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
    >
      {characters.map((char, index) => (
        <motion.span
          key={index}
          variants={variants}
          className="inline-block"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.div>
  )
}