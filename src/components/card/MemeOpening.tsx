"use client"

import { useRef, useEffect } from "react"
import { animate } from "animejs"
import { PiHandTapFill } from "react-icons/pi"
import Image from "next/image"

interface MemeOpeningProps {
  onOpen: () => void
  recipientName: string
  theme?: string
}

export function MemeOpening({ onOpen, recipientName, theme = "grad-cap" }: MemeOpeningProps) {
  const isFormal = theme === "formal-invitation" || theme === "love-letter"
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!rootRef.current) return


    animate(".meme-title", {
      opacity: [0, 1],
      translateY: [-30, 0],
      duration: 800,
      ease: "out(4)",
      delay: 300,
    })

    animate(".meme-image-box", {
      opacity: [0, 1],
      scale: [0.85, 1],
      duration: 800,
      ease: "out(4)",
      delay: 600,
    })

    animate(".meme-hint", {
      opacity: [0, 1],
      duration: 600,
      delay: 1200,
    })

    animate(".meme-image-box", {
      translateY: [0, -12, 0],
      duration: 3000,
      ease: "inOut(2)",
      loop: true,
      delay: 1500,
    })
  }, [])

  return (
    <div
      ref={rootRef}
      className={`min-h-screen flex flex-col items-center justify-center px-6 cursor-pointer select-none ${isFormal ? "bg-gradient-to-b from-gold-50 via-white to-grad-blue-50/50" : "bg-gradient-to-b from-grad-blue-50 via-white to-grad-blue-50/50"}`}
      onClick={onOpen}
    >
      <h1
        className="meme-title text-3xl sm:text-4xl font-serif font-bold text-grad-blue-600 mb-8 text-center leading-snug"
        style={{ opacity: 0, fontStyle: "italic" }}
      >
        {isFormal ? "Cốc cốc, thư mời tốt nghiệp đến rồi" : "Cốc cốc, thiệp mời tốt nghiệp đến rồi"}
      </h1>

      <div
        className={`meme-image-box w-72 h-72 sm:w-80 sm:h-80 bg-white rounded-2xl shadow-lg border flex items-center justify-center overflow-hidden relative ${isFormal ? "border-gold-300" : "border-grad-blue-100"}`}
        style={{ opacity: 0 }}
      >
        {isFormal ? (
          /* Formal: envelope icon with gold accent */
          <div className="flex flex-col items-center gap-2 p-4">
            <svg viewBox="0 0 120 80" className="w-40 h-28" fill="none">
              <rect x="5" y="5" width="110" height="70" rx="6" fill="#fff8e1" stroke="#003366" strokeWidth="2.5" />
              <path d="M5 5 L60 40 L115 5" stroke="#003366" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="60" cy="40" r="8" fill="#FFD700" />
            </svg>
            <span className="text-[10px] text-gold-400 font-semibold tracking-widest uppercase">Thiệp Mời Trang Trọng</span>
          </div>
        ) : (
          <Image
            src="/cute.jpeg"
            alt="Cute meme"
            fill
            className="object-contain p-4"
            priority
          />
        )}
      </div>

      <p
        className={`meme-hint mt-8 text-sm flex items-center gap-2 animate-bounce ${isFormal ? "text-gold-500" : "text-grad-blue-500"}`}
        style={{ opacity: 0, fontFamily: "var(--font-cursive), 'Dancing Script', cursive" }}
      >
        <PiHandTapFill className={`w-4 h-4 ${isFormal ? "text-gold-400" : "text-grad-blue-400"}`} />
        {isFormal ? "💌 Chạm vào phong bì để mở thư mời 💌" : "🎓 Chạm vào ảnh, có thiệp mời bất ngờ 🎓"}
      </p>
    </div>
  )
}
