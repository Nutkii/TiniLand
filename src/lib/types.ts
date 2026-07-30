export type SectionId =
  | "home"
  | "quiz"
  | "gallery"
  | "games"
  | "letters"
  | "jokes"
  | "fortune"
  | "achievements"
  | "compliments"
  | "music"
  | "finale";

export interface NavItem {
  id: SectionId;
  label: string;
  emoji: string;
}

export interface QuizOption {
  text: string;
  correct?: boolean;
  roast?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
}

export interface GalleryPhoto {
  id: string;
  emoji: string;
  gradient: string;
  caption: string;
  memory: string;
}

export interface LetterData {
  id: string;
  from: string;
  title: string;
  body: string[];
  color: string;
}

export interface JokeCard {
  id: string;
  front: string;
  back: string;
}

export interface AchievementData {
  id: string;
  title: string;
  description: string;
  icon: string;
  rarity: "common" | "rare" | "epic" | "legendary";
}
