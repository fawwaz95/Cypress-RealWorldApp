
// e2e.js

// Import custom commands
require('cypress-xpath');
import './commands';
const loginPage = require("../development/integration/pageObjects/realWorldApp/realWorldAppLoginPage");
const realWAppData = require("../development/integration/objectData/realWorldApp/realWorldAppData");

// Cypress event for handling uncaught exceptions
Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from failing the test
    return false;
});

// Setup code to run before all tests
before(() => {
    // Global setup logic
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
    cy.log("Creating loginSession");
    cy.session("loginSession", () => {
        cy.visit("/");
        loginPage.loginToApp(realWAppData.simpleLoginInfo.username, realWAppData.simpleLoginInfo.password);
    });
})

// Teardown code to run after all tests
after(() => {
    cy.log("HELLOOOOOO AFTERRRRRRRRRRRRRRRRRR");
    // Global cleanup logic
    cy.log('E2E tests completed');
});