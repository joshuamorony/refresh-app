export const getLoginButton = () => cy.get('[data-test=login-button]');
export const getLogoutButton = () => cy.get('[data-test="logout-button"]');
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
export const getSaveButton = () => cy.get('[data-test="save-client-button"]');
export const getAddClientBackButton = () =>
  cy.get('[data-test="add-client-back-button"]');

export const getEditButton = () => cy.get('[data-test="edit-button"]');

// Client Display
export const getNameDisplay = () => cy.get('[data-test="client-name-display"]');
export const getEmailDisplay = () =>
  cy.get('[data-test="client-email-display"]');
export const getPhoneDisplay = () =>
  cy.get('[data-test="client-phone-display"]');
export const getNotesDisplay = () =>
  cy.get('[data-test="client-notes-display"]');
export const getClientDetailBackButton = () =>
  cy.get('[data-test="client-detail-back-button"]');
export const getDeleteButton = () => cy.get('[data-test="delete-button"]');
export const getConfirmButton = () => cy.get('#confirm-delete');
export const getLinkDisplay = () => cy.get('[data-test="link-display"]');

// Feedback
export const getForm = () => cy.get('[data-test="feedback-form"]');
export const getSubmitButton = () => cy.get('[data-test="save-form-button"]');
export const getThankYouMessage = () =>
  cy.get('[data-test="thankyou-message"]');
export const getViewFeedbackButton = () =>
  cy.get('[data-test="view-feedback-button"]');
export const getViewFeedbackBackButton = () =>
  cy.get('[data-test="view-feedback-back-button"]');
export const getViewFeedbackDetailBackButton = () =>
  cy.get('[data-test="view-feedback-detail-back-button"]');
export const getItemsInFeedbackList = () =>
  cy.get('[data-test="feedback-list"] ion-item');

export const getRenderJsonValue = () => cy.get('[data-test="json-value"]');

export const getFeedbackButton = () => cy.get('[data-test="feedback-button"]');

// Survey
export const getSurveyForm = () => cy.get('[data-test="survey-form"]');
