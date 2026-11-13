import React, { useState } from "react";
import {
  Presentation,
  Video,
  HelpCircle,
  Layers,
  FileCheck2,
  Edit2,
  Check,
  Calendar,
  Users,
  Languages,
  Sparkles,
  MapPin,
  Compass,
} from "lucide-react";
import { useLessonStore } from "../store/useLessonStore";
import { ArtifactTab } from "../types/lesson";

export const LessonHeaderTabs: React.FC = () => {
  const { currentProject, activeTab, setActiveTab, updateMetadata } =
    useLessonStore();

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [topicInput, setTopicInput] = useState(currentProject.metadata.topic);

  const handleSaveTitle = () => {
    if (topicInput.trim()) {
      updateMetadata({ topic: topicInput.trim() });
    }
    setIsEditingTitle(false);
  };

  const totalScriptSeconds = currentProject.videoScript.reduce(
    (acc, item) => acc + (item.durationSeconds || 0),
    0
  );
  const minutes = Math.floor(totalScriptSeconds / 60);
  const seconds = totalScriptSeconds % 60;

  const tabs: Array<{
    id: ArtifactTab;
    label: string;
    sublabel: string;
    icon: React.ElementType;
    count: string | number;
    color: string;
  }> = [
    {
      id: "slides",
      label: "1. Slide Deck",
      sublabel: "Bài trình chiếu PPTX",
      icon: Presentation,
      count: `${currentProject.slides.length} slides`,
      color: "from-blue-600 to-indigo-600",
    },
    {
      id: "script",
      label: "2. Video Script",
      sublabel: "Teleprompter & Lời bình",
      icon: Video,
      count: `${minutes}m ${seconds}s`,
      color: "from-purple-600 to-pink-600",
    },
    {
      id: "quiz",
      label: "3. Trắc Nghiệm Quiz",
      sublabel: "Test tương tác & Quizizz",
      icon: HelpCircle,
      count: `${currentProject.quiz.length} câu`,
      color: "from-emerald-600 to-teal-600",
    },
    {
      id: "flashcards",
      label: "4. Flashcard Deck",
      sublabel: "Ghi nhớ Spaced Repetition",
      icon: Layers,
      count: `${currentProject.flashcards.length} thẻ`,
      color: "from-amber-600 to-orange-600",
    },
    {
      id: "exercises",
      label: "5. Bài Tập & Rubric",
      sublabel: "Tình huống & Thang chấm",
      icon: FileCheck2,
      count: `${currentProject.exercises.length} bài`,
      color: "from-rose-600 to-red-600",
    },
  ];

  return (
    <div className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        {/* Lesson Metadata Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4">
          <div className="space-y-1.5 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                <Compass className="w-3 h-3 text-emerald-600" />
                {currentProject.metadata.subject || "Địa Lý Châu Âu"}
              </span>

              {currentProject.metadata.region && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-50 text-teal-800 border border-teal-200">
                  <MapPin className="w-3 h-3 text-teal-600" />
                  {currentProject.metadata.region}
                </span>
              )}

              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                <Users className="w-3 h-3 text-slate-500" />
                {currentProject.metadata.gradeLevel}
              </span>

              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                <Languages className="w-3 h-3 text-slate-400" />
                {currentProject.metadata.language}
              </span>

              {currentProject.metadata.duration && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                  <Calendar className="w-3 h-3 text-slate-400" />
                  {currentProject.metadata.duration}
                </span>
              )}

              {currentProject.metadata.tone && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200">
                  <Sparkles className="w-3 h-3 text-amber-600" />
                  {currentProject.metadata.tone}
                </span>
              )}
            </div>

            {/* Editable Title */}
            <div className="flex items-center gap-2 group">
              {isEditingTitle ? (
                <div className="flex items-center gap-2 w-full max-w-2xl">
                  <input
                    type="text"
                    value={topicInput}
                    onChange={(e) => setTopicInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSaveTitle()}
                    className="text-xl sm:text-2xl font-bold text-slate-900 border-b-2 border-emerald-500 focus:outline-none w-full bg-slate-50 px-2 py-1 rounded"
                    autoFocus
                  />
                  <button
                    onClick={handleSaveTitle}
                    className="p-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"
                    title="Lưu tiêu đề"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                    {currentProject.metadata.topic}
                  </h1>
                  <button
                    onClick={() => {
                      setTopicInput(currentProject.metadata.topic);
                      setIsEditingTitle(true);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-slate-600 rounded transition-opacity"
                    title="Chỉnh sửa tiêu đề"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            <p className="text-xs text-slate-500">
              Đối tượng giảng dạy:{" "}
              <span className="text-slate-700 font-medium">
                {currentProject.metadata.targetAudience}
              </span>
            </p>
          </div>
        </div>

        {/* 5 Core Artifacts Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-2 border-t border-slate-100">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 border-b-2 text-left whitespace-nowrap transition-all rounded-t-lg ${
                  isActive
                    ? "border-emerald-600 bg-emerald-50/50 text-emerald-950 font-semibold"
                    : "border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                    isActive
                      ? "bg-emerald-600 text-white shadow-xs"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs sm:text-sm font-semibold">
                      {tab.label}
                    </span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                        isActive
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {tab.count}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 block font-normal">
                    {tab.sublabel}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
