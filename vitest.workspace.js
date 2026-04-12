import { defineConfig } from "vitest/config";
import { playwright } from "@vitest/browser-playwright";

export default defineConfig({
  test: {
    projects: [
      {
        extends: "./vite.config.js",
        test: {
          // an example of file based convention,
          // you don't have to follow it
          include: [
            "__tests__/unit/**/*.{test,spec}.{ts,tsx,js,jsx}",
            "__tests__/**/*.node.{test,spec}.{ts,tsx,js,jsx}",
          ],
          name: "unit",
          environment: "node",
        },
      },
      {
        extends: "./vite.config.js",
        test: {
          setupFiles: ["vitest-browser-react"],
          // an example of file based convention,
          // you don't have to follow it
          include: [
            "__tests__/browser/**/*.{test,spec}.{ts,tsx,js,jsx}",
            "__tests__/**/*.browser.{test,spec}.{ts,tsx,js,jsx}",
          ],
          name: "browser",
          browser: {
            enabled: true,
            provider: playwright(),
            instances: [{ browser: "chromium" }],
          },
        },
      },
    ],
  },
});
