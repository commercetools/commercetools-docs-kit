import { Icons } from '@commercetools-docs/ui-kit';

const planTagsConfig = {
  plan1: {
    text: 'TAG1',
    icon: Icons.B2BTagSvgIcon,
    color: 'green',
    overHint: 'This is hover text for tag1',
    href: '/views/markdown',
  },
  plan2: {
    text: 'TAG2',
    icon: Icons.B2BTagSvgIcon,
    color: 'blue',
    overHint: 'This is hover text for tag2',
    href: '/views/empty',
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
