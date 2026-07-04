"use client"

import { useEffect, useRef } from "react"
import { animate, createTimeline } from "animejs"

export function GradGift({ onComplete }: { onComplete?: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!rootRef.current) return

    const tl = createTimeline({
      onComplete: () => {
        setTimeout(() => onComplete?.(), 500)
      },
    })

    // Scroll body unrolls
    tl.add(".grad-scroll-body", {
      scaleY: [0, 1],
      opacity: [0, 1],
      duration: 800,
      ease: "out(3)",
    }, 0)

    // Left scroll roll
    tl.add(".grad-scroll-left", {
      scaleX: [0, 1],
      opacity: [0, 1],
      duration: 500,
      ease: "out(4)",
    }, 300)

    // Right scroll roll
    tl.add(".grad-scroll-right", {
      scaleX: [0, 1],
      opacity: [0, 1],
      duration: 500,
      ease: "out(4)",
    }, 400)

    // Ribbon appears
    tl.add(".grad-ribbon-v", {
      scaleY: [0, 1],
      opacity: [0, 1],
      duration: 600,
      ease: "out(3)",
    }, 700)

    tl.add(".grad-ribbon-h", {
      scaleX: [0, 1],
      opacity: [0, 1],
      duration: 600,
      ease: "out(3)",
    }, 800)

    // Seal stamp appears
    tl.add(".grad-seal", {
      scale: [0, 1],
      opacity: [0, 1],
      duration: 500,
      ease: "out(4)",
    }, 1000)

    // Sparkles appear
    tl.add(".grad-sparkle", {
      scale: [0, 1],
      opacity: [0, 1],
      duration: 400,
      delay: (_el: any, i: number) => i * 150,
      ease: "out(3)",
    }, 1200)

    // Gentle float
    tl.add(".grad-whole", {
      translateY: [0, -8, 0],
      duration: 2000,
      ease: "inOut(2)",
      loop: 2,
    }, 1500)

  }, [onComplete])

  return (
    <div ref={rootRef} className="flex items-center justify-center">
      <svg
        className="grad-whole"
        width="200"
        height="240"
        viewBox="0 0 200 240"
        fill="none"
      >
        {/* Scroll body (unrolls vertically) */}
        <rect
          className="grad-scroll-body"
          x="40"
          y="60"
          width="120"
          height="140"
          rx="4"
          fill="#fff8e1"
          stroke="#003366"
          strokeWidth="2"
          style={{ transformOrigin: "100px 130px" }}
          opacity="0"
        />

        {/* Scroll top roll */}
        <rect
          className="grad-scroll-left"
          x="28"
          y="48"
          width="144"
          height="20"
          rx="10"
          fill="#f5e6c8"
          stroke="#003366"
          strokeWidth="1.5"
          style={{ transformOrigin: "100px 58px" }}
          opacity="0"
        />

        {/* Scroll bottom roll */}
        <rect
          className="grad-scroll-right"
          x="28"
          y="192"
          width="144"
          height="20"
          rx="10"
          fill="#f5e6c8"
          stroke="#003366"
          strokeWidth="1.5"
          style={{ transformOrigin: "100px 202px" }}
          opacity="0"
        />

        {/* Ribbon — vertical band */}
        <rect
          className="grad-ribbon-v"
          x="94"
          y="55"
          width="12"
          height="155"
          rx="2"
          fill="#003366"
          style={{ transformOrigin: "100px 132px" }}
          opacity="0"
        />

        {/* Ribbon — horizontal band */}
        <rect
          className="grad-ribbon-h"
          x="35"
          y="120"
          width="130"
          height="12"
          rx="2"
          fill="#003366"
          style={{ transformOrigin: "100px 126px" }}
          opacity="0"
        />

        {/* Ribbon bow (two ellipses + center) */}
        <ellipse
          className="grad-ribbon-h"
          cx="88"
          cy="125"
          rx="14"
          ry="10"
          fill="#003366"
          opacity="0"
        />
        <ellipse
          className="grad-ribbon-h"
          cx="112"
          cy="125"
          rx="14"
          ry="10"
          fill="#003366"
          opacity="0"
        />

        {/* Circular Seal/Stamp */}
        <circle
          className="grad-seal"
          cx="100"
          cy="126"
          r="26"
          fill="#FFD700"
          stroke="#003366"
          strokeWidth="2"
          opacity="0"
        />
        <circle
          className="grad-seal"
          cx="100"
          cy="126"
          r="20"
          fill="none"
          stroke="#003366"
          strokeWidth="1"
          opacity="0"
        />
        {/* Graduation cap icon inside seal */}
        <g className="grad-seal" opacity="0">
          <path
            d="M88 126 L100 118 L112 126 L110 126 L110 132 L90 132 L90 126 Z"
            fill="#003366"
          />
          <rect x="88" y="132" width="24" height="3" rx="1" fill="#003366" />
          <line x1="112" y1="126" x2="116" y2="130" stroke="#003366" strokeWidth="2" strokeLinecap="round" />
          <circle cx="116" cy="131" r="2" fill="#FFD700" />
        </g>

        {/* Sparkle stars around the diploma */}
        {[
          { x: 160, y: 90 }, { x: 170, y: 140 }, { x: 155, y: 170 },
          { x: 50, y: 170 }, { x: 30, y: 140 }, { x: 45, y: 90 },
        ].map((s, i) => (
          <g key={i} className="grad-sparkle" opacity="0">
            <text x={s.x} y={s.y} fontSize="16" fill="#FFD700" textAnchor="middle" dominantBaseline="central">
              ✦
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}
