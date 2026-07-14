import {
  resolveOriginalSelfFoundation,
  type OriginalSelfFoundationResult,
} from "./originalSelfFoundationResolver";
import {
  adaptOriginalSelfFoundationSource,
  type OriginalSelfFoundationSourceInput,
} from "./originalSelfFoundationSourceAdapter";

export type OriginalSelfFoundationEntryInput = OriginalSelfFoundationSourceInput;

export function resolveOriginalSelfFoundationFromSources(
  input: OriginalSelfFoundationEntryInput,
): OriginalSelfFoundationResult {
  return resolveOriginalSelfFoundation(adaptOriginalSelfFoundationSource(input));
}
