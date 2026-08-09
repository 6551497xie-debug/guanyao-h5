# XINMAI 1.0 Adult Life Stage Pressure Candidate Product Content Protocol P0

Status: `PREP_LOCKED / RUNTIME_DEFERRED / PUSH_HOLD`

This document freezes the content protocol for the four missing adult Life Stage packs. It authorizes no candidate content, Production Catalog entry, runtime change, schema change, or release.

## 1. Scope and invariant

- Production target: five adult Life Stages × six Pressure Fields × fifteen candidates = 450 candidates. The four missing packs contain 360 new candidates.
- `ESTABLISHING` keeps its existing locked 90 as the quality baseline; it is not rewritten by this protocol.
- Missing content is authored in this fixed order: Pack A `MID_LIFE`, Pack B `YOUTH`, Pack C `RESTRUCTURING`, Pack D `SIXTY_PLUS`.
- Each pack first produces 18 representative samples (six fields × three pressure mechanics). Full 90 authoring starts only after Product Control calibration accepts the samples.
- Draft packs remain outside the Production Catalog. The Production Catalog changes once, after all four packs are `PRODUCT_CONTROL_LOCKED`.
- Life Stage is a reality-situation routing fact only. It never expresses personality, fate, maturity, competence, health, or human value.
- Mother Code, stars, Identity, user personality, and runtime AI are prohibited candidate inputs. Runtime AI dependency is exactly zero.

## 2. Adult Life Stage semantic boundaries

The age owner and exact boundaries remain the existing frozen Life Stage router. Content authors use the following situation boundaries; they do not infer age from prose.

| Life Stage | Existing age boundary | Available real-life contexts | Prohibited stereotype shortcuts |
|---|---:|---|---|
| `YOUTH` | 18–24 | first independent work or study arrangements, early contracts and income, changing living arrangements, new intimate and peer boundaries, institutional access | immature, irresponsible, inexperienced by nature; universal dependence on parents; compulsory education, marriage, or career ambition |
| `ESTABLISHING` | 25–34 | building work roles, economic terms, close relationships, home arrangements, and durable commitments | universal marriage, children, home ownership, promotion ladder, or financial stability |
| `MID_LIFE` | 35–44 | simultaneous work and household roles, authority or repositioning, longer-term commitments, care coordination, constrained time and resources | “midlife crisis”, inevitable betrayal, illness, decline, “sandwich generation”, compulsory parenthood or asset ownership |
| `RESTRUCTURING` | 45–59 | role, skill, industry, relationship, household, or resource reconfiguration; changing responsibilities and autonomy | inevitable redundancy, empty nest, menopause/andropause, loss of relevance, decline, retirement countdown |
| `SIXTY_PLUS` | 60+ | diverse work/retirement combinations, resource and time autonomy, community participation, family boundaries, access and daily structure | frail, sick, lonely, digitally incapable, dependent, out of date, or universally anxious about retirement and care |

An item is rejected if replacing only an age word would make it fit another stage. A valid stage difference changes the actors, commitments, constraints, or available choices in the observable situation.

## 3. Unified Pressure Field definitions

The canonical runtime key is `EXISTENCE`; `EXISTENTIAL` is legacy editorial wording and must not appear in new data.

| Field | Unified definition | Stage-specific expression must come from |
|---|---|---|
| `POWER` | decision rights, standards, authority, access, evaluation, and voice | who can decide, which institution or role holds access, and what exit or appeal exists |
| `INTEREST` | money, resources, credit, terms, risk, and opportunity allocation | the actual contract, household, debt, compensation, or opportunity structure |
| `RELATION` | time, attention, commitment, boundary, shared decision, and repair in close relationships | the duration and form of commitment and the concrete coordination at stake |
| `FAMILY` | kin or household care, labor, resources, decisions, and boundaries | the real household structure and responsibility arrangement, never an assumed family form |
| `SOCIAL` | belonging, visibility, reciprocity, exclusion, and role in peer, work, community, or digital groups | the relevant group and the observable participation or exclusion event |
| `EXISTENCE` | body/energy access, time structure, daily baseline, work-role meaning, and life direction under present constraints | a current routine or transition; never a diagnosis, prognosis, or philosophical conclusion |

## 4. Fixed 15-slot coverage model

