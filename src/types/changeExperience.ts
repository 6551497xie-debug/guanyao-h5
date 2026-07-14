import type { PersonaTransmissionExperienceModel } from "./personaTransmission";

export type ChangeExperienceDimension = "body" | "emotion" | "thought" | "action" | "memory" | "motivation";

export type ChangeExperienceType =
  | "body_shift"
  | "emotion_shift"
  | "cognition_shift"
  | "behavior_shift"
  | "memory_shift"
  | "motivation_shift";

export type ChangeExperienceContext = Readonly<{
  pressureContext: string;
  currentSituation: string;
}>;

export type ChangeExperienceRecognition = Readonly<{
  oldReaction: string;
  protectionMeaning: string;
  rootProtection: string;
  manifestBehavior: string;
}>;

export type ChangeExperienceRevision = Readonly<{
  newResponse: string;
  transformationMoment: string;
  changeType: ChangeExperienceType;
}>;

export type ChangeExperienceMeaning = Readonly<{
  growthMeaning: string;
  crystalImprint: string;
}>;

export type ChangeExperienceUnit = Readonly<{
  dimension: ChangeExperienceDimension;
  context: ChangeExperienceContext;
  recognition: ChangeExperienceRecognition;
  revision: ChangeExperienceRevision;
  meaning: ChangeExperienceMeaning;
}>;

export type ChangeExperiencePresentationInput = Readonly<{
  personaExperience: PersonaTransmissionExperienceModel;
  changeExperience: ChangeExperienceUnit;
}>;

export type ChangeExperiencePresentationContext = Readonly<{
  pressureContext: string;
  currentSituation: string;
}>;

export type ChangeExperiencePresentationRecognition = Readonly<{
  firstResponseLabel: string;
  oldReaction: string;
  protectionMeaning: string;
}>;

export type ChangeExperiencePresentationRevision = Readonly<{
  newResponse: string;
  transformationMoment: string;
}>;

export type ChangeExperiencePresentationMeaning = Readonly<{
  growthMeaning: string;
  crystalImprint: string;
}>;

export type ChangeExperiencePresentationStarbeastVisual = Readonly<{
  beforeState?: string;
  afterState?: string;
  cueLine?: string;
}>;

export type ChangeExperiencePresentationTraceVisual = Readonly<{
  traceLine?: string;
  crystalLine?: string;
}>;

export type ChangeExperiencePresentationVisual = Readonly<{
  starbeast?: ChangeExperiencePresentationStarbeastVisual;
  trace?: ChangeExperiencePresentationTraceVisual;
}>;

export type ChangeExperiencePresentation = Readonly<{
  context: ChangeExperiencePresentationContext;
  recognition: ChangeExperiencePresentationRecognition;
  revision: ChangeExperiencePresentationRevision;
  meaning: ChangeExperiencePresentationMeaning;
  visual: ChangeExperiencePresentationVisual;
}>;
