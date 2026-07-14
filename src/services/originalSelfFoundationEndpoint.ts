import {
  resolveOriginalSelfFoundationFromSources,
  type OriginalSelfFoundationEntryInput,
} from "./originalSelfFoundationEntry";
import {
  consumeOriginalSelfFoundationResult,
  type OriginalSelfFoundationConsumption,
} from "./originalSelfFoundationResultConsumption";

export type { OriginalSelfFoundationConsumption } from "./originalSelfFoundationResultConsumption";

export type OriginalSelfFoundationEndpointInput = OriginalSelfFoundationEntryInput;

export function resolveOriginalSelfFoundationConsumption(
  input: OriginalSelfFoundationEndpointInput,
): OriginalSelfFoundationConsumption {
  return consumeOriginalSelfFoundationResult(resolveOriginalSelfFoundationFromSources(input));
}
