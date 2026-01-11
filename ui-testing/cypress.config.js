//const { defineConfig } = require('cypress');

module.exports = {
  e2e: {
    baseUrl: process.env.CYPRESS_baseUrl || "http://localhost:3000",
    env: {
      apiUrl: process.env.CYPRESS_apiUrl || "http://localhost:3001"
    },
    chromeWebSecurity: false,
    specPattern: 'development/integration/testCases/**/*.cy.js',
    supportFile: 'support/e2e.js', 
    experimentalSessionAndOrigin: true,
    exit: false, // Prevent Cypress from auto-closing
    setupNodeEvents(on, config) {
      // Optional: Add plugins or event listeners here
    },
  },
  defaultCommandTimeout: 10000, // Timeout for Cypress commands
  retries: {
    runMode: 2, // Retries for failed tests during `cypress run`
    openMode: 0, // Retries for failed tests during `cypress open`
  },
  video: false, // Disable video recording for faster runs
  browser: 'chrome',
};
