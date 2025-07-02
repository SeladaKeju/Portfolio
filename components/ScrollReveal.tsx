"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface ScrollRevealProps {
  children: ReactNode
  direction?: "left" | "right" | "up" | "down"
  delay?: number
  duration?: number
  distance?: number
  className?: string
  once?: boolean
}

export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  distance = 30,
  className = "",
  once = true
}: ScrollRevealProps) {
  const directionVariants = {
    left: { x: -distance, opacity: 0 },
    right: { x: distance, opacity: 0 },
    up: { y: distance, opacity: 0 },
    down: { y: -distance, opacity: 0 }
  }

  const variants = {
    hidden: directionVariants[direction],
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        duration,
        delay,
        ease: "easeOut"
      }
    }
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.3 }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  )
}
