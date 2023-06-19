import { User } from '@auth0/auth0-react';
import { getAvatarInitials } from './sso.utils';

const baseProfile: User = {
  address: 'xxx',
  phone_number: '123',
  nickname: 'gg',
};

const cases = [
  { in: {}, out: ['', ''] },
  { in: baseProfile, out: ['', ''] },
  { in: { ...baseProfile, email: 'test@test.com' }, out: ['t', 'e'] },
  {
    in: { ...baseProfile, email: 'test@test.com', name: 'Marcus Miller' },
    out: ['m', 'm'],
  },
  {
    in: {
      ...baseProfile,
      email: 'test@test.com',
      name: 'Marcus Miller Darren',
    },
    out: ['m', 'm'],
  },
  {
    in: {
      ...baseProfile,
      email: 'test@test.com',
      name: 'Marcus Miller Darren',
      given_name: 'Marcus Miller',
      family_name: 'Darren',
    },
    out: ['m', 'd'],
  },
  {
    in: {
      ...baseProfile,
      email: 'test@test.com',
      name: 'John Doe',
    },
    out: ['j', 'd'],
  },
  {
    in: {
      ...baseProfile,
      email: 'test@test.com',
      'https://docs.commercetools.com/display_name': 'John Doe',
    },
    out: ['j', 'd'],
  },
  {
    in: {
      ...baseProfile,
      email: 'test@test.com',
      name: 'John',
    },
    out: ['j', 'o'],
  },
  {
    in: {
      ...baseProfile,
      email: 'test@test.com',
      name: 'J',
    },
    out: ['j', 'j'],
  },
];

describe('getAvatarInitials', () => {
  test.each(cases)('matches this use case: %o', ({ in: input, out }) => {
    const result = getAvatarInitials(input);
    expect(result).toEqual(out);
  });
});
