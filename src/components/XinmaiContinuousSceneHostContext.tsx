import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react";
import type { XinmaiContinuousSceneRuntimeFactory } from "../renderers/xinmaiContinuousSceneRendererAdapter";
import type {
  XinmaiContinuousSceneInput,
  XinmaiContinuousSceneOutcome,
  XinmaiContinuousScenePresenterCommitProof,
} from "../types/xinmaiContinuousScenePresentation";

export type XinmaiContinuousSceneRegistration = Readonly<{
  registrationReferenceId: string;
  priority: number;
  input: XinmaiContinuousSceneInput;
  runtimeFactory: XinmaiContinuousSceneRuntimeFactory | null;
  staticSurface: ReactNode | null;
  canvasClassName?: string;
  canvasStyle?: CSSProperties;
  canvasAttributes?: Readonly<Record<string, string | number>>;
  pointerInteraction: "NONE" | "HOST_CANVAS";
  onOutcome?: (outcome: XinmaiContinuousSceneOutcome) => void;
}>;

export type XinmaiContinuousSceneStaticCommitPort = Readonly<{
  registrationReferenceId: string;
  acceptProof: (proof: XinmaiContinuousScenePresenterCommitProof) => void;
}>;

export type XinmaiContinuousSceneHostContextValue = Readonly<{
  registerPresentation: (
    registration: XinmaiContinuousSceneRegistration,
  ) => () => void;
  currentOutcome: XinmaiContinuousSceneOutcome | null;
}>;

export const XinmaiContinuousSceneHostContext =
  createContext<XinmaiContinuousSceneHostContextValue | null>(null);

export function useXinmaiContinuousSceneHost():
  XinmaiContinuousSceneHostContextValue {
  const value = useContext(XinmaiContinuousSceneHostContext);
  if (value === null) {
    throw new Error(
      "XinmaiContinuousSceneHost must be mounted at the production AppShell boundary.",
    );
  }
  return value;
}

export function useXinmaiContinuousScenePresentation(
  registration: XinmaiContinuousSceneRegistration | null,
): XinmaiContinuousSceneOutcome | null {
  const host = useXinmaiContinuousSceneHost();
  const registerPresentation = host.registerPresentation;
  const registrationRef = useRef(registration);
  registrationRef.current = registration;

  useEffect(() => {
    if (registration === null) return undefined;
    return registerPresentation(registration);
  }, [registerPresentation, registration]);

  if (
    registration === null ||
    host.currentOutcome?.consumerSurface !==
      registration.input.consumerSurface
  ) {
    return null;
  }
  return host.currentOutcome;
}

export function useXinmaiContinuousSceneOutcomeListener(
  listener: ((outcome: XinmaiContinuousSceneOutcome) => void) | undefined,
): (outcome: XinmaiContinuousSceneOutcome) => void {
  const listenerRef = useRef(listener);
  listenerRef.current = listener;
  return useCallback((outcome: XinmaiContinuousSceneOutcome) => {
    listenerRef.current?.(outcome);
  }, []);
}
