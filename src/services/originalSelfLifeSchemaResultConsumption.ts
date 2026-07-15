import type { OriginalSelfLifeSchemaMapping } from "../types/originalSelfLifeSchema";
import type {
  OriginalSelfLifeSchemaEntryResult,
  OriginalSelfLifeSchemaEntryNotReadyReason,
} from "./originalSelfLifeSchemaEntry";

type OriginalSelfLifeSchemaEntryReady = Extract<
  OriginalSelfLifeSchemaEntryResult,
  { status: "READY" }
>;

type OriginalSelfLifeSchemaEntryNotReady = Extract<
  OriginalSelfLifeSchemaEntryResult,
  { status: "NOT_READY" }
>;

export type OriginalSelfLifeSchemaAvailable = Readonly<{
  status: "AVAILABLE";
  source: "original_self_life_schema_consumption";
  result: OriginalSelfLifeSchemaEntryReady;
  mapping: OriginalSelfLifeSchemaMapping;
}>;

export type OriginalSelfLifeSchemaUnavailable = Readonly<{
  status: "UNAVAILABLE";
  source: "original_self_life_schema_consumption";
  result: OriginalSelfLifeSchemaEntryNotReady;
  sourceBoundary: OriginalSelfLifeSchemaEntryNotReady["sourceBoundary"];
  reason: OriginalSelfLifeSchemaEntryNotReadyReason;
  sourceResult: OriginalSelfLifeSchemaEntryNotReady["sourceResult"];
}>;

export type OriginalSelfLifeSchemaConsumption =
  | OriginalSelfLifeSchemaAvailable
  | OriginalSelfLifeSchemaUnavailable;

export function consumeOriginalSelfLifeSchemaResult(
  result: OriginalSelfLifeSchemaEntryResult,
): OriginalSelfLifeSchemaConsumption {
  if (result.status !== "READY") {
    return Object.freeze({
      status: "UNAVAILABLE",
      source: "original_self_life_schema_consumption",
      result,
      sourceBoundary: result.sourceBoundary,
      reason: result.reason,
      sourceResult: result.sourceResult,
    });
  }

  return Object.freeze({
    status: "AVAILABLE",
    source: "original_self_life_schema_consumption",
    result,
    mapping: result.mapping,
  });
}
