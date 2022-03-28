import {
  getSurveyForm,
  getSubmitButton,
  getThankYouMessage,
} from '../support/utils';

describe('Survey', () => {
  beforeEach(() => {
    cy.callFirestore('delete', 'clients');

    cy.intercept('GET', '/assets/survey-form.json', {
      fixture: 'survey-form.json',
    });

    cy.callFirestore('set', `clients/abc123`, {
      name: {
        first: 'Josh',
        last: 'Morony',
      },
    });

    cy.visit('/client-history/abc123');
  });

  it('can submit survey form', () => {
    getSurveyForm().should('exist');
    getSubmitButton().click();
    cy.get('form', { timeout: 10000 }).should('not.exist');
    getSubmitButton().should('not.exist');
    getThankYouMessage().should('be.visible');
  });
});
