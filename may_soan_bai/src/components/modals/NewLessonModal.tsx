import React, { useState } from "react";
import {
  X,
  Sparkles,
  Layers,
  GraduationCap,
  Languages,
  Clock,
  AlertCircle,
  Loader2,
  FileText,
  Presentation,
  Video,
  HelpCircle,
  Compass,
  MapPin,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useLessonStore } from "../../store/useLessonStore";
import { GenerationPromptParams } from "../../types/lesson";
import {
  DEFAULT_EUROPE_GEOGRAPHY_SYSTEM_PROMPT,
  PROMPT_PRESETS,
} from "../../services/aiService";

interface NewLessonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSettings: () => void;
}

export const NewLessonModal: React.FC<NewLessonModalProps> = ({
  isOpen,
  onClose,
  onOpenSettings,
}) => {
  const {
    generateProject,
    isGenerating,
    generationStatus,
    generationError,
    loadPreset,
    apiConfig,
  } = useLessonStore();

  const [topic, setTopic] = useState("");
  const [gradeLevel, setGradeLevel] = useState("Lớp 7 - 11 (Địa Lý Các Châu Lục)");
  const [targetAudience, setTargetAudience] = useState("Học sinh THCS, THPT và sinh viên Sư phạm");
  const [language, setLanguage] = useState("Tiếng Việt");
  const [tone, setTone] = useState("Trực quan, phân tích nhân quả & Khoa học địa lý ứng dụng");
  const [duration, setDuration] = useState("45 phút");
  const [additionalNotes, setAdditionalNotes] = useState("");

  // System Prompt Customization within New Lesson modal
  const [showPromptConfig, setShowPromptConfig] = useState(false);
  const [promptTemplate, setPromptTemplate] = useState("europe_geography");
  const [customPrompt, setCustomPrompt] = useState(
    apiConfig.customSystemPrompt || DEFAULT_EUROPE_GEOGRAPHY_SYSTEM_PROMPT
  );

  if (!isOpen) return null;

  const hasApiKey = !!(apiConfig.geminiKey || apiConfig.customKey);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    if (!hasApiKey) {
      alert("Vui lòng cấu hình API Key (BYOK) trong Cài đặt trước khi sinh bài giảng mới với AI.");
      onOpenSettings();
      return;
    }

    const params: GenerationPromptParams = {
      topic: topic.trim(),
      gradeLevel,
      targetAudience,
      language,
      tone,
      duration,
      additionalNotes: additionalNotes.trim(),
      customSystemPrompt: customPrompt,
    };

    try {
      await generateProject(params);
      onClose();
    } catch (err) {
      // Handled in store
    }
  };

  const handleApplyPresetTemplate = (presetId: string) => {
    loadPreset(presetId);
    onClose();
  };

  const handleSelectPromptTemplate = (key: string) => {
    setPromptTemplate(key);
    if (PROMPT_PRESETS[key]) {
      setCustomPrompt(PROMPT_PRESETS[key].prompt);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/65 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-emerald-50 via-teal-50 to-brand-50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-600 text-white flex items-center justify-center shadow-sm shadow-emerald-500/20">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Soạn Bài Giảng Môn Địa Lý Bằng AI
              </h3>
              <p className="text-xs text-slate-500">
                Đồng bộ 5 học phần sư phạm theo chuẩn Địa lý Châu Âu & Thế giới
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isGenerating}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg transition-colors disabled:opacity-30"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs">
          {/* Missing API Key Alert */}
          {!hasApiKey && (
            <div className="bg-amber-50 rounded-xl p-3.5 border border-amber-200 flex items-start justify-between gap-3">
              <div className="flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-amber-900 block">
                    Chưa cài đặt API Key (BYOK)
                  </span>
                  <p className="text-amber-800 text-[11px] mt-0.5">
                    Để AI tự động soạn bài mới, bạn cần thêm khóa Gemini (hoặc OpenAI). Hoặc có thể chọn mở ngay các bài mẫu Địa lý có sẵn bên dưới.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onOpenSettings}
                className="px-3 py-1 bg-amber-600 hover:bg-amber-500 text-white rounded-lg font-semibold text-[11px] shrink-0"
              >
                Cài Đặt Key
              </button>
            </div>
          )}

          {/* Quick Preset Fast-Track for Geography */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-400 uppercase tracking-wider block">
              Khám Phá Nhanh Các Session Mẫu Địa Lý (Không cần API Key)
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() =>
                  handleApplyPresetTemplate("preset-dia-ly-tay-nam-bac-au")
                }
                className="px-3 py-1.5 rounded-lg border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-semibold transition-colors flex items-center gap-1.5"
              >
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                <span>Tây Âu, Nam Âu & Bắc Âu</span>
              </button>
              <button
                type="button"
                onClick={() =>
                  handleApplyPresetTemplate("preset-dia-ly-alps-bien-doi-khi-hau")
                }
                className="px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 transition-colors flex items-center gap-1.5"
              >
                <span>🏔️ Dãy Alps & Băng Tan</span>
              </button>
              <button
                type="button"
                onClick={() =>
                  handleApplyPresetTemplate("preset-dia-ly-song-rhine-danube")
                }
                className="px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 transition-colors flex items-center gap-1.5"
              >
                <span>🚢 Trục Sông Rhine & Danube</span>
              </button>
            </div>
          </div>

          {/* AI Generation Progress State */}
          {isGenerating ? (
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-6 text-center space-y-4 animate-fade-in">
              <Loader2 className="w-8 h-8 text-emerald-600 animate-spin mx-auto" />
              <div>
                <h4 className="text-sm font-bold text-emerald-900">
                  LessonForge AI Đang Soạn Giáo Án Địa Lý...
                </h4>
                <p className="text-xs text-emerald-700 mt-1 font-mono">
                  {generationStatus || "Đang phân tích cấu trúc không gian và khí hậu..."}
                </p>
              </div>

              {/* Progress visual steps */}
              <div className="grid grid-cols-5 gap-2 pt-2 text-[10px] text-slate-500 font-medium">
                <div className="flex flex-col items-center gap-1">
                  <Presentation className="w-4 h-4 text-blue-600" />
                  <span>Slides</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Video className="w-4 h-4 text-purple-600" />
                  <span>Script</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <HelpCircle className="w-4 h-4 text-teal-600" />
                  <span>Quiz</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Layers className="w-4 h-4 text-amber-600" />
                  <span>Flashcards</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <FileText className="w-4 h-4 text-rose-600" />
                  <span>Rubric</span>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Error Alert */}
              {generationError && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>{generationError}</span>
                </div>
              )}

              {/* Topic */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 flex items-center justify-between">
                  <span>Chủ Đề Hoặc Vùng Địa Lý (*)</span>
                  <span className="text-[11px] text-slate-400 font-normal">Bắt buộc</span>
                </label>
                <input
                  type="text"
                  required
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Ví dụ: Tìm hiểu Địa lý, Cảnh quan và Khí hậu của Tây Âu, Nam Âu và Bắc Âu..."
                  className="w-full text-xs bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Grade Level & Language */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 flex items-center gap-1">
                    <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Cấp Độ / Khối Lớp</span>
                  </label>
                  <select
                    value={gradeLevel}
                    onChange={(e) => setGradeLevel(e.target.value)}
                    className="w-full text-xs bg-white border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Lớp 7 (Địa lý các châu lục)">Lớp 7 (Địa lý các châu lục)</option>
                    <option value="Lớp 8 (Địa lý tự nhiên)">Lớp 8 (Địa lý tự nhiên)</option>
                    <option value="Lớp 11 (Địa lý khu vực và quốc tế)">Lớp 11 (Địa lý khu vực và quốc tế)</option>
                    <option value="Lớp 12 (Ôn thi Tốt nghiệp THPT)">Lớp 12 (Ôn thi Tốt nghiệp THPT)</option>
                    <option value="Đại học / Chuyên ngành Sư phạm Địa lý">Đại học / Chuyên ngành Sư phạm Địa lý</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 flex items-center gap-1">
                    <Languages className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Ngôn Ngữ Giảng Dạy</span>
                  </label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full text-xs bg-white border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Tiếng Việt">Tiếng Việt</option>
                    <option value="English">English</option>
                    <option value="Song ngữ Anh - Việt">Song ngữ Anh - Việt</option>
                    <option value="Français">Français</option>
                  </select>
                </div>
              </div>

              {/* Target Audience & Duration */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">
                    Đối Tượng Người Học
                  </label>
                  <input
                    type="text"
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                    placeholder="Ví dụ: Học sinh THCS, THPT, bồi dưỡng học sinh giỏi..."
                    className="w-full text-xs bg-white border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Thời Lượng Tiết Học</span>
                  </label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full text-xs bg-white border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="45 phút (Tiết chuẩn THCS/THPT)">45 phút (Tiết chuẩn THCS/THPT)</option>
                    <option value="90 phút (Khối 2 tiết chuyên đề)">90 phút (Khối 2 tiết chuyên đề)</option>
                    <option value="15 phút (Micro-learning video)">15 phút (Micro-learning video)</option>
                  </select>
                </div>
              </div>

              {/* Additional Requirements */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700">
                  Yêu Cầu Địa Lý Chuyên Sâu (Tùy chọn)
                </label>
                <input
                  type="text"
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  placeholder="Ví dụ: Nhấn mạnh vào địa hình Fjord, dòng hải lưu Gulf Stream, rừng Taiga, gió Tây ôn đới..."
                  className="w-full text-xs bg-white border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Collapsible System Prompt Configuration */}
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => setShowPromptConfig(!showPromptConfig)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-left text-xs font-semibold text-slate-700 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Compass className="w-4 h-4 text-emerald-600" />
                    <span>Tùy chỉnh System Prompt cho môn Địa lý Châu Âu</span>
                  </div>
                  {showPromptConfig ? (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </button>

                {showPromptConfig && (
                  <div className="p-3.5 bg-white space-y-2.5 animate-fade-in border-t border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-slate-500">Mẫu:</span>
                      <select
                        value={promptTemplate}
                        onChange={(e) => handleSelectPromptTemplate(e.target.value)}
                        className="text-xs bg-slate-50 border border-slate-200 rounded-md px-2 py-1 focus:outline-none focus:border-emerald-500"
                      >
                        <option value="europe_geography">Địa Lý Châu Âu (Tây, Nam, Bắc Âu)</option>
                        <option value="physical_geography">Địa Lý Tự Nhiên & Biến Đổi Khí Hậu</option>
                        <option value="economic_geography">Địa Lý Kinh Tế - Xã Hội & Đô Thị</option>
                      </select>
                    </div>

                    <textarea
                      rows={5}
                      value={customPrompt}
                      onChange={(e) => setCustomPrompt(e.target.value)}
                      className="w-full text-[11px] font-mono leading-relaxed text-slate-800 bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={!topic.trim() || isGenerating}
                  className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl font-bold text-xs shadow-md shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Bắt Đầu Tạo Bài Giảng Địa Lý Toàn Diện (5-in-1)</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
