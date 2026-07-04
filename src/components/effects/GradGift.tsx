"use client";

import { useEffect, useRef } from "react";
import { createTimeline } from "animejs";

export function GradGift({ onComplete }: { onComplete?: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;

    const tl = createTimeline({
      onComplete: () => {
        setTimeout(() => onComplete?.(), 600);
      },
    });

    // Soft glow blooms first, sets the stage
    tl.add(
      ".grad-glow",
      {
        scale: [0.6, 1],
        opacity: [0, 0.9],
        duration: 900,
        ease: "out(2)",
      },
      0,
    );

    // Scroll rolls unfurl outward from the center
    tl.add(
      ".grad-roll-top",
      {
        translateY: [40, 0],
        opacity: [0, 1],
        duration: 550,
        ease: "outElastic(1, 0.7)",
      },
      150,
    );

    tl.add(
      ".grad-roll-bottom",
      {
        translateY: [-40, 0],
        opacity: [0, 1],
        duration: 550,
        ease: "outElastic(1, 0.7)",
      },
      150,
    );

    // Parchment body unrolls vertically
    tl.add(
      ".grad-scroll-body",
      {
        scaleY: [0, 1],
        opacity: [0, 1],
        duration: 700,
        ease: "outExpo",
      },
      250,
    );

    // Handwritten lines fade in like ink appearing
    tl.add(
      ".grad-ink-line",
      {
        scaleX: [0, 1],
        opacity: [0, 0.8],
        duration: 450,
        delay: (_el: any, i: number) => i * 120,
        ease: "outQuad",
      },
      900,
    );

    // Laurel wreath sweeps in from both sides
    tl.add(
      ".grad-laurel-left",
      {
        opacity: [0, 1],
        translateX: [-14, 0],
        rotate: [-8, 0],
        duration: 550,
        ease: "outBack",
      },
      1050,
    );

    tl.add(
      ".grad-laurel-right",
      {
        opacity: [0, 1],
        translateX: [14, 0],
        rotate: [8, 0],
        duration: 550,
        ease: "outBack",
      },
      1050,
    );

    // Ribbon streamers drop and settle
    tl.add(
      ".grad-ribbon-tail",
      {
        scaleY: [0, 1],
        opacity: [0, 1],
        duration: 500,
        ease: "outElastic(1, 0.6)",
      },
      1150,
    );

    // Medallion seal stamps down with a little bounce
    tl.add(
      ".grad-seal",
      {
        scale: [0, 1.15, 1],
        opacity: [0, 1],
        duration: 600,
        ease: "outBack",
      },
      1300,
    );

    tl.add(
      ".grad-seal-glyph",
      {
        scale: [0, 1],
        opacity: [0, 1],
        duration: 400,
        ease: "outBack",
      },
      1550,
    );

    // Confetti bursts outward
    tl.add(
      ".grad-confetti",
      {
        translateX: (el: any) => el.getAttribute("data-dx"),
        translateY: (el: any) => el.getAttribute("data-dy"),
        rotate: () => Math.random() * 360 - 180,
        scale: [0, 1],
        opacity: [0, 1, 0.9],
        duration: 700,
        delay: (_el: any, i: number) => i * 35,
        ease: "outCubic",
      },
      1500,
    );

    // Sparkles twinkle around the piece
    tl.add(
      ".grad-sparkle",
      {
        scale: [0, 1.3, 1],
        opacity: [0, 1, 0.7],
        duration: 500,
        delay: (_el: any, i: number) => i * 110,
        ease: "outBack",
      },
      1700,
    );

    // Gentle celebratory float + sparkle shimmer loop
    tl.add(
      ".grad-whole",
      {
        translateY: [0, -10, 0],
        duration: 2200,
        ease: "inOut(2)",
        loop: 2,
      },
      2100,
    );

    tl.add(
      ".grad-sparkle",
      {
        opacity: [0.7, 0.25, 0.7],
        duration: 900,
        delay: (_el: any, i: number) => i * 90,
        loop: 3,
        ease: "inOut(2)",
      },
      2200,
    );
  }, [onComplete]);

  const confetti = [
    { x: 100, y: 130, dx: -70, dy: -55, color: "#C9A227" },
    { x: 100, y: 130, dx: 65, dy: -60, color: "#8B2E3C" },
    { x: 100, y: 130, dx: -55, dy: 60, color: "#1B4B6B" },
    { x: 100, y: 130, dx: 70, dy: 50, color: "#C9A227" },
    { x: 100, y: 130, dx: -20, dy: -75, color: "#1B4B6B" },
    { x: 100, y: 130, dx: 25, dy: 75, color: "#8B2E3C" },
    { x: 100, y: 130, dx: -80, dy: 5, color: "#1B4B6B" },
    { x: 100, y: 130, dx: 80, dy: -5, color: "#C9A227" },
  ];

  const sparkles = [
    { x: 168, y: 78, size: 15 },
    { x: 178, y: 145, size: 11 },
    { x: 160, y: 190, size: 13 },
    { x: 40, y: 190, size: 12 },
    { x: 22, y: 145, size: 15 },
    { x: 32, y: 78, size: 10 },
  ];

  return (
    <div ref={rootRef} className="flex items-center justify-center">
      <svg
        className="grad-whole"
        width="220"
        height="260"
        viewBox="0 0 200 240"
        fill="none"
      >
        <defs>
          <radialGradient id="glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F4D77B" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#F4D77B" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="parchment" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FCF6E3" />
            <stop offset="100%" stopColor="#F4E9C8" />
          </linearGradient>

          <linearGradient id="rollShade" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#EAD9A0" />
            <stop offset="100%" stopColor="#D8C083" />
          </linearGradient>

          <linearGradient id="ribbon" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#9A2436" />
            <stop offset="100%" stopColor="#7A1B2A" />
          </linearGradient>

          <radialGradient id="seal" cx="35%" cy="30%" r="75%">
            <stop offset="0%" stopColor="#F6E27A" />
            <stop offset="55%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#A9821E" />
          </radialGradient>

          <filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow
              dx="0"
              dy="3"
              stdDeviation="3"
              floodColor="#1B4B6B"
              floodOpacity="0.25"
            />
          </filter>
        </defs>

        {/* Ambient glow behind everything */}
        <circle
          className="grad-glow"
          cx="100"
          cy="126"
          r="105"
          fill="url(#glow)"
          opacity="0"
        />

        {/* Scroll body */}
        <rect
          className="grad-scroll-body"
          x="42"
          y="60"
          width="116"
          height="132"
          rx="3"
          fill="url(#parchment)"
          stroke="#1B4B6B"
          strokeWidth="1.5"
          style={{ transformOrigin: "100px 126px" }}
          filter="url(#softShadow)"
          opacity="0"
        />

        {/* Handwritten ink lines suggesting text on the diploma */}
        {[86, 100, 114, 128].map((y, i) => (
          <rect
            key={y}
            className="grad-ink-line"
            x="56"
            y={y}
            width={i === 3 ? 60 : 88}
            height="3"
            rx="1.5"
            fill="#1B4B6B"
            opacity="0"
            style={{ transformOrigin: "56px " + (y + 1.5) + "px" }}
          />
        ))}

        {/* Small laurel sprigs flanking the ink, echoing the seal's wreath */}
        <g className="grad-laurel-left" opacity="0">
          <path
            d="M60 150 Q50 156 52 166"
            stroke="#3E6E4F"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          <ellipse
            cx="54"
            cy="156"
            rx="4"
            ry="2.4"
            fill="#4F8A61"
            transform="rotate(-30 54 156)"
          />
          <ellipse
            cx="51"
            cy="163"
            rx="4"
            ry="2.4"
            fill="#4F8A61"
            transform="rotate(-10 51 163)"
          />
        </g>
        <g className="grad-laurel-right" opacity="0">
          <path
            d="M140 150 Q150 156 148 166"
            stroke="#3E6E4F"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          <ellipse
            cx="146"
            cy="156"
            rx="4"
            ry="2.4"
            fill="#4F8A61"
            transform="rotate(30 146 156)"
          />
          <ellipse
            cx="149"
            cy="163"
            rx="4"
            ry="2.4"
            fill="#4F8A61"
            transform="rotate(10 149 163)"
          />
        </g>

        {/* Top and bottom rolled edges */}
        <rect
          className="grad-roll-top"
          x="30"
          y="48"
          width="140"
          height="18"
          rx="9"
          fill="url(#rollShade)"
          stroke="#1B4B6B"
          strokeWidth="1.2"
          filter="url(#softShadow)"
          opacity="0"
        />
        <rect
          className="grad-roll-bottom"
          x="30"
          y="186"
          width="140"
          height="18"
          rx="9"
          fill="url(#rollShade)"
          stroke="#1B4B6B"
          strokeWidth="1.2"
          filter="url(#softShadow)"
          opacity="0"
        />

        {/* Ribbon streamers hanging from the seal */}
        <path
          className="grad-ribbon-tail"
          d="M90 176 L86 214 L98 206 L100 218 L102 206 L114 214 L110 176 Z"
          fill="url(#ribbon)"
          style={{ transformOrigin: "100px 176px" }}
          opacity="0"
        />

        {/* Medallion seal */}
        <circle
          className="grad-seal"
          cx="100"
          cy="150"
          r="30"
          fill="url(#seal)"
          stroke="#8A6B14"
          strokeWidth="1.5"
          filter="url(#softShadow)"
          opacity="0"
        />
        <circle
          className="grad-seal"
          cx="100"
          cy="150"
          r="30"
          fill="none"
          stroke="#FCF1C7"
          strokeWidth="1"
          strokeDasharray="2 3"
          opacity="0"
        />

        {/* Laurel wreath framing the seal glyph */}
        <g className="grad-seal-glyph" opacity="0">
          <path
            d="M76 150 Q80 136 92 130"
            stroke="#7A5C10"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M124 150 Q120 136 108 130"
            stroke="#7A5C10"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          {[
            { x: 78, y: 146, r: -20 },
            { x: 82, y: 138, r: -35 },
            { x: 88, y: 132, r: -50 },
            { x: 122, y: 146, r: 20 },
            { x: 118, y: 138, r: 35 },
            { x: 112, y: 132, r: 50 },
          ].map((leaf, i) => (
            <ellipse
              key={i}
              cx={leaf.x}
              cy={leaf.y}
              rx="4.5"
              ry="2.4"
              fill="#7A5C10"
              transform={`rotate(${leaf.r} ${leaf.x} ${leaf.y})`}
            />
          ))}

          {/* Graduation cap */}
          <path d="M86 150 L100 142 L114 150 L100 158 Z" fill="#1B4B6B" />
          <path
            d="M92 152.5 L92 160 C92 163 108 163 108 160 L108 152.5"
            fill="none"
            stroke="#1B4B6B"
            strokeWidth="2.5"
          />
          <line
            x1="114"
            y1="150"
            x2="119"
            y2="154"
            stroke="#1B4B6B"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle
            cx="119"
            cy="155.5"
            r="2.2"
            fill="#F6E27A"
            stroke="#8A6B14"
            strokeWidth="0.5"
          />
        </g>

        {/* Confetti burst */}
        {confetti.map((c, i) => (
          <rect
            key={i}
            className="grad-confetti"
            data-dx={c.dx}
            data-dy={c.dy}
            x={c.x - 3}
            y={c.y - 3}
            width="6"
            height="6"
            rx="1.5"
            fill={c.color}
            opacity="0"
            style={{ transformOrigin: `${c.x}px ${c.y}px` }}
          />
        ))}

        {/* Twinkling sparkles */}
        {sparkles.map((s, i) => (
          <text
            key={i}
            className="grad-sparkle"
            x={s.x}
            y={s.y}
            fontSize={s.size}
            fill="#F6E27A"
            textAnchor="middle"
            dominantBaseline="central"
            opacity="0"
            style={{ transformOrigin: `${s.x}px ${s.y}px` }}
          >
            ✦
          </text>
        ))}
      </svg>
    </div>
  );
}
