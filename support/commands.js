require('cypress-xpath')


//cyFillInputField command to fill inputfield with either xpath or css path
Cypress.Commands.add("cyFillInputFieldElPath", (locator, value) => {
    cy.log(`cyFillInputFieldElPath params {} => locator: ${locator} value:${value}`);

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
        throw error;
    }
});

//cyfillInputFieldName command to fill inputfield with a name
Cypress.Commands.add("cyFillInputFieldName", (name, value) => {
    cy.log(`cyFillInputFieldName params {} => name: ${name} value:${value}`);

    if(name === undefined || name === null || name === ""){
        throw new Error("Invalid name: A valid name must be provided.");
    }

    if(value === undefined || value === null || value === ""){
        cy.log(`No value provided for field '${name}'.....`);
        return undefined;
    }

    const inpName = `input[name='${name}']`;

    cy.get(inpName).should("be.visible").scrollIntoView().clear().type(value);

})

//cyClick command to click an element on the screen using css/xpath/id/button title
Cypress.Commands.add("cyClick", (locator, locatorType) => {
    cy.log(`cyClick params {} => locator: ${locator} locatorType:${locatorType}`);

    if (!locator || typeof locator !== "string") {
        throw new Error("Invalid locator: A valid string locator must be provided.");
    }

    switch(locatorType.toLowerCase()){
        case "css": 
            cy.get(locator).should("be.visible").first().scrollIntoView().click({ force: true });
            break;
        case "xpath":
            cy.xpath(locator).should("be.visible").first().scrollIntoView().click({ force: true });
            break;
        case "id":
            cy.get(locator).should("be.visible").first().scrollIntoView().click({ force: true });
            break;
        case "button":
            cy.contains(locator).should("be.visible").first().scrollIntoView().click({ force: true });
            //cy.get(`button[title='${locator}']`).should("be.visible").scrollIntoView().click();
            break;
        default:
            throw new Error(`Unsupported locatorType: '${locatorType}'. Please use 'css', 'xpath', 'bt' or 'id'.`);
    }
})

Cypress.Commands.add("cyClickSidebar", (value) => {

    cy.log(`cyClickSidebar params {} => type: ${typeof value} value:${value}`);

    if(value === undefined || value === null || value === ""){
        cy.log(`cyClickSidebar params {} => type: ${typeof value} value:${value}`);
        throw new Error("Invalid value: A valid value must be provided.");
    }
    
    const selSidebar = `[data-test='${value}']`;
    cy.get(selSidebar).should("be.visible").scrollIntoView().click();
})