const hubSpotContacts = require('../pageObjects/hubspotContactsPage.js');
const configData = require("../../../cypress.env.json");

describe('Loading Hubspot CRM.....', () => {
  beforeEach(() => {
    cy.visit(configData.devEnv.baseUrl);
  });
  it('Go to the "Contacts" sidebar', () => {
    hubSpotContacts.clickSidebarBtn();
  });
});
