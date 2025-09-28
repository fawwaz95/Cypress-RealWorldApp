const configData = require("../../../cypress.env.json");
const loginData = require("../objectData/hubSpotLoginData.js");
const loginPage = require("../pageObjects/hubspotLoginPage.js");


describe("Login to Hubspot", () =>{
    beforeEach(() => {
        cy.clearCookies(); // Clear all cookies before setting new ones
        cy.visit(configData.devEnv.baseUrl)
        cy.setCookie('hubspot-cookie', 'cookieCookie', { domain: '.hubspot.com', path: '/' });
       });

    it("Fill username and password", () => {
        //cy.visit(configData.devEnv.baseUrl)
        loginPage.loginHubSpot(loginData.loginInfo.username, loginData.loginInfo.password)
    });
})
   