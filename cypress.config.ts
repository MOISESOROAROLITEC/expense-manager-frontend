import { defineConfig } from "cypress";

export default defineConfig({
  fixturesFolder: "./cypress/support/e2e.ts",
  e2e: {
    setupNodeEvents(on, config) {},
    baseUrl: "http://localhost:4000",
  },
});
