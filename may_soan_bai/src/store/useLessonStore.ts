import { create } from "zustand";
import { SAMPLE_PRESETS } from "../data/presets";
import { generateLessonWithAI, DEFAULT_EUROPE_GEOGRAPHY_SYSTEM_PROMPT } from "../services/aiService";
import {
  ApiConfig,
  ArtifactTab,
  ExerciseItem,
  FlashcardItem,
  GenerationPromptParams,
  LessonProject,
  QuizItem,
  SlideItem,
  VideoScriptItem,
} from "../types/lesson";

const STORAGE_KEY_CONFIG = "lessonforge_api_config";
const STORAGE_KEY_SAVED = "lessonforge_geo_saved_projects";
const STORAGE_KEY_CURRENT = "lessonforge_geo_current_project";

function loadInitialConfig(): ApiConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CONFIG);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn("Could not load API config:", e);
  }
  return {
    provider: "gemini",
    geminiKey: "",
    customKey: "",
    customBaseUrl: "https://api.openai.com/v1",
    model: "gemini-2.5-flash",
    activePromptTemplate: "europe_geography",
    customSystemPrompt: DEFAULT_EUROPE_GEOGRAPHY_SYSTEM_PROMPT,
  };
}

function loadInitialProjects(): LessonProject[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SAVED);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.warn("Could not load saved projects:", e);
  }
  return [...SAMPLE_PRESETS];
}

function loadInitialCurrent(): LessonProject {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CURRENT);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.metadata) return parsed;
    }
  } catch (e) {
    console.warn("Could not load current project:", e);
  }
  return SAMPLE_PRESETS[0];
}

interface LessonStore {
  // State
  currentProject: LessonProject;
  activeTab: ArtifactTab;
  savedProjects: LessonProject[];
  apiConfig: ApiConfig;
  isGenerating: boolean;
  generationStatus: string;
  generationError: string | null;

  // Session & Project Management
  setActiveTab: (tab: ArtifactTab) => void;
  setCurrentProject: (project: LessonProject) => void;
  loadPreset: (presetId: string) => void;
  saveCurrentProject: () => void;
  deleteSavedProject: (id: string) => void;
  duplicateProject: (id: string) => void;
  createBlankGeographyProject: (topicTitle?: string) => void;
  updateApiConfig: (config: Partial<ApiConfig>) => void;

  // AI Generation
  generateProject: (params: GenerationPromptParams) => Promise<void>;

  // Slide Actions
  updateSlide: (index: number, slide: Partial<SlideItem>) => void;
  addSlide: (slide?: Partial<SlideItem>) => void;
  deleteSlide: (index: number) => void;

  // Script Actions
  updateScriptItem: (index: number, item: Partial<VideoScriptItem>) => void;
  addScriptItem: (item?: Partial<VideoScriptItem>) => void;
  deleteScriptItem: (index: number) => void;

  // Quiz Actions
  updateQuizItem: (index: number, item: Partial<QuizItem>) => void;
  addQuizItem: (item?: Partial<QuizItem>) => void;
  deleteQuizItem: (index: number) => void;

  // Flashcard Actions
  updateFlashcard: (index: number, card: Partial<FlashcardItem>) => void;
  addFlashcard: (card?: Partial<FlashcardItem>) => void;
  deleteFlashcard: (index: number) => void;

  // Exercise Actions
  updateExercise: (index: number, exercise: Partial<ExerciseItem>) => void;
  addExercise: (exercise?: Partial<ExerciseItem>) => void;
  deleteExercise: (index: number) => void;

  // Metadata Action
  updateMetadata: (meta: Partial<LessonProject["metadata"]>) => void;
}

