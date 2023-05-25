import { Then } from '@badeball/cypress-cucumber-preprocessor';

Then('The test user should be reset', () => {
  cy.request(
    'DELETE',
    'https://learning-api-git-ga-delete-test-user-commercetools.vercel.app/api/users/delete-e2e'
  ).then((response) => {
    expect(response.body).to.have.property('deleted', true);
  });
});
