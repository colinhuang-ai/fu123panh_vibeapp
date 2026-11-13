import React, { useState } from "react";
import {
  FileCheck2,
  Award,
  Download,
  Printer,
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
  Check,
  Eye,
  EyeOff,
  Calculator,
  BookOpen,
  Sparkles,
} from "lucide-react";
import { useLessonStore } from "../../store/useLessonStore";
import { exportExercisesWorksheet, downloadFile } from "../../services/exportService";

export const ExercisesView: React.FC = () => {
  const { currentProject, updateExercise, addExercise, deleteExercise } =
    useLessonStore();

  const exercises = currentProject.exercises;

  // Toggle for Student Worksheet (hides solutions) vs Teacher Assessment Guide
  const [isStudentWorksheetMode, setIsStudentWorksheetMode] = useState(false);

  // Expanded states for rubrics and answers
  const [expandedRubrics, setExpandedRubrics] = useState<Record<number, boolean>>({
    0: true,
  });
  const [expandedAnswers, setExpandedAnswers] = useState<Record<number, boolean>>({});

  // Interactive Teacher Grading Calculator: checked criteria per exercise
  const [gradingChecklist, setGradingChecklist] = useState<
    Record<number, Record<number, boolean>>
  >({});

  const toggleRubric = (index: number) => {
    setExpandedRubrics((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const toggleAnswer = (index: number) => {
    setExpandedAnswers((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const toggleCriteria = (exIndex: number, critIndex: number) => {
    setGradingChecklist((prev) => {
      const currentEx = prev[exIndex] || {};
      return {
        ...prev,
        [exIndex]: {
          ...currentEx,
          [critIndex]: !currentEx[critIndex],
        },
      };
    });
  };

  const calculateStudentScore = (exIndex: number, rubric: Array<{ points: number }>) => {
    const checks = gradingChecklist[exIndex] || {};
    return rubric.reduce((sum, item, idx) => {
      return sum + (checks[idx] ? item.points : 0);
    }, 0);
  };

  const handleExportWorksheet = (includeSolutions: boolean) => {
    const md = exportExercisesWorksheet(currentProject, includeSolutions);
    const suffix = includeSolutions ? "TeacherGuide_Rubric" : "Student_Worksheet";
    const filename = `${currentProject.metadata.topic.replace(/[^a-zA-Z0-9_\u00C0-\u024F\u1E00-\u1EFF]/g, "_")}_${suffix}.md`;
    downloadFile(md, filename, "text/markdown;charset=utf-8");
  };

  return (
    <div className="space-y-6">
      {/* Action Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <FileCheck2 className="w-5 h-5 text-rose-600" />
            <h2 className="text-base font-bold text-slate-900">
              Exercises & Grading Rubrics (Bài Tập & Thang Điểm Đánh Giá)
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Bài tập tình huống, phân tích số liệu, dự án STEM kèm thang điểm rubric và đáp án mẫu chuẩn sư phạm
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Mode Switcher */}
          <button
            onClick={() => setIsStudentWorksheetMode(!isStudentWorksheetMode)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg border flex items-center gap-1.5 transition-colors ${
              isStudentWorksheetMode
                ? "bg-rose-50 text-rose-700 border-rose-300"
                : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200"
            }`}
            title="Ẩn lời giải để xuất phiếu bài tập cho học sinh làm"
          >
            {isStudentWorksheetMode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            <span>
              {isStudentWorksheetMode
                ? "Chế Độ Học Sinh (Ẩn Đáp Án)"
                : "Chế Độ Giáo Viên (Hiện Đầy Đủ)"}
            </span>
          </button>

          {/* Export Student Worksheet */}
          <button
            onClick={() => handleExportWorksheet(false)}
            className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 rounded-lg border border-slate-200 flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Phiếu Bài Tập Học Sinh</span>
          </button>

          {/* Export Teacher Guide */}
          <button
            onClick={() => handleExportWorksheet(true)}
            className="px-3 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg flex items-center gap-1.5 transition-colors"
          >
            <BookOpen className="w-4 h-4 text-rose-600" />
            <span>Hướng Dẫn Chấm & Rubric</span>
          </button>

          {/* Print */}
          <button
            onClick={() => window.print()}
            className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 rounded-lg border border-slate-200 flex items-center gap-1.5 transition-colors"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            <span>In Phiếu</span>
          </button>
        </div>
      </div>

      {/* Exercises List */}
      <div className="space-y-6">
        {exercises.map((ex, exIdx) => {
          const isRubricExpanded = !!expandedRubrics[exIdx];
          const isAnswerExpanded = !isStudentWorksheetMode && !!expandedAnswers[exIdx];
          const totalMaxPoints = ex.rubric.reduce((sum, r) => sum + r.points, 0);
          const currentCalculatedScore = calculateStudentScore(exIdx, ex.rubric);

          const typeBadge = {
            analysis: {
              label: "Phân Tích Số Liệu",
              color: "bg-blue-50 text-blue-700 border-blue-200",
            },
            case_study: {
              label: "Nghiên Cứu Tình Huống",
              color: "bg-purple-50 text-purple-700 border-purple-200",
            },
            project: {
              label: "Dự Án Vận Dụng / STEM",
              color: "bg-emerald-50 text-emerald-700 border-emerald-200",
            },
          }[ex.type] || {
            label: "Bài Tập Vận Dụng",
            color: "bg-slate-100 text-slate-700 border-slate-200",
          };

          return (
            <div
              key={exIdx}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:border-slate-300 transition-all space-y-5"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="w-6 h-6 rounded-md bg-rose-100 text-rose-800 font-bold text-xs flex items-center justify-center">
                      #{exIdx + 1}
                    </span>
                    <span
                      className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${typeBadge.color}`}
                    >
                      {typeBadge.label}
                    </span>
                    <span className="text-xs font-medium text-slate-500">
                      Tổng: {totalMaxPoints} điểm
                    </span>
                  </div>

                  <input
                    type="text"
                    value={ex.title}
                    onChange={(e) =>
                      updateExercise(exIdx, { title: e.target.value })
                    }
                    className="text-base sm:text-lg font-bold text-slate-900 w-full border-b border-transparent hover:border-slate-300 focus:border-rose-500 focus:outline-none py-0.5"
                    placeholder="Tiêu đề bài tập..."
                  />
                </div>

                {exercises.length > 1 && (
                  <button
                    onClick={() => {
                      if (confirm("Xóa bài tập này?")) deleteExercise(exIdx);
                    }}
                    className="text-slate-400 hover:text-rose-600 p-1.5 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Prompt Scenario */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Nội Dung Đề Bài & Tình Huống:
                </label>
                <textarea
                  rows={4}
                  value={ex.prompt}
                  onChange={(e) =>
                    updateExercise(exIdx, { prompt: e.target.value })
                  }
                  className="w-full text-xs sm:text-sm text-slate-800 bg-slate-50/70 border border-slate-200 rounded-xl p-3.5 focus:outline-none focus:border-rose-500 font-sans leading-relaxed"
                  placeholder="Mô tả tình huống thực tế hoặc câu hỏi bài tập..."
                />
              </div>

              {/* Expandable Rubric Section */}
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleRubric(exIdx)}
                  className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-left transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-rose-600" />
                    <span className="text-xs font-bold text-slate-800">
                      Thang Điểm Đánh Giá Chi Tiết (Rubric) — {ex.rubric.length} tiêu chí
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                      Điểm tính: {currentCalculatedScore} / {totalMaxPoints} đ
                    </span>
                    {isRubricExpanded ? (
                      <ChevronUp className="w-4 h-4 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                </button>

                {isRubricExpanded && (
                  <div className="p-4 bg-white space-y-3 animate-fade-in">
                    <div className="text-[11px] text-slate-500 flex items-center gap-1">
                      <Calculator className="w-3.5 h-3.5 text-slate-400" />
                      <span>
                        Giáo viên có thể tích chọn các tiêu chí học sinh đạt được để tự động cộng điểm:
                      </span>
                    </div>

                    <div className="space-y-2">
                      {ex.rubric.map((r, rIdx) => {
                        const isChecked = !!gradingChecklist[exIdx]?.[rIdx];
                        return (
                          <div
                            key={rIdx}
                            onClick={() => toggleCriteria(exIdx, rIdx)}
                            className={`p-3 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                              isChecked
                                ? "bg-rose-50/60 border-rose-400 ring-1 ring-rose-400/40"
                                : "bg-slate-50/50 border-slate-200 hover:bg-slate-50"
                            }`}
                          >
                            <div className="flex items-center gap-3 flex-1">
                              <div
                                className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${
                                  isChecked
                                    ? "bg-rose-600 text-white"
                                    : "border border-slate-300 bg-white"
                                }`}
                              >
                                {isChecked && <Check className="w-3.5 h-3.5" />}
                              </div>
                              <input
                                type="text"
                                value={r.criteria}
                                onClick={(e) => e.stopPropagation()}
                                onChange={(e) => {
                                  const newRubric = [...ex.rubric];
                                  newRubric[rIdx].criteria = e.target.value;
                                  updateExercise(exIdx, { rubric: newRubric });
                                }}
                                className="text-xs text-slate-800 bg-transparent w-full focus:outline-none font-medium"
                              />
                            </div>

                            <div className="flex items-center gap-1 shrink-0">
                              <input
                                type="number"
                                min="1"
                                max="100"
                                value={r.points}
                                onClick={(e) => e.stopPropagation()}
                                onChange={(e) => {
                                  const newRubric = [...ex.rubric];
                                  newRubric[rIdx].points = parseInt(e.target.value) || 0;
                                  updateExercise(exIdx, { rubric: newRubric });
                                }}
                                className="w-12 text-xs font-bold text-rose-700 text-center border border-slate-200 rounded py-0.5 focus:outline-none focus:border-rose-500"
                              />
                              <span className="text-xs font-semibold text-slate-600">
                                điểm
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Sample Answer Section (Hidden if student worksheet mode is active) */}
              {!isStudentWorksheetMode && (
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() => toggleAnswer(exIdx)}
                    className="w-full px-4 py-3 bg-emerald-50/50 hover:bg-emerald-50 flex items-center justify-between text-left transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-600" />
                      <span className="text-xs font-bold text-emerald-900">
                        Lời Giải Mẫu & Hướng Dẫn Sư Phạm (Solution Guide)
                      </span>
                    </div>

                    {isAnswerExpanded ? (
                      <ChevronUp className="w-4 h-4 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    )}
                  </button>

                  {isAnswerExpanded && (
                    <div className="p-4 bg-white animate-fade-in space-y-2">
                      <textarea
                        rows={6}
                        value={ex.sampleAnswer}
                        onChange={(e) =>
                          updateExercise(exIdx, { sampleAnswer: e.target.value })
                        }
                        className="w-full text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl p-3.5 focus:outline-none focus:border-emerald-500 font-sans leading-relaxed"
                        placeholder="Nội dung giải mẫu chi tiết..."
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {/* Add Exercise */}
        <button
          onClick={() => addExercise()}
          className="w-full py-3.5 border-2 border-dashed border-slate-300 hover:border-rose-400 hover:bg-rose-50/30 rounded-xl text-xs font-semibold text-slate-600 hover:text-rose-700 flex items-center justify-center gap-2 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm Bài Tập Vận Dụng Mới</span>
        </button>
      </div>
    </div>
  );
};
