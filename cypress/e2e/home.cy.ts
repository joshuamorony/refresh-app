import {
  getFeedbackButton,
  getForm,
  getLoginButton,
  getTitle,
} from '../support/utils';

describe('Home', () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/');
  });

  it('can log in and view dashboard', () => {
    getLoginButton().click();
    getTitle().should('contain.text', 'Clients');
  });

  it('can click feedback button to get to the feedback page', () => {
    getFeedbackButton().click();
    getForm().should('exist');
  });
});
