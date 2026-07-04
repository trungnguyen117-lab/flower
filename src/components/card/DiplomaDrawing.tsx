"use client"

import { useRef, useEffect, useState } from "react"
import { animate } from "animejs"

interface DiplomaDrawingProps {
  onComplete: () => void
}

export function DiplomaDrawing({ onComplete }: DiplomaDrawingProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [showClick, setShowClick] = useState(false)

  useEffect(() => {
    if (!svgRef.current) return

    const paths = svgRef.current.querySelectorAll(".diploma-path")

    paths.forEach((path) => {
      const el = path as SVGPathElement | SVGRectElement | SVGCircleElement | SVGEllipseElement
      if (el instanceof SVGPathElement) {
        const len = el.getTotalLength()
        el.setAttribute("stroke", "#003366")
        el.setAttribute("fill", "none")
        el.setAttribute("stroke-width", "2")
        el.style.strokeDasharray = `${len}`
        el.style.strokeDashoffset = `${len}`
      } else {
        el.setAttribute("stroke", "#003366")
        el.setAttribute("fill", "none")
        el.setAttribute("stroke-width", "2")
      }
    })

    // Collect rects/circles for stroke-dash
    const rects = svgRef.current.querySelectorAll(".diploma-rect") as NodeListOf<SVGRectElement>
    const circles = svgRef.current.querySelectorAll(".diploma-circle") as NodeListOf<SVGCircleElement>
    rects.forEach((r) => {
      const w = r.getAttribute("width") ? parseFloat(r.getAttribute("width")!) : 0
      const h = r.getAttribute("height") ? parseFloat(r.getAttribute("height")!) : 0
      const len = 2 * w + 2 * h
      r.style.strokeDasharray = `${len}`
      r.style.strokeDashoffset = `${len}`
    })
    circles.forEach((c) => {
      const r = parseFloat(c.getAttribute("r") || "0")
      const len = 2 * Math.PI * r
      c.style.strokeDasharray = `${len}`
      c.style.strokeDashoffset = `${len}`
    })

    const allElements = [...paths, ...rects, ...circles]

    allElements.forEach((el, idx) => {
      let len = 0
      if (el instanceof SVGPathElement) len = el.getTotalLength()
      else if (el instanceof SVGRectElement) {
        const w = parseFloat(el.getAttribute("width") || "0")
        const h = parseFloat(el.getAttribute("height") || "0")
        len = 2 * w + 2 * h
      } else if (el instanceof SVGCircleElement) {
        const r = parseFloat(el.getAttribute("r") || "0")
        len = 2 * Math.PI * r
      }
      const currentLen = len

      animate(el, {
        strokeDashoffset: currentLen > 0 ? [currentLen, 0] : [0, 0],
        ease: "inOut(3)",
        duration: 600 + idx * 60, // faster draw than rose
        complete: () => {
          if (idx === allElements.length - 1) {
            // Fill colors after drawing
            const fills: Record<string, string> = {
              "diploma-paper": "#fff8e1",
              "diploma-roll-top": "#f5e6c8",
              "diploma-roll-bottom": "#f5e6c8",
              "diploma-ribbon": "#003366",
              "diploma-seal": "#FFD700",
              "diploma-seal-inner": "#fff8e1",
              "diploma-cap": "#003366",
              "diploma-tassel": "#FFD700",
            }
            allElements.forEach((el2) => {
              const cls = [...el2.classList]
              for (const [name, color] of Object.entries(fills)) {
                if (cls.includes(name)) {
                  animate(el2, {
                    fill: ["transparent", color],
                    stroke: ["#003366", "transparent"],
                    duration: 800,
                    ease: "out(3)",
                  })
                }
              }
            })
            setTimeout(() => setShowClick(true), 1000)
          }
        },
      })
    })
  }, [])

  useEffect(() => {
    if (showClick) {
      animate(".click-text", {
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 600,
        ease: "out(4)",
      })
    }
  }, [showClick])

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 cursor-pointer select-none"
      style={{ backgroundColor: "#e8f0fe" }}
      onClick={() => showClick && onComplete()}
    >
      <svg
        ref={svgRef}
        viewBox="0 0 512 512"
        className="w-[70%] max-w-sm"
      >
        {/* Scroll body — paper */}
        <rect
          className="diploma-path diploma-rect diploma-paper"
          x="120" y="100" width="272" height="312" rx="8"
        />

        {/* Top roll */}
        <rect
          className="diploma-path diploma-rect diploma-roll-top"
          x="100" y="80" width="312" height="36" rx="18"
        />

        {/* Bottom roll */}
        <rect
          className="diploma-path diploma-rect diploma-roll-bottom"
          x="100" y="396" width="312" height="36" rx="18"
        />

        {/* Vertical ribbon */}
        <rect
          className="diploma-path diploma-rect diploma-ribbon"
          x="248" y="110" width="16" height="292" rx="2"
        />

        {/* Horizontal ribbon */}
        <rect
          className="diploma-path diploma-rect diploma-ribbon"
          x="115" y="235" width="282" height="16" rx="2"
        />

        {/* Ribbon bow left */}
        <ellipse
          className="diploma-path diploma-ribbon"
          cx="238" cy="243" rx="22" ry="14"
          transform="rotate(-15 238 243)"
        />

        {/* Ribbon bow right */}
        <ellipse
          className="diploma-path diploma-ribbon"
          cx="274" cy="243" rx="22" ry="14"
          transform="rotate(15 274 243)"
        />

        {/* Seal outer */}
        <circle
          className="diploma-path diploma-circle diploma-seal"
          cx="256" cy="243" r="46"
        />

        {/* Seal inner ring */}
        <circle
          className="diploma-path diploma-circle diploma-seal-inner"
          cx="256" cy="243" r="34"
        />

        {/* Graduation cap icon in seal */}
        <path
          className="diploma-path diploma-cap"
          d="M230 250 L256 234 L282 250 L278 250 L278 260 L234 260 L234 250 Z"
        />
        <path
          className="diploma-path diploma-tassel"
          d="M282 250 L290 258"
        />
        <circle
          className="diploma-path diploma-circle diploma-tassel"
          cx="290" cy="260" r="4"
        />

        {/* Decorative lines on paper */}
        <line className="diploma-path diploma-paper" x1="150" y1="280" x2="362" y2="280" />
        <line className="diploma-path diploma-paper" x1="150" y1="300" x2="362" y2="300" />
        <line className="diploma-path diploma-paper" x1="150" y1="320" x2="362" y2="320" />
        <line className="diploma-path diploma-paper" x1="150" y1="340" x2="300" y2="340" />
      </svg>

      {showClick && (
        <div className="click-text flex flex-col items-center mt-6 gap-3" style={{ opacity: 0 }}>
          <style>{`
            @keyframes sparkle-twinkle {
              0%, 100% { opacity: 0; transform: scale(0.5); }
              50% { opacity: 1; transform: scale(1.2); }
            }
            .sparkle-dot {
              position: absolute;
              width: 4px;
              height: 4px;
              background: #FFD700;
              border-radius: 50%;
              box-shadow: 0 0 6px 2px rgba(255,215,0,0.6);
            }
          `}</style>

          <div className="relative" style={{ width: 80, height: 80 }}>
            {[
              { top: 0, left: 36, delay: 0 },
              { top: 14, left: 70, delay: 0.5 },
              { top: 55, left: 72, delay: 1.0 },
              { top: 70, left: 36, delay: 1.5 },
              { top: 55, left: 4, delay: 0.8 },
              { top: 14, left: 6, delay: 1.3 },
            ].map((s, i) => (
              <span
                key={i}
                className="sparkle-dot"
                style={{
                  top: s.top, left: s.left,
                  animation: `sparkle-twinkle 2s ease-in-out infinite ${s.delay}s`,
                }}
              />
            ))}
          </div>

          <p
            className="text-grad-blue-600 text-xl animate-bounce"
            style={{ fontFamily: "var(--font-cursive), 'Dancing Script', cursive" }}
          >
            🎓 Chạm để tiếp tục... 🎓
          </p>
        </div>
      )}
    </div>
  )
}
