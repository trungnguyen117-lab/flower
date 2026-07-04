import { fetchCard } from "@/lib/actions"
import { CardView } from "@/components/card/CardView"
import { notFound } from "next/navigation"
import { Metadata } from "next"

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const card = await fetchCard(id)

  return {
    title: card ? `Thiệp mời tốt nghiệp cho ${card.recipientName} 🎓` : "trunguye2n",
    description: card ? "Bạn nhận được thiệp mời tốt nghiệp ngành Hệ Thống Thông Tin, UET-VNU!" : "Không tìm thấy thiệp mời.",
    openGraph: {
      title: card ? `🎓 ${card.recipientName}, bạn có thiệp mời tốt nghiệp!` : "trunguye2n",
      description: "Nhấn để xem thiệp mời tốt nghiệp ngành Hệ Thống Thông Tin, Khoa CNTT, Đại học Công Nghệ - ĐHQGHN! 🎉",
    },
  }
}

export default async function CardPage({ params }: Props) {
  const { id } = await params
  const card = await fetchCard(id)

  if (!card) {
    notFound()
  }

  return (
    <CardView
      recipientName={card.recipientName}
      message={card.message}
      theme={card.theme}
      recipientImage={card.recipientImage}
      senderName={card.senderName}
      customMusic={card.customMusic}
    />
  )
}
