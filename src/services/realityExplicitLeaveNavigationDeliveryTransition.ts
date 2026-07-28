import type { RealityExplicitLeaveRequest } from "../types/realityProductionRouteEntry";
import {
  REALITY_EXPLICIT_LEAVE_NAVIGATION_TARGET,
  type RealityExplicitLeaveNavigationDeliveryBoundary,
  type RealityExplicitLeaveNavigationDeliveryState,
  type RealityExplicitLeaveNavigationDeliveryTicket,
  type RealityExplicitLeaveNavigationOutcomeConsumption,
  type RealityExplicitLeaveNavigationRetryableReason,
  type ReturningLifeWorldDeliveryOutcome,
} from "../types/realityExplicitLeaveNavigationDelivery";

export const REALITY_EXPLICIT_LEAVE_NAVIGATION_DELIVERY_BOUNDARY:
  RealityExplicitLeaveNavigationDeliveryBoundary = Object.freeze({
    appCoordinatorOnly: true,
    terminationAuthorityRemainsController: true,
    typedLaunchPostCommitOutcomeRequired: true,
    pureNavigationRetryOnly: true,
    noNavigateCallSuccessAuthority: true,
    noPathnameOnlySuccessAuthority: true,
    noDomRuntimeInput: true,
    noFixedTimerSuccess: true,
    noPersistence: true,
    noRendererConsumer: true,
    noPressureConsumer: true,
    noGrowthConsumer: true,
    noSecondIntentController: true,
  });

export const createIdleRealityExplicitLeaveNavigationDeliveryState =
  (): RealityExplicitLeaveNavigationDeliveryState =>
    Object.freeze({
      status: "IDLE" as const,
      ticket: null,
      reason: null,
    });

const freezeTicket = (
  ticket: RealityExplicitLeaveNavigationDeliveryTicket,
): RealityExplicitLeaveNavigationDeliveryTicket =>
  Object.freeze({ ...ticket });

export function createRealityExplicitLeaveNavigationDeliveryTicket(
  request: RealityExplicitLeaveRequest,
  confirmedAt: string,
): RealityExplicitLeaveNavigationDeliveryTicket {
  return freezeTicket({
    deliveryReferenceId: [
      "reality-explicit-leave-delivery",
      request.intentReferenceId,
      request.encounterCycleId,
    ].join(":"),
    intentReferenceId: request.intentReferenceId,
    encounterCycleId: request.encounterCycleId,
    sourceReferenceId: request.identityReferences.sourceReferenceId,
    starBeastIdentityReferenceId:
      request.identityReferences.starBeastIdentityReferenceId,
    mansionCoordinateReferenceId:
      request.identityReferences.mansionCoordinateReferenceId,
    terminalReason: "EXPLICIT_LEAVE",
    targetRoute: REALITY_EXPLICIT_LEAVE_NAVIGATION_TARGET,
    terminationConfirmedAt: confirmedAt,
    deliveryAttempt: 1,
  });
}

export function beginRealityExplicitLeaveNavigationDelivery(
  request: RealityExplicitLeaveRequest,
  confirmedAt: string,
): Extract<
  RealityExplicitLeaveNavigationDeliveryState,
  { status: "TERMINATION_CONFIRMED_NAVIGATION_PENDING" }
> {
  return Object.freeze({
    status: "TERMINATION_CONFIRMED_NAVIGATION_PENDING" as const,
    ticket: createRealityExplicitLeaveNavigationDeliveryTicket(
      request,
      confirmedAt,
    ),
    reason: null,
  });
}

export function markRealityExplicitLeaveNavigationRequested(
  state: RealityExplicitLeaveNavigationDeliveryState,
  requestedAt: string,
): RealityExplicitLeaveNavigationDeliveryState {
  if (
    state.status !==
    "TERMINATION_CONFIRMED_NAVIGATION_PENDING"
  ) {
    return state;
  }
  return Object.freeze({
    status: "NAVIGATION_REQUESTED" as const,
    ticket: state.ticket,
    requestedAt,
    reason: null,
  });
}