export const useLessonStore = create<LessonStore>((set, get) => ({
  currentProject: loadInitialCurrent(),
  activeTab: "slides",
  savedProjects: loadInitialProjects(),
  apiConfig: loadInitialConfig(),
  isGenerating: false,
  generationStatus: "",
  generationError: null,

  setActiveTab: (tab) => set({ activeTab: tab }),

  setCurrentProject: (project) => {
    set({ currentProject: project });
    try {
      localStorage.setItem(STORAGE_KEY_CURRENT, JSON.stringify(project));
      // Auto-update in saved list if already exists
      const { savedProjects } = get();
      const existingIdx = savedProjects.findIndex((p) => p.id === project.id);
      if (existingIdx >= 0) {
        const updated = [...savedProjects];
        updated[existingIdx] = project;
        set({ savedProjects: updated });
        localStorage.setItem(STORAGE_KEY_SAVED, JSON.stringify(updated));
      }
    } catch (e) {
      console.warn("Storage write error", e);
    }
  },

  loadPreset: (presetId) => {
    const found =
      get().savedProjects.find((p) => p.id === presetId) ||
      SAMPLE_PRESETS.find((p) => p.id === presetId);
    if (found) {
      get().setCurrentProject(JSON.parse(JSON.stringify(found)));
    }
  },

  saveCurrentProject: () => {
    const { currentProject, savedProjects } = get();
    const existingIndex = savedProjects.findIndex((p) => p.id === currentProject.id);
    let updated: LessonProject[];
    if (existingIndex >= 0) {
      updated = [...savedProjects];
      updated[existingIndex] = currentProject;
    } else {
      updated = [currentProject, ...savedProjects];
    }
    set({ savedProjects: updated });
    localStorage.setItem(STORAGE_KEY_SAVED, JSON.stringify(updated));
    localStorage.setItem(STORAGE_KEY_CURRENT, JSON.stringify(currentProject));
  },

  deleteSavedProject: (id) => {
    const { savedProjects, currentProject } = get();
    const updated = savedProjects.filter((p) => p.id !== id);
    set({ savedProjects: updated });
    localStorage.setItem(STORAGE_KEY_SAVED, JSON.stringify(updated));

    // If the deleted project was the currently active one, switch to the first available project
    if (currentProject.id === id) {
      const fallback = updated[0] || SAMPLE_PRESETS[0];
      get().setCurrentProject(fallback);
    }
  },

  duplicateProject: (id) => {
    const { savedProjects } = get();
    const target = savedProjects.find((p) => p.id === id);
    if (!target) return;

    const cloned: LessonProject = JSON.parse(JSON.stringify(target));
    cloned.id = `geo-session-${Date.now()}`;
    cloned.metadata.topic = `${target.metadata.topic} (Bản sao)`;
    cloned.metadata.createdAt = new Date().toISOString();

    const updated = [cloned, ...savedProjects];
    set({ savedProjects: updated });
    localStorage.setItem(STORAGE_KEY_SAVED, JSON.stringify(updated));
    get().setCurrentProject(cloned);
  },

  createBlankGeographyProject: (topicTitle) => {
    const newProj: LessonProject = {
      id: `geo-session-${Date.now()}`,
      metadata: {
        topic: topicTitle || "Chủ đề Địa lý Châu Âu mới",
        gradeLevel: "Lớp 8 - 11",
        targetAudience: "Học sinh phổ thông",
        language: "Tiếng Việt",
        createdAt: new Date().toISOString(),
        tone: "Trực quan, phân tích nhân quả & Khoa học địa lý ứng dụng",
        duration: "45 phút",
        subject: "Địa Lý Châu Âu",
        region: "Châu Âu",
      },
      slides: [
        {
          slideNumber: 1,
          title: "Tổng quan & Vị trí Địa lý",
          bullets: [
            "Đặc điểm vị trí địa lý và phạm vi lãnh thổ",
            "Đặc điểm địa hình và sự phân hóa cảnh quan",
            "Khí hậu và các dòng hải lưu chi phối"
          ],
          visualPrompt: "Bản đồ vệ tinh 3D thể hiện khu vực địa lý...",
          speakerNotes: "Lời dẫn nhập của giáo viên..."
        }
      ],
      videoScript: [
        {
          timestamp: "00:00 - 00:30",
          visualCue: "Hình ảnh bay lướt trên bản đồ địa hình 3D...",
          voiceover: "Chào mừng các bạn đến với bài học địa lý hôm nay...",
          durationSeconds: 30
        }
      ],
      quiz: [
        {
          id: 1,
          question: "Đặc điểm địa lý nổi bật của khu vực này là gì?",
          options: ["Lựa chọn A", "Lựa chọn B", "Lựa chọn C", "Lựa chọn D"],
          correctIndex: 0,
          explanation: "Giải thích cơ sở khoa học địa lý..."
        }
      ],
      flashcards: [
        {
          id: 1,
          front: "Khái niệm địa lý chính?",
          back: "Định nghĩa và ý nghĩa kinh tế - sinh thái.",
          mnemonicCue: "Mẹo nhớ kiến thức này."
        }
      ],
      exercises: [
        {
          id: 1,
          title: "Bài tập phân tích số liệu địa lý",
          type: "analysis",
          prompt: "Đề bài phân tích nhiệt độ, lượng mưa hoặc tài nguyên...",
          rubric: [
            { criteria: "Tiêu chí 1: Nhận diện chính xác quy luật", points: 50 },
            { criteria: "Tiêu chí 2: Giải thích nguyên nhân nhân quả", points: 50 }
          ],
          sampleAnswer: "Hướng dẫn giải chi tiết..."
        }
      ]
    };

    const updated = [newProj, ...get().savedProjects];
    set({ savedProjects: updated });
    localStorage.setItem(STORAGE_KEY_SAVED, JSON.stringify(updated));
    get().setCurrentProject(newProj);
  },

  updateApiConfig: (configUpdate) => {
    const updated = { ...get().apiConfig, ...configUpdate };
    set({ apiConfig: updated });
    localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(updated));
  },

  generateProject: async (params) => {
    set({
      isGenerating: true,
      generationStatus: "Đang phân tích cấu trúc địa lý bài giảng...",
      generationError: null,
    });

    try {
      const project = await generateLessonWithAI(
        params,
        get().apiConfig,
        (status) => set({ generationStatus: status })
      );

      set({
        currentProject: project,
        isGenerating: false,
        generationStatus: "Hoàn tất tạo bài giảng Địa lý!",
      });

      get().saveCurrentProject();
    } catch (err: any) {
      set({
        isGenerating: false,
        generationError: err.message || "Đã xảy ra lỗi khi tạo bài giảng.",
      });
      throw err;
    }
  },

  updateSlide: (index, updatedFields) => {
    const { currentProject } = get();
    const updatedSlides = [...currentProject.slides];
    if (updatedSlides[index]) {
      updatedSlides[index] = { ...updatedSlides[index], ...updatedFields };
      get().setCurrentProject({ ...currentProject, slides: updatedSlides });
    }
  },

  addSlide: (custom) => {
    const { currentProject } = get();
    const nextNum = currentProject.slides.length + 1;
    const newSlide: SlideItem = {
      slideNumber: nextNum,
      title: custom?.title || `Slide ${nextNum}: Tiêu đề địa lý mới`,
      bullets: custom?.bullets || ["Đặc điểm địa hình", "Quy luật khí hậu", "Thực vật & Cảnh quan"],
      visualPrompt: custom?.visualPrompt || "Bản đồ vệ tinh hoặc hình ảnh địa hình minh họa.",
      speakerNotes: custom?.speakerNotes || "Ghi chú dành cho giáo viên giải thích mối liên hệ nhân - quả.",
    };
    get().setCurrentProject({ ...currentProject, slides: [...currentProject.slides, newSlide] });
  },

  deleteSlide: (index) => {
    const { currentProject } = get();
    const filtered = currentProject.slides
      .filter((_, i) => i !== index)
      .map((s, idx) => ({ ...s, slideNumber: idx + 1 }));
    get().setCurrentProject({ ...currentProject, slides: filtered });
  },

  updateScriptItem: (index, updatedFields) => {
    const { currentProject } = get();
    const list = [...currentProject.videoScript];
    if (list[index]) {
      list[index] = { ...list[index], ...updatedFields };
      get().setCurrentProject({ ...currentProject, videoScript: list });
    }
  },

  addScriptItem: (custom) => {
    const { currentProject } = get();
    const nextIndex = currentProject.videoScript.length + 1;
    const newItem: VideoScriptItem = {
      timestamp: custom?.timestamp || `0${nextIndex}:00 - 0${nextIndex}:30`,
      visualCue: custom?.visualCue || "Cảnh quay flycam địa hình...",
      voiceover: custom?.voiceover || "Lời bình giảng viên thuyết minh...",
      durationSeconds: custom?.durationSeconds || 30,
    };
    get().setCurrentProject({ ...currentProject, videoScript: [...currentProject.videoScript, newItem] });
  },

  deleteScriptItem: (index) => {
    const { currentProject } = get();
    const filtered = currentProject.videoScript.filter((_, i) => i !== index);
    get().setCurrentProject({ ...currentProject, videoScript: filtered });
  },

  updateQuizItem: (index, updatedFields) => {
    const { currentProject } = get();
    const list = [...currentProject.quiz];
    if (list[index]) {
      list[index] = { ...list[index], ...updatedFields };
      get().setCurrentProject({ ...currentProject, quiz: list });
    }
  },

  addQuizItem: (custom) => {
    const { currentProject } = get();
    const nextId = currentProject.quiz.length + 1;
    const newItem: QuizItem = {
      id: nextId,
      question: custom?.question || "Câu hỏi trắc nghiệm địa lý mới?",
      options: custom?.options || ["Lựa chọn A", "Lựa chọn B", "Lựa chọn C", "Lựa chọn D"],
      correctIndex: custom?.correctIndex ?? 0,
      explanation: custom?.explanation || "Giải thích cơ sở khoa học địa lý...",
    };
    get().setCurrentProject({ ...currentProject, quiz: [...currentProject.quiz, newItem] });
  },

  deleteQuizItem: (index) => {
    const { currentProject } = get();
    const filtered = currentProject.quiz
      .filter((_, i) => i !== index)
      .map((q, idx) => ({ ...q, id: idx + 1 }));
    get().setCurrentProject({ ...currentProject, quiz: filtered });
  },

  updateFlashcard: (index, updatedFields) => {
    const { currentProject } = get();
    const list = [...currentProject.flashcards];
    if (list[index]) {
      list[index] = { ...list[index], ...updatedFields };
      get().setCurrentProject({ ...currentProject, flashcards: list });
    }
  },

  addFlashcard: (custom) => {
    const { currentProject } = get();
    const nextId = currentProject.flashcards.length + 1;
    const newItem: FlashcardItem = {
      id: nextId,
      front: custom?.front || "Khái niệm hoặc hiện tượng địa lý?",
      back: custom?.back || "Định nghĩa, nguyên nhân hình thành và vị trí phân bố.",
      mnemonicCue: custom?.mnemonicCue || "Gợi ý mẹo nhớ liên tưởng hình ảnh.",
    };
    get().setCurrentProject({ ...currentProject, flashcards: [...currentProject.flashcards, newItem] });
  },

  deleteFlashcard: (index) => {
    const { currentProject } = get();
    const filtered = currentProject.flashcards
      .filter((_, i) => i !== index)
      .map((c, idx) => ({ ...c, id: idx + 1 }));
    get().setCurrentProject({ ...currentProject, flashcards: filtered });
  },

  updateExercise: (index, updatedFields) => {
    const { currentProject } = get();
    const list = [...currentProject.exercises];
    if (list[index]) {
      list[index] = { ...list[index], ...updatedFields };
      get().setCurrentProject({ ...currentProject, exercises: list });
    }
  },

  addExercise: (custom) => {
    const { currentProject } = get();
    const nextId = currentProject.exercises.length + 1;
    const newItem: ExerciseItem = {
      id: nextId,
      title: custom?.title || "Bài tập tình huống địa lý mới",
      type: custom?.type || "analysis",
      prompt: custom?.prompt || "Mô tả số liệu hoặc tình huống địa lý thực tế...",
      rubric: custom?.rubric || [
        { criteria: "Tiêu chí 1: Phân tích đúng số liệu", points: 50 },
        { criteria: "Tiêu chí 2: Đề xuất giải pháp thích ứng", points: 50 },
      ],
      sampleAnswer: custom?.sampleAnswer || "Hướng dẫn giải chi tiết...",
    };
    get().setCurrentProject({ ...currentProject, exercises: [...currentProject.exercises, newItem] });
  },

  deleteExercise: (index) => {
    const { currentProject } = get();
    const filtered = currentProject.exercises
      .filter((_, i) => i !== index)
      .map((e, idx) => ({ ...e, id: idx + 1 }));
    get().setCurrentProject({ ...currentProject, exercises: filtered });
  },

  updateMetadata: (metaUpdate) => {
    const { currentProject } = get();
    get().setCurrentProject({
      ...currentProject,
      metadata: { ...currentProject.metadata, ...metaUpdate },
    });
  },
}));
