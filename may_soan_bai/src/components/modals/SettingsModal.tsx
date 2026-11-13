import React, { useState } from "react";
import {
  X,
  Key,
  ShieldCheck,
  Check,
  AlertCircle,
  ExternalLink,
  Cpu,
  Globe,
  Compass,
  FileCode,
  RotateCcw,
} from "lucide-react";
import { useLessonStore } from "../../store/useLessonStore";
import {
  DEFAULT_EUROPE_GEOGRAPHY_SYSTEM_PROMPT,
  PROMPT_PRESETS,
} from "../../services/aiService";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { apiConfig, updateApiConfig } = useLessonStore();

  const [provider, setProvider] = useState(apiConfig.provider);
  const [geminiKey, setGeminiKey] = useState(apiConfig.geminiKey);
  const [customKey, setCustomKey] = useState(apiConfig.customKey);
  const [customBaseUrl, setCustomBaseUrl] = useState(apiConfig.customBaseUrl);
  const [model, setModel] = useState(apiConfig.model);

  // System Prompt Configuration
  const [activeTab, setActiveTab] = useState<"api" | "prompt">("api");
  const [selectedTemplate, setSelectedTemplate] = useState(
    apiConfig.activePromptTemplate || "europe_geography"
  );
  const [customSystemPrompt, setCustomSystemPrompt] = useState(
    apiConfig.customSystemPrompt || DEFAULT_EUROPE_GEOGRAPHY_SYSTEM_PROMPT
  );

  const [showKey, setShowKey] = useState(false);
  const [testStatus, setTestStatus] = useState<{
    loading: boolean;
    success?: boolean;
    message?: string;
  }>({ loading: false });

  if (!isOpen) return null;

  const handleTemplateChange = (templateKey: string) => {
    setSelectedTemplate(templateKey);
    if (PROMPT_PRESETS[templateKey]) {
      setCustomSystemPrompt(PROMPT_PRESETS[templateKey].prompt);
    }
  };

  const handleResetToDefaultPrompt = () => {
    setSelectedTemplate("europe_geography");
    setCustomSystemPrompt(DEFAULT_EUROPE_GEOGRAPHY_SYSTEM_PROMPT);
  };

  const handleSave = () => {
    updateApiConfig({
      provider,
      geminiKey,
      customKey,
      customBaseUrl,
      model,
      customSystemPrompt,
      activePromptTemplate: selectedTemplate,
    });
    onClose();
  };

  const handleTestConnection = async () => {
    setTestStatus({ loading: true });

    try {
      if (provider === "gemini") {
        const key = geminiKey.trim();
        if (!key) {
          throw new Error("Vui lòng nhập Gemini API Key trước khi kiểm tra.");
        }
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`
        );
        if (!res.ok) {
          const err = await res.text();
          throw new Error(`Xác thực thất bại (${res.status}): ${err}`);
        }
        setTestStatus({
          loading: false,
          success: true,
          message: "Kết nối Gemini API thành công! Khóa API hợp lệ.",
        });
      } else {
        const baseUrl = customBaseUrl.trim() || "https://api.openai.com/v1";
        const key = customKey.trim();
        const headers: Record<string, string> = {};
        if (key) headers["Authorization"] = `Bearer ${key}`;

        const res = await fetch(`${baseUrl.replace(/\/+$/, "")}/models`, {
          headers,
        });
        if (!res.ok) {
          const err = await res.text();
          throw new Error(`Lỗi kết nối (${res.status}): ${err}`);
        }
        setTestStatus({
          loading: false,
          success: true,
          message: `Kết nối thành công đến endpoint ${baseUrl}!`,
        });
      }
    } catch (err: any) {
      setTestStatus({
        loading: false,
        success: false,
        message: err.message || "Không thể kết nối đến API.",
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <Key className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Cài Đặt API (BYOK) & System Prompt Địa Lý
              </h3>
              <p className="text-xs text-slate-500">
                Khóa API và cấu hình prompt được lưu an toàn trong trình duyệt
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs inside Settings */}
        <div className="flex border-b border-slate-200 bg-slate-100/70 px-6 pt-2">
          <button
            onClick={() => setActiveTab("api")}
            className={`px-4 py-2.5 text-xs font-semibold border-b-2 flex items-center gap-2 transition-all ${
              activeTab === "api"
                ? "border-emerald-600 text-emerald-800 bg-white rounded-t-lg"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Key className="w-3.5 h-3.5" />
            <span>Khóa API (Gemini / OpenAI BYOK)</span>
          </button>

          <button
            onClick={() => setActiveTab("prompt")}
            className={`px-4 py-2.5 text-xs font-semibold border-b-2 flex items-center gap-2 transition-all ${
              activeTab === "prompt"
                ? "border-emerald-600 text-emerald-800 bg-white rounded-t-lg"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-emerald-600" />
            <span>Cấu Hình System Prompt Địa Lý Châu Âu</span>
          </button>
        </div>

        {/* Tab 1: API Config */}
        {activeTab === "api" && (
          <div className="p-6 overflow-y-auto space-y-5 text-xs">
            {/* Privacy Notice */}
            <div className="bg-emerald-50/60 rounded-xl p-3 border border-emerald-200/70 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <p className="text-emerald-900 leading-relaxed text-[11px]">
                <strong>Bảo mật máy người dùng:</strong> Khóa API của bạn được lưu trong <code className="bg-emerald-100 px-1 py-0.5 rounded font-mono">localStorage</code> trình duyệt và gửi trực tiếp đến máy chủ Google Gemini hoặc OpenAI endpoint.
              </p>
            </div>

            {/* Provider Selection */}
            <div className="space-y-2">
              <label className="font-bold text-slate-700 uppercase tracking-wider block">
                Nhà Cung Cấp Mô Hình AI
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setProvider("gemini");
                    setModel("gemini-2.5-flash");
                  }}
                  className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                    provider === "gemini"
                      ? "bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20 font-semibold text-emerald-900"
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <Cpu className="w-4 h-4 text-emerald-600" />
                  <div>
                    <div className="text-xs">Google Gemini API</div>
                    <div className="text-[10px] text-slate-400 font-normal">
                      (Khuyên dùng - Nhanh & Miễn phí)
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setProvider("openai-compatible");
                    setModel("gpt-4o-mini");
                  }}
                  className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                    provider === "openai-compatible"
                      ? "bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20 font-semibold text-emerald-900"
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <Globe className="w-4 h-4 text-purple-600" />
                  <div>
                    <div className="text-xs">OpenAI Compatible</div>
                    <div className="text-[10px] text-slate-400 font-normal">
                      (Groq / OpenAI / Ollama)
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Provider Specific Inputs */}
            {provider === "gemini" ? (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-slate-700">
                      Gemini API Key
                    </label>
                    <a
                      href="https://aistudio.google.com/app/apikey"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-700 hover:underline flex items-center gap-1 font-medium"
                    >
                      <span>Lấy Key miễn phí tại Google AI Studio</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <div className="relative">
                    <input
                      type={showKey ? "text" : "password"}
                      value={geminiKey}
                      onChange={(e) => setGeminiKey(e.target.value)}
                      placeholder="AIzaSy..."
                      className="w-full text-xs font-mono bg-white border border-slate-200 rounded-xl px-3 py-2.5 pr-16 focus:outline-none focus:border-emerald-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowKey(!showKey)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[11px] text-slate-500 hover:text-slate-700 font-medium"
                    >
                      {showKey ? "Ẩn" : "Hiện"}
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">
                    Phiên Bản Mô Hình Gemini
                  </label>
                  <select
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    className="w-full text-xs bg-white border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="gemini-2.5-flash">Gemini 2.5 Flash (Mới nhất, siêu nhanh & tối ưu JSON)</option>
                    <option value="gemini-1.5-pro">Gemini 1.5 Pro (Suy luận địa lý chuyên sâu)</option>
                    <option value="gemini-2.0-flash">Gemini 2.0 Flash</option>
                    <option value="gemini-1.5-flash">Gemini 1.5 Flash</option>
                  </select>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">
                    Custom Base URL
                  </label>
                  <input
                    type="text"
                    value={customBaseUrl}
                    onChange={(e) => setCustomBaseUrl(e.target.value)}
                    placeholder="https://api.openai.com/v1 hoặc http://localhost:11434/v1"
                    className="w-full text-xs font-mono bg-white border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">
                    API Key (nếu có)
                  </label>
                  <input
                    type={showKey ? "text" : "password"}
                    value={customKey}
                    onChange={(e) => setCustomKey(e.target.value)}
                    placeholder="sk-..."
                    className="w-full text-xs font-mono bg-white border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">
                    Model Identifier
                  </label>
                  <input
                    type="text"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    placeholder="gpt-4o-mini hoặc llama3"
                    className="w-full text-xs bg-white border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            )}

            {/* Test connection alert */}
            {testStatus.message && (
              <div
                className={`p-3 rounded-xl text-xs flex items-start gap-2 ${
                  testStatus.success
                    ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                    : "bg-rose-50 text-rose-800 border border-rose-200"
                }`}
              >
                {testStatus.success ? (
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                )}
                <span className="leading-relaxed">{testStatus.message}</span>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: System Prompt Configuration */}
        {activeTab === "prompt" && (
          <div className="p-6 overflow-y-auto space-y-4 text-xs">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <Compass className="w-4 h-4 text-emerald-600" />
                  <span>Mẫu Định Dạng System Prompt Cho Môn Địa Lý</span>
                </h4>
                <p className="text-slate-500 text-[11px] mt-0.5">
                  Chọn mẫu định dạng có sẵn hoặc tự do chỉnh sửa prompt theo chuẩn sư phạm của bạn
                </p>
              </div>

              <button
                type="button"
                onClick={handleResetToDefaultPrompt}
                className="px-2.5 py-1 text-[11px] font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center gap-1 transition-colors"
                title="Khôi phục lại prompt chuẩn Châu Âu ban đầu"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Khôi phục mẫu Châu Âu</span>
              </button>
            </div>

            {/* Prompt Template Selector */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {Object.entries(PROMPT_PRESETS).map(([key, item]) => {
                const isSelected = selectedTemplate === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleTemplateChange(key)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? "bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20 text-emerald-900 font-semibold"
                        : "bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700"
                    }`}
                  >
                    <div className="text-xs font-bold">{item.name}</div>
                    <p className="text-[10px] text-slate-500 font-normal line-clamp-2 mt-1">
                      {item.description}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Editable System Prompt Textarea */}
            <div className="space-y-1.5 pt-2">
              <div className="flex items-center justify-between">
                <label className="font-bold text-slate-700 flex items-center gap-1">
                  <FileCode className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Nội Dung System Prompt (Được gửi đến AI)</span>
                </label>
                <span className="text-[10px] text-slate-400 font-mono">
                  {customSystemPrompt.length} ký tự
                </span>
              </div>
              <textarea
                rows={11}
                value={customSystemPrompt}
                onChange={(e) => {
                  setCustomSystemPrompt(e.target.value);
                  setSelectedTemplate("custom");
                }}
                className="w-full text-[11px] font-mono leading-relaxed text-slate-800 bg-slate-50 border border-slate-200 rounded-xl p-3.5 focus:outline-none focus:border-emerald-500"
                placeholder="Nhập System Prompt tùy chỉnh cho môn Địa lý..."
              />
              <p className="text-[11px] text-slate-400 italic">
                💡 Mẹo: System prompt quy định cấu trúc JSON Schema, tiêu chuẩn nhân - quả địa lý (Hải lưu, gió Tây, địa hình Karst, Fjord, Taiga, Địa Trung Hải) và 5 học phần sư phạm.
              </p>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          {activeTab === "api" ? (
            <button
              type="button"
              onClick={handleTestConnection}
              disabled={testStatus.loading}
              className="px-3 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors disabled:opacity-50"
            >
              {testStatus.loading ? "Đang thử..." : "Kiểm Tra Kết Nối"}
            </button>
          ) : (
            <div className="text-[11px] text-slate-500 font-medium">
              Đang áp dụng mẫu:{" "}
              <span className="font-bold text-emerald-800">
                {selectedTemplate === "custom"
                  ? "Tùy chỉnh cá nhân"
                  : PROMPT_PRESETS[selectedTemplate]?.name || selectedTemplate}
              </span>
            </div>
          )}

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800 rounded-xl"
            >
              Hủy
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-xs transition-colors"
            >
              Lưu Cấu Hình
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
