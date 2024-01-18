const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",
  
  e2e: {
    baseUrl: 'https://opensource-demo.orangehrmlive.com/',
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
      // implement node event listeners here
      screenshotOnRunFailure = true;
    },
    specPattern: 'cypress/e2e/*.cy.js',
    // retries: {
    //   runMode: 3,
    //   openMode: 3,
    //   },
  },
});
