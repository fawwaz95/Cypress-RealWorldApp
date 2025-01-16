const globalVars = require("../../globalVariables");
const elementPathTypes = globalVars.elementPathTypes;

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
        cy.cyFillInputField(module.exports.locators.css.loginForm.inpUsername, userName);
        cy.cyFillInputField(module.exports.locators.css.loginForm.inpPassword, password);
    },

    clickSignInBtn: () => {
        cy.cyClick(globalVars.locators.css.buttons.btSignin, elementPathTypes.css);
    },
}