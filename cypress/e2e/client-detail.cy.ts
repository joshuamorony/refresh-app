import {
  getAddClientBackButton,
  getClientDetailBackButton,
  getEditButton,
  getLinkDisplay,
  getNameDisplay,
  getRenderJsonValue,
  getSurveyResponseList,
  getTitle,
  getViewSurveyResponseDetailBackButton,
  getViewSurveyResponsesBackButton,
  getViewSurveyResponsesButton,
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
    survey: ['{"someProperty": "someValue"}'],
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

  it('can navigate back to the client detail page from the view response detail page', () => {
    getViewSurveyResponsesButton().click();
    getSurveyResponseList().first().click();

    getViewSurveyResponseDetailBackButton().click();
    getViewSurveyResponsesBackButton().click();

    getNameDisplay().should('contain.text', testClient.name.first);
  });

  it('can navigate back to the client-dashboard', () => {
    getClientDetailBackButton().click();
    getTitle().should('contain.text', 'Clients');
  });

  it('can view the link to the clients history form', () => {
    getLinkDisplay()
      .invoke('val')
      .then((value: string) =>
        assert.isTrue(value.indexOf(`/client-history/${testId}`) > -1)
      );
  });

  it('can view responses to the client history form for individual clients', () => {
    cy.callFirestore('set', 'clients/abc123', testClient);

    getViewSurveyResponsesButton().click();
    getSurveyResponseList().first().click();

    getRenderJsonValue().should('have.value', 'someValue');
  });
});
