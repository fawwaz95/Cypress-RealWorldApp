const globalVars = require("../../globalVariables");

module.exports = {
    locators : {
        css: {
            loginForm: {
                inpUsername: "#username",
                inpPassword: "#password"
            }
        },
    },

    loginToApp: (userName, password) => {
        module.exports.fillLoginInfo(userName, password);
        module.exports.clickSignInBtn();
    },

    fillLoginInfo: (userName, password) => {
        if(!userName || !password){
            cy.log("Please define a username and password.....");
            return false;
        }
        cy.get(module.exports.locators.css.loginForm.inpUsername).type(userName);
        cy.get(module.exports.locators.css.loginForm.inpPassword).type(password);
        
    },

    clickSignInBtn: () => {
        cy.get(globalVars.locators.css.buttons.btSignin).click();
    },
}