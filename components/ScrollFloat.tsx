"use client"

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface ScrollFloatProps {
  children: React.ReactNode
  animationDuration?: number
  ease?: string
  scrollStart?: string
  scrollEnd?: string
  stagger?: number
  className?: string
  scrub?: boolean | number | undefined
}

export default function ScrollFloat({
  children,
  animationDuration = 2,
  ease = 'power4.out',
  scrollStart = 'top 90%',
  scrollEnd = 'bottom 10%',
  stagger = 0.15,
  className = '',
  scrub = false
}: ScrollFloatProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const elements = container.querySelectorAll('.scroll-float-item')

    if (elements.length === 0) return

    // Set initial state with normal values
    gsap.set(elements, {
      y: 60,
      opacity: 0,
      scale: 0.9,
      rotation: 2,
      filter: 'blur(8px)',
      transformOrigin: 'center center'
    })

    // Create normal scroll trigger animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: scrollStart,
        end: scrollEnd,
        scrub: scrub,
        toggleActions: "play none none reverse",
        refreshPriority: 0
      }
    })

    tl.to(elements, {
      y: 0,
      opacity: 1,
      scale: 1,
      rotation: 0,
      filter: 'blur(0px)',
      duration: animationDuration,
      ease: ease,
      stagger: {
        amount: stagger,
        from: "start",
        ease: "power2.out"
      },
      force3D: true,
      transformOrigin: 'center center'
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [animationDuration, ease, scrollStart, scrollEnd, stagger, scrub])

  // Function to add class to child elements
  const addScrollFloatClass = (children: React.ReactNode): React.ReactNode => {
    if (typeof children === 'string') {
      return <span className="scroll-float-item">{children}</span>
    }

    if (React.isValidElement(children)) {
      const existingClass = (children.props as any).className || ''
      return React.cloneElement(children as React.ReactElement<any>, {
        className: `${existingClass} scroll-float-item`.trim()
      })
    }

    if (Array.isArray(children)) {
      return children.map((child, index) => (
        <div key={index} className="scroll-float-item">
          {child}
        </div>
      ))
    }

    // Fallback: wrap in a div with the scroll-float-item class
    return <div className="scroll-float-item">{children}</div>
  }

  return (
    <div ref={containerRef} className={className}>
      {addScrollFloatClass(children)}
    </div>
  )
}
