describe("Zoho Test", () => {
    beforeEach(() => {
      cy.visit("https://accounts.zohocloud.ca/signin");
    });
    it("Sign into zoho", () => {
      cy.get("#login_id").type("fawwaz_95@hotmail.com");
      cy.get("#nextbtn").click();
      cy.get("#password").type("FawwazAhmad2024");
      cy.pause();
      cy.xpath("//*[(@id='nextbtn')]//*[(text()='Sign in')]").should('be.visible').click();
      cy.xpath("//*[(text()='Modules')]").contains("Modules");
      
      cy.pause();
      cy.intercept('POST', '**/signin', (req) => {
        req.reply((res) => {
            cy.log('Response:', res);
        });
    });
    cy.pause();

    //cy.xpath("//*[(text()='Modules')]").contains("Modules");
        
    });
  });