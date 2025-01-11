const configData = require("../../../cypress.env.json");
const globalVars = require("../globalVariables.js");

module.exports = {
    locators : {
        buttons: {
            createContactBt: "//*[text='Create contact']",
            actionsBt: "//*[text='Actions']"
        },
    },

    clickSidebarBtn: () => {
        cy.get(globalVars.sidebars.css.crm.main).click();
        cy.get(globalVars.sidebars.css.crm.menuItems.contacts).click();
    },



 /*
    acceptTerms: () => {
        cy.xpath(module.exports.locators.ald.buttons.xpath.acceptBt).click();
        cy.xpath(module.exports.locators.ald.buttons.xpath.saveBt).click();
    },

    visitSite: () => {
        cy.xpath(module.exports.locators.ald.buttons.xpath.siteBt).click();
    },

    confirmShopAllPage: () =>{
        cy.log("confirmShopAllPage function invoked....");
        cy.xpath(module.exports.locators.ald.shopAllPage.xpath.shopAll)
           .should('be.visible')
           .and('contain.text', 'Shop All')
    },

    signIntoPage: () => {
        cy.log("Your message here")
        cy.visit('https://www.bestbuy.ca/authentication/en-ca/signin');
        cy.xpath(module.exports.locators.emailForm.inpEmail).type(configData.devEnv.username);
        cy.xpath(module.exports.locators.buttons.btNext).click(); 
        cy.xpath(module.exports.locators.emailForm.inpPassword).type(configData.devEnv.password);
        cy.xpath(module.exports.locators.buttons.btSignin).click();
    },*/
}
