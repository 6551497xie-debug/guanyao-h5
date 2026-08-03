# 07｜逐用户A/B/C证据记录表

> 模板状态：`EMPTY / PSEUDONYMOUS REFERENCE ONLY`

## 1. 研究引用

```text
participantReference: [填写]
instrumentVersion: [填写]
productCommitSha: [填写]
consentVersion: [填写]
deviceAndAccessibilityContext: [填写]
```

## 2. 路径事实

| 事实 | 状态 |
|---|---|
| Day 0 started | `YES / NO` |
| Explicit Departure | `YES / NO` |
| Return | `SPONTANEOUS / RESEARCHER_PROMPTED / NONE` |
| Lived Response | `TRIED / CHANGED / NOT_YET / DECLINED / NOT_OBSERVABLE` |
| Formation observed | `YES / NO` |
| Free loop completed | `YES / NO` |
| Commercial concept exposed | `YES / NO` |
| Withdrew | `YES / NO` |
| Technical block | `YES / NO` |

## 3. A层证据

```text
promptLevel: [UNAIDED / LIGHTLY_PROBED / RESEARCHER_PROMPTED / CONTAMINATED]
actionToCrystalUnderstanding: [PASS / PARTIAL / FAIL / NOT_OBSERVABLE]
attemptVsSuccessUnderstanding: [PASS / FAIL / NOT_OBSERVABLE]
sameLifeRecognition: [PASS / FAIL / NOT_OBSERVABLE]
bodyImprintRecognition: [PASS / FAIL / NOT_OBSERVABLE]
rewardAstrologyAiMisframe: [YES / NO]
exactQuote: [填写]
A_decision: [PASS / PARTIAL / FAIL / INCONCLUSIVE]
```

## 4. B层证据

```text
returnedBeforeReminder: [YES / NO / NOT_OBSERVABLE]
returnEntryUnaided: [YES / NO / NOT_OBSERVABLE]
returnClassification: [填写]
continuityMotivation: [YES / NO / UNCLEAR]
newContentComfortNoveltyOnly: [YES / NO / UNCLEAR]
exactQuote: [填写]
B_decision: [PASS / PARTIAL / FAIL / INCONCLUSIVE]
```

## 5. C层证据

```text
freeBaselineUnderstood: [YES / NO / NOT_SHOWN]
conceptExposureConsent: [YES / NO]
conceptsShown: [填写]
continuitySelected: [YES / NO / NOT_SHOWN]
selectedCapability: [填写]
correctPaymentObjectUnderstanding: [YES / NO / UNCLEAR / NOT_SHOWN]
believesExistingAssetsCanBeLost: [YES / NO / UNCLEAR / NOT_SHOWN]
believesPaymentImprovesFateOrGrowth: [YES / NO / UNCLEAR / NOT_SHOWN]
waitlistIntent: [YES / NO / NOT_ASKED]
exactQuote: [填写]
C_decision: [PASS_CANDIDATE / PARTIAL / FAIL / NOT_SHOWN / ETHICAL_OFFER_FAILURE]
```

## 6. 分母标记

```text
N_ENROLLED: [1 / 0]
N_DAY0_DEPARTED: [1 / 0]
N_FORMATION_OBSERVED: [1 / 0]
N_FREE_LOOP_COMPLETED: [1 / 0]
N_SPONTANEOUS_RETURN: [1 / 0]
N_RETURNED_ANY: [1 / 0]
N_CONCEPT_EXPOSED: [1 / 0]
N_CONTINUITY_SELECTED: [1 / 0]
N_WAITLIST_INTENT: [1 / 0]
N_TECHNICAL_BLOCKED: [1 / 0]
N_WITHDRAWN: [1 / 0]
```

## 7. 研究质量

```text
leadingLanguageIncident: [YES / NO]
reminderContamination: [YES / NO]
commercialTimingViolation: [YES / NO]
participantDistressPause: [YES / NO]
dataDeletionRequested: [YES / NO]
recordUsableForA: [YES / NO]
recordUsableForB: [YES / NO]
recordUsableForC: [YES / NO]
```

不得生成综合满意度、生命成长或购买力评分。
