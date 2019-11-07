// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @param `on` is used to hook into various events Cypress emits
 * @param `config` is the resolved Cypress config
 * @return {[type]} [description]
 */

// Reference: https://docs.cypress.io/api/plugins/configuration-api.html#Promises

/* eslint-disable global-require */

const percyHealthCheck = require('@percy/cypress/task');

module.exports = on => {
  on('task', percyHealthCheck);
};
