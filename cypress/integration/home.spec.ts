import { getLoginButton, getTitle } from '../support/utils';

describe('Home', () => {
  it('can log in and view dashboard', () => {
    cy.visit('/');
    getLoginButton().click();
    getTitle().should('contain.text', 'Clients');
  });
});
