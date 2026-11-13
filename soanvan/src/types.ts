export type SubjectType = 'eng' | 'van';

export type ViewMode = 'full' | 'student' | 'flashcard';

export type ToneKey = 'chi_em_35' | 'chi_em_912' | 'toi_anhchi' | 'phu_huynh';

export interface LevelOption {
  value: string;
  label: string;
}

export interface PresetTopic {
  label: string;
  topic: string;
  level: string;
}

export interface FlashcardItem {
  word: string;
  pos: string;
  meaning: string;
  exEn: string;
  exVi?: string;
}

export interface LessonData {
  title: string;
  studentCode: string;
  level: string;
  duration: string;
  toneLabel: string;
  openingSpeech: string;
  rawHtmlContent: string;
  flashcards: FlashcardItem[];
  chatDraft: string;
}
