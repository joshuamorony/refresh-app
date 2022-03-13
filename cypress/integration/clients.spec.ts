import {
  getAddClientButton,
  getEditButton,
  getEmailField,
  getFirstNameField,
  getItemsInList,
  getLastNameField,
  getNameDisplay,
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

  it('can edit a clients details', () => {
    cy.callFirestore('set', 'clients/abc123', {
      name: {
        first: 'Josh',
        last: 'Morony',
      },
    });

    const testEditedName = 'Amir';

    getItemsInList().first().click();
    getEditButton().click();
    getFirstNameField().clear();
    getFirstNameField().type(testEditedName);
    getSaveButton().click();

    getNameDisplay().should('contain.text', testEditedName);
  });

  afterEach(() => {
    cy.callFirestore('delete', 'clients');
  });
});
