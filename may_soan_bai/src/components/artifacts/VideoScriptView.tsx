import React, { useState } from "react";
import {
  Video,
  Play,
  Download,
  FileText,
  Clock,
  Plus,
  Trash2,
  Volume2,
  VolumeX,
  Clapperboard,
  Mic,
  Copy,
  Check,
} from "lucide-react";
import { useLessonStore } from "../../store/useLessonStore";
import { exportScriptMarkdown, exportScriptSRT, downloadFile } from "../../services/exportService";
import { TeleprompterModal } from "../modals/TeleprompterModal";

export const VideoScriptView: React.FC = () => {
  const { currentProject, updateScriptItem, addScriptItem, deleteScriptItem } =
    useLessonStore();

  const [isPrompterOpen, setIsPrompterOpen] = useState(false);
  const [playingVoiceIndex, setPlayingVoiceIndex] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const script = currentProject.videoScript;

  const totalDurationSeconds = script.reduce(
    (acc, item) => acc + (item.durationSeconds || 0),
    0
  );
  const totalMinutes = Math.floor(totalDurationSeconds / 60);
  const remainingSeconds = totalDurationSeconds % 60;

  const handleExportSRT = () => {
    const srt = exportScriptSRT(currentProject);
    const filename = `${currentProject.metadata.topic.replace(/[^a-zA-Z0-9_\u00C0-\u024F\u1E00-\u1EFF]/g, "_")}_Subtitles.srt`;
    downloadFile(srt, filename, "text/plain;charset=utf-8");
  };

  const handleExportMarkdown = () => {
    const md = exportScriptMarkdown(currentProject);
    const filename = `${currentProject.metadata.topic.replace(/[^a-zA-Z0-9_\u00C0-\u024F\u1E00-\u1EFF]/g, "_")}_DirectorScript.md`;
    downloadFile(md, filename, "text/markdown;charset=utf-8");
  };

  const handleCopyAllVoiceover = () => {
    const fullText = script.map((s) => s.voiceover).join("\n\n");
    navigator.clipboard.writeText(fullText);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const handleSpeakScene = (index: number, text: string) => {
    if (!("speechSynthesis" in window)) {
      alert("Trình duyệt không hỗ trợ Web Speech API.");
      return;
    }

    if (playingVoiceIndex === index) {
      window.speechSynthesis.cancel();
      setPlayingVoiceIndex(null);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;

    const voices = window.speechSynthesis.getVoices();
    const viVoice = voices.find((v) => v.lang.startsWith("vi"));
    if (viVoice) utterance.voice = viVoice;

    utterance.onend = () => setPlayingVoiceIndex(null);
    utterance.onerror = () => setPlayingVoiceIndex(null);

    window.speechSynthesis.speak(utterance);
    setPlayingVoiceIndex(index);
  };

  return (
    <div className="space-y-6">
      {/* Action Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Video className="w-5 h-5 text-accent-600" />
            <h2 className="text-base font-bold text-slate-900">
              Video Script & Teleprompter (Kịch Bản Video & Máy Nhắc Chữ)
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Phân cảnh đạo diễn với mốc thời gian, hướng dẫn hình ảnh máy quay và lời bình giảng bài
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Total Duration Badge */}
          <div className="px-3 py-1.5 text-xs font-semibold bg-accent-50 text-accent-700 rounded-lg border border-accent-200 flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span>
              Tổng thời lượng: {totalMinutes}m {remainingSeconds}s ({totalDurationSeconds} giây)
            </span>
          </div>

          {/* Copy Voiceover */}
          <button
            onClick={handleCopyAllVoiceover}
            className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 rounded-lg border border-slate-200 flex items-center gap-1.5 transition-colors"
          >
            {copiedAll ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-500" />}
            <span>{copiedAll ? "Đã chép lời bình!" : "Chép toàn bộ"}</span>
          </button>

          {/* Export SRT */}
          <button
            onClick={handleExportSRT}
            className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 rounded-lg border border-slate-200 flex items-center gap-1.5 transition-colors"
            title="Tải phụ đề chuẩn .SRT dùng cho Premiere / CapCut / YouTube"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Xuất Phụ Đề (.SRT)</span>
          </button>

          {/* Export Markdown */}
          <button
            onClick={handleExportMarkdown}
            className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 rounded-lg border border-slate-200 flex items-center gap-1.5 transition-colors"
          >
            <FileText className="w-4 h-4 text-slate-500" />
            <span>Xuất Kịch Bản (.MD)</span>
          </button>

          {/* Open Fullscreen Teleprompter */}
          <button
            onClick={() => setIsPrompterOpen(true)}
            className="px-4 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-accent-600 to-purple-600 hover:from-accent-500 hover:to-purple-500 rounded-lg shadow-sm shadow-accent-500/20 flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Bật Máy Nhắc Chữ (Teleprompter)</span>
          </button>
        </div>
      </div>

      {/* Script Scenes Director Board */}
      <div className="space-y-4">
        {script.map((scene, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:border-slate-300 transition-all space-y-4"
          >
            {/* Scene Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-accent-100 text-accent-700 font-bold text-xs flex items-center justify-center">
                  {idx + 1}
                </span>

                {/* Timestamp editor */}
                <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="text"
                    value={scene.timestamp}
                    onChange={(e) =>
                      updateScriptItem(idx, { timestamp: e.target.value })
                    }
                    className="text-xs font-mono font-medium text-slate-700 bg-transparent focus:outline-none w-28"
                    placeholder="00:00 - 00:45"
                  />
                </div>

                {/* Duration in seconds */}
                <div className="flex items-center gap-1 text-xs text-slate-500">
                  <span>Thời lượng:</span>
                  <input
                    type="number"
                    min="5"
                    max="600"
                    value={scene.durationSeconds}
                    onChange={(e) =>
                      updateScriptItem(idx, {
                        durationSeconds: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-14 px-2 py-0.5 text-xs text-center border border-slate-200 rounded font-mono focus:outline-none focus:border-brand-500"
                  />
                  <span>giây</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Speech Synthesis preview button */}
                <button
                  onClick={() => handleSpeakScene(idx, scene.voiceover)}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md border flex items-center gap-1 transition-colors ${
                    playingVoiceIndex === idx
                      ? "bg-amber-50 text-amber-700 border-amber-300"
                      : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                  }`}
                  title="Nghe AI đọc thử đoạn này"
                >
                  {playingVoiceIndex === idx ? (
                    <VolumeX className="w-3.5 h-3.5 text-amber-600" />
                  ) : (
                    <Volume2 className="w-3.5 h-3.5 text-slate-500" />
                  )}
                  <span>{playingVoiceIndex === idx ? "Dừng" : "Đọc thử"}</span>
                </button>

                {script.length > 1 && (
                  <button
                    onClick={() => {
                      if (confirm("Bạn có chắc muốn xóa phân cảnh này?")) {
                        deleteScriptItem(idx);
                      }
                    }}
                    className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors"
                    title="Xóa phân cảnh"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Split Grid: Left Visual Cue + Right Voiceover */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {/* Visual Cue (col 5) */}
              <div className="md:col-span-5 bg-amber-50/50 rounded-xl p-3.5 border border-amber-200/60 space-y-2">
                <label className="text-[11px] font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Clapperboard className="w-3.5 h-3.5 text-amber-600" />
                  <span>Chỉ Đạo Hình Ảnh / Visual Cue</span>
                </label>
                <textarea
                  rows={4}
                  value={scene.visualCue}
                  onChange={(e) =>
                    updateScriptItem(idx, { visualCue: e.target.value })
                  }
                  className="w-full text-xs text-amber-950 bg-white/80 border border-amber-200 rounded-lg p-2.5 focus:outline-none focus:ring-1 focus:ring-amber-500 font-sans"
                  placeholder="Gợi ý góc quay, đồ họa 3D, thao tác màn hình..."
                />
              </div>

              {/* Voiceover Script (col 7) */}
              <div className="md:col-span-7 bg-purple-50/40 rounded-xl p-3.5 border border-purple-200/60 space-y-2">
                <label className="text-[11px] font-bold text-purple-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Mic className="w-3.5 h-3.5 text-purple-600" />
                  <span>Lời Bình Giảng Viên / Voiceover</span>
                </label>
                <textarea
                  rows={4}
                  value={scene.voiceover}
                  onChange={(e) =>
                    updateScriptItem(idx, { voiceover: e.target.value })
                  }
                  className="w-full text-xs text-slate-900 bg-white/90 border border-purple-200 rounded-lg p-2.5 focus:outline-none focus:ring-1 focus:ring-purple-500 font-sans leading-relaxed"
                  placeholder="Nội dung giáo viên nói..."
                />
              </div>
            </div>
          </div>
        ))}

        {/* Add Scene Button */}
        <button
          onClick={() => addScriptItem()}
          className="w-full py-3 border-2 border-dashed border-slate-300 hover:border-accent-400 hover:bg-accent-50/30 rounded-xl text-xs font-semibold text-slate-600 hover:text-accent-700 flex items-center justify-center gap-2 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm Phân Cảnh Video Mới</span>
        </button>
      </div>

      {/* Teleprompter Fullscreen Modal */}
      {isPrompterOpen && (
        <TeleprompterModal
          scriptItems={script}
          lessonTopic={currentProject.metadata.topic}
          onClose={() => setIsPrompterOpen(false)}
        />
      )}
    </div>
  );
};
