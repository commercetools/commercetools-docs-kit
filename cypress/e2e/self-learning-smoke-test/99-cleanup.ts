import { Then } from '@badeball/cypress-cucumber-preprocessor';
import { resetUser } from '../../support/step_definitions/common.steps';

Then('Attempt to reset e2e user', () => {
  resetUser();
});
