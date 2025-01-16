require('cypress-xpath')


//cyFillInputField command
Cypress.Commands.add("cyFillInputField", (locator, value) => {

    if (!locator || typeof locator !== "string") {
        throw new Error("Invalid locator: A valid string locator must be provided.");
    }
    if (value === undefined || value === null) {
        throw new Error("Invalid value: A valid value must be provided.");
    }

    const isXPath = locator.startsWith("//") || locator.startsWith("(");

    try {
        if (isXPath) {
            cy.log("Entering value into field using XPath...");
            cy.xpath(locator).should('be.visible').scrollIntoView().type(value, { log: false });
        } else {
            cy.log("Entering value into field using CSS...");
            cy.get(locator).should('be.visible').scrollIntoView().type(value, { log: false });
        }
    } catch (error) {
        cy.log(`Error interacting with the input field: ${error.message}`);
        throw error;  // Ensure test fails on error
    }
});


Cypress.Commands.add("cyClick", (locator, locatorType) => {
    if (!locator || typeof locator !== "string") {
        throw new Error("Invalid locator: A valid string locator must be provided.");
    }

    switch(locatorType.toLowerCase()){
        case "css": 
            cy.get(locator).should("be.visible").scrollIntoView().click();
            break;
        case "xpath":
            cy.xpath(locator).should("be.visible").scrollIntoView().click();
            break;
        case "id":
            cy.get(locator).should("be.visible").scrollIntoView().click();
            break;
        case "bt":
            cy.get(`button[title='${locator}']`).should("be.visible").scrollIntoView().click();
            break;
        default:
            throw new Error(`Unsupported locatorType: '${locatorType}'. Please use 'css', 'xpath', or 'bt'.`);
    }
})