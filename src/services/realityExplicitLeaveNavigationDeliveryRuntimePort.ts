import type { NavigateFunction } from "react-router-dom";
import type {
  RealityExplicitLeaveNavigationDeliveryTicket,
  ReturningLifeWorldDeliveryOutcome,
} from "../types/realityExplicitLeaveNavigationDelivery";

export function invokeRealityExplicitLeaveNavigation(
  navigate: NavigateFunction,
  ticket: RealityExplicitLeaveNavigationDeliveryTicket,
): void {
  navigate(ticket.targetRoute, {
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
  return ticket;
}

export function projectReturningLifeWorldSurfaceReady(
  returningVisualReady: boolean,
  _ticket: RealityExplicitLeaveNavigationDeliveryTicket,
): boolean {
  return returningVisualReady;
}

export function projectReturningLifeWorldDeliveryOutcomes(
  _ticket: RealityExplicitLeaveNavigationDeliveryTicket,
  outcome: ReturningLifeWorldDeliveryOutcome,
): readonly ReturningLifeWorldDeliveryOutcome[] {
  return Object.freeze([outcome]);
}
