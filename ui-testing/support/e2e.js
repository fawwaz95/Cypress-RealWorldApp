// Import custom commands
require('cypress-xpath');
import './commands';
const loginPage = require("../development/integration/pageObjects/realWorldApp/realWorldAppLoginPage");
const realWAppData = require("../development/integration/objectData/realWorldApp/realWorldAppData");

// Cypress event for handling uncaught exceptions
Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from failing the test
    cy.log(`Uncaught exception: ${err}`);
    return false;
});

// Setup code to run before all tests
// Global setup logic
before(() => {
    cy.log('Starting E2E tests');
    const app = window.top;
    if (!app.document.head.querySelector("[data-hide-command-log-request]")) {
        const style = app.document.createElement("style");
        style.innerHTML =".command-name-request, .command-name-xhr { display: none }";
        style.setAttribute("data-hide-command-log-request", "");
        app.document.head.appendChild(style); 
    }
});

beforeEach(() => {
    cy.session("loginSession", () => {
        cy.visit("/signin");

        loginPage.loginToApp(
            realWAppData.simpleLoginInfo.username,
            realWAppData.simpleLoginInfo.password
        );

        cy.url().should("not.include", "/signin");
        cy.getCookies().then((cookies) => {
            cy.log("Cookies after login:", cookies);
        });
    });
});
  

// Teardown code to run after all tests
 // Global cleanup logic
after(() => {
    cy.log("HELLOOOOOO AFTERRRRRRRRRRRRRRRRRR");
    cy.log('E2E tests completed');
});