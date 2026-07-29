import process from "node:process";
import { spawn } from "node:child_process";

const acceptedScenarios = new Set([
  "POSITIVE_MOTION",
  "POSITIVE_REDUCED_MOTION",
  "DIRECT_URL_WITHOUT_ADMISSION",
]);

const argument = process.argv.find((value) =>
  value.startsWith("--scenario="),
);
const scenario = argument?.slice("--scenario=".length) ?? null;
if (scenario === null || !acceptedScenarios.has(scenario)) {
  console.error(
    `Usage: npm run accept:xinmai-gravity-entry -- --scenario=${[
      ...acceptedScenarios,
    ].join("|")}`,
  );
  process.exit(1);
}

const portArgument = process.argv.find((value) =>
  value.startsWith("--port="),
);
const port = portArgument?.slice("--port=".length) ?? "5195";
const pathname =
  scenario === "DIRECT_URL_WITHOUT_ADMISSION"
    ? "/dynamics"
    : "/launch-lab";
const entryQuery =
  scenario === "DIRECT_URL_WITHOUT_ADMISSION"
    ? ""
    : "entryUser=new&";
const url =
  `http://127.0.0.1:${port}${pathname}?${entryQuery}` +
  `__xinmaiGravityEntryAcceptance=${encodeURIComponent(scenario)}`;

console.log(`Acceptance scenario: ${scenario}`);
console.log(`Open in a real browser: ${url}`);
console.log(
  scenario === "POSITIVE_REDUCED_MOTION"
    ? "Use the browser's native prefers-reduced-motion emulation before entering the path."
    : "Use the production UI only; the fixed evidence panel records typed runtime facts.",
);
console.log(
  "Positive path: Launch birth UI → Genesis recognition/relationship → Reality seed/body approach → production Dynamics.",
);

const vite = spawn(
  process.platform === "win32"
    ? "node_modules/.bin/vite.cmd"
    : "node_modules/.bin/vite",
  [
    "--mode",
    "xinmai-acceptance",
    "--host",
    "127.0.0.1",
    "--port",
    port,
    "--strictPort",
  ],
  {
    cwd: process.cwd(),
    stdio: "inherit",
  },
);

const stop = () => {
  if (!vite.killed) vite.kill("SIGTERM");
};
process.once("SIGINT", stop);
process.once("SIGTERM", stop);
vite.once("exit", (code) => process.exit(code ?? 0));
