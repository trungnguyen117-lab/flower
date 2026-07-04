"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { animate } from "animejs";
import { MemeOpening } from "./MemeOpening";
import { DodgeButton } from "./DodgeButton";
import { MessageReveal } from "./MessageReveal";
import { MusicToggle } from "./MusicToggle";
import { BrandWatermark } from "@/components/BrandWatermark";
import { GradGift } from "@/components/effects/GradGift";
import { GradConfetti } from "@/components/effects/GradConfetti";
import { DiplomaDrawing } from "./DiplomaDrawing";
import { EnvelopeScene } from "./EnvelopeScene";
import { LetterModal } from "./LetterModal";
import {
  PiGraduationCapFill,
  PiHeartFill,
  PiGiftFill,
  PiSparkle,
} from "react-icons/pi";

type GradCapStage = "meme" | "question" | "dodging" | "diploma" | "reveal";

type FormalInvitationStage =
  | "meme"
  | "diplomaDrawing"
  | "envelopeScene"
  | "letterModal";

interface CardViewProps {
  recipientName: string;
  message: string;
  theme?: string;
  recipientImage?: string;
  senderName: string;
  customMusic?: string;
}

export function CardView({
  recipientName,
  message,
  theme = "grad-cap",
  recipientImage,
  senderName,
  customMusic,
}: CardViewProps) {
  // Normalize theme: map old theme IDs to new ones
  const normalizedTheme = theme === "love-letter" || theme === "formal-invitation" ? "formal-invitation" : "grad-cap"

  const [gradStage, setGradStage] = useState<GradCapStage>("meme");
  const [formalStage, setFormalStage] = useState<FormalInvitationStage>("meme");

  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (stageRef.current && normalizedTheme === "grad-cap" && gradStage !== "meme") {
      animate(stageRef.current, {
        opacity: [0, 1],
        duration: 600,
        ease: "out(3)",
      });
    }
  }, [gradStage, normalizedTheme]);

  const handleDiplomaComplete = useCallback(() => {
    setGradStage("reveal");
  }, []);

  const isFormal = normalizedTheme === "formal-invitation";

  const showWatermark = true;

  return (
    <div className="min-h-screen relative overflow-hidden">
      <BrandWatermark show={showWatermark} />

      <MusicToggle src={customMusic} />

      {!isFormal && (
        <>
          {gradStage === "meme" && (
            <MemeOpening
              recipientName={recipientName}
              onOpen={() => setGradStage("question")}
              theme="grad-cap"
            />
          )}
          {gradStage === "question" && (
            <div
              ref={stageRef}
              className="min-h-screen flex flex-col items-center justify-center px-6 bg-gradient-to-br from-stone-50 via-grad-blue-50/30 to-gold-50/20"
              style={{ opacity: 0 }}
            >
              <GradConfetti />
              <div className="text-center max-w-md relative z-10">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-grad-blue-100 to-grad-blue-200 flex items-center justify-center">
                  <PiGraduationCapFill className="w-10 h-10 text-grad-blue-600" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 mb-3 leading-snug">
                  Bạn đã sẵn sàng cho
                  <br />
                  <span className="text-grad-blue-600">
                    bất ngờ tốt nghiệp
                  </span>{" "}
                  chưa?
                </h2>
                <p className="text-stone-500 mb-10 text-base">
                  Có một tấm thiệp mời đang chờ bạn...
                </p>
                <button
                  onClick={() => setGradStage("dodging")}
                  className="px-10 py-4 bg-gradient-to-r from-grad-blue-600 to-grad-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-grad-blue-500/30 text-lg cursor-pointer hover:shadow-xl transition-shadow"
                >
                  <span className="flex items-center gap-2">
                    Sẵn sàng rồi!
                    <PiSparkle className="w-5 h-5" />
                  </span>
                </button>
              </div>
            </div>
          )}
          {gradStage === "dodging" && (
            <div
              ref={stageRef}
              className="min-h-screen flex flex-col items-center justify-center px-6 bg-gradient-to-br from-grad-blue-50 via-white to-gold-50/30"
              style={{ opacity: 0 }}
            >
              <div className="text-center max-w-md w-full">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-grad-blue-100 to-grad-blue-200 flex items-center justify-center">
                  <PiGiftFill className="w-8 h-8 text-grad-blue-600" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mb-2">
                  Bạn có muốn nhận
                  <br />
                  thiệp mời tốt nghiệp không?
                </h2>
                <p className="text-stone-400 text-sm mb-12">
                  Thử bấm &quot;Không&quot; xem nào
                </p>
                <div className="flex flex-col items-center gap-6 relative">
                  <button
                    onClick={() => setGradStage("diploma")}
                    className="px-10 py-4 bg-gradient-to-r from-grad-blue-600 to-grad-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-grad-blue-500/30 text-lg z-10 cursor-pointer hover:shadow-xl transition-shadow flex items-center gap-2"
                  >
                    Có! <PiHeartFill className="w-5 h-5" />
                  </button>
                  <DodgeButton />
                </div>
              </div>
            </div>
          )}
          {gradStage === "diploma" && (
            <div
              ref={stageRef}
              className="min-h-screen flex flex-col items-center justify-center px-6 bg-gradient-to-br from-grad-blue-50 via-white to-stone-50"
              style={{ opacity: 0 }}
            >
              <GradConfetti />
              <div className="text-center relative z-10">
                <p className="text-stone-500 font-medium mb-8 text-sm tracking-wide">
                  Gửi đến bạn một thiệp mời tốt nghiệp...
                </p>
                <GradGift onComplete={handleDiplomaComplete} />
              </div>
            </div>
          )}
          {gradStage === "reveal" && (
            <div ref={stageRef} style={{ opacity: 0 }}>
              <MessageReveal
                recipientName={recipientName}
                message={message}
                senderName={senderName}
                recipientImage={recipientImage}
              />
            </div>
          )}
        </>
      )}

      {isFormal && (
        <>
          {formalStage === "meme" && (
            <MemeOpening
              recipientName={recipientName}
              onOpen={() => setFormalStage("diplomaDrawing")}
              theme="formal-invitation"
            />
          )}
          {formalStage === "diplomaDrawing" && (
            <DiplomaDrawing
              onComplete={() => setFormalStage("envelopeScene")}
            />
          )}
          {formalStage === "envelopeScene" && (
            <EnvelopeScene
              recipientName={recipientName}
              onOpenLetter={() => setFormalStage("letterModal")}
            />
          )}
          {formalStage === "letterModal" && (
            <div
              className="min-h-screen"
              style={{ backgroundColor: "#e8f0fe" }}
            >
              <LetterModal
                recipientName={recipientName}
                message={message}
                recipientImage={recipientImage}
                senderName={senderName}
                onClose={() => setFormalStage("envelopeScene")}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
