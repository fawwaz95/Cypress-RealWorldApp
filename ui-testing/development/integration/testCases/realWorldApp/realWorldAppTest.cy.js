const loginPage = require("../../pageObjects/realWorldApp/realWorldAppLoginPage");
const realWAppPage = require("../../pageObjects/realWorldApp/realWorldAppPage");
const realWAppData = require("../../objectData/realWorldApp/realWorldAppData");
const globalVar = require("../../globalVariables");
const realWorldAppData = require("../../objectData/realWorldApp/realWorldAppData");
const sideBarBtns = globalVar.locators.css.sidebars;
const elementPaths  = globalVar.elementPathTypes;
const topNavView = globalVar.labels.topNavView;

describe("Real World App Transation tests.....", () =>{
   it("Should create a new transaction", () => {
        cy.visit("/");
        realWAppPage.createSimpleTransaction(realWAppData.simpleTransaction.contact, realWAppData.simpleTransaction.amount, realWAppData.simpleTransaction.note);
    });

    it("Should check if the transaction was created", () => {
        cy.visit("/");
        realWAppPage.clickNavBtn(topNavView.mine);
        realWAppPage.checkIfTextExists(elementPaths.xpath, realWAppData.simpleTransaction.elementPathXpath, realWAppData.simpleTransaction.amount);
        realWAppPage.checkIfTextExists(elementPaths.css, realWAppData.simpleTransaction.elementPathCss, realWAppData.simpleTransaction.note);
    });

});

describe("Fill in User Information within User Settings", () => {
    it("Should fill in user settings form", () => {
        cy.visit("/");
        realWAppPage.clickSideBarBtn(sideBarBtns.myAccount);
        realWAppPage.saveUserSettings(realWAppData.simpleUserSettings);
    });
})

describe("Create a new Bank account", () => {
    it("Should create a new Bank account", () => {
        cy.visit("/");
        realWAppPage.clickSideBarBtn(sideBarBtns.bankAccounts);
        realWAppPage.createSimpleBankAccount(realWAppData.simpleBankAccount);
    });

    it("Should check if the Bank account was created", () => {
        cy.visit("/");
        realWAppPage.clickSideBarBtn(sideBarBtns.bankAccounts);
        realWAppPage.checkIfTextExists(elementPaths.xpath, realWAppData.simpleBankAccount.elementPathXpath, realWAppData.simpleBankAccount.bankName);
    });

    it("Should delete the created Bank account", () => {
        cy.visit("/");
        realWAppPage.clickSideBarBtn(sideBarBtns.bankAccounts);
        realWAppPage.deleteBankAccount(realWAppData.simpleBankAccount.bankName);
    });
})

describe("Check if the Latest transaction exist under 'MINE'", () => {
    it("Should successfully go to the Home page, click 'MINE', select valid date range, confirm latest transaction", () => {
        cy.visit("/");
        realWAppPage.clickSideBarBtn(sideBarBtns.home);
        realWAppPage.clickNavBtn(topNavView.mine);
        realWAppPage.selectDate(realWAppData.simpleDates.from, realWAppData.simpleDates.to);
        realWAppPage.checkIfTextExists(globalVar.elementPathTypes.xpath,
                                       realWAppData.simpleDates.latestTransactionElPath,
                                       realWAppData.simpleDates.latestTransactionExpVal);
    });
})

