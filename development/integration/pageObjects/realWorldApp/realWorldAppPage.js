const globalVars = require("../../globalVariables");
const cssButtons  = globalVars.locators.css.buttons;
const searchField = globalVars.locators.css.inpSearchField;
const userList = globalVars.locators.css.contactList.userList;
const navView = globalVars.locators.css.navView;

module.exports = { 
    locators: {
        css: {
            forms: {
                transactionForm: {
                    inpAmount: "input[name='amount']",
                    inpNote: "input[name='description']"
                }
            },
        },
    },
    createSimpleTransaction: (contactName, amount, note) => {
        cy.log("Invoked createSimpleTransaction func.....");
        module.exports.clickNewBtn();
        module.exports.searchForContact(contactName);
        module.exports.selectContact(contactName);
        module.exports.fillTransactionForm(amount, note);
        module.exports.clickPayBtn();
    },

    confirmCreatedTransaction: (clickView) => {
        cy.log("Invoked confirmCreatedTransaction.....");
        module.exports.clickNavBtn(clickView);
    },
    
    selectContact: (contactName) => {
        cy.log("Invoked selectContact func.....");
        cy.get(userList).should("be.visible").contains(contactName).scrollIntoView().click();
    },

    searchForContact: (contactName) => {
        cy.log("Invoked searchForContact func......");
        cy.get(searchField).type(contactName);
    },

    fillTransactionForm: (amount, note) => {
        cy.log("Invoked fillTransactionForm func......");
        cy.get(module.exports.locators.css.forms.transactionForm.inpAmount).type(amount);
        cy.get(module.exports.locators.css.forms.transactionForm.inpNote).type(note);
    },

    checkIfTextExists: (pathType, elementPath, expectedValue) => {
        cy.log("Invoked checkIfTextExistsCss func......");
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
        cy.log("Invoked checkIfValueExistsCss func......");
        cy.get(elementPath).first().should("contain", exepctedValue);
    },

    clickNewBtn: () => {
        cy.log("Invoked clickNewBtn func......");
        cy.get(cssButtons.btNew).click();
    },

    clickPayBtn: () => {
        cy.log("Invoked clickPayBtn func......");
        cy.get(cssButtons.btPay).click();
    },

    clickSideBarBtn: () => {
        cy.log("Invoked clickSideBarBtn func......");
    },

    clickNavBtn: (viewToClick) => {
        cy.log("Invoked clickNavBtn func......");
        cy.log("CLicking nav view......" + viewToClick);

        if(viewToClick === "Everyone"){
            cy.get(navView.everyone).should("be.visible").scrollIntoView().click(); //Put in a custom command later (cyClickInputField)
        }else if (viewToClick === "Friends"){
            cy.get(navView.friends).should("be.visible").scrollIntoView().click();
        }else if (viewToClick === "Mine"){
            cy.get(navView.mine).should("be.visible").scrollIntoView().click();
        }else{
            cy.log("Please define a correct view to click......");
        }
    },

}