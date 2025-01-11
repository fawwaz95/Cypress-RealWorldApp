const loginPage = require("../../pageObjects/realWorldApp/realWorldAppLoginPage");
const realWAppPage = require("../../pageObjects/realWorldApp/realWorldAppPage");
const realWAppData = require("../../objectData/realWorldApp/realWorldAppData");
const globalVar = require("../../globalVariables");
const elementPaths  = globalVar.elementPathTypes;
const topNavView = globalVar.labels.topNavView;

describe("Real World App Transation tests......", () =>{
    beforeEach(() => {
        cy.session("loginSession", () => {
            cy.visit("/");
            loginPage.loginToApp(realWAppData.simpleLoginInfo.username, realWAppData.simpleLoginInfo.password);
        });
    });

    it("Should create a new transaction", () => {
        cy.visit("/");
        realWAppPage.createSimpleTransaction(realWAppData.simpleTransaction.contact, realWAppData.simpleTransaction.amount, realWAppData.simpleTransaction.note);
    });

    it("Should check if the transaction was created", () => {
        cy.visit("/");
        realWAppPage.confirmCreatedTransaction(topNavView.mine);
        realWAppPage.checkIfTextExists(elementPaths.xpath, realWAppData.simpleTransaction.elementPathXpath, realWAppData.simpleTransaction.amount);
        realWAppPage.checkIfTextExists(elementPaths.css, realWAppData.simpleTransaction.elementPathCss, realWAppData.simpleTransaction.note);
        cy.log("Pause.................");
        cy.pause();
    });

});

