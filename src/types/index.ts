export type YaoBit = 0 | 1;

export interface GuanyaoSession {
  selectedFragment?: any;
  forceProfile?: any;
  forceReading?: any;
  realitySeed?: any;
  sceneText?: string;
  autoYaoPath: YaoBit[];
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
