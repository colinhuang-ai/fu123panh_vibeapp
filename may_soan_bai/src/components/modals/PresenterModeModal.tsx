import React, { useState, useEffect } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  FileText,
  Clock,
  Sparkles,
} from "lucide-react";
import { SlideItem } from "../../types/lesson";

interface PresenterModeModalProps {
  slides: SlideItem[];
  initialIndex?: number;
  lessonTopic: string;
  onClose: () => void;
}

export const PresenterModeModal: React.FC<PresenterModeModalProps> = ({
  slides,
  initialIndex = 0,
  lessonTopic,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [showNotes, setShowNotes] = useState(true);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        setCurrentIndex((prev) => Math.min(prev + 1, slides.length - 1));
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Escape") {
        onClose();
      } else if (e.key === "n" || e.key === "N") {
        setShowNotes((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [slides.length, onClose]);

  // Timer
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const activeSlide = slides[currentIndex] || slides[0];

  const formatTimer = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (totalSeconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 text-white flex flex-col select-none overflow-hidden animate-fade-in">
      {/* Top Controls Bar */}
      <div className="h-14 px-6 flex items-center justify-between border-b border-slate-800 bg-slate-900/90 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <span className="font-bold text-sm text-brand-400">
            {lessonTopic}
          </span>
          <span className="text-slate-600">|</span>
          <div className="flex items-center gap-1.5 text-xs text-slate-300 font-mono bg-slate-800 px-2.5 py-1 rounded-md">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span>{formatTimer(secondsElapsed)}</span>
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="ml-1 text-[10px] text-slate-400 hover:text-white underline"
            >
              {isPaused ? "Tiếp tục" : "Tạm dừng"}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowNotes(!showNotes)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg flex items-center gap-1.5 transition-colors ${
              showNotes
                ? "bg-brand-600 text-white"
                : "bg-slate-800 text-slate-400 hover:text-white"
            }`}
            title="Bật/Tắt Ghi chú Giảng viên (Phím N)"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Ghi chú giảng viên [N]</span>
          </button>

          <span className="text-xs text-slate-400 font-medium">
            Slide {currentIndex + 1} / {slides.length}
          </span>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            title="Thoát chế độ trình chiếu (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Slide Presentation Stage */}
      <div className="flex-1 flex overflow-hidden">
        {/* The Slide 16:9 Canvas */}
        <div className="flex-1 flex items-center justify-center p-6 lg:p-10">
          <div className="w-full max-w-5xl aspect-[16/9] bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 rounded-2xl border border-slate-700 shadow-2xl p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden">
            {/* Background Ambient Glow */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Slide Header */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-brand-400 mb-3 tracking-wider uppercase">
                <span>Trang Trình Chiếu {activeSlide.slideNumber}</span>
                <span className="text-slate-400 font-mono text-xs">
                  LessonForge Presenter
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                {activeSlide.title}
              </h2>
            </div>

            {/* Slide Bullets */}
            <div className="my-auto py-4">
              <ul className="space-y-4">
                {activeSlide.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="w-3 h-3 rounded-full bg-brand-500 mt-2 shrink-0 ring-4 ring-brand-500/20" />
                    <span className="text-base sm:text-xl text-slate-200 font-medium leading-relaxed">
                      {b}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Slide Footer */}
            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span className="italic truncate max-w-lg">
                💡 Minh họa: {activeSlide.visualPrompt}
              </span>
              <span>{lessonTopic}</span>
            </div>
          </div>
        </div>

        {/* Speaker Notes Drawer (Right Column) */}
        {showNotes && (
          <div className="w-80 lg:w-96 bg-slate-900 border-l border-slate-800 p-6 flex flex-col justify-between animate-fade-in">
            <div className="space-y-4 overflow-y-auto pr-1">
              <div className="flex items-center gap-2 text-xs font-bold text-brand-400 uppercase tracking-wider">
                <FileText className="w-4 h-4" />
                <span>Lời Giảng Khuyên Dùng (Speaker Notes)</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/70 border border-slate-700/80 text-sm text-slate-200 leading-relaxed font-sans whitespace-pre-wrap">
                {activeSlide.speakerNotes || "Không có ghi chú cho slide này."}
              </div>

              <div className="pt-2">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-accent-400" />
                  <span>Ý Tưởng Hình Ảnh & Minh Họa</span>
                </div>
                <p className="text-xs text-slate-400 bg-slate-800/40 p-3 rounded-lg border border-slate-800 italic">
                  {activeSlide.visualPrompt}
                </p>
              </div>
            </div>

            {/* Keyboard shortcut hint */}
            <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-500 flex justify-between">
              <span>← / → : Chuyển slide</span>
              <span>N : Ẩn ghi chú</span>
              <span>Esc : Thoát</span>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Floating Navigation */}
      <div className="h-16 border-t border-slate-800 bg-slate-900/90 backdrop-blur-md px-6 flex items-center justify-between">
        <button
          onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
          disabled={currentIndex === 0}
          className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none text-white flex items-center gap-2 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Slide Trước</span>
        </button>

        {/* Thumbnail Dots */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-md py-1">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-2.5 rounded-full transition-all ${
                i === currentIndex
                  ? "w-8 bg-brand-500"
                  : "w-2.5 bg-slate-700 hover:bg-slate-500"
              }`}
              title={`Chuyển đến Slide ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={() =>
            setCurrentIndex((prev) => Math.min(prev + 1, slides.length - 1))
          }
          disabled={currentIndex === slides.length - 1}
          className="px-4 py-2 text-xs font-semibold rounded-lg bg-brand-600 hover:bg-brand-500 disabled:opacity-30 disabled:pointer-events-none text-white flex items-center gap-2 transition-colors"
        >
          <span>Slide Tiếp</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
