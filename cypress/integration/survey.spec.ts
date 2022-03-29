import {
  getSurveyForm,
  getSubmitButton,
  getThankYouMessage,
} from '../support/utils';

describe('Survey', () => {
  beforeEach(() => {
    cy.callFirestore('delete', 'clients');

    cy.callFirestore('set', `clients/abc123`, {
      name: {
        first: 'Josh',
        last: 'Morony',
      },
      survey: ['{"someProperty": "someValue"}'],
    });

    cy.visit('/client-history/abc123');
  });

  it('can submit survey form', () => {
    getSurveyForm().should('exist');

    getSurveyForm()
      .get('ion-datetime')
      .shadow()
      .find('[data-day="16"]')
      .first()
      .click();
    getSurveyForm().get('[ng-reflect-name="name"] textarea').type('a');
    getSurveyForm().get('[ng-reflect-name="address"] textarea').type('a');
    getSurveyForm().get('[ng-reflect-name="phone"] textarea').type('a');
    getSurveyForm().get('[ng-reflect-name="occupation"] textarea').type('a');
    getSurveyForm().get('[ng-reflect-name="emergencyName"] textarea').type('a');
    getSurveyForm()
      .get('[ng-reflect-name="emergencyNumber"] textarea')
      .type('a');
    getSurveyForm()
      .get('[ng-reflect-name="emergencyRelationship"] textarea')
      .type('a');
    getSurveyForm()
      .get('[ng-reflect-name="previousMassage"] [ng-reflect-value="yes"]')
      .click();
    getSurveyForm().get('[ng-reflect-name="reason"] textarea').type('a');
    getSurveyForm()
      .get('[ng-reflect-name="doctor"] [ng-reflect-value="yes"]')
      .click();
    getSurveyForm()
      .get('[ng-reflect-name="medication"] [ng-reflect-value="yes"]')
      .click();
    getSurveyForm()
      .get('[ng-reflect-name="allergies"] [ng-reflect-value="yes"]')
      .click();
    getSurveyForm()
      .get('[ng-reflect-name="buttocks"] [ng-reflect-value="yes"]')
      .click();

    getSubmitButton().click();
    cy.get('form', { timeout: 10000 }).should('not.exist');
    getSubmitButton().should('not.exist');
    getThankYouMessage().should('be.visible');
  });
});
