import React, { useState } from "react";
import {
  Presentation,
  Download,
  FileCode,
  Play,
  Plus,
  Trash2,
  Image as ImageIcon,
  MessageSquare,
  Sparkles,
  Check,
  ChevronRight,
  ListPlus,
  X,
} from "lucide-react";
import { useLessonStore } from "../../store/useLessonStore";
import { exportToPPTX, exportSlidesMarkdown, downloadFile } from "../../services/exportService";
import { PresenterModeModal } from "../modals/PresenterModeModal";

export const SlideDeckView: React.FC = () => {
  const { currentProject, updateSlide, addSlide, deleteSlide } = useLessonStore();
  const [selectedSlideIndex, setSelectedSlideIndex] = useState(0);
  const [isExportingPPTX, setIsExportingPPTX] = useState(false);
  const [isPresenterModeOpen, setIsPresenterModeOpen] = useState(false);
  const [newBulletText, setNewBulletText] = useState("");

  const slides = currentProject.slides;
  const activeSlide = slides[selectedSlideIndex] || slides[0];

  const handleExportPPTX = async () => {
    try {
      setIsExportingPPTX(true);
      await exportToPPTX(currentProject);
    } catch (err: any) {
      alert(`Lỗi khi tạo PPTX: ${err.message}`);
    } finally {
      setIsExportingPPTX(false);
    }
  };

  const handleExportMarkdown = () => {
    const md = exportSlidesMarkdown(currentProject);
    const filename = `${currentProject.metadata.topic.replace(/[^a-zA-Z0-9_\u00C0-\u024F\u1E00-\u1EFF]/g, "_")}_Slides.md`;
    downloadFile(md, filename, "text/markdown;charset=utf-8");
  };

  const handleAddBullet = () => {
    if (!newBulletText.trim()) return;
    const updatedBullets = [...activeSlide.bullets, newBulletText.trim()];
    updateSlide(selectedSlideIndex, { bullets: updatedBullets });
    setNewBulletText("");
  };

  const handleRemoveBullet = (bulletIndex: number) => {
    const updatedBullets = activeSlide.bullets.filter((_, i) => i !== bulletIndex);
    updateSlide(selectedSlideIndex, { bullets: updatedBullets });
  };

  const handleUpdateBullet = (bulletIndex: number, text: string) => {
    const updatedBullets = [...activeSlide.bullets];
    updatedBullets[bulletIndex] = text;
    updateSlide(selectedSlideIndex, { bullets: updatedBullets });
  };

  return (
    <div className="space-y-6">
      {/* Action Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Presentation className="w-5 h-5 text-brand-600" />
            <span>Slide Deck Presentation (Bài Trình Chiếu)</span>
          </h2>
          <p className="text-xs text-slate-500">
            Xem trước, biên tập trực tiếp từng slide và xuất ra file trình chiếu PowerPoint (.PPTX) chuyên nghiệp
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Add Slide */}
          <button
            onClick={() => {
              addSlide();
              setSelectedSlideIndex(slides.length);
            }}
            className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-4 h-4 text-slate-500" />
            <span>Thêm Slide</span>
          </button>

          {/* Export Marp Markdown */}
          <button
            onClick={handleExportMarkdown}
            className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 rounded-lg border border-slate-200 flex items-center gap-1.5 transition-colors"
            title="Xuất file Markdown tương thích Marp / Slidev"
          >
            <FileCode className="w-4 h-4 text-slate-500" />
            <span>Xuất Markdown</span>
          </button>

          {/* Presenter Mode */}
          <button
            onClick={() => setIsPresenterModeOpen(true)}
            className="px-3 py-1.5 text-xs font-semibold text-brand-700 bg-brand-50 hover:bg-brand-100 border border-brand-200 rounded-lg flex items-center gap-1.5 transition-colors"
          >
            <Play className="w-4 h-4 text-brand-600 fill-brand-600" />
            <span>Trình Chiếu (Presenter)</span>
          </button>

          {/* Export to PPTX */}
          <button
            onClick={handleExportPPTX}
            disabled={isExportingPPTX}
            className="px-4 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 rounded-lg shadow-sm shadow-brand-500/20 flex items-center gap-2 transition-all disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>{isExportingPPTX ? "Đang xuất PPTX..." : "Tải PowerPoint (.PPTX)"}</span>
          </button>
        </div>
      </div>

      {/* Main Workspace: Left Slides Thumbnail Strip + Right Active Canvas Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Thumbnails List (col 4) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Danh sách Slide ({slides.length})
            </span>
          </div>

          <div className="space-y-2.5 max-h-[700px] overflow-y-auto pr-1">
            {slides.map((slide, idx) => {
              const isSelected = idx === selectedSlideIndex;
              return (
                <div
                  key={idx}
                  onClick={() => setSelectedSlideIndex(idx)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? "bg-brand-50/70 border-brand-500 ring-2 ring-brand-500/20 shadow-xs"
                      : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                        isSelected
                          ? "bg-brand-600 text-white"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      Slide {slide.slideNumber}
                    </span>
                    {slides.length > 1 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm(`Bạn có chắc muốn xóa Slide ${slide.slideNumber}?`)) {
                            deleteSlide(idx);
                            if (selectedSlideIndex >= slides.length - 1) {
                              setSelectedSlideIndex(Math.max(0, slides.length - 2));
                            }
                          }
                        }}
                        className="text-slate-400 hover:text-rose-600 p-1 rounded transition-colors"
                        title="Xóa slide này"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <h4 className="text-xs font-semibold text-slate-900 line-clamp-2">
                    {slide.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                    {slide.bullets.length} ý trọng tâm • {slide.speakerNotes ? "Có lời giảng" : "Chưa có lời giảng"}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Active Slide Canvas & Editor (col 8) */}
        <div className="lg:col-span-8 space-y-6">
          {activeSlide ? (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              {/* Visual 16:9 Presentation Card Simulator */}
              <div className="p-6 sm:p-8 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 text-white relative">
                <div className="flex items-center justify-between text-xs font-semibold text-brand-400 mb-3 tracking-wider uppercase">
                  <span>Trang Trình Chiếu {activeSlide.slideNumber} / {slides.length}</span>
                  <span className="font-mono text-slate-400">16:9 Widescreen</span>
                </div>

                <div className="space-y-4">
                  {/* Inline Editable Title */}
                  <input
                    type="text"
                    value={activeSlide.title}
                    onChange={(e) =>
                      updateSlide(selectedSlideIndex, { title: e.target.value })
                    }
                    className="w-full text-xl sm:text-2xl font-bold bg-transparent border-b border-transparent hover:border-slate-700 focus:border-brand-500 focus:outline-none text-white py-1 transition-colors"
                    placeholder="Tiêu đề Slide..."
                  />

                  {/* Bullet points display with remove button */}
                  <ul className="space-y-2.5 pt-2">
                    {activeSlide.bullets.map((b, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-3 group">
                        <span className="w-2 h-2 rounded-full bg-brand-400 mt-2 shrink-0 ring-4 ring-brand-400/20" />
                        <input
                          type="text"
                          value={b}
                          onChange={(e) => handleUpdateBullet(bIdx, e.target.value)}
                          className="w-full text-sm font-medium text-slate-200 bg-transparent border-b border-transparent group-hover:border-slate-700 focus:border-brand-500 focus:outline-none py-0.5 transition-colors"
                        />
                        <button
                          onClick={() => handleRemoveBullet(bIdx)}
                          className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-rose-400 p-0.5 transition-opacity"
                          title="Xóa ý này"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </li>
                    ))}
                  </ul>

                  {/* Add bullet input */}
                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="text"
                      value={newBulletText}
                      onChange={(e) => setNewBulletText(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleAddBullet()}
                      placeholder="Thêm ý trọng tâm mới (Enter)..."
                      className="text-xs bg-slate-800/80 border border-slate-700 rounded-lg px-3 py-1.5 text-slate-200 focus:outline-none focus:border-brand-500 flex-1"
                    />
                    <button
                      onClick={handleAddBullet}
                      className="px-2.5 py-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Thêm</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Slide Meta Editors (Visual Prompt & Speaker Notes) */}
              <div className="p-6 space-y-5 bg-slate-50/60 border-t border-slate-200">
                {/* Visual Prompt Section */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-brand-600" />
                    <span>Gợi Ý Hình Ảnh / Video Minh Họa (Visual Prompt)</span>
                  </label>
                  <textarea
                    rows={2}
                    value={activeSlide.visualPrompt}
                    onChange={(e) =>
                      updateSlide(selectedSlideIndex, { visualPrompt: e.target.value })
                    }
                    className="w-full text-xs text-slate-800 bg-white border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                    placeholder="Mô tả ý tưởng hình ảnh trực quan..."
                  />
                </div>

                {/* Speaker Notes Section */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <MessageSquare className="w-4 h-4 text-accent-600" />
                    <span>Lời Giảng Giáo Viên Khuyên Dùng (Speaker Notes)</span>
                  </label>
                  <textarea
                    rows={3}
                    value={activeSlide.speakerNotes}
                    onChange={(e) =>
                      updateSlide(selectedSlideIndex, { speakerNotes: e.target.value })
                    }
                    className="w-full text-xs text-slate-800 bg-white border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500 transition-all font-sans leading-relaxed"
                    placeholder="Lời dẫn nhập, câu hỏi thảo luận, ghi chú khi trình chiếu..."
                  />
                  <p className="text-[11px] text-slate-400">
                    Phần ghi chú này sẽ được nhúng trực tiếp vào tính năng Notes của tệp PowerPoint (.PPTX) và chế độ Presenter Mode.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white p-12 text-center rounded-2xl border border-dashed border-slate-300">
              <p className="text-slate-500 text-sm">Chưa có slide nào được chọn.</p>
            </div>
          )}
        </div>
      </div>

      {/* Presenter Mode Fullscreen Modal */}
      {isPresenterModeOpen && (
        <PresenterModeModal
          slides={slides}
          initialIndex={selectedSlideIndex}
          lessonTopic={currentProject.metadata.topic}
          onClose={() => setIsPresenterModeOpen(false)}
        />
      )}
    </div>
  );
};