export function markRealityExplicitLeaveNavigationRetryable(
  state: RealityExplicitLeaveNavigationDeliveryState,
  reason: RealityExplicitLeaveNavigationRetryableReason,
): RealityExplicitLeaveNavigationDeliveryState {
  if (
    state.status !== "NAVIGATION_REQUESTED" &&
    state.status !==
      "TERMINATION_CONFIRMED_NAVIGATION_PENDING"
  ) {
    return state;
  }
  return Object.freeze({
    status: "NAVIGATION_RETRYABLE" as const,
    ticket: state.ticket,
    reason,
  });
}

export function retryRealityExplicitLeaveNavigationDelivery(
  state: RealityExplicitLeaveNavigationDeliveryState,
): RealityExplicitLeaveNavigationDeliveryState {
  if (state.status !== "NAVIGATION_RETRYABLE") {
    return state;
  }
  return Object.freeze({
    status: "TERMINATION_CONFIRMED_NAVIGATION_PENDING" as const,
    ticket: freezeTicket({
      ...state.ticket,
      deliveryAttempt: state.ticket.deliveryAttempt + 1,
    }),
    reason: null,
  });
}

const outcomeMatchesTicket = (
  outcome: ReturningLifeWorldDeliveryOutcome,
  ticket: RealityExplicitLeaveNavigationDeliveryTicket,
): boolean =>
  outcome.deliveryReferenceId === ticket.deliveryReferenceId &&
  outcome.deliveryAttempt === ticket.deliveryAttempt;

export function consumeReturningLifeWorldDeliveryOutcome(
  state: RealityExplicitLeaveNavigationDeliveryState,
  outcome: ReturningLifeWorldDeliveryOutcome,
): RealityExplicitLeaveNavigationOutcomeConsumption {
  if (state.status !== "NAVIGATION_REQUESTED") {
    return Object.freeze({
      status: "STALE_OUTCOME_REJECTED" as const,
      state,
      reason: "NO_REQUESTED_DELIVERY" as const,
    });
  }
  if (
    outcome.deliveryReferenceId !==
    state.ticket.deliveryReferenceId
  ) {
    return Object.freeze({
      status: "STALE_OUTCOME_REJECTED" as const,
      state,
      reason: "DELIVERY_REFERENCE_MISMATCH" as const,
    });
  }
  if (outcome.deliveryAttempt !== state.ticket.deliveryAttempt) {
    return Object.freeze({
      status: "STALE_OUTCOME_REJECTED" as const,
      state,
      reason: "DELIVERY_ATTEMPT_MISMATCH" as const,
    });
  }
  if (!outcomeMatchesTicket(outcome, state.ticket)) {
    return Object.freeze({
      status: "STALE_OUTCOME_REJECTED" as const,
      state,
      reason: "DELIVERY_REFERENCE_MISMATCH" as const,
    });
  }
  if (outcome.status === "LIFE_WORLD_DELIVERED") {
    const mismatchReason =
      outcome.targetRoute !== state.ticket.targetRoute
        ? "ROUTE_TARGET_MISMATCH" as const
        : outcome.sourceReferenceId !==
            state.ticket.sourceReferenceId
          ? "SOURCE_REFERENCE_MISMATCH" as const
          : outcome.starBeastIdentityReferenceId !==
              state.ticket.starBeastIdentityReferenceId
            ? "STARBEAST_IDENTITY_MISMATCH" as const
            : outcome.mansionCoordinateReferenceId !==
                state.ticket.mansionCoordinateReferenceId
              ? "MANSION_COORDINATE_MISMATCH" as const
              : null;
    if (mismatchReason !== null) {
      return Object.freeze({
        status: "CONSUMED" as const,
        state: Object.freeze({
          status: "NAVIGATION_RETRYABLE" as const,
          ticket: state.ticket,
          reason: mismatchReason,
        }),
      });
    }
    return Object.freeze({
      status: "CONSUMED" as const,
      state: Object.freeze({
        status: "LIFE_WORLD_DELIVERED" as const,
        ticket: state.ticket,
        outcome: Object.freeze({ ...outcome }),
        reason: null,
      }),
    });
  }
  return Object.freeze({
    status: "CONSUMED" as const,
    state: Object.freeze({
      status: "NAVIGATION_RETRYABLE" as const,
      ticket: state.ticket,
      reason: outcome.reason,
    }),
  });
}
