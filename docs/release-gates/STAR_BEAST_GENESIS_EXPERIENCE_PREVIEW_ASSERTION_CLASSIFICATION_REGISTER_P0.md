# Star Beast Genesis Experience Preview Assertion Classification Register P0

Source: `scripts/check-star-beast-genesis-experience-preview.mjs`

The register expands all array-driven and file-existence checks into 75 logical assertions.

| ID | Logical assertion | Class | Corrective disposition |
|---:|---|:---:|---|
| 01 | Preview page file exists | A | KEEP |
| 02 | Preview style file exists | A | KEEP |
| 03 | Preview routes file exists | A | KEEP |
| 04 | App file exists | A | KEEP |
| 05 | Launch file exists | A | KEEP |
| 06 | P86 schema Gate exists | A | KEEP |
| 07 | P87 readiness Gate exists | A | KEEP |
| 08 | Mother source Gate exists | A | KEEP |
| 09 | Foundation freeze Gate exists | A | KEEP |
| 10 | Asset architecture Gate exists | A | KEEP |
| 11 | Preview protocol exists | A | KEEP |
| 12 | Package manifest exists | A | KEEP |
| 13 | Preview exports its component | B | KEEP current Consumer |
| 14 | Preview consumes birth-date Star Beast resolver | B | KEEP |
| 15 | Preview consumes lunar trigram resolver | B | KEEP |
| 16 | Preview consumes Mother Code archetype source | B | KEEP |
| 17 | Preview consumes Star Beast asset definition | B | KEEP |
| 18 | Preview consumes Genesis experience resolver | B | KEEP |
| 19 | Preview consumes presentation readiness | B | KEEP |
| 20 | Preview declares isolated scope | B | KEEP boundary |
| 21 | Preview declares accepted readiness | B | KEEP boundary |
| 22 | Preview declares manual acceptance required | B | KEEP boundary |
| 23 | Exact “星兽不是生成，是显化” copy | C | RETIRE assertion |
| 24 | Exact “原来，它一直在那里” copy | C | RETIRE assertion |
| 25 | Exact experience-vs-causality copy | C | RETIRE assertion |
| 26 | Exact non-final-asset copy | C | RETIRE assertion |
| 27 | Exact waiting-for-acceptance copy | C | RETIRE assertion |
| 28 | Exact COSMIC_ORIGIN stage marker | C | RETIRE assertion |
| 29 | Exact ORIGIN_COORDINATE stage marker | C | RETIRE assertion |
| 30 | Exact STAR_MANSION_ALIGNMENT stage marker | C | RETIRE assertion |
| 31 | Exact FOUR_SYMBOL_FORMATION stage marker | C | RETIRE assertion |
| 32 | Exact LIFE_ARCHETYPE_INFUSION stage marker | C | RETIRE assertion |
| 33 | Exact STAR_BEAST_REVEAL stage marker | C | RETIRE assertion |
| 34 | Preview excludes localStorage | B | KEEP isolation |
| 35 | Preview excludes sessionStorage | B | KEEP isolation |
| 36 | Preview excludes fetch | B | KEEP isolation |
| 37 | Preview excludes useNavigate | B | KEEP isolation |
| 38 | Preview excludes navigate calls | B | KEEP isolation |
| 39 | Preview excludes LaunchLab coupling | B | KEEP isolation |
| 40 | Preview excludes GravityPage coupling | B | KEEP isolation |
| 41 | Preview excludes StarbeastLab coupling | B | KEEP isolation |
| 42 | Preview excludes Canvas context | B | KEEP no-renderer boundary |
| 43 | Preview excludes getContext | B | KEEP no-renderer boundary |
| 44 | Preview excludes Three.js | B | KEEP no-renderer boundary |
| 45 | Exact root preview CSS selector | C | RETIRE assertion |
| 46 | Exact hero CSS selector | C | RETIRE assertion |
| 47 | Exact constellation CSS selector | C | RETIRE assertion |
| 48 | Exact stages CSS selector | C | RETIRE assertion |
| 49 | Exact 860px media query | C | RETIRE assertion |
| 50 | Exact reduced-motion CSS implementation | C | RETIRE assertion |
| 51 | Isolated Preview route constant | B | KEEP route ownership |
| 52 | Preview route imports component | B | KEEP route ownership |
| 53 | Route path binds Preview route | B | KEEP route ownership |
| 54 | Route creates Preview element | B | KEEP route ownership |
| 55 | App has no direct Preview route | B | KEEP isolation |
| 56 | Launch has no Preview link | B | KEEP isolation |
| 57 | P86 permits isolated Preview consumer | B | KEEP cross-Gate contract |
| 58 | P87 permits isolated Preview consumer | B | KEEP cross-Gate contract |
| 59 | Mother source Gate ownership text | B | MODERNIZE to real-life visual adapter |
| 60 | Foundation freeze Gate ownership text | B | MODERNIZE to real-life visual adapter |
| 61 | Asset architecture permits isolated Preview only | B | KEEP cross-Gate contract |
| 62 | Protocol identifies P88 | B | KEEP governance contract |
| 63 | Protocol identifies isolated route | B | KEEP governance contract |
| 64 | Protocol binds existing source chain | B | KEEP governance contract |
| 65 | Protocol states non-final visual asset | B | KEEP governance boundary |
| 66 | Protocol forbids formal navigation integration | B | KEEP governance boundary |
| 67 | Protocol forbids real-user input | B | KEEP privacy boundary |
| 68 | Protocol requires human acceptance | B | KEEP governance boundary |
| 69 | Preview Gate command registered | A | KEEP |
| 70 | Preview Gate participates in post-release | A | KEEP |
| 71 | Asset-consumption postcheck remains registered | A | KEEP |
| 72 | Preview root renders exact `main` element | C | RETIRE assertion |
| 73 | Rendered Preview exposes isolated scope | B | KEEP runtime boundary check |
| 74 | Rendered Preview exposes readiness | B | KEEP runtime boundary check |
| 75 | Rendered Preview requires manual acceptance | B | KEEP runtime boundary check |

## Totals

| Class | Count |
|---|---:|
| A | 15 |
| B | 42 |
| C | 18 |
| D | 0 |
| Total | 75 |

No assertion or product implementation is changed by this audit commit.
