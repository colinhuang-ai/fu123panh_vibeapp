import React, { useState } from "react";
import confetti from "canvas-confetti";
import {
  HelpCircle,
  Download,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Plus,
  Trash2,
  Eye,
  Edit3,
  FileSpreadsheet,
  Check,
  AlertCircle,
  Printer,
  Sparkles,
} from "lucide-react";
import { useLessonStore } from "../../store/useLessonStore";
import {
  exportQuizizzCSV,
  exportGoogleFormsCSV,
  downloadFile,
} from "../../services/exportService";

export const QuizView: React.FC = () => {
  const { currentProject, updateQuizItem, addQuizItem, deleteQuizItem } =
    useLessonStore();

  const quiz = currentProject.quiz;

  // Mode: "taker" (Live interactive test taker) vs "editor" (Teacher edit mode)
  const [viewMode, setViewMode] = useState<"taker" | "editor">("taker");

  // Test taker state
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const handleSelectAnswer = (questionIndex: number, optionIndex: number) => {
    if (showResults) return;
    setUserAnswers((prev) => ({
      ...prev,
      [questionIndex]: optionIndex,
    }));
  };

  const handleFinishQuiz = () => {
    let correctCount = 0;
    quiz.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctIndex) {
        correctCount++;
      }
    });

    setScore(correctCount);
    setShowResults(true);

    // Fire celebratory confetti!
    const percentage = (correctCount / quiz.length) * 100;
    if (percentage >= 60) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
      if (percentage === 100) {
        setTimeout(() => {
          confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.5 },
          });
        }, 300);
      }
    }
  };

  const handleResetQuiz = () => {
    setUserAnswers({});
    setShowResults(false);
    setScore(0);
  };

  const handleExportQuizizz = () => {
    const csv = exportQuizizzCSV(currentProject);
    const filename = `${currentProject.metadata.topic.replace(/[^a-zA-Z0-9_\u00C0-\u024F\u1E00-\u1EFF]/g, "_")}_Quizizz_Import.csv`;
    downloadFile(csv, filename, "text/csv;charset=utf-8");
  };

  const handleExportGoogleForms = () => {
    const csv = exportGoogleFormsCSV(currentProject);
    const filename = `${currentProject.metadata.topic.replace(/[^a-zA-Z0-9_\u00C0-\u024F\u1E00-\u1EFF]/g, "_")}_GoogleForms_Format.csv`;
    downloadFile(csv, filename, "text/csv;charset=utf-8");
  };

  const answeredCount = Object.keys(userAnswers).length;

  return (
    <div className="space-y-6">
      {/* Action Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-emerald-600" />
            <h2 className="text-base font-bold text-slate-900">
              Interactive Quiz & Trắc Nghiệm Tương Tác
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Làm bài trắc nghiệm trực tiếp, xem lời giải sư phạm chi tiết và xuất sang Quizizz / Google Forms
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Mode Switcher */}
          <div className="bg-slate-100 p-1 rounded-lg flex items-center gap-1 border border-slate-200 text-xs font-semibold">
            <button
              onClick={() => setViewMode("taker")}
              className={`px-3 py-1 rounded-md flex items-center gap-1.5 transition-colors ${
                viewMode === "taker"
                  ? "bg-white text-emerald-700 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Chế Độ Học Sinh Làm Bài</span>
            </button>
            <button
              onClick={() => setViewMode("editor")}
              className={`px-3 py-1 rounded-md flex items-center gap-1.5 transition-colors ${
                viewMode === "editor"
                  ? "bg-white text-emerald-700 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Chế Độ Soạn & Đáp Án</span>
            </button>
          </div>

          {/* Export to Quizizz */}
          <button
            onClick={handleExportQuizizz}
            className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 rounded-lg border border-slate-200 flex items-center gap-1.5 transition-colors"
            title="Tải tệp CSV tương thích nhập hàng loạt vào Quizizz"
          >
            <FileSpreadsheet className="w-4 h-4 text-purple-600" />
            <span>Xuất Quizizz (.CSV)</span>
          </button>

          {/* Export to Google Forms */}
          <button
            onClick={handleExportGoogleForms}
            className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 rounded-lg border border-slate-200 flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-4 h-4 text-brand-600" />
            <span>Xuất G-Forms / CSV</span>
          </button>

          {/* Print Test Paper */}
          <button
            onClick={() => window.print()}
            className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 rounded-lg border border-slate-200 flex items-center gap-1.5 transition-colors"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            <span>In Đề Thi</span>
          </button>
        </div>
      </div>

      {/* Taker Mode: Score Summary Banner */}
      {viewMode === "taker" && showResults && (
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-2xl p-6 shadow-md animate-fade-in flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center font-extrabold text-2xl">
              {score}/{quiz.length}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold">
                  {score === quiz.length
                    ? "Xuất sắc! Đạt điểm tuyệt đối 100%"
                    : score >= quiz.length * 0.7
                    ? "Rất tốt! Bạn nắm vững hầu hết kiến thức"
                    : "Cố gắng lên! Hãy xem lại lời giải chi tiết bên dưới"}
                </h3>
                <Sparkles className="w-5 h-5 text-amber-300" />
              </div>
              <p className="text-xs text-emerald-100 mt-1">
                Tỷ lệ chính xác: {Math.round((score / quiz.length) * 100)}% • Đã hoàn thành toàn bộ câu hỏi
              </p>
            </div>
          </div>

          <button
            onClick={handleResetQuiz}
            className="px-4 py-2 bg-white text-emerald-800 hover:bg-emerald-50 rounded-xl font-semibold text-xs flex items-center gap-2 shadow-xs transition-colors shrink-0"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Làm Lại Bài Thi</span>
          </button>
        </div>
      )}

      {/* Main Questions List */}
      <div className="space-y-5">
        {quiz.map((q, qIdx) => {
          const selectedOption = userAnswers[qIdx];
          const isAnswered = selectedOption !== undefined;
          const isCorrect = isAnswered && selectedOption === q.correctIndex;

          return (
            <div
              key={qIdx}
              className={`bg-white rounded-2xl border p-6 shadow-xs transition-all ${
                viewMode === "taker" && showResults
                  ? isCorrect
                    ? "border-emerald-300 bg-emerald-50/20"
                    : "border-rose-300 bg-rose-50/20"
                  : "border-slate-200"
              }`}
            >
              {/* Question Header */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-start gap-3 flex-1">
                  <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {qIdx + 1}
                  </span>

                  {viewMode === "editor" ? (
                    <div className="w-full space-y-2">
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        Câu Hỏi Số {qIdx + 1}
                      </label>
                      <textarea
                        rows={2}
                        value={q.question}
                        onChange={(e) =>
                          updateQuizItem(qIdx, { question: e.target.value })
                        }
                        className="w-full text-sm font-semibold text-slate-900 border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  ) : (
                    <h3 className="text-sm sm:text-base font-semibold text-slate-900 leading-snug">
                      {q.question}
                    </h3>
                  )}
                </div>

                {viewMode === "editor" && quiz.length > 1 && (
                  <button
                    onClick={() => {
                      if (confirm("Xóa câu hỏi này?")) deleteQuizItem(qIdx);
                    }}
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg transition-colors"
                    title="Xóa câu hỏi"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Options Grid */}
              <div className="space-y-2.5 sm:space-y-3">
                {q.options.map((opt, optIdx) => {
                  const letter = ["A", "B", "C", "D"][optIdx] || `${optIdx + 1}`;
                  const isSelected = selectedOption === optIdx;
                  const isThisCorrect = q.correctIndex === optIdx;

                  if (viewMode === "editor") {
                    return (
                      <div
                        key={optIdx}
                        className={`flex items-center gap-3 p-2.5 rounded-xl border transition-all ${
                          isThisCorrect
                            ? "bg-emerald-50 border-emerald-400 ring-1 ring-emerald-400"
                            : "bg-slate-50 border-slate-200"
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() =>
                            updateQuizItem(qIdx, { correctIndex: optIdx })
                          }
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                            isThisCorrect
                              ? "bg-emerald-600 text-white"
                              : "bg-slate-200 text-slate-600 hover:bg-slate-300"
                          }`}
                          title="Bấm để đặt làm đáp án đúng"
                        >
                          {letter}
                        </button>
                        <input
                          type="text"
                          value={opt}
                          onChange={(e) => {
                            const newOpts = [...q.options];
                            newOpts[optIdx] = e.target.value;
                            updateQuizItem(qIdx, { options: newOpts });
                          }}
                          className="flex-1 text-xs text-slate-800 bg-white border border-slate-200 rounded-md px-3 py-1.5 focus:outline-none focus:border-emerald-500"
                        />
                        {isThisCorrect && (
                          <span className="text-[11px] font-bold text-emerald-700 uppercase px-2 py-0.5 bg-emerald-100 rounded-md">
                            Đáp án đúng
                          </span>
                        )}
                      </div>
                    );
                  }

                  // Live Taker Mode Option Button
                  let btnStyle =
                    "bg-slate-50 hover:bg-slate-100/80 border-slate-200 text-slate-800";

                  if (showResults) {
                    if (isThisCorrect) {
                      btnStyle =
                        "bg-emerald-100/80 border-emerald-500 text-emerald-900 font-semibold ring-1 ring-emerald-500";
                    } else if (isSelected && !isThisCorrect) {
                      btnStyle =
                        "bg-rose-100/80 border-rose-500 text-rose-900 line-through";
                    }
                  } else if (isSelected) {
                    btnStyle =
                      "bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold ring-2 ring-emerald-500/20";
                  }

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      onClick={() => handleSelectAnswer(qIdx, optIdx)}
                      className={`w-full text-left p-3.5 rounded-xl border flex items-center gap-3 transition-all ${btnStyle}`}
                    >
                      <span
                        className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 ${
                          showResults && isThisCorrect
                            ? "bg-emerald-600 text-white"
                            : showResults && isSelected && !isThisCorrect
                            ? "bg-rose-600 text-white"
                            : isSelected
                            ? "bg-emerald-600 text-white"
                            : "bg-white border border-slate-200 text-slate-700"
                        }`}
                      >
                        {letter}
                      </span>
                      <span className="text-xs sm:text-sm flex-1">{opt}</span>

                      {showResults && isThisCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      )}
                      {showResults && isSelected && !isThisCorrect && (
                        <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation section */}
              {viewMode === "editor" ? (
                <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Giải thích sư phạm chi tiết</span>
                  </label>
                  <textarea
                    rows={2}
                    value={q.explanation}
                    onChange={(e) =>
                      updateQuizItem(qIdx, { explanation: e.target.value })
                    }
                    className="w-full text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:border-emerald-500"
                    placeholder="Giải thích vì sao đáp án đúng và phân tích bẫy sai..."
                  />
                </div>
              ) : (
                showResults && (
                  <div className="mt-4 pt-4 border-t border-slate-200/60 animate-fade-in">
                    <div className="bg-emerald-50/80 rounded-xl p-3.5 border border-emerald-200 flex items-start gap-2.5">
                      <AlertCircle className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-bold text-emerald-900 block mb-0.5">
                          Giải Thích Chi Tiết:
                        </span>
                        <p className="text-xs text-emerald-800 leading-relaxed">
                          {q.explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          );
        })}
      </div>

      {/* Editor Add Question Button */}
      {viewMode === "editor" && (
        <button
          onClick={() => addQuizItem()}
          className="w-full py-3.5 border-2 border-dashed border-slate-300 hover:border-emerald-400 hover:bg-emerald-50/30 rounded-xl text-xs font-semibold text-slate-600 hover:text-emerald-700 flex items-center justify-center gap-2 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm Câu Hỏi Trắc Nghiệm Mới</span>
        </button>
      )}

      {/* Taker Mode Submit Action Bar */}
      {viewMode === "taker" && !showResults && (
        <div className="sticky bottom-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-slate-200 shadow-xl flex items-center justify-between">
          <div className="text-xs text-slate-600">
            Đã trả lời:{" "}
            <span className="font-bold text-slate-900">
              {answeredCount}/{quiz.length} câu
            </span>
          </div>

          <button
            onClick={handleFinishQuiz}
            disabled={answeredCount === 0}
            className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-500/20 flex items-center gap-2 transition-all disabled:opacity-40"
          >
            <Check className="w-4 h-4" />
            <span>Nộp Bài & Chấm Điểm Ngay</span>
          </button>
        </div>
      )}
    </div>
  );
};
