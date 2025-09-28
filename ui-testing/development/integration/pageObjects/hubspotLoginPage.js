const globalVars = require("../globalVariables.js");

const loginForm = {
    inpEmail: "[id='username']",
    inpPassword: "[id='current-password']",
};

module.exports = {
    locators: {
        buttons: {
            xpath:{
                signInWithPass: "//*[contains(text(),'HubSpot password instead')]",
            },
        },
    },

    loginHubSpot: (userName, password) => {
        if(!userName || !password){
            cy.log("Please enter a username and password......");
            return false;
        }
        cy.get(loginForm.inpEmail).type(userName);
        cy.get(globalVars.buttons.css.nextBt).click();
        cy.xpath(module.exports.locators.buttons.xpath.signInWithPass).click();
        cy.get(loginForm.inpPassword).type(password);
        cy.get(globalVars.buttons.css.loginBt).click();
        cy.pause();
    }
}