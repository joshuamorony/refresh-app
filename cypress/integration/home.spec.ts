import { getLoginButton, getTitle } from '../support/utils';

describe('Home', () => {
  beforeEach(() => {
    cy.login();
  });

  it('can log in and view dashboard', () => {
    cy.visit('/');
    getLoginButton().click();
    getTitle().should('contain.text', 'Clients');
  });
});
