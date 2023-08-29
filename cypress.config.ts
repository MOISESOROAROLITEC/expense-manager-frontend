import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },
  e2e: {
    baseUrl: "http://localhost:4000",
    supportFile: "cypress/support/e2e.ts",
    // supportFile: "cypress/support/delete-users.ts",
  },
});
