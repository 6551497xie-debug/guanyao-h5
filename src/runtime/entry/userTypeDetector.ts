export type EntryContext = {
  hasBaseline: boolean;
  userId?: string;
  timestamp?: number;
};

export type UserType = "NEW_USER" | "OLD_USER";

/**
 * Used by ENTRY -> /dynamics route decisions.
 */
export function detectUserType(context: EntryContext): UserType {
  if (context.hasBaseline) return "OLD_USER";
  return "NEW_USER";
}
