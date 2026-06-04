export type YaoBit = 0 | 1;

export type ChronoAgeRange = "18_22" | "23_31" | "32_39" | "40_52" | "53_plus";

export type ChronoPrototypeCard = {
  trigramId: string;
  trigramSymbol: string;
  trigramName: string;
  archetypeName: string;
  timeRange: string;
  hourBranch: string;
  prototypeName: string;
  pressureWeights: string[];
  shortReading: string;
  shadowReading: string;
};

export type ChronoProfile = {
  birthYear: number;
  birthMonth: number;
  birthDay: number;
  birthDate: string;
  birthTimeRange?: string;
  birthHourBranch?: string;
  birthHourBranchLabel?: string;
  chronoHash?: string;
  ageRange: ChronoAgeRange;
  lifeStageLabel: string;
  pressureField: string[];
  sceneWeightTags: string[];
  chronoPrototypeCard?: ChronoPrototypeCard;
};

export type SceneSlice = {
  id: string;
  forceId: string;
  forceName: string;
  title: string;
  flashLine: string;
  fixedLines: string[];
  bodyReaction: string;
  behaviorInertia: string;
  gravityHook: string;
  tone: string;
  intensity: 1 | 2 | 3 | 4 | 5;
};

export interface GuanyaoSession {
  chronoProfile?: ChronoProfile | null;
  chronoHash?: string | null;
  chronoPrototypeCard?: ChronoPrototypeCard | null;
  selectedFragment?: any;
  selectedForceId?: string | null;
  selectedForceName?: string | null;
  forceProfile?: any;
  forceReading?: any;
  realitySeed?: any;
  selectedSceneSlice?: SceneSlice | null;
  selectedSceneId?: string | null;
  sceneText?: string;
  autoYaoPath: YaoBit[];
  interactiveYaoPath?: YaoBit[];
  sixthYaoChoice: YaoBit | null;
  finalChoiceCode: string;
  choiceHistory: YaoBit[];
}

export interface ConflictScript90d {
  act1: {
    title: string;
    lines: string[];
  };
  act2: {
    title: string;
    lines: string[];
  };
  act3: {
    title: string;
    lines: string[];
  };
}

export interface OriginGravityCoordinate {
  title: string;
  coordinate: string;
  primaryFactor: {
    forceKey: string;
    archetype: string;
    role: "体";
    lines: string[];
  };
  secondaryFactor: {
    forceKey: string;
    archetype: string;
    role: "用";
    lines: string[];
  };
  collapsePoint: string[];
}

export interface MigrationCard {
  choiceCode: string;
  currentTrack: {
    code: string;
    symbol: string;
    traditionalName: string;
    scriptTitle: string;
  };
  migrationDirection: {
    code: string;
    symbol: string;
    traditionalName: string;
    scriptTitle: string;
  };
  cardTitle: string;
  shortReading: string[];
  originGravityCoordinate?: OriginGravityCoordinate;
  conflictScript90d: ConflictScript90d;
  antiInstinctNode: string;
  status: "active";
}

export interface ArchiveItem extends MigrationCard {
  archiveId: string;
  createdAt: string;
  finalChoiceCode: string;
}
