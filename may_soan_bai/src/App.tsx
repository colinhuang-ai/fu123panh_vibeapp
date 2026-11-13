import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { LessonHeaderTabs } from "./components/LessonHeaderTabs";
import { SlideDeckView } from "./components/artifacts/SlideDeckView";
import { VideoScriptView } from "./components/artifacts/VideoScriptView";
import { QuizView } from "./components/artifacts/QuizView";
import { FlashcardsView } from "./components/artifacts/FlashcardsView";
import { ExercisesView } from "./components/artifacts/ExercisesView";
import { NewLessonModal } from "./components/modals/NewLessonModal";
import { SettingsModal } from "./components/modals/SettingsModal";
import { GeographySessionManagerModal } from "./components/modals/GeographySessionManagerModal";
import { useLessonStore } from "./store/useLessonStore";

export function App() {
  const { activeTab } = useLessonStore();
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isSessionManagerOpen, setIsSessionManagerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-emerald-500 selection:text-white">
      {/* Top Application Navbar */}
      <Navbar
        onOpenNewModal={() => setIsNewModalOpen(true)}
        onOpenSettingsModal={() => setIsSettingsModalOpen(true)}
        onOpenSessionManager={() => setIsSessionManagerOpen(true)}
      />

      {/* Lesson Metadata Header & Tab Switcher */}
      <LessonHeaderTabs />

      {/* Main Unified Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
        {activeTab === "slides" && <SlideDeckView />}
        {activeTab === "script" && <VideoScriptView />}
        {activeTab === "quiz" && <QuizView />}
        {activeTab === "flashcards" && <FlashcardsView />}
        {activeTab === "exercises" && <ExercisesView />}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px]">
              LF
            </div>
            <span className="font-semibold text-slate-700">
              LessonForge — Máy Soạn Bài Giảng Địa Lý Châu Âu Toàn Diện (5-in-1 Studio)
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span>Quản lý Session Địa lý</span>
            <span>•</span>
            <span>Cấu hình System Prompt Địa lý</span>
            <span>•</span>
            <span>Xuất PPTX / Anki / Quizizz</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <GeographySessionManagerModal
        isOpen={isSessionManagerOpen}
        onClose={() => setIsSessionManagerOpen(false)}
        onOpenNewLessonModal={() => setIsNewModalOpen(true)}
      />

      <NewLessonModal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
        onOpenSettings={() => {
          setIsNewModalOpen(false);
          setIsSettingsModalOpen(true);
        }}
      />

      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
      />
    </div>
  );
}

export default App;
