import { isTestUserEmail } from './quiz.utils';

const cases = [
  ['', false],
  [' ', false],
  ['john.doe@commercetools.com', false],
  ['john.doe+testme@commercetools.com', false],
  ['john.doe+test@commercetools.com ', false],
  ['john.doe+test@commercetools.com', true],
  ['+test@commercetools.com', true],
  ['johndoe+test@commercetools.com', true],
];

describe('isTestUserEmail', () => {
  test.each(cases)(
    'given %p as argument, returns %p',
    (firstArg, expectedResult) => {
      const result = isTestUserEmail(firstArg as string);
      expect(result).toEqual(expectedResult as boolean);
    }
  );
});
