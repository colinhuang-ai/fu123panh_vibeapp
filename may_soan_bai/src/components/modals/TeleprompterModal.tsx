import React, { useState, useEffect, useRef } from "react";
import {
  X,
  Play,
  Pause,
  RotateCcw,
  FlipHorizontal,
  Type,
  Gauge,
  Volume2,
  VolumeX,
} from "lucide-react";
import { VideoScriptItem } from "../../types/lesson";

interface TeleprompterModalProps {
  scriptItems: VideoScriptItem[];
  lessonTopic: string;
  onClose: () => void;
}

export const TeleprompterModal: React.FC<TeleprompterModalProps> = ({
  scriptItems,
  lessonTopic,
  onClose,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(2); // 1 to 5
  const [fontSize, setFontSize] = useState(32); // px
  const [isMirrored, setIsMirrored] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll effect
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const scrollLoop = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;

      if (isPlaying && scrollContainerRef.current) {
        // Base pixels per millisecond scaled by speed
        const speedMultiplier = scrollSpeed * 0.05;
        scrollContainerRef.current.scrollTop += delta * speedMultiplier;
      }
      animationFrameId = requestAnimationFrame(scrollLoop);
    };

    animationFrameId = requestAnimationFrame(scrollLoop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPlaying, scrollSpeed]);

  // Keyboard shortcuts (Space = play/pause, Esc = close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      } else if (e.key === "Escape") {
        window.speechSynthesis?.cancel();
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleReset = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
    setIsPlaying(false);
  };

  // Web Speech API Voiceover preview
  const handleToggleSpeech = () => {
    if (!("speechSynthesis" in window)) {
      alert("Trình duyệt không hỗ trợ Web Speech Synthesis API.");
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const fullText = scriptItems.map((item) => item.voiceover).join(". ");
    const utterance = new SpeechSynthesisUtterance(fullText);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    // Pick Vietnamese or English voice if available
    const voices = window.speechSynthesis.getVoices();
    const viVoice = voices.find((v) => v.lang.startsWith("vi"));
    if (viVoice) utterance.voice = viVoice;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
    setIsPlaying(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 text-white flex flex-col select-none overflow-hidden animate-fade-in font-sans">
      {/* Top Header & Settings Control Bar */}
      <div className="h-16 px-6 flex items-center justify-between border-b border-slate-800 bg-slate-900/90 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <span className="font-bold text-sm text-brand-400">
            Máy Nhắc Chữ Teleprompter
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-xs text-slate-300 truncate max-w-xs">
            {lessonTopic}
          </span>
        </div>

        {/* Floating Controls */}
        <div className="flex items-center gap-4">
          {/* Scroll Speed Controls */}
          <div className="flex items-center gap-2 text-xs bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
            <Gauge className="w-3.5 h-3.5 text-accent-400" />
            <span className="text-slate-400">Tốc độ:</span>
            <input
              type="range"
              min="1"
              max="5"
              step="0.5"
              value={scrollSpeed}
              onChange={(e) => setScrollSpeed(parseFloat(e.target.value))}
              className="w-20 accent-brand-500 cursor-pointer"
            />
            <span className="font-mono text-brand-400 font-bold">{scrollSpeed}x</span>
          </div>

          {/* Font Size Controls */}
          <div className="flex items-center gap-2 text-xs bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
            <Type className="w-3.5 h-3.5 text-brand-400" />
            <span className="text-slate-400">Cỡ chữ:</span>
            <button
              onClick={() => setFontSize((prev) => Math.max(20, prev - 4))}
              className="px-2 py-0.5 rounded bg-slate-700 hover:bg-slate-600 text-xs"
            >
              -
            </button>
            <span className="font-mono text-white text-xs">{fontSize}px</span>
            <button
              onClick={() => setFontSize((prev) => Math.min(56, prev + 4))}
              className="px-2 py-0.5 rounded bg-slate-700 hover:bg-slate-600 text-xs"
            >
              +
            </button>
          </div>

          {/* Mirror Mode (for teleprompter glass) */}
          <button
            onClick={() => setIsMirrored(!isMirrored)}
            className={`p-2 rounded-lg border transition-colors ${
              isMirrored
                ? "bg-brand-600 text-white border-brand-500"
                : "bg-slate-800 text-slate-400 border-slate-700 hover:text-white"
            }`}
            title="Chế độ lật kính quang học (Mirror View)"
          >
            <FlipHorizontal className="w-4 h-4" />
          </button>

          {/* TTS Audio Voiceover */}
          <button
            onClick={handleToggleSpeech}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg border flex items-center gap-1.5 transition-colors ${
              isSpeaking
                ? "bg-amber-500 text-white border-amber-400"
                : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700"
            }`}
            title="Đọc thử giọng AI"
          >
            {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            <span>{isSpeaking ? "Dừng giọng đọc" : "Nghe đọc thử"}</span>
          </button>

          {/* Close */}
          <button
            onClick={() => {
              window.speechSynthesis?.cancel();
              onClose();
            }}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Center Reading Area */}
      <div
        ref={scrollContainerRef}
        className={`flex-1 overflow-y-auto px-6 sm:px-16 lg:px-32 py-24 scroll-smooth ${
          isMirrored ? "scale-x-[-1]" : ""
        }`}
      >
        <div className="max-w-3xl mx-auto space-y-16">
          {scriptItems.map((scene, idx) => (
            <div key={idx} className="space-y-4 pb-8 border-b border-slate-800/60">
              {/* Scene cue tag */}
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-md bg-brand-900/60 text-brand-300 font-mono text-xs font-bold border border-brand-700/50">
                  {scene.timestamp} ({scene.durationSeconds}s)
                </span>
                <span className="text-xs text-amber-400 italic">
                  🎬 {scene.visualCue}
                </span>
              </div>

              {/* Main Prompter Spoken Text */}
              <p
                style={{ fontSize: `${fontSize}px`, lineHeight: 1.6 }}
                className="font-medium text-slate-100 tracking-wide font-sans select-text"
              >
                {scene.voiceover}
              </p>
            </div>
          ))}

          <div className="text-center py-24 text-slate-600 text-lg">
            --- KẾT THÚC BÀI GIẢNG ---
          </div>
        </div>
      </div>

      {/* Prompter Guide Line Indicator (Eye Level) */}
      <div className="pointer-events-none fixed top-1/3 left-0 right-0 h-0.5 bg-brand-500/20 border-t border-brand-500/40 z-10 flex items-center justify-between px-6">
        <span className="text-[10px] text-brand-400 uppercase tracking-widest font-mono">
          Vùng đọc tối ưu mắt nhìn
        </span>
        <span className="text-[10px] text-brand-400 uppercase tracking-widest font-mono">
          Eye-level Focus
        </span>
      </div>

      {/* Bottom Floating Controls */}
      <div className="h-20 border-t border-slate-800 bg-slate-900/90 backdrop-blur-md px-6 flex items-center justify-center gap-4">
        <button
          onClick={handleReset}
          className="p-3 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          title="Cuộn về đầu"
        >
          <RotateCcw className="w-5 h-5" />
        </button>

        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className={`px-8 py-3 rounded-full font-bold text-sm flex items-center gap-2 shadow-lg transition-transform hover:scale-105 ${
            isPlaying
              ? "bg-amber-500 hover:bg-amber-400 text-slate-950"
              : "bg-brand-600 hover:bg-brand-500 text-white"
          }`}
        >
          {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
          <span>{isPlaying ? "Tạm dừng [Space]" : "Bắt đầu cuộn [Space]"}</span>
        </button>
      </div>
    </div>
  );
};
