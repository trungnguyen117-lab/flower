"use client"

import { useRef, useEffect } from "react"
import { animate } from "animejs"
import { GradConfetti } from "@/components/effects/GradConfetti"

interface EnvelopeSceneProps {
  onOpenLetter: () => void
  recipientName: string
}

export function EnvelopeScene({ onOpenLetter, recipientName }: EnvelopeSceneProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!rootRef.current || !svgRef.current) return

    animate(".env-valentines", {
      translateY: [0, -30, 0],
      duration: 3000,
      ease: "inOut(2)",
      loop: true,
    })

    animate(".env-shadow", {
      scaleX: [1, 0.85, 1],
      duration: 3000,
      ease: "inOut(2)",
      loop: true,
    })

    animate(".env-card", {
      opacity: [0, 1],
      duration: 500,
      delay: 500,
    })

    const starOutline = svgRef.current.querySelector("#starOutline") as SVGPathElement | null
    if (starOutline) {
      const totalLen = starOutline.getTotalLength()
      starOutline.style.strokeDasharray = `${totalLen}`
      starOutline.style.strokeDashoffset = `${totalLen}`

      animate(starOutline, {
        strokeDashoffset: [totalLen, 0],
        duration: 3000,
        delay: 500,
        ease: "inOut(2)",
      })
    }

    animate(".svg-star-text", {
      opacity: [0, 1],
      duration: 1500,
      delay: 2500,
      ease: "out(3)",
    })

    setTimeout(() => {
      animate(".svg-star-ring", {
        opacity: [1, 0.7, 1],
        duration: 5000,
        ease: "inOut(2)",
        loop: true,
      })
    }, 4500)
  }, [])

  return (
    <div
      ref={rootRef}
      className="min-h-screen flex flex-col items-center justify-center px-6 select-none relative overflow-hidden"
      style={{ backgroundColor: "#e8f0fe" }}
    >
      <GradConfetti />

      <style>{`
        .env-big-star {
          display: inline-block;
          height: 30px;
          width: 30px;
          position: relative;
          top: 110px;
          left: 105px;
          color: #FFD700;
          font-size: 30px;
          line-height: 30px;
          transform: rotate(-5deg);
        }

        .env-stars { position: absolute; top: 0; }

        .env-float-star {
          display: inline-block;
          height: 10px;
          width: 10px;
          position: relative;
          top: 50px;
          color: #FFD700;
          font-size: 14px;
        }

        .env-s-one   { left: 10px; animation: env-star-float 1s ease-out infinite; }
        .env-s-two   { left: 30px; animation: env-star-float 2s ease-out infinite; }
        .env-s-three { left: 50px; animation: env-star-float 1.5s ease-out infinite; }
        .env-s-four  { left: 70px; animation: env-star-float 2.3s ease-out infinite; }
        .env-s-five  { left: 90px; animation: env-star-float 1.7s ease-out infinite; }

        @keyframes env-star-float {
          0%   { transform: translateY(0) scale(0.3); opacity: 1; }
          100% { transform: translateY(-150px) scale(1.5); opacity: 0.5; }
        }
      `}</style>

      <svg
        ref={svgRef}
        className="svg-star-ring absolute"
        viewBox="-130 -40 260 200"
        style={{ width: "min(150vw, 900px)", minWidth: "550px", zIndex: 1 }}
      >
        <defs>
          <path
            id="starShapePath"
            d="M0,21.054 C0,21.054 24.618,-15.165 60.750,8.554 C93.249,29.888 57.749,96.888 0,117.388 C-57.749,96.888 -93.249,29.888 -60.750,8.554 C-24.618,-15.165 0,21.054 0,21.054z"
          />
        </defs>
        <path
          id="starOutline"
          d="M0,21.054 C0,21.054 24.618,-15.165 60.750,8.554 C93.249,29.888 57.749,96.888 0,117.388 C-57.749,96.888 -93.249,29.888 -60.750,8.554 C-24.618,-15.165 0,21.054 0,21.054z"
          fill="none" stroke="#7aa8e0" strokeWidth="0.8" strokeDasharray="4 3"
        />
        <text className="svg-star-text" dy="-3" fill="#003366" fontSize="8" style={{ fontFamily: "var(--font-cursive), 'Dancing Script', cursive", opacity: 0 }}>
          <textPath xlinkHref="#starShapePath" startOffset="5%">
            🎓 THIỆP MỜI TỐT NGHIỆP 🎓 ················· 🎓 Mời bạn đến dự lễ tốt nghiệp của {recipientName}! 🎓
          </textPath>
        </text>
      </svg>

      <div className="relative z-10" style={{ width: 300, height: 320 }}>
        <div className="env-valentines relative cursor-pointer" style={{ top: 50 }} onClick={onOpenLetter}>

          <div className="env-stars">
            <div className="env-float-star env-s-one">✦</div>
            <div className="env-float-star env-s-two">✧</div>
            <div className="env-float-star env-s-three">✦</div>
            <div className="env-float-star env-s-four">✧</div>
            <div className="env-float-star env-s-five">✦</div>
          </div>

          <div className="relative" style={{ width: 300, height: 200, backgroundColor: "#003366" }}>
            <div className="absolute" style={{
              width: 212, height: 212,
              backgroundColor: "#003366",
              transform: "rotate(45deg)",
              top: -105, left: 44,
              borderRadius: "30px 0 0 0",
            }} />

            <div
              className="env-card absolute"
              style={{
                backgroundColor: "#fff8e1", width: 270, height: 170,
                top: 5, left: 15, boxShadow: "-5px -5px 100px rgba(0,0,0,0.4)",
                opacity: 0,
              }}
            >
              <div className="absolute" style={{
                border: "3px dotted #003366", width: 240, height: 140,
                left: 12, top: 12,
              }} />
              <p style={{
                position: "absolute", fontSize: 28, color: "#003366",
                lineHeight: "30px", top: 30, left: 55,
                fontFamily: "'Brush Script MT', cursive",
                fontWeight: "bold",
              }}>
                TỐT<br />NGHIỆP<br />UET!
              </p>
              <div className="env-big-star">⭐</div>
            </div>

            <div className="absolute" style={{
              borderRight: "180px solid #1a5276",
              borderTop: "95px solid transparent",
              borderBottom: "100px solid transparent",
              left: 120, top: 5, width: 0, height: 0, zIndex: 10,
            }} />
            <div className="absolute" style={{
              borderLeft: "300px solid #1e3a5f",
              borderTop: "195px solid transparent",
              left: 0, top: 5, width: 0, height: 0, zIndex: 9,
            }} />
          </div>
        </div>

        <div className="env-shadow absolute" style={{
          width: 330, height: 25, borderRadius: "50%",
          backgroundColor: "rgba(0,0,0,0.3)",
          top: 265, left: -15, zIndex: -1,
        }} />
      </div>

      <div className="absolute bottom-12 w-full flex justify-center z-50 pointer-events-none">
        <p className="text-grad-blue-600 text-lg sm:text-xl font-bold animate-bounce px-6 py-3 bg-white/70 backdrop-blur-md rounded-full shadow-lg shadow-grad-blue-200" style={{ fontFamily: "var(--font-cursive), 'Dancing Script', cursive" }}>
          🎓 Chạm vào phong bì để xem thiệp mời... 🎓
        </p>
      </div>
    </div>
  )
}
