export const getLoginButton = () => cy.get('[data-test=login-button]');
export const getTitle = () => cy.get('[data-test=page-title]');
export const getItemsInList = () => cy.get('[data-test=list] ion-item');

// Client form
export const getAddClientButton = () =>
  cy.get('[data-test="add-client-button"]');
export const getFirstNameField = () =>
  cy.get('[data-test="first-name-input"] input');
export const getLastNameField = () =>
  cy.get('[data-test="last-name-input"] input');
export const getEmailField = () => cy.get('[data-test="email-input"] input');
export const getPhoneField = () => cy.get('[data-test="phone-input"] input');
export const getNotesField = () => cy.get('[data-test="notes-input"] textarea');
export const getSaveButton = () => cy.get('[data-test="first-name-input"]');
