import { getAddClientBackButton, getTitle } from '../support/utils';

describe('Clients', () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/clients/add');
    cy.callFirestore('delete', 'clients');
  });

  it('can navigate back to the client dashboard', () => {
    getAddClientBackButton().click();
    getTitle().should('contain.text', 'Clients');
  });
});
