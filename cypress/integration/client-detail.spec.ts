import {
  getAddClientBackButton,
  getClientDetailBackButton,
  getEditButton,
  getNameDisplay,
  getTitle,
} from '../support/utils';

describe('Clients', () => {
  const testId = 'abc123';

  const testClient = {
    name: {
      first: 'Josh',
      last: 'Morony',
    },
    phone: '333',
    email: 'joshua.morony@gmail.com',
    notes: '',
  };

  beforeEach(() => {
    cy.login();
    cy.callFirestore('delete', 'clients');

    cy.callFirestore('set', `clients/${testId}`, testClient);

    cy.visit(`clients/${testId}`);
  });

  it('can navigate back to the clients detail page after visiting the client add page', () => {
    getEditButton().click();
    getAddClientBackButton().click();
    getNameDisplay().should('contain.text', testClient.name.first);
  });

  it('can navigate back to the client-dashboard', () => {
    getClientDetailBackButton().click();
    getTitle().should('contain.text', 'Clients');
  });
});