Every stage/field node contains the cross-product of five contexts and three pressure mechanics. This creates exactly fifteen distinct slots and is the primary anti-duplication control.

Pressure mechanics:

1. `RULE_OR_INFORMATION_GAP`: a standard, timing, responsibility, or decision basis is absent or changes without usable notice.
2. `POWER_OR_RESOURCE_ASYMMETRY`: decision, access, allocation, credit, or risk is materially unequal.
3. `BOUNDARY_OR_COMMITMENT_BREAK`: an agreed boundary, promise, consent, or coordination is not honored.

| Field | Five required contexts |
|---|---|
| `POWER` | direct authority; project/organization; client/platform; public evaluation; transition/exit |
| `INTEREST` | compensation; partnership/contract; shared household resources; investment/debt; opportunity/exit |
| `RELATION` | communication; time/attention; commitment; shared decision/boundary; repair/transition |
| `FAMILY` | care; household labor; money/resources; major decisions; intergenerational/cohabitation boundary |
| `SOCIAL` | workplace peers; friendship; community/group; digital/social visibility; belonging/exit |
| `EXISTENCE` | body/energy routine; time structure; work-role meaning; financial baseline; transition/direction |

The 18-item calibration set uses one item per pressure mechanic in each field and three different contexts per field. Product Control chooses whether the remaining twelve slots may be expanded; sample acceptance never locks production content.

Across every 15-item node, editorial review must find at least five situations led by environment/system/other-actor constraints, at least three led by body/time/resource limits, and at least three with a visible negotiated choice or boundary. An item must not assign all causality to the user. This is the internal Trinity responsibility check; candidates never explain or name the check.

## 5. Candidate writing contract

Each candidate is one observable present or recent real-life occurrence:

- `surface_zh_cn`: preferred 12–30 Chinese characters, hard maximum 30 excluding punctuation. It names an actor/context and an observable action or non-action.
- `shell_zh_cn`: preferred 6–20 Chinese characters, hard maximum 20 excluding punctuation. It names the immediate concrete cost, constraint, or unresolved stake.
- One candidate contains one occurrence. It does not combine a story, interpretation, and recommendation.
- Plain, spoken Chinese is required. “你” is allowed; “你就是 / 你总是 / 你注定” and equivalent identity judgments are forbidden.
- Prefer observable verbs such as 收到、询问、回复、取消、更改、转交、等待、拒绝、没有说明. Inferred inner-state verbs such as 害怕、创伤、潜意识、逃避、渴望 and diagnostic labels are forbidden unless the text is a literal statement spoken by another actor and remains non-diagnostic.
- A reader must be able to choose within two seconds: “像我 / 不完全是 / 不是现在”. The candidate does not print these options; the Presentation Consumer owns them.
- The candidate states what happened, not why the person is like this, what will happen next, or what the person should do.
- Philosophy, therapy language, psychological analysis, motivational advice, and moral judgment are rejection conditions.

The following are always forbidden: age fear, disease implication, retirement/care fear, marriage or fertility shame, wealth shame, generational stereotypes, trauma speculation, personal blame, and mechanical age-word substitution.

## 6. Editorial metadata envelope

This envelope belongs to docs/data authoring packs. It is not a new runtime schema or store.

Required fields:

- `stable_id`: immutable editorial identifier; format `PC-{STAGE}-{FIELD}-{CONTEXT_CODE}-{MECHANIC_CODE}-{NN}`.
- `life_stage`, `pressure_field`, `coverage_context`, `pressure_mechanic`.
- `surface_zh_cn`, `shell_zh_cn`, `source_language: zh-CN`.
- `draft_assistance: NONE | AI_ASSISTED`; when assisted, `assistance_record_ref` is required.
- `author_id`, `authored_at`, `source_material_refs` (no personal user data).
- `risk_tags`, `editorial_reviewer`, `editorial_reviewed_at`, `safety_reviewer`, `safety_reviewed_at`, `overlap_reviewer`, `overlap_reviewed_at`.
- `product_control_reviewer`, `product_control_reviewed_at`, and `locked_at`; all remain empty before independent review and lock.
- `content_hash`, `target_catalog_revision`, `workflow_status`, `decision_notes`.

