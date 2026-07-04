import type { Metadata } from "next"
import { Inter, Playfair_Display, Dancing_Script } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-sans",
})

const playfair = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  variable: "--font-serif",
})

const dancingScript = Dancing_Script({
  subsets: ["latin", "vietnamese"],
  variable: "--font-cursive",
  weight: ["400", "700"],
})

export const metadata: Metadata = {
  title: "trunguye2n — Tạo thiệp mời tốt nghiệp HTTT-UET 🎓",
  description: "Tạo thiệp mời tốt nghiệp ngành Hệ Thống Thông Tin, Khoa CNTT, Đại học Công Nghệ - ĐHQGHN. Gửi bất ngờ cho bạn bè và người thân!",
  openGraph: {
    title: "trunguye2n — Thiệp mời tốt nghiệp HTTT-UET 🎓",
    description: "Bạn nhận được thiệp mời tốt nghiệp từ một sinh viên ngành Hệ Thống Thông Tin, UET-VNU!",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" suppressHydrationWarning className={`${inter.variable} ${playfair.variable} ${dancingScript.variable}`}>
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  )
}

