import React, { useState } from "react";
import {
  Compass,
  Sparkles,
  Settings,
  Download,
  Upload,
  Layers,
  ChevronDown,
  Check,
  Save,
  Presentation,
  HelpCircle,
  Clock,
  FolderOpen,
} from "lucide-react";
import { useLessonStore } from "../store/useLessonStore";
import { downloadFile } from "../services/exportService";

interface NavbarProps {
  onOpenNewModal: () => void;
  onOpenSettingsModal: () => void;
  onOpenSessionManager: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenNewModal,
  onOpenSettingsModal,
  onOpenSessionManager,
}) => {
  const {
    currentProject,
    savedProjects,
    loadPreset,
    saveCurrentProject,
    setCurrentProject,
    apiConfig,
  } = useLessonStore();

  const [presetDropdownOpen, setPresetDropdownOpen] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = () => {
    saveCurrentProject();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleExportFullJson = () => {
    const jsonStr = JSON.stringify(currentProject, null, 2);
    const filename = `${currentProject.metadata.topic.replace(/[^a-zA-Z0-9_\u00C0-\u024F\u1E00-\u1EFF]/g, "_")}_LessonForge.json`;
    downloadFile(jsonStr, filename, "application/json");
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const parsed = JSON.parse(content);
        if (parsed.slides && parsed.quiz) {
          setCurrentProject(parsed);
          saveCurrentProject();
        } else {
          alert("Tệp JSON không đúng định dạng bài giảng LessonForge.");
        }
      } catch (err) {
        alert("Lỗi khi đọc file JSON.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const totalDuration = currentProject.videoScript.reduce(
    (acc, item) => acc + (item.durationSeconds || 0),
    0
  );
  const minutes = Math.floor(totalDuration / 60);
  const seconds = totalDuration % 60;

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-600 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-slate-900 tracking-tight">
                  LessonForge
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 uppercase tracking-wider">
                  Địa Lý Châu Âu
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Máy Soạn Bài Giảng Toàn Diện 5-in-1
              </p>
            </div>
          </div>

          {/* Sessions Dropdown & Quick Metrics */}
          <div className="hidden md:flex items-center gap-2">
            <div className="relative">
              <button
                onClick={() => setPresetDropdownOpen(!presetDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200"
              >
                <Layers className="w-3.5 h-3.5 text-emerald-600" />
                <span className="max-w-[210px] truncate">
                  {currentProject.metadata.topic}
                </span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {presetDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setPresetDropdownOpen(false)}
                  />
                  <div className="absolute left-0 mt-2 w-84 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-20 animate-fade-in">
                    <div className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                      <span>Các Session Địa Lý Đã Lưu</span>
                      <button
                        onClick={() => {
                          setPresetDropdownOpen(false);
                          onOpenSessionManager();
                        }}
                        className="text-emerald-700 hover:underline font-semibold"
                      >
                        Quản lý tất cả ({savedProjects.length})
                      </button>
                    </div>

                    <div className="max-h-64 overflow-y-auto">
                      {savedProjects.map((p) => (
                        <button
                          key={p.id}
                          onClick={() => {
                            loadPreset(p.id);
                            setPresetDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2 text-xs hover:bg-emerald-50/70 flex items-center justify-between ${
                            currentProject.id === p.id
                              ? "bg-emerald-50 font-semibold text-emerald-800"
                              : "text-slate-700"
                          }`}
                        >
                          <div className="truncate pr-2">
                            <div className="font-medium text-slate-900 truncate">
                              {p.metadata.topic}
                            </div>
                            <div className="text-[11px] text-slate-500">
                              {p.metadata.region || "Châu Âu"} • {p.metadata.gradeLevel}
                            </div>
                          </div>
                          {currentProject.id === p.id && (
                            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Quick Metrics Badge */}
            <div className="hidden lg:flex items-center gap-3 px-3 py-1 text-xs text-slate-500 bg-slate-50 rounded-lg border border-slate-200">
              <span className="flex items-center gap-1" title="Số lượng Slide">
                <Presentation className="w-3.5 h-3.5 text-blue-600" />
                {currentProject.slides.length} slides
              </span>
              <span>•</span>
              <span className="flex items-center gap-1" title="Thời lượng video">
                <Clock className="w-3.5 h-3.5 text-purple-600" />
                {minutes}m {seconds}s
              </span>
              <span>•</span>
              <span className="flex items-center gap-1" title="Câu hỏi trắc nghiệm">
                <HelpCircle className="w-3.5 h-3.5 text-teal-600" />
                {currentProject.quiz.length} câu quiz
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Session Manager Screen Button */}
            <button
              onClick={onOpenSessionManager}
              className="px-3 py-1.5 text-xs font-semibold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg flex items-center gap-1.5 transition-colors"
              title="Mở màn hình quản lý các session của môn Địa lý"
            >
              <FolderOpen className="w-4 h-4 text-emerald-700" />
              <span className="hidden sm:inline">Quản Lý Sessions</span>
            </button>

            {/* Save Button */}
            <button
              onClick={handleSave}
              className={`p-2 sm:px-3 sm:py-1.5 text-xs font-medium rounded-lg border flex items-center gap-1.5 transition-all ${
                saveSuccess
                  ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                  : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
              }`}
              title="Lưu session vào máy"
            >
              {saveSuccess ? (
                <Check className="w-4 h-4 text-emerald-600" />
              ) : (
                <Save className="w-4 h-4 text-slate-500" />
              )}
              <span className="hidden sm:inline">
                {saveSuccess ? "Đã lưu!" : "Lưu"}
              </span>
            </button>

            {/* Export JSON */}
            <button
              onClick={handleExportFullJson}
              className="p-2 sm:px-3 sm:py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 rounded-lg border border-slate-200 flex items-center gap-1.5 transition-colors"
              title="Tải gói dữ liệu đầy đủ JSON"
            >
              <Download className="w-4 h-4 text-slate-500" />
              <span className="hidden sm:inline">Sao lưu JSON</span>
            </button>

            {/* Import JSON */}
            <label
              className="p-2 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 rounded-lg border border-slate-200 flex items-center cursor-pointer transition-colors"
              title="Nhập session từ JSON"
            >
              <Upload className="w-4 h-4 text-slate-500" />
              <input
                type="file"
                accept=".json"
                onChange={handleImportJson}
                className="hidden"
              />
            </label>

            {/* BYOK & System Prompt Settings Button */}
            <button
              onClick={onOpenSettingsModal}
              className={`p-2 sm:px-3 sm:py-1.5 text-xs font-medium rounded-lg border flex items-center gap-1.5 transition-colors ${
                apiConfig.geminiKey || apiConfig.customKey
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                  : "bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100"
              }`}
              title="Cấu hình API Key (BYOK) & System Prompt"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">
                {apiConfig.geminiKey || apiConfig.customKey
                  ? "Cài đặt & Prompt"
                  : "Cài đặt BYOK"}
              </span>
            </button>

            {/* AI Generator Button */}
            <button
              onClick={onOpenNewModal}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 rounded-lg shadow-sm shadow-emerald-500/20 flex items-center gap-1.5 transition-all transform hover:-translate-y-0.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>Soạn Session Mới</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