Stable IDs never encode wording revisions. Text changes update `content_hash` and return the item to `DRAFT`. Deleted IDs are retired and never reused. Sorting is deterministic by Life Stage order, Field order, context order, mechanic order, then `stable_id`. Duplicate stable IDs, duplicate normalized surfaces, and materially overlapping situations are hard failures.

## 7. Workflow and separation of duties

The only promotion path is:

`DRAFT → EDITORIAL_REVIEW → SAFETY_REVIEW → DUPLICATE_OVERLAP_REVIEW → PRODUCT_CONTROL_LOCKED`

Before full-pack authoring, representative samples follow:

`SAMPLE_DRAFT → SAMPLE_REVIEW → SAMPLE_ACCEPTED → FULL_PACK_AUTHORIZED`

- Rejection at any review returns the item to `DRAFT` with a reason and invalidates downstream approvals.
- Authors and the same authoring pass cannot review, lock, or automatically promote their own items. A construction window acting as an AI-assisted author must record `draft_assistance: AI_ASSISTED` and an assistance reference.
- An independent Product Control Tower may execute Editorial, Safety, Duplicate/Overlap, and Product Control review under the frozen scorecard. Each role decision remains separately attributable even when the same independent Control Tower performs the review sequence.
- The user does not review all 360 items. The user judges product direction at representative-sample and final real-experience stages; item-level governance remains with the independent Product Control Tower.
- Product Control locks only a complete 90-item pack after every field and coverage slot passes.
- AI may assist offline drafting only. Assistance must be disclosed. AI cannot review, promote, lock, translate into authority, or generate at runtime.
- No prompt or real-user personal content may be retained in provenance. Source references must be public/editorial or synthetic situation references.

## 8. Language source of truth and revisions

- Locked Chinese (`zh-CN`) is the semantic source of truth.
- English is a later, versioned translation bound to the same `stable_id`; it cannot change stage, field, context, mechanic, or causal situation.
- Translation begins only after the Chinese item is locked. Any Chinese semantic edit invalidates every translation until re-reviewed.
- English never becomes a fallback authority for missing Chinese and is never generated at runtime.
- Catalog bundles remain static and revisioned. The existing `ESTABLISHING` revision remains read-only recoverable after cutover; unchanged existing references must resolve to their original content and provenance.

## 9. Missing catalog and Presentation protocol

The final cutover must preserve the innermost typed reason, including `CANDIDATE_BUNDLE_NOT_AVAILABLE`, through Adapter and resolver layers. Internal codes are not user copy.

- Missing stage content maps to a non-retryable-now presentation state, not success and not a transient loading state.
- It must not show “继续这一轮” or any immediate retry that cannot change the catalog.
- The visible message is short and factual: this life stage's reality scenes are not available yet. The action returns to the existing life space without deleting Identity, Intent, Growth, or Crystal.
- Retry is offered only for a typed transient recovery outcome.
- `AWAITING_RELATIONSHIP` may be shown only when relationship readiness is actually absent. When relationship is `AVAILABLE` but another presentation fact is pending, the LaunchLab/Reality-entry Presentation Resolver must map the actual pending fact (for example whisper response); it must not rewrite Authority state.

These are frozen migration requirements, not implementation authorization.

## 10. Lock criteria

A pack may be `PRODUCT_CONTROL_LOCKED` only when:

- exactly 90 items exist: six fields × fifteen fixed coverage slots;
- metadata completeness, stable-ID uniqueness, normalized exact-match checks, and semantic overlap review are 100%;
- every item passes the review scorecard with no hard rejection;
- every stage stereotype audit and Trinity responsibility distribution passes;
- AI-assisted drafts are disclosed and have complete independent human approvals;
- Product Control samples every field and records a pack report;
- the pack remains outside Production Catalog until all four packs are locked.

The executable artifacts for this protocol are:

- `docs/templates/xinmai-pressure-candidate/AUTHORING_TEMPLATE.md`
- `docs/templates/xinmai-pressure-candidate/REVIEW_SCORECARD.md`
- `docs/templates/xinmai-pressure-candidate/COVERAGE_MATRIX.md`
- `docs/templates/xinmai-pressure-candidate/MIGRATION_BLADE_PLAN.md`

## 11. Prep exit

All semantic decisions required to begin the representative MID_LIFE sample draft are frozen. This prep does not contain or authorize those 18 samples.

Exit: `CONTENT PACK A — MID_LIFE AUTHORING READY`
