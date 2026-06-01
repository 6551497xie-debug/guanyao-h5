export type YaoValue = "0" | "1";

export type SixthYaoChoice = YaoValue;

export type FlowStep = {
  code: string;
  key: string;
  path: string;
  title: string;
};

export type ChoiceHistoryItem = {
  yaoIndex: number;
  value: YaoValue;
  source: "auto" | "manual";
};

export type GuanyaoSession = {
  id: string;
  autoYaoPath: YaoValue[];
  sixthYaoChoice: SixthYaoChoice | null;
  finalChoiceCode: string | null;
  choiceHistory: ChoiceHistoryItem[];
  createdAt: string;
};
