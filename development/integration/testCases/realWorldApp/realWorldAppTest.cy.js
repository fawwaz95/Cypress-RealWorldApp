const loginPage = require("../../pageObjects/realWorldApp/realWorldAppLoginPage");
const realWAppPage = require("../../pageObjects/realWorldApp/realWorldAppPage");
const realWAppData = require("../../objectData/realWorldApp/realWorldAppData");

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
        realWAppPage.confirmCreatedTransaction(realWAppData.navView.mine);
        cy.log("Pause.................");
        cy.pause();
    });

});

