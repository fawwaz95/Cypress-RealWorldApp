require('cypress-xpath')
import './commands';


// You can add global configurations or commands here
beforeEach(() => {
    cy.log('Running before each test');
});