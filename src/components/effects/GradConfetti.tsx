"use client"

import { useEffect, useRef, useState } from "react"
import { animate } from "animejs"

const CONFETTI_COUNT = 30

// Confetti shapes: rectangle (ribbon), circle (dot), star
const CONFETTI_SHAPES = ["rect", "circle", "star"] as const

const CONFETTI_COLORS = [
  "#003366", "#FFD700", "#1d4ed8", "#60a5fa",
  "#ffffff", "#FFC107", "#4a88d0", "#e6c200",
]

interface ConfettiData {
  left: string
  width: string
  height: string
  color: string
  shape: (typeof CONFETTI_SHAPES)[number]
  randDuration: number
  randDelay: number
  randSwayX: number[]
  randRotation: number
}

export function GradConfetti() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [pieces, setPieces] = useState<ConfettiData[]>([])

  useEffect(() => {
    const data: ConfettiData[] = Array.from({ length: CONFETTI_COUNT }).map((_, i) => ({
      left: `${Math.random() * 100}%`,
      width: `${8 + Math.random() * 14}px`,
      height: `${4 + Math.random() * 10}px`,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      shape: CONFETTI_SHAPES[i % CONFETTI_SHAPES.length],
      randDuration: 7000 + Math.random() * 8000,
      randDelay: Math.random() * 8000,
      randSwayX: Array.from({ length: 4 }).map(() => Math.random() * 100 - 50),
      randRotation: Math.random() * 720 - 360,
    }))
    setPieces(data)
  }, [])

  useEffect(() => {
    if (!containerRef.current || pieces.length === 0) return

    const els = containerRef.current.querySelectorAll(".confetti-piece")
    els.forEach((piece, i) => {
      const p = pieces[i]
      if (!p) return

      animate(piece, {
        translateY: [{ from: "-10vh", to: "110vh" }],
        translateX: [
          { from: "0px", to: `${p.randSwayX[0]}px`, duration: p.randDuration * 0.25 },
          { from: `${p.randSwayX[0]}px`, to: `${p.randSwayX[1]}px`, duration: p.randDuration * 0.25 },
          { from: `${p.randSwayX[1]}px`, to: `${p.randSwayX[2]}px`, duration: p.randDuration * 0.25 },
          { from: `${p.randSwayX[2]}px`, to: "0px", duration: p.randDuration * 0.25 },
        ],
        rotate: [{ from: 0, to: p.randRotation }],
        opacity: [
          { from: 0, to: 0.9, duration: p.randDuration * 0.1 },
          { from: 0.9, to: 0.9, duration: p.randDuration * 0.7 },
          { from: 0.9, to: 0, duration: p.randDuration * 0.2 },
        ],
        duration: p.randDuration,
        delay: p.randDelay,
        loop: true,
        ease: "linear",
      })
    })
  }, [pieces])

  const renderShape = (shape: string, color: string) => {
    if (shape === "rect") {
      return <div className="w-full h-full" style={{ backgroundColor: color }} />
    }
    if (shape === "circle") {
      return <div className="w-full h-full rounded-full" style={{ backgroundColor: color }} />
    }
    // star shape using SVG
    return (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill={color}>
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    )
  }

  if (pieces.length === 0) return null

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {pieces.map((p, i) => (
        <div
          key={i}
          className="confetti-piece absolute"
          style={{ left: p.left, top: "-5%", width: p.width, height: p.height, opacity: 0 }}
        >
          {renderShape(p.shape, p.color)}
        </div>
      ))}
    </div>
  )
}
