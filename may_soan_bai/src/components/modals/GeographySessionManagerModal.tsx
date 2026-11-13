import React, { useState } from "react";
import {
  X,
  Compass,
  Search,
  Plus,
  Copy,
  Trash2,
  Download,
  Upload,
  Check,
  Calendar,
  Layers,
  Presentation,
  Video,
  HelpCircle,
  FileText,
  Clock,
  Sparkles,
  MapPin,
  FileCheck2,
} from "lucide-react";
import { useLessonStore } from "../../store/useLessonStore";
import { LessonProject } from "../../types/lesson";
import { downloadFile } from "../../services/exportService";

interface GeographySessionManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenNewLessonModal: () => void;
}

export const GeographySessionManagerModal: React.FC<
  GeographySessionManagerModalProps
> = ({ isOpen, onClose, onOpenNewLessonModal }) => {
  const {
    currentProject,
    savedProjects,
    setCurrentProject,
    deleteSavedProject,
    duplicateProject,
    createBlankGeographyProject,
    saveCurrentProject,
  } = useLessonStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegionFilter, setSelectedRegionFilter] = useState("all");

  if (!isOpen) return null;

  const filteredProjects = savedProjects.filter((p) => {
    const matchesSearch =
      p.metadata.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.metadata.region &&
        p.metadata.region.toLowerCase().includes(searchQuery.toLowerCase())) ||
      p.metadata.gradeLevel.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (selectedRegionFilter === "all") return true;
    if (selectedRegionFilter === "tay_au")
      return p.metadata.topic.toLowerCase().includes("tây âu") || (p.metadata.region && p.metadata.region.includes("Tây"));
    if (selectedRegionFilter === "nam_au")
      return p.metadata.topic.toLowerCase().includes("nam âu") || (p.metadata.region && p.metadata.region.includes("Nam"));
    if (selectedRegionFilter === "bac_au")
      return p.metadata.topic.toLowerCase().includes("bắc âu") || (p.metadata.region && p.metadata.region.includes("Bắc"));
    if (selectedRegionFilter === "alps")
      return p.metadata.topic.toLowerCase().includes("alps");
    if (selectedRegionFilter === "song")
      return p.metadata.topic.toLowerCase().includes("sông") || p.metadata.topic.toLowerCase().includes("rhine");

    return true;
  });

  const handleExportAllSessions = () => {
    const jsonStr = JSON.stringify(savedProjects, null, 2);
    downloadFile(
      jsonStr,
      `DiaLy_Europe_Sessions_Bundle_${new Date().toISOString().slice(0, 10)}.json`,
      "application/json"
    );
  };

  const handleExportSingleSession = (proj: LessonProject) => {
    const jsonStr = JSON.stringify(proj, null, 2);
    const filename = `${proj.metadata.topic.replace(/[^a-zA-Z0-9_\u00C0-\u024F\u1E00-\u1EFF]/g, "_")}.json`;
    downloadFile(jsonStr, filename, "application/json");
  };

  const handleImportSession = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const parsed = JSON.parse(content);
        if (Array.isArray(parsed)) {
          // Imported an array of sessions
          parsed.forEach((proj) => {
            if (proj.metadata && proj.slides) {
              setCurrentProject(proj);
              saveCurrentProject();
            }
          });
        } else if (parsed.metadata && parsed.slides) {
          setCurrentProject(parsed);
          saveCurrentProject();
        } else {
          alert("Tệp JSON không đúng định dạng bài giảng Địa lý.");
        }
      } catch (err) {
        alert("Lỗi khi đọc tệp JSON.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/65 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-emerald-50 via-teal-50 to-brand-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-600 text-white flex items-center justify-center shadow-md shadow-emerald-500/20">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900">
                  Quản Lý Các Session Bài Học Môn Địa Lý
                </h3>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                  {savedProjects.length} Sessions Đã Lưu
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Chuyển đổi, nhân bản, quản lý và lưu trữ các giáo án Địa lý Châu Âu & Thế giới
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar: Search & Action Buttons */}
        <div className="p-4 border-b border-slate-100 bg-slate-50/70 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Search bar */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm session địa lý..."
              className="w-full text-xs pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Region Quick Filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto max-w-full text-xs font-medium">
            <button
              onClick={() => setSelectedRegionFilter("all")}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                selectedRegionFilter === "all"
                  ? "bg-emerald-600 text-white font-semibold"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              Tất Cả
            </button>
            <button
              onClick={() => setSelectedRegionFilter("tay_au")}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                selectedRegionFilter === "tay_au"
                  ? "bg-emerald-600 text-white font-semibold"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              Tây Âu
            </button>
            <button
              onClick={() => setSelectedRegionFilter("nam_au")}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                selectedRegionFilter === "nam_au"
                  ? "bg-emerald-600 text-white font-semibold"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              Nam Âu
            </button>
            <button
              onClick={() => setSelectedRegionFilter("bac_au")}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                selectedRegionFilter === "bac_au"
                  ? "bg-emerald-600 text-white font-semibold"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              Bắc Âu
            </button>
            <button
              onClick={() => setSelectedRegionFilter("alps")}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                selectedRegionFilter === "alps"
                  ? "bg-emerald-600 text-white font-semibold"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              Dãy Alps
            </button>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                onClose();
                onOpenNewLessonModal();
              }}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg shadow-xs flex items-center gap-1.5 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Soạn Session Mới (AI)</span>
            </button>

            <button
              onClick={() => createBlankGeographyProject()}
              className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg flex items-center gap-1 transition-colors"
              title="Tạo session trống"
            >
              <Plus className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden md:inline">Bản trống</span>
            </button>
          </div>
        </div>

        {/* Sessions Grid */}
        <div className="p-6 overflow-y-auto space-y-3.5 max-h-[58vh]">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-12 text-slate-400 space-y-2">
              <Compass className="w-10 h-10 mx-auto text-slate-300" />
              <p className="text-sm font-medium">
                Không tìm thấy session địa lý nào phù hợp.
              </p>
            </div>
          ) : (
            filteredProjects.map((proj) => {
              const isCurrent = currentProject.id === proj.id;
              const totalSecs = proj.videoScript.reduce(
                (acc, s) => acc + (s.durationSeconds || 0),
                0
              );
              const mins = Math.floor(totalSecs / 60);
              const secs = totalSecs % 60;

              return (
                <div
                  key={proj.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    isCurrent
                      ? "bg-emerald-50/50 border-emerald-400 ring-2 ring-emerald-500/20 shadow-xs"
                      : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-xs"
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    {/* Left: Info */}
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        {isCurrent && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-600 text-white uppercase tracking-wider">
                            <Check className="w-3 h-3" />
                            Đang Mở
                          </span>
                        )}
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-100/70 px-2.5 py-0.5 rounded-full border border-emerald-200">
                          <MapPin className="w-3 h-3" />
                          {proj.metadata.region || "Châu Âu"}
                        </span>
                        <span className="text-[11px] text-slate-500 font-medium">
                          {proj.metadata.gradeLevel}
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="text-[11px] text-slate-400">
                          {proj.metadata.language}
                        </span>
                      </div>

                      <h4 className="text-sm sm:text-base font-bold text-slate-900">
                        {proj.metadata.topic}
                      </h4>

                      {/* Artifact metrics */}
                      <div className="flex items-center gap-3 text-[11px] text-slate-500 pt-1 flex-wrap">
                        <span className="flex items-center gap-1">
                          <Presentation className="w-3.5 h-3.5 text-blue-600" />
                          {proj.slides.length} slides
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Video className="w-3.5 h-3.5 text-purple-600" />
                          {mins}m {secs}s video
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <HelpCircle className="w-3.5 h-3.5 text-teal-600" />
                          {proj.quiz.length} câu trắc nghiệm
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Layers className="w-3.5 h-3.5 text-amber-600" />
                          {proj.flashcards.length} thẻ
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <FileCheck2 className="w-3.5 h-3.5 text-rose-600" />
                          {proj.exercises.length} bài tập
                        </span>
                      </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                      {!isCurrent && (
                        <button
                          onClick={() => {
                            setCurrentProject(proj);
                            onClose();
                          }}
                          className="px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-colors shadow-xs"
                        >
                          Mở Bài Học
                        </button>
                      )}

                      <button
                        onClick={() => duplicateProject(proj.id)}
                        className="p-2 text-slate-500 hover:text-slate-800 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors"
                        title="Nhân bản session này"
                      >
                        <Copy className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleExportSingleSession(proj)}
                        className="p-2 text-slate-500 hover:text-slate-800 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors"
                        title="Tải tệp JSON của bài này"
                      >
                        <Download className="w-4 h-4" />
                      </button>

                      {savedProjects.length > 1 && (
                        <button
                          onClick={() => {
                            if (
                              confirm(
                                `Bạn có chắc muốn xóa session "${proj.metadata.topic}"?`
                              )
                            ) {
                              deleteSavedProject(proj.id);
                            }
                          }}
                          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 rounded-xl transition-colors"
                          title="Xóa session"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Backup & Import */}
        <div className="px-6 py-3.5 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={handleExportAllSessions}
              className="px-3 py-1.5 text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg flex items-center gap-1.5 font-medium transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Xuất Toàn Bộ Sessions (.JSON)</span>
            </button>

            <label className="px-3 py-1.5 text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg flex items-center gap-1.5 font-medium cursor-pointer transition-colors">
              <Upload className="w-3.5 h-3.5 text-slate-500" />
              <span>Nhập Sessions Từ File</span>
              <input
                type="file"
                accept=".json"
                onChange={handleImportSession}
                className="hidden"
              />
            </label>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 text-slate-600 hover:text-slate-900 font-semibold"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
