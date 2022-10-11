///<reference path="../global.d.ts" />

import '@percy/cypress';
import '@testing-library/cypress/add-commands';

Cypress.Commands.add('setMobileViewport', () => {
  cy.viewport(512, 1024);
});
Cypress.Commands.add('setTabletViewport', () => {
  cy.viewport(956, 1024);
});
Cypress.Commands.add('setDesktopViewport', () => {
  cy.viewport(1280, 1024);
});
