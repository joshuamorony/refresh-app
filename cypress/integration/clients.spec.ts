import { getItemsInList } from '../support/utils';

describe('Clients', () => {
  const testDocId = 'abc123';

  beforeEach(() => {
    cy.login();
    cy.visit('/clients');
  });

  it('can see a list of clients', () => {
    cy.callFirestore('set', `clients/${testDocId}`, {
      name: {
        first: 'Josh',
        last: 'Morony',
      },
    });

    const listOfClients = getItemsInList();
    listOfClients.should('contain.text', 'Josh Morony');
  });

  afterEach(() => {
    cy.callFirestore('delete', 'clients');
  });
});
