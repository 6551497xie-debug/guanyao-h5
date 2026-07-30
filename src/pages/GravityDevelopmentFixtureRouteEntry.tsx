import { useMemo } from "react";
import { GravityPage } from "./GravityPage";
import {
  resolveChangeExperienceRuntimeSmokeFixture,
} from "../services/fixtures/changeExperienceRuntimeSmokeFixtures";
import {
  resolvePrimaryPetalDevFixture,
} from "../services/fixtures/primaryPetalDevFixtures";
import {
  resolveDynamicsInputContext,
} from "../services/guanyaoDynamicsInputContextAdapter";
import {
  recoverRealityRecognizedIdentity,
} from "../services/realityRecognizedIdentityRecoveryAdapter";

export const GRAVITY_DEVELOPMENT_FIXTURE_ROUTE_BOUNDARY =
  Object.freeze({
    developmentOnly: true as const,
    separateFromProductionRoute: true as const,
    noProductionRecoveryRead: true as const,
    noProductionAdmissionWrite: true as const,
    noProductionActiveCommit: true as const,
  });

export function GravityDevelopmentFixtureRouteEntry() {
  const input = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    const fixtureKey = params.get("fixture");
    const smokeKey = params.get("__experienceSmoke");
    const smoke =
      resolveChangeExperienceRuntimeSmokeFixture(smokeKey);
    const primary =
      fixtureKey === null
        ? null
        : smoke?.fixtureKey === fixtureKey
          ? smoke.pressureContext
          : resolvePrimaryPetalDevFixture(fixtureKey);
    return Object.freeze({
      dynamicsInputContext: resolveDynamicsInputContext({
        primaryPetalFixture: primary,
        smokeFixture: smoke,
      }),
      experienceSmokeFixture: smokeKey,
      identity: recoverRealityRecognizedIdentity(),
    });
  }, []);

  return (
    <GravityPage
      dynamicsInputContext={input.dynamicsInputContext}
      visualContinuity={
        input.identity.status === "READY"
          ? input.identity.visualContinuity
          : null
      }
      innerViewEntry={
        input.identity.status === "READY"
          ? "CURRENT_LIFE_WEATHER_BODY_APPROACHED"
          : null
      }
      choiceContinuation={null}
      experienceSmokeFixture={input.experienceSmokeFixture}
      observationContinuityDecision={Object.freeze({
        status: "BLOCKED" as const,
        gravityObservationReferenceId: "development-fixture",
        checkpointRevision: 0,
        recognition: null,
        choiceActionIntention: null,
        reason: "ADMISSION_NOT_CURRENT" as const,
      })}
      onObservationRecognitionRequested={async () =>
        Object.freeze({
          status: "REJECTED" as const,
          decision: Object.freeze({
            status: "BLOCKED" as const,
            gravityObservationReferenceId: "development-fixture",
            checkpointRevision: 0,
            recognition: null,
            choiceActionIntention: null,
            reason: "ADMISSION_NOT_CURRENT" as const,
          }),
        })
      }
    />
  );
}
