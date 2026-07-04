"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import QRCode from "qrcode"
import { PiDownloadSimpleBold, PiSpinnerBold } from "react-icons/pi"

interface GradQRProps {
  url: string
  recipientName: string
}

function drawGradCap(ctx: CanvasRenderingContext2D, cx: number, cy: number, scale: number) {
  ctx.save()
  ctx.translate(cx, cy)
  ctx.scale(scale, scale)

  // Mortarboard top (square)
  ctx.beginPath()
  ctx.moveTo(-80, -20)
  ctx.lineTo(80, -20)
  ctx.lineTo(60, -50)
  ctx.lineTo(-60, -50)
  ctx.closePath()
  ctx.restore()
}

function drawDecorativeNoise(ctx: CanvasRenderingContext2D, cx: number, cy: number, scale: number, color: string) {
  drawGradCap(ctx, cx, cy, scale)
  ctx.save()
  ctx.clip()

  const rng = (min: number, max: number) => Math.random() * (max - min) + min
  for (let i = 0; i < 600; i++) {
    const x = cx + rng(-scale * 80, scale * 80)
    const y = cy + rng(-scale * 50, scale * 50)
    const s = rng(2, 6)
    ctx.globalAlpha = rng(0.03, 0.1)
    ctx.fillStyle = color
    ctx.fillRect(x, y, s, s)
  }
  ctx.globalAlpha = 1
  ctx.restore()
}

export function GradQR({ url, recipientName }: GradQRProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (!canvasRef.current) return

    const generate = async () => {
      const canvas = canvasRef.current!
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      const W = 600, H = 680
      canvas.width = W
      canvas.height = H

      // Light blue background
      ctx.fillStyle = "#e8f0fe"
      ctx.fillRect(0, 0, W, H)

      const capCx = W / 2, capCy = 270, capScale = 3.2

      // Draw graduation cap shape
      drawGradCap(ctx, capCx, capCy, capScale)
      ctx.fillStyle = "#d0e0f5"
      ctx.fill()

      drawGradCap(ctx, capCx, capCy, capScale)
      ctx.lineWidth = 3
      ctx.strokeStyle = "#003366"
      ctx.stroke()

      drawDecorativeNoise(ctx, capCx, capCy, capScale, "#003366")

      const qrDataUrl = await QRCode.toDataURL(url, {
        width: 180,
        margin: 1,
        color: { dark: "#003366", light: "#ffffff" },
        errorCorrectionLevel: "M",
      })

      const qrImg = new window.Image()
      qrImg.src = qrDataUrl
      await new Promise<void>((resolve) => {
        qrImg.onload = () => {
          // White rounded rect behind QR
          ctx.beginPath()
          const qrBgX = capCx - 95, qrBgY = capCy - 40
          ctx.moveTo(qrBgX + 20, qrBgY)
          ctx.lineTo(qrBgX + 190 - 20, qrBgY)
          ctx.arcTo(qrBgX + 190, qrBgY, qrBgX + 190, qrBgY + 20, 20)
          ctx.lineTo(qrBgX + 190, qrBgY + 190 - 20)
          ctx.arcTo(qrBgX + 190, qrBgY + 190, qrBgX + 190 - 20, qrBgY + 190, 20)
          ctx.lineTo(qrBgX + 20, qrBgY + 190)
          ctx.arcTo(qrBgX, qrBgY + 190, qrBgX, qrBgY + 190 - 20, 20)
          ctx.lineTo(qrBgX, qrBgY + 20)
          ctx.arcTo(qrBgX, qrBgY, qrBgX + 20, qrBgY, 20)
          ctx.closePath()
          ctx.fillStyle = "#fff"
          ctx.fill()

          const qrSize = 160
          ctx.drawImage(qrImg, capCx - qrSize / 2, capCy - qrSize / 2 + 55, qrSize, qrSize)

          // Title text
          ctx.textAlign = "center"
          ctx.fillStyle = "#003366"
          ctx.font = "bold 28px 'Dancing Script', cursive, serif"
          ctx.fillText(`Gửi ${recipientName}`, capCx, capCy - 100)

          // Bottom text
          ctx.fillStyle = "#003366"
          ctx.font = "italic 22px serif"
          ctx.fillText("Thiệp mời tốt nghiệp 🎓", W / 2, capCy + 200)

          // Mini graduation caps
          const miniScale = 0.3
          const miniPositions = [
            { x: 120, y: 580 }, { x: 480, y: 580 },
            { x: 200, y: 620 }, { x: 400, y: 620 },
          ]
          miniPositions.forEach(({ x, y }) => {
            drawGradCap(ctx, x, y, miniScale)
            ctx.fillStyle = "#7aa8e0"
            ctx.fill()
          })

          ctx.fillStyle = "#a8a29e"
          ctx.font = "16px sans-serif"
          ctx.fillText("by trunguye2n", W / 2, H - 20)

          setIsReady(true)
          resolve()
        }
      })
    }

    generate()
  }, [url, recipientName])

  const handleDownload = useCallback(() => {
    if (!canvasRef.current) return
    const link = document.createElement("a")
    link.download = `QR_GradCard_${recipientName}.png`
    link.href = canvasRef.current.toDataURL("image/png")
    link.click()
  }, [recipientName])

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div className="relative w-full max-w-[300px] aspect-[6/7] rounded-2xl overflow-hidden shadow-sm border border-grad-blue-100 bg-grad-blue-50">
        <canvas
          ref={canvasRef}
          className="w-full h-full object-contain"
          style={{ opacity: isReady ? 1 : 0, transition: "opacity 0.5s" }}
        />
        {!isReady && (
          <div className="absolute inset-0 flex items-center justify-center text-stone-400">
            <PiSpinnerBold className="w-6 h-6 animate-spin" />
          </div>
        )}
      </div>
      <button
        onClick={handleDownload}
        disabled={!isReady}
        className="w-full max-w-[300px] py-3 bg-grad-blue-600 text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-grad-blue-700 transition-colors disabled:opacity-50 cursor-pointer"
      >
        <PiDownloadSimpleBold className="w-5 h-5" />
        Tải mã QR mũ tốt nghiệp
      </button>
    </div>
  )
}
