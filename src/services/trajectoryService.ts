import type { GuanyaoSession, YaoBit } from "../types";
import { getSession, resetSession, updateSession } from "./sessionService";

const defaultAutoYaoPath: YaoBit[] = [1, 0, 1, 1, 0];

function isYaoBit(value: unknown): value is YaoBit {
  return value === 0 || value === 1;
}

export function normalizeAutoYaoPath(path: unknown): YaoBit[] {
  if (!Array.isArray(path)) {
    return [];
  }

  return path.filter(isYaoBit).slice(0, 5);
}

export function normalizeInteractiveYaoPath(path: unknown): YaoBit[] {
  if (!Array.isArray(path)) {
    return [];
  }

  return path.filter(isYaoBit).slice(0, 5);
}

export function generateMockAutoYaoPath(context?: Partial<GuanyaoSession>): YaoBit[] {
  const title = String(context?.realitySeed?.title ?? "");

  if (title.includes("车里没发动")) {
    return [1, 0, 1, 1, 0];
  }

  if (title.includes("阳台算账")) {
    return [0, 1, 1, 0, 1];
  }

  if (title.includes("对话框前")) {
    return [0, 0, 1, 1, 0];
  }

  return [...defaultAutoYaoPath];
}

export function setAutoYaoPath(path: unknown): YaoBit[] {
  const normalizedPath = normalizeAutoYaoPath(path);
  const nextPath = normalizedPath.length >= 5 ? normalizedPath : [...defaultAutoYaoPath];
  updateSession({ autoYaoPath: nextPath });
  return nextPath;
}

export function getAutoYaoPath(): YaoBit[] {
  return normalizeAutoYaoPath(getSession().autoYaoPath);
}

export function getInteractiveYaoPath(): YaoBit[] {
  return normalizeInteractiveYaoPath(getSession().interactiveYaoPath);
}

export function appendInteractiveYaoChoice(bit: unknown): YaoBit[] {
  const nextBit: YaoBit = isYaoBit(bit) ? bit : 0;
  const currentPath = getInteractiveYaoPath();
  const nextPath = [...currentPath, nextBit].slice(0, 5);

  updateSession({ interactiveYaoPath: nextPath });

  return nextPath;
}

export function resetInteractiveYaoPath(): YaoBit[] {
  updateSession({
    interactiveYaoPath: [],
    sixthYaoChoice: null,
    finalChoiceCode: "",
    choiceHistory: [],
  });

  return [];
}

export function setSixthYaoChoice(choice: unknown): YaoBit {
  const nextChoice: YaoBit = isYaoBit(choice) ? choice : 0;
  updateSession({ sixthYaoChoice: nextChoice });
  return nextChoice;
}

export function getSixthYaoChoice(): YaoBit | null {
  const choice = getSession().sixthYaoChoice;
  return isYaoBit(choice) ? choice : null;
}

export function buildFinalChoiceCode(): string {
  const session = getSession();
  const interactiveYaoPath = normalizeInteractiveYaoPath(session.interactiveYaoPath);
  const normalizedPath = normalizeAutoYaoPath(session.autoYaoPath);
  const autoYaoPath = normalizedPath.length >= 5 ? normalizedPath : [...defaultAutoYaoPath];
  const fiveYaoPath = interactiveYaoPath.length >= 5 ? interactiveYaoPath : autoYaoPath;
  const sixthYaoChoice = isYaoBit(session.sixthYaoChoice) ? session.sixthYaoChoice : 0;
  const choiceHistory = [...fiveYaoPath, sixthYaoChoice];
  const finalChoiceCode = choiceHistory.join("");

  updateSession({
    autoYaoPath,
    interactiveYaoPath,
    sixthYaoChoice,
    finalChoiceCode,
    choiceHistory,
  });

  return finalChoiceCode;
}

export function resetTrajectory(): void {
  resetSession();
}
