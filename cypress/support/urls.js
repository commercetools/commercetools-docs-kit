// eslint-disable-next-line import/prefer-default-export
export const isCI = Cypress.env('CI') === true;

export const URL_DOCS_SMOKE_TEST = isCI ? `/docs-smoke-test/` : `/`;
