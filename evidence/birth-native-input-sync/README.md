# Birth native date/time event synchronization — Production evidence

- Source parent: `a4823c670207504f8a00380af4d75cee9897a6b9`
- Build entry: hashed `/assets/index-YzLmHgdU.js` and `/assets/index-ShMXuHjA.css`
- `/@vite/client`: `0`
- `/src/main.tsx`: `0`
- executable asset filenames containing Fixture / Acceptance / Draft: `0 / 0 / 0`
- browser Storage inspection or mutation: `0`
- Fixture, Acceptance mode, or query-parameter data: `0`

## 390 × 844 exact-time path

- Origin: `http://127.0.0.1:5315`
- CSS viewport: `window.innerWidth=390`, `window.innerHeight=844`
- visual viewport: `390 × 844.2857`, scale `1`
- DPR: `1.4`; document scroll width: `390`
- normal native control input: `1990-01-15`, `10:00`
- public typed state: `data-birth-coordinate-validation=VALID`
- controlled values: date `1990-01-15`, time `10:00`
- confirmation disabled: `false`
- result: explicit confirmation navigated to formal `/genesis`
- runtime error log: `0`

`390x844-exact-valid.jpg` is an in-app browser viewport capture from the same hashed build. Its encoder reports `390 × 836` output pixels while the authoritative browser CSS metrics above were `390 × 844`; no crop, resize, stitching, or post-processing was applied.

## 320 × 568 range path

- Origin: `http://127.0.0.1:5316`
- CSS viewport: `window.innerWidth=320`, `window.innerHeight=568`
- visual viewport: `320 × 567.8572`, scale `1`
- DPR: `1.4`; document scroll width: `320`
- date before precision switch: `1990-01-15`
- date after switching to `APPROXIMATE_RANGE`: `1990-01-15`
- `10:00–11:00`: typed `APPROXIMATE_RANGE_CROSSES_HOUR_BRANCH`, confirmation disabled, actionable recovery copy visible
- `10:00–10:50`: typed `VALID`, 巳时 derivation visible, confirmation enabled
- primary action: `266 × 48` CSS px, within viewport after normal scroll
- runtime error log: `0`

`320x568-range-recovered.jpg` and `320x568-primary-action.jpg` are direct browser captures with no post-processing.
