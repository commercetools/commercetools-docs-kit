import React from 'react';
import { render } from '@testing-library/react';

import { PurePagination } from './content-pagination';

describe('Rendering', () => {
  const data = createTestData();

  it('should not render any pagination button if the slug does not match', async () => {
    const slug = '/slugs';

    const rendered = render(<PurePagination slug={slug} data={data} />);

    expect(rendered.queryByText('Previous:')).not.toBeInTheDocument();
    expect(rendered.queryByText('Next:')).not.toBeInTheDocument();
  });

  it('should render both pagination buttons if slug matches', async () => {
    const slug = '/chapter-1/page-2';

    const rendered = render(<PurePagination slug={slug} data={data} />);

    expect(rendered.getByText('Previous:')).toBeInTheDocument();
    expect(rendered.getByText('Next:')).toBeInTheDocument();
    expect(rendered.getByText('page 1')).toBeInTheDocument();
    expect(rendered.getByText('page 3')).toBeInTheDocument();
  });

  it('should render only previous button', async () => {
    const slug = '/chapter-1/page-3';

    const rendered = render(<PurePagination slug={slug} data={data} />);

    expect(rendered.getByText('Previous:')).toBeInTheDocument();
    expect(rendered.queryByText('Next:')).not.toBeInTheDocument();
    expect(rendered.getByText('page 2')).toBeInTheDocument();
  });

  it('should render only next button', async () => {
    const slug = '/chapter-1/page-1';

    const rendered = render(<PurePagination slug={slug} data={data} />);

    expect(rendered.queryByText('Previous:')).not.toBeInTheDocument();
    expect(rendered.getByText('Next:')).toBeInTheDocument();
    expect(rendered.getByText('page 2')).toBeInTheDocument();
  });
});

function createTestData(custom) {
  return {
    allNavigationYaml: {
      nodes: [
        {
          chapterTitle: 'chapter 1',
          pages: [
            {
              title: 'page 1',
              path: '/chapter-1/page-1',
            },
            {
              title: 'page 2',
              path: '/chapter-1/page-2',
            },
            {
              title: 'page 3',
              path: '/chapter-1/page-3',
            },
          ],
        },
        {
          chapterTitle: 'chapter 2',
          pages: [
            {
              title: 'page 1',
              path: '/chapter-2/page-1',
            },
            {
              title: 'page 2',
              path: '/chapter-2/page-2',
            },
          ],
        },
        {
          chapterTitle: 'chapter 3',
        },
      ],
    },
    ...custom,
  };
}
