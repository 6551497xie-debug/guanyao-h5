export const REALITY_EXPLICIT_LEAVE_NAVIGATION_TARGET =
  "/launch-lab" as const;

export type RealityExplicitLeaveNavigationDeliveryTicket = Readonly<{
  deliveryReferenceId: string;
  intentReferenceId: string;
  encounterCycleId: string;
  sourceReferenceId: string;
  starBeastIdentityReferenceId: string;
  mansionCoordinateReferenceId: string;
  terminalReason: "EXPLICIT_LEAVE";
  targetRoute: typeof REALITY_EXPLICIT_LEAVE_NAVIGATION_TARGET;
  terminationConfirmedAt: string;
  deliveryAttempt: number;
}>;

export type ReturningLifeWorldDeliveryOutcome =
  | Readonly<{
      status: "LIFE_WORLD_DELIVERED";
      deliveryReferenceId: string;
      deliveryAttempt: number;
      targetRoute: typeof REALITY_EXPLICIT_LEAVE_NAVIGATION_TARGET;
      sourceReferenceId: string;
      starBeastIdentityReferenceId: string;
      mansionCoordinateReferenceId: string;
      presentedAt: string;
      authority: "RETURNING_LIFE_WORLD_POST_COMMIT";
    }>
  | Readonly<{
      status: "LIFE_WORLD_DELIVERY_REJECTED";
      deliveryReferenceId: string;
      deliveryAttempt: number;
      reason:
        | "DELIVERY_REFERENCE_MISMATCH"
        | "ROUTE_TARGET_MISMATCH"
        | "SOURCE_REFERENCE_MISMATCH"
        | "STARBEAST_IDENTITY_MISMATCH"
        | "MANSION_COORDINATE_MISMATCH";
    }>
  | Readonly<{
      status: "LIFE_WORLD_DELIVERY_UNAVAILABLE";
      deliveryReferenceId: string;
      deliveryAttempt: number;
      reason:
        | "RETURNING_IDENTITY_UNAVAILABLE"
        | "RETURNING_VISUAL_CONTINUITY_UNAVAILABLE"
        | "RETURNING_LIFE_SURFACE_NOT_COMMITTED";
    }>;

export type RealityExplicitLeaveNavigationRetryableReason =
  | "NAVIGATION_INVOCATION_FAILED"
  | "NAVIGATION_OUTCOME_WATCHDOG_EXPIRED"
  | Extract<
      ReturningLifeWorldDeliveryOutcome,
      {
        status:
          | "LIFE_WORLD_DELIVERY_REJECTED"
          | "LIFE_WORLD_DELIVERY_UNAVAILABLE";
      }
    >["reason"];

export type RealityExplicitLeaveNavigationDeliveryState =
  | Readonly<{
      status: "IDLE";
      ticket: null;
      reason: null;
    }>
  | Readonly<{
      status: "TERMINATION_CONFIRMED_NAVIGATION_PENDING";
      ticket: RealityExplicitLeaveNavigationDeliveryTicket;
      reason: null;
    }>
  | Readonly<{
      status: "NAVIGATION_REQUESTED";
      ticket: RealityExplicitLeaveNavigationDeliveryTicket;
      requestedAt: string;
      reason: null;
    }>
  | Readonly<{
      status: "NAVIGATION_RETRYABLE";
      ticket: RealityExplicitLeaveNavigationDeliveryTicket;
      reason: RealityExplicitLeaveNavigationRetryableReason;
    }>
  | Readonly<{
      status: "LIFE_WORLD_DELIVERED";
      ticket: RealityExplicitLeaveNavigationDeliveryTicket;
      outcome: Extract<
        ReturningLifeWorldDeliveryOutcome,
        { status: "LIFE_WORLD_DELIVERED" }
      >;
      reason: null;
    }>;

export type RealityExplicitLeaveNavigationOutcomeConsumption =
  | Readonly<{
      status: "CONSUMED";
      state: RealityExplicitLeaveNavigationDeliveryState;
    }>
  | Readonly<{
      status: "STALE_OUTCOME_REJECTED";
      state: RealityExplicitLeaveNavigationDeliveryState;
      reason:
        | "NO_REQUESTED_DELIVERY"
        | "DELIVERY_REFERENCE_MISMATCH"
        | "DELIVERY_ATTEMPT_MISMATCH";
    }>;

export type RealityExplicitLeaveNavigationDeliveryBoundary =
  Readonly<{
    appCoordinatorOnly: true;
    terminationAuthorityRemainsController: true;
    typedLaunchPostCommitOutcomeRequired: true;
    pureNavigationRetryOnly: true;
    noNavigateCallSuccessAuthority: true;
    noPathnameOnlySuccessAuthority: true;
    noDomRuntimeInput: true;
    noFixedTimerSuccess: true;
    noPersistence: true;
    noRendererConsumer: true;
    noPressureConsumer: true;
    noGrowthConsumer: true;
    noSecondIntentController: true;
  }>;
