const globalVars = require("../../globalVariables");
const cssButtons  = globalVars.locators.css.buttons;
const labelButtons = globalVars.labels.buttons;
const searchField = globalVars.locators.css.inpSearchField;
const userList = globalVars.locators.css.contactList.userList;
const sideBarBtns = globalVars.sideBarBtns;
const navView = globalVars.locators.css.navView;
const elementPathTypes = globalVars.elementPathTypes;

const transactionForm = {
    inpAmount: "amount",
    inpNote: "description"
};

const userSettingsForm = {
    inpFirstName: "firstName",
    inpLastName: "lastName",
    inpEmail: "email",
    inpPhoneNr: "phoneNumber",
};

module.exports = { 
    createSimpleTransaction: (contactName, amount, note) => {
        cy.log("Invoked createSimpleTransaction func.....");
        module.exports.clickNewBtn();
        module.exports.searchForContact(contactName);
        module.exports.selectContact(contactName);
        module.exports.fillTransactionForm(amount, note);
        module.exports.clickPayBtn();
    },

    saveUserSettings: (userObj) => {
        module.exports.fillUserSettingsForm(userObj);
        module.exports.clickSaveBtn();
    },
    
    selectContact: (contactName) => {
        const selContactName = `//*[contains(text(),'${contactName}')]`;
        cy.cyClick(selContactName, elementPathTypes.xpath);
    },

    searchForContact: (contactName) => {
        cy.cyFillInputFieldElPath(searchField, contactName);
    },

    fillTransactionForm: (amount, note) => {
        cy.cyFillInputFieldName(transactionForm.inpAmount, amount);
        cy.cyFillInputFieldName(transactionForm.inpNote, note);
    },

    fillUserSettingsForm: (userInfoObj) => {
        cy.cyFillInputFieldName(userSettingsForm.inpFirstName, userInfoObj.firstName, true);
        cy.cyFillInputFieldName(userSettingsForm.inpLastName, userInfoObj.lastName, true);
        cy.cyFillInputFieldName(userSettingsForm.inpEmail, userInfoObj.email, true);
        cy.cyFillInputFieldName(userSettingsForm.inpPhoneNr, userInfoObj.phoneNr, true);
    },
    clickNewBtn: () => {
        cy.cyClick(cssButtons.btNew, elementPathTypes.css);
    },

    clickPayBtn: () => {
        cy.cyClick(cssButtons.btPay, elementPathTypes.css);
    },

    clickSideBarBtn: (sideBarName) => {
        cy.cyClickSidebar(sideBarName);
    },

    clickSaveBtn: () => {
        cy.cyClick(labelButtons.btSave, elementPathTypes.bt);
    },

    clickNavBtn: (viewToClick) => {

        if(viewToClick === "Everyone"){
            cy.cyClick(navView.everyone, elementPathTypes.css);
        }else if (viewToClick === "Friends"){
            cy.cyClick(navView.friends, elementPathTypes.css);
        }else if (viewToClick === "Mine"){
            cy.cyClick(navView.mine, elementPathTypes.css);
        }else{
            cy.log("Please define a correct view to click......");
        }
    },

    checkIfTextExists: (pathType, elementPath, expectedValue) => {
        const elPathType = pathType.toLowerCase();

        if(elPathType === "xpath"){
            cy.log(`Checking value with xpath......${elementPath}`);
            cy.xpath(elementPath).should("be.visible").should("contain", expectedValue);
        }else if (elPathType === "css"){
            cy.log(`Checking value with css path......${elementPath}`);
            cy.get(elementPath).should("be.visible").should("contain", expectedValue);
        }else{
            throw new Error(`Invalid path type ${pathType}`);
        }
    },

    checkIfValueExistsCss: (elementPath, exepctedValue) => {
        cy.get(elementPath).first().should("contain", exepctedValue);
    },

}