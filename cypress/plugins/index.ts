// Plugins enable you to tap into, modify, or extend the internal behavior of Cypress
// For more info, visit https://on.cypress.io/plugins-api
const admin = require('firebase-admin');
const cypressFirebasePlugin = require('cypress-firebase').plugin;

module.exports = (on, config) => {
  const extendedConfig = cypressFirebasePlugin(on, config, admin);

  // Add other plugins/tasks such as code coverage here

  return extendedConfig;
};
