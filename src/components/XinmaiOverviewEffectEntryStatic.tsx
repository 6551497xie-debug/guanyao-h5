import { useLayoutEffect, useRef } from "react";
import {
  drawXinmaiOverviewEffectEntryScene,
  XINMAI_OVERVIEW_EFFECT_ENTRY_SCENE_VERSION,
} from "../renderers/xinmaiOverviewEffectEntryScene";
import "../styles/xinmai-overview-effect-entry.css";

export function XinmaiOverviewEffectEntryStatic({
  engaged,
}: Readonly<{ engaged: boolean }>) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (canvas === null) return undefined;
    const context = canvas.getContext("2d");
    if (context === null) return undefined;
    const render = () => {
      const bounds = canvas.getBoundingClientRect();
      const dpr = Math.min(2, Math.max(1, window.devicePixelRatio || 1));
      canvas.width = Math.max(1, Math.round(bounds.width * dpr));
      canvas.height = Math.max(1, Math.round(bounds.height * dpr));
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.clearRect(0, 0, bounds.width, bounds.height);
      drawXinmaiOverviewEffectEntryScene(context, {
        width: bounds.width,
        height: bounds.height,
        seconds: 0,
        engagement: engaged ? 1 : 0,
        reducedMotion: true,
      });
    };
    render();
    const observer = new ResizeObserver(render);
    observer.observe(canvas);
    return () => observer.disconnect();
  }, [engaged]);

  return (
    <canvas
      ref={canvasRef}
      className="xinmai-overview-effect-entry-static"
      aria-hidden="true"
      data-overview-effect-entry-scene={XINMAI_OVERVIEW_EFFECT_ENTRY_SCENE_VERSION}
      data-overview-effect-subject-model="DUAL_SUBJECT_SINGLE_FACT_SOURCE"
      data-overview-effect-motion="STATIC_EQUIVALENT"
    />
  );
}

