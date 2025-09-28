const globalVars = require("../../globalVariables");
const buttons = globalVars.locators.css.buttons;
const elementPathTypes = globalVars.elementPathTypes;

const loginForm = {
    inpUsername: "username",
    inpPassword: "password",
}

module.exports = {
    loginToApp: (userName, password) => {
        module.exports.fillLoginInfo(userName, password);
        module.exports.clickSignInBtn();
    },

    fillLoginInfo: (userName, password) => {
        if(!userName || !password){
            cy.log("Please define a username and password.....");
            return false;
        }
        cy.cyFillInputFieldName(loginForm.inpUsername, userName);
        cy.cyFillInputFieldName(loginForm.inpPassword, password);
    },

    clickSignInBtn: () => {
        cy.cyClick(buttons.btSignin, elementPathTypes.css);
    },
}