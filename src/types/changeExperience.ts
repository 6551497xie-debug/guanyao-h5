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
