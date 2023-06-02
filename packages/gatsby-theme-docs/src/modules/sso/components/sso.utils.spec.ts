import { getAvatarInitials } from './sso.utils';

const cases = [
  { in: '', out: ['', ''] },
  { in: undefined, out: ['', ''] },
  { in: 'test@test.com', out: ['t', 'e'] },
  { in: 'Johnny D', out: ['j', 'd'] },
  { in: 'John Doe', out: ['j', 'd'] },
  { in: 'John', out: ['j', 'o'] },
  { in: 'Doe', out: ['d', 'o'] },
  { in: 'John Many Names', out: ['j', 'm'] },
  { in: 'J', out: ['j', 'j'] },
];

describe('getAvatarInitials', () => {
  test.each(cases)('matches this use case: %o', ({ in: input, out }) => {
    const result = getAvatarInitials(input as string);
    expect(result).toEqual(out);
  });
});
