import React, { useState } from "react";
import {
  Layers,
  RotateCw,
  Sparkles,
  Download,
  Plus,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Eye,
  CheckCircle,
  HelpCircle,
  Shuffle,
  List,
  Edit2,
} from "lucide-react";
import { useLessonStore } from "../../store/useLessonStore";
import { exportAnkiCSV, downloadFile } from "../../services/exportService";

export const FlashcardsView: React.FC = () => {
  const { currentProject, updateFlashcard, addFlashcard, deleteFlashcard } =
    useLessonStore();

  const flashcards = currentProject.flashcards;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showMnemonic, setShowMnemonic] = useState(false);
  const [activeTabMode, setActiveTabMode] = useState<"study" | "list">("study");

  // Spaced Repetition Mastery Tracking State (1: Again, 2: Hard, 3: Good, 4: Easy)
  const [cardRatings, setCardRatings] = useState<Record<number, "again" | "hard" | "good" | "easy">>({});

  const currentCard = flashcards[currentIndex] || flashcards[0];

  const handleNext = () => {
    setIsFlipped(false);
    setShowMnemonic(false);
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setShowMnemonic(false);
    setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
  };

  const handleRate = (rating: "again" | "hard" | "good" | "easy") => {
    setCardRatings((prev) => ({
      ...prev,
      [currentIndex]: rating,
    }));
    handleNext();
  };

  const handleExportAnki = () => {
    const tsv = exportAnkiCSV(currentProject);
    const filename = `${currentProject.metadata.topic.replace(/[^a-zA-Z0-9_\u00C0-\u024F\u1E00-\u1EFF]/g, "_")}_AnkiDeck.txt`;
    downloadFile(tsv, filename, "text/tab-separated-values;charset=utf-8");
  };

  // Calculate mastery statistics
  const ratedCount = Object.keys(cardRatings).length;
  const goodCount = Object.values(cardRatings).filter(
    (r) => r === "good" || r === "easy"
  ).length;
  const masteryPercentage =
    flashcards.length > 0 ? Math.round((goodCount / flashcards.length) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Action Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-600" />
            <h2 className="text-base font-bold text-slate-900">
              Flashcard Deck & Spaced Repetition (Thẻ Ghi Nhớ)
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Lật thẻ 3D tương tác, mẹo nhớ Mnemonic Cue, thuật toán lặp lại ngắt quãng và xuất file Anki
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          {/* View Mode Toggle */}
          <div className="bg-slate-100 p-1 rounded-lg flex items-center gap-1 border border-slate-200 text-xs font-semibold">
            <button
              onClick={() => setActiveTabMode("study")}
              className={`px-3 py-1 rounded-md flex items-center gap-1.5 transition-colors ${
                activeTabMode === "study"
                  ? "bg-white text-amber-700 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Chế Độ Học Lật Thẻ</span>
            </button>
            <button
              onClick={() => setActiveTabMode("list")}
              className={`px-3 py-1 rounded-md flex items-center gap-1.5 transition-colors ${
                activeTabMode === "list"
                  ? "bg-white text-amber-700 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>Quản Lý Toàn Bộ ({flashcards.length})</span>
            </button>
          </div>

          {/* Export to Anki */}
          <button
            onClick={handleExportAnki}
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 rounded-lg shadow-sm shadow-amber-500/20 flex items-center gap-1.5 transition-all"
            title="Tải tệp tab-separated sẵn sàng nhập trực tiếp vào Anki Flashcards"
          >
            <Download className="w-4 h-4" />
            <span>Xuất Thẻ Anki (.TXT / CSV)</span>
          </button>
        </div>
      </div>

      {activeTabMode === "study" ? (
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Progress & Mastery Header */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-600">
                Thẻ {currentIndex + 1} / {flashcards.length}
              </span>
              <span className="text-amber-700 font-bold">
                Mức độ ghi nhớ: {masteryPercentage}% ({goodCount}/{flashcards.length} đã thuộc)
              </span>
            </div>
            {/* Progress bar */}
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-500 to-orange-500 h-full transition-all duration-300 rounded-full"
                style={{ width: `${((currentIndex + 1) / flashcards.length) * 100}%` }}
              />
            </div>
          </div>

          {/* 3D Flippable Card Stage */}
          <div className="perspective-1000 min-h-[340px]">
            <div
              onClick={() => setIsFlipped(!isFlipped)}
              className={`w-full min-h-[340px] rounded-3xl p-8 cursor-pointer border shadow-lg transition-transform duration-500 transform-style-preserve-3d flex flex-col justify-between relative ${
                isFlipped
                  ? "bg-gradient-to-br from-amber-500 via-amber-600 to-orange-600 text-white border-amber-600"
                  : "bg-white text-slate-900 border-slate-200 hover:border-amber-400"
              }`}
            >
              {/* Card Badge */}
              <div className="flex items-center justify-between">
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                    isFlipped
                      ? "bg-white/20 text-white"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {isFlipped ? "Mặt Sau (Lời Giải / Định Nghĩa)" : "Mặt Trước (Câu Hỏi / Khái Niệm)"}
                </span>

                <div
                  className={`flex items-center gap-1.5 text-xs font-medium ${
                    isFlipped ? "text-amber-100" : "text-slate-400"
                  }`}
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>Bấm để lật thẻ</span>
                </div>
              </div>

              {/* Main Content */}
              <div className="my-auto py-6 text-center">
                <p
                  className={`text-lg sm:text-2xl font-bold leading-relaxed ${
                    isFlipped ? "text-white" : "text-slate-800"
                  }`}
                >
                  {isFlipped ? currentCard.back : currentCard.front}
                </p>
              </div>

              {/* Card Footer / Mnemonic Hint */}
              <div className="border-t pt-3 flex items-center justify-between">
                {currentCard.mnemonicCue ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowMnemonic(!showMnemonic)}
                    }
                    className={`text-xs font-medium flex items-center gap-1.5 px-3 py-1 rounded-full transition-colors ${
                      isFlipped
                        ? "bg-white/20 text-white hover:bg-white/30"
                        : "bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100"
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>{showMnemonic ? "Ẩn mẹo nhớ" : "Hiện mẹo nhớ (Mnemonic)"}</span>
                  </button>
                ) : (
                  <div />
                )}

                <span
                  className={`text-[11px] font-mono ${
                    isFlipped ? "text-amber-200" : "text-slate-400"
                  }`}
                >
                  Card ID: #{currentCard.id}
                </span>
              </div>
            </div>
          </div>

          {/* Mnemonic Hint Popup */}
          {showMnemonic && currentCard.mnemonicCue && (
            <div className="bg-amber-50 rounded-2xl p-4 border border-amber-300 animate-slide-up flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-amber-900 block mb-0.5">
                  Mẹo Nhớ Siêu Tốc (Mnemonic Cue):
                </span>
                <p className="text-xs text-amber-800 font-medium">
                  {currentCard.mnemonicCue}
                </p>
              </div>
            </div>
          )}

          {/* Spaced Repetition Rating Buttons */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center">
              Đánh Giá Trí Nhớ (Spaced Repetition Review)
            </div>

            <div className="grid grid-cols-4 gap-2">
              <button
                onClick={() => handleRate("again")}
                className="py-2.5 px-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs font-bold flex flex-col items-center gap-1 transition-colors"
              >
                <span>Chưa Nhớ</span>
                <span className="text-[10px] font-normal text-rose-500">Học lại ngay</span>
              </button>

              <button
                onClick={() => handleRate("hard")}
                className="py-2.5 px-2 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded-xl text-xs font-bold flex flex-col items-center gap-1 transition-colors"
              >
                <span>Hơi Khó</span>
                <span className="text-[10px] font-normal text-amber-600">Ôn sớm</span>
              </button>

              <button
                onClick={() => handleRate("good")}
                className="py-2.5 px-2 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-xl text-xs font-bold flex flex-col items-center gap-1 transition-colors"
              >
                <span>Đã Nhớ</span>
                <span className="text-[10px] font-normal text-blue-500">Giữ nhịp</span>
              </button>

              <button
                onClick={() => handleRate("easy")}
                className="py-2.5 px-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-bold flex flex-col items-center gap-1 transition-colors"
              >
                <span>Rất Dễ</span>
                <span className="text-[10px] font-normal text-emerald-600">Thuần thục</span>
              </button>
            </div>
          </div>

          {/* Previous / Next Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={handlePrev}
              className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 flex items-center gap-2 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Thẻ Trước</span>
            </button>

            <button
              onClick={handleNext}
              className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 flex items-center gap-2 transition-colors"
            >
              <span>Thẻ Tiếp</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Full Deck Manager Mode */
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {flashcards.map((card, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-amber-300 transition-all space-y-3"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                    Thẻ #{card.id}
                  </span>

                  {flashcards.length > 1 && (
                    <button
                      onClick={() => {
                        if (confirm("Xóa thẻ này?")) deleteFlashcard(idx);
                      }}
                      className="text-slate-400 hover:text-rose-600 p-1 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Mặt Trước (Front)
                  </label>
                  <textarea
                    rows={2}
                    value={card.front}
                    onChange={(e) => updateFlashcard(idx, { front: e.target.value })}
                    className="w-full text-xs font-semibold text-slate-900 border border-slate-200 rounded-lg p-2 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Mặt Sau (Back)
                  </label>
                  <textarea
                    rows={2}
                    value={card.back}
                    onChange={(e) => updateFlashcard(idx, { back: e.target.value })}
                    className="w-full text-xs text-slate-800 border border-slate-200 rounded-lg p-2 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    <span>Mẹo nhớ gợi ý (Mnemonic Cue)</span>
                  </label>
                  <input
                    type="text"
                    value={card.mnemonicCue}
                    onChange={(e) => updateFlashcard(idx, { mnemonicCue: e.target.value })}
                    className="w-full text-xs text-amber-900 bg-amber-50/50 border border-amber-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => addFlashcard()}
            className="w-full py-3.5 border-2 border-dashed border-slate-300 hover:border-amber-400 hover:bg-amber-50/30 rounded-xl text-xs font-semibold text-slate-600 hover:text-amber-700 flex items-center justify-center gap-2 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm Thẻ Ghi Nhớ Mới</span>
          </button>
        </div>
      )}
    </div>
  );
};
