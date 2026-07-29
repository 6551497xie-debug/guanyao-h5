import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

declare const process: Readonly<{ cwd: () => string }>;

const acceptanceEntryPlugin = (): Plugin => ({
  name: "xinmai-acceptance-entry",
  transformIndexHtml(html) {
    return html.replace(
      "/src/main.tsx",
      "/src/acceptance/main.tsx",
    );
  },
});

export default defineConfig(({ mode }) => {
  const acceptanceMode = mode === "xinmai-acceptance";
  return {
    plugins: [
      react(),
      ...(acceptanceMode ? [acceptanceEntryPlugin()] : []),
    ],
    resolve: acceptanceMode
      ? {
          alias: [
            {
              find: /^.*services\/realityExplicitLeaveNavigationDeliveryRuntimePort$/,
              replacement:
                `${process.cwd()}/src/acceptance/` +
                "xinmaiRealityExplicitLeaveNavigationDeliveryFaultPort.ts",
            },
          ],
        }
      : undefined,
  };
});
