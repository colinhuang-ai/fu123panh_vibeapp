export interface SlideItem {
  slideNumber: number;
  title: string;
  bullets: string[];
  visualPrompt: string; // Image prompt suggestion
  speakerNotes: string;
}

export interface VideoScriptItem {
  timestamp: string;
  visualCue: string;
  voiceover: string;
  durationSeconds: number;
}

export interface QuizItem {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface FlashcardItem {
  id: number;
  front: string;
  back: string;
  mnemonicCue: string;
}

export interface ExerciseRubricItem {
  criteria: string;
  points: number;
}

export interface ExerciseItem {
  id: number;
  title: string;
  type: "analysis" | "case_study" | "project";
  prompt: string;
  rubric: ExerciseRubricItem[];
  sampleAnswer: string;
}

export interface LessonProject {
  id: string;
  metadata: {
    topic: string;
    gradeLevel: string;
    targetAudience: string;
    language: string;
    createdAt: string;
    tone?: string;
    duration?: string;
    subject?: string;
    region?: string;
  };
  slides: SlideItem[];
  videoScript: VideoScriptItem[];
  quiz: QuizItem[];
  flashcards: FlashcardItem[];
  exercises: ExerciseItem[];
}

export type ArtifactTab = "slides" | "script" | "quiz" | "flashcards" | "exercises";

export interface ApiConfig {
  provider: "gemini" | "openai-compatible";
  geminiKey: string;
  customKey: string;
  customBaseUrl: string;
  model: string;
  customSystemPrompt?: string;
  activePromptTemplate?: string;
}

export interface GenerationPromptParams {
  topic: string;
  gradeLevel: string;
  targetAudience: string;
  language: string;
  tone?: string;
  duration?: string;
  additionalNotes?: string;
  customSystemPrompt?: string;
}
