import type { NavigateFunction } from "react-router-dom";
import type {
  RealityExplicitLeaveNavigationDeliveryTicket,
  ReturningLifeWorldDeliveryOutcome,
} from "../types/realityExplicitLeaveNavigationDelivery";
import {
  XINMAI_EXPLICIT_LEAVE_ACCEPTANCE_QUERY,
  XINMAI_EXPLICIT_LEAVE_ACCEPTANCE_SCENARIO,
  consumeAcceptanceFaultOnce,
  recordAcceptanceEvidence,
} from "./xinmaiRealityExplicitLeaveNavigationDeliveryAcceptanceScenario";

const faultKey = (
  ticket: RealityExplicitLeaveNavigationDeliveryTicket,
  fault: string,
) => `${ticket.deliveryReferenceId}:${fault}`;

export function invokeRealityExplicitLeaveNavigation(
  navigate: NavigateFunction,
  ticket: RealityExplicitLeaveNavigationDeliveryTicket,
): void {
  recordAcceptanceEvidence({
    event: "NAVIGATION_INVOKED",
    deliveryReferenceId: ticket.deliveryReferenceId,
    deliveryAttempt: ticket.deliveryAttempt,
  });
  if (
    XINMAI_EXPLICIT_LEAVE_ACCEPTANCE_SCENARIO ===
      "NAVIGATION_INVOCATION_FAILS_ONCE" &&
    consumeAcceptanceFaultOnce(
      faultKey(ticket, "NAVIGATION_INVOCATION"),
    )
  ) {
    recordAcceptanceEvidence({
      event: "NAVIGATION_INVOCATION_FAILED",
      deliveryReferenceId: ticket.deliveryReferenceId,
      deliveryAttempt: ticket.deliveryAttempt,
    });
    throw new Error("XINMAI_ACCEPTANCE_NAVIGATION_FAILURE");
  }
  const acceptanceTarget =
    `${ticket.targetRoute}?${XINMAI_EXPLICIT_LEAVE_ACCEPTANCE_QUERY}=` +
    encodeURIComponent(XINMAI_EXPLICIT_LEAVE_ACCEPTANCE_SCENARIO);
  navigate(acceptanceTarget, {
    replace: true,
    state: {
      explicitLeaveDeliveryReferenceId:
        ticket.deliveryReferenceId,
      explicitLeaveDeliveryAttempt: ticket.deliveryAttempt,
    },
  });
}

export function projectRealityExplicitLeaveNavigationDeliveryTicket(
  ticket: RealityExplicitLeaveNavigationDeliveryTicket,
): RealityExplicitLeaveNavigationDeliveryTicket {
  if (
    XINMAI_EXPLICIT_LEAVE_ACCEPTANCE_SCENARIO ===
      "IDENTITY_MISMATCH_ON_FIRST_ATTEMPT" &&
    ticket.deliveryAttempt === 1
  ) {
    if (
      consumeAcceptanceFaultOnce(
        faultKey(ticket, "IDENTITY_MISMATCH_EVIDENCE"),
      )
    ) {
      recordAcceptanceEvidence({
        event: "IDENTITY_MISMATCH_PROJECTED",
        deliveryReferenceId: ticket.deliveryReferenceId,
        deliveryAttempt: ticket.deliveryAttempt,
        detail: "starBeastIdentityReferenceId",
      });
    }
    return Object.freeze({
      ...ticket,
      starBeastIdentityReferenceId:
        `${ticket.starBeastIdentityReferenceId}:acceptance-mismatch`,
    });
  }
  return ticket;
}

export function projectReturningLifeWorldSurfaceReady(
  returningVisualReady: boolean,
  ticket: RealityExplicitLeaveNavigationDeliveryTicket,
): boolean {
  if (
    XINMAI_EXPLICIT_LEAVE_ACCEPTANCE_SCENARIO ===
      "RETURNING_SURFACE_UNAVAILABLE_ON_FIRST_ATTEMPT" &&
    ticket.deliveryAttempt === 1
  ) {
    recordAcceptanceEvidence({
      event: "RETURNING_SURFACE_UNAVAILABLE_PROJECTED",
      deliveryReferenceId: ticket.deliveryReferenceId,
      deliveryAttempt: ticket.deliveryAttempt,
    });
    return false;
  }
  return returningVisualReady;
}

const unavailableOutcome = (
  ticket: RealityExplicitLeaveNavigationDeliveryTicket,
): ReturningLifeWorldDeliveryOutcome =>
  Object.freeze({
    status: "LIFE_WORLD_DELIVERY_UNAVAILABLE" as const,
    deliveryReferenceId: ticket.deliveryReferenceId,
    deliveryAttempt: ticket.deliveryAttempt,
    reason: "RETURNING_LIFE_SURFACE_NOT_COMMITTED" as const,
  });

export function projectReturningLifeWorldDeliveryOutcomes(
  ticket: RealityExplicitLeaveNavigationDeliveryTicket,
  outcome: ReturningLifeWorldDeliveryOutcome,
): readonly ReturningLifeWorldDeliveryOutcome[] {
  if (
    XINMAI_EXPLICIT_LEAVE_ACCEPTANCE_SCENARIO ===
      "WATCHDOG_SUPPRESSES_FIRST_OUTCOME" &&
    ticket.deliveryAttempt === 1
  ) {
    recordAcceptanceEvidence({
      event: "FIRST_OUTCOME_SUPPRESSED_FOR_WATCHDOG",
      deliveryReferenceId: ticket.deliveryReferenceId,
      deliveryAttempt: ticket.deliveryAttempt,
      detail: outcome.status,
    });
    return Object.freeze([]);
  }
  if (
    XINMAI_EXPLICIT_LEAVE_ACCEPTANCE_SCENARIO ===
    "STALE_ATTEMPT_PRECEDES_CURRENT_OUTCOME"
  ) {
    if (ticket.deliveryAttempt === 1) {
      recordAcceptanceEvidence({
        event: "FIRST_ATTEMPT_MADE_RETRYABLE",
        deliveryReferenceId: ticket.deliveryReferenceId,
        deliveryAttempt: ticket.deliveryAttempt,
      });
      return Object.freeze([unavailableOutcome(ticket)]);
    }
    if (
      ticket.deliveryAttempt === 2 &&
      outcome.status === "LIFE_WORLD_DELIVERED"
    ) {
      const staleOutcome = Object.freeze({
        ...outcome,
        deliveryAttempt: 1,
      });
      recordAcceptanceEvidence({
        event: "STALE_ATTEMPT_EMITTED_BEFORE_CURRENT",
        deliveryReferenceId: ticket.deliveryReferenceId,
        deliveryAttempt: 1,
      });
      recordAcceptanceEvidence({
        event: "CURRENT_ATTEMPT_EMITTED_AFTER_STALE",
        deliveryReferenceId: ticket.deliveryReferenceId,
        deliveryAttempt: ticket.deliveryAttempt,
      });
      return Object.freeze([staleOutcome, outcome]);
    }
  }
  recordAcceptanceEvidence({
    event: `OUTCOME_REPORTED:${outcome.status}`,
    deliveryReferenceId: ticket.deliveryReferenceId,
    deliveryAttempt: ticket.deliveryAttempt,
    detail:
      outcome.status === "LIFE_WORLD_DELIVERED"
        ? outcome.authority
        : outcome.reason,
  });
  return Object.freeze([outcome]);
}
