import { getAllCards, getCardCount } from "@/lib/store"
import { GradConfetti } from "@/components/effects/GradConfetti"
import { PiLinkSimpleBold, PiUserCircleBold, PiEnvelopeSimpleOpenBold, PiMusicNoteSimpleBold, PiImageBold } from "react-icons/pi"
import { formatDistanceToNow } from "date-fns"
import { vi } from "date-fns/locale"
import Link from "next/link"
import PasscodeProtection from "./PasscodeProtection"

export const revalidate = 0 // Disable caching for admin page to always show latest

export default async function AdminCardsPage() {
  const cards = await getAllCards()
  const totalCount = await getCardCount()

  // Ensure base URL works for links (assuming deployment on Vercel or localhost)
  const isDev = process.env.NODE_ENV === "development"
  const host = process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : isDev ? "http://localhost:3000" : ""

  return (
    <PasscodeProtection>
      <main className="min-h-screen relative p-6 sm:p-12 overflow-y-auto" style={{ backgroundColor: "#fdfbf7" }}>
        <GradConfetti />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-serif font-bold text-stone-800 mb-2">Thống Kê Thiệp Mời Tốt Nghiệp</h1>
              <p className="text-stone-500">
                Tổng số lượng thiệp mời đã được tạo qua hệ thống: <strong className="text-grad-blue-600">{totalCount}</strong>
              </p>
            </div>
            <div className="px-4 py-2 bg-grad-blue-100 text-grad-blue-800 rounded-full text-sm font-semibold shadow-sm">
              Đang hoạt động: {cards.length} link
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl shadow-grad-blue-900/5 border border-grad-blue-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-stone-600">
                <thead className="bg-grad-blue-50/80 text-grad-blue-800 text-xs uppercase font-semibold border-b border-grad-blue-100">
                  <tr>
                    <th className="px-6 py-4">Link Thiệp Mời</th>
                    <th className="px-6 py-4">Người Tạo (Sinh viên tốt nghiệp)</th>
                    <th className="px-6 py-4">Người Nhận</th>
                    <th className="px-6 py-4">Tiểu Tiết</th>
                    <th className="px-6 py-4">Thời gian tạo</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-grad-blue-50">
                  {cards.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-stone-400">
                        Chưa có thiệp mời nào được tạo.
                      </td>
                    </tr>
                  ) : (
                    cards.map(card => {
                      const cardUrl = `${host}/card/${card.id}`

                      return (
                        <tr key={card.id} className="hover:bg-grad-blue-50/50 transition-colors">
                          <td className="px-6 py-4">
                            <Link
                              href={`/card/${card.id}`}
                              target="_blank"
                              className="inline-flex items-center gap-1.5 text-grad-blue-600 hover:text-grad-blue-700 font-medium hover:underline"
                              title="Mở thiệp mời này"
                            >
                              <PiLinkSimpleBold />
                              {card.id}
                            </Link>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <PiUserCircleBold className="text-stone-400" />
                              <span className="font-semibold text-stone-800">{card.senderName}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 font-medium text-stone-800">
                            {card.recipientName}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-col gap-1 text-xs">
                              <div className="flex items-center gap-1.5 text-stone-500" title="Lời mời">
                                <PiEnvelopeSimpleOpenBold className="text-grad-blue-400 shrink-0" />
                                <span className="truncate max-w-[200px]">{card.message}</span>
                              </div>
                              {card.theme && (
                                <div className="flex items-center gap-1.5">
                                  <span className={`px-2 py-0.5 rounded-md text-[10px] uppercase font-bold tracking-wider ${
                                    card.theme === 'formal-invitation' ? 'bg-grad-blue-100 text-grad-blue-700' : 'bg-gold-100 text-gold-700'
                                  }`}>
                                    {card.theme === 'formal-invitation' ? 'Thiệp mời trang trọng' : 'Mũ tốt nghiệp'}
                                  </span>
                                </div>
                              )}
                              {(card.recipientImage || card.customMusic) && (
                                <div className="flex items-center gap-2 mt-1">
                                  {card.recipientImage && <PiImageBold className="text-emerald-500" title="Kèm ảnh" />}
                                  {card.customMusic && <PiMusicNoteSimpleBold className="text-violet-500" title="Kèm nhạc" />}
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-stone-500 text-xs">
                            {formatDistanceToNow(card.createdAt, { addSuffix: true, locale: vi })}
                          </td>
                        </tr>
                      )
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </PasscodeProtection>
  )
}
