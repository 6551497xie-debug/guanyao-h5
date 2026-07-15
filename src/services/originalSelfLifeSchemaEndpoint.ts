import {
  resolveOriginalSelfLifeSchemaFromSources,
  type OriginalSelfLifeSchemaEntryInput,
} from "./originalSelfLifeSchemaEntry";
import {
  consumeOriginalSelfLifeSchemaResult,
  type OriginalSelfLifeSchemaConsumption,
} from "./originalSelfLifeSchemaResultConsumption";

export type { OriginalSelfLifeSchemaConsumption } from "./originalSelfLifeSchemaResultConsumption";

export type OriginalSelfLifeSchemaEndpointInput = OriginalSelfLifeSchemaEntryInput;

export function resolveOriginalSelfLifeSchemaConsumption(
  input: OriginalSelfLifeSchemaEndpointInput,
): OriginalSelfLifeSchemaConsumption {
  return consumeOriginalSelfLifeSchemaResult(resolveOriginalSelfLifeSchemaFromSources(input));
}
