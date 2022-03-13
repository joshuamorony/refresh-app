import {
  getAddClientButton,
  getEmailField,
  getFirstNameField,
  getItemsInList,
  getLastNameField,
  getNotesField,
  getPhoneField,
  getSaveButton,
} from '../support/utils';

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

  it('can add a new client', () => {
    // Add a new client
    getAddClientButton().click();
    getFirstNameField().type('Josh');
    getLastNameField().type('Morony');
    getEmailField().type('joshua.morony@gmail.com');
    getPhoneField().type('555555555');
    getNotesField().type('this is a note');
    getSaveButton().click();

    // Expect that the client is now in the clients list
    const listOfClients = getItemsInList();
    listOfClients.should('contain.text', 'Josh Morony');
  });

  afterEach(() => {
    cy.callFirestore('delete', 'clients');
  });
});
