import { getForm, getSubmitButton, getThankYouMessage } from '../support/utils';

describe('Feedback', () => {
  beforeEach(() => {
    cy.visit('/feedback');
  });

  it('can submit feedback form', () => {
    getForm().should('exist');
    getSubmitButton().click();
    getForm().should('not.exist');
    getSubmitButton().should('not.exist');
    getThankYouMessage().should('be.visible');
  });
});
