import { Icons } from '@commercetools-docs/ui-kit';

const planTagsConfig = {
  plan1: {
    text: 'PLAN1',
    icon: Icons.B2BTagSvgIcon,
    color: 'green',
    overHint: 'This is hover text for tag1',
    href: '/plan',
  },
  plan2: {
    text: 'PLAN2',
    icon: Icons.B2BTagSvgIcon,
    color: 'blue',
    overHint: 'This is hover text for tag2',
    href: '/plan',
  },
  beta: {
    text: 'BETA',
    color: 'blue',
    overHint:
      'This feature is marked as beta and is subject to change. Use with caution.',
    href: '/beta',
  },
};

export default planTagsConfig;
