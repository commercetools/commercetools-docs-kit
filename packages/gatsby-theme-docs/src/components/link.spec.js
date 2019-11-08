import React from 'react';
import { render } from '@testing-library/react';
import {
  createMemorySource,
  createHistory,
  LocationProvider,
} from '@reach/router';
import { useSiteData } from '../hooks/use-site-data';
import Link from './link';

jest.mock('../hooks/use-site-data');

// for some types of tests you want a memory source
const renderLink = (ui, initialPath) => {
  const source = createMemorySource(initialPath);
  const history = createHistory(source);
  return render(<LocationProvider history={history}>{ui}</LocationProvider>);
};

const pathPrefix = '/prefix';
const withPrefix = path => [pathPrefix, path].join('/').replace(/\/\/+/g, '/');

describe('rendering', () => {
  beforeEach(() => {
    useSiteData.mockClear();
    useSiteData.mockReturnValue({ pathPrefix });
  });
  const scenarios = [
    {
      title: 'image link',
      props: { href: '/static/123' },
      location: { pathname: '/page-1/' },
      expected: { role: 'image-link' },
    },
    {
      title: 'external link',
      props: {
        href: 'https://github.com/commercetools/commercetools-docs-kit',
      },
      location: { pathname: '/page-1/' },
      expected: { role: 'external-link' },
    },
    {
      title: 'anchor link',
      props: { href: '#title-1' },
      location: { pathname: '/page-1/' },
      expected: { role: 'anchor-link' },
    },
    {
      title: 'anchor link to same page',
      props: { href: '/page-1/' },
      location: { pathname: '/page-1/' },
      expected: { role: 'anchor-link', href: '' },
    },
    {
      title: 'anchor link empty',
      props: { href: '' },
      location: { pathname: '/page-1/' },
      expected: { role: 'anchor-link' },
    },
    {
      title: 'history link to another page',
      props: { href: '/page-2' },
      location: { pathname: '/page-1/' },
      expected: { role: 'history-link' },
    },
    {
      title: 'history link to a sub-page',
      props: { href: 'getting-started' },
      location: { pathname: '/page-1/' },
      expected: { role: 'history-link', href: '/page-1/getting-started' },
    },
    {
      title: 'history link to a sub-page using a trailing slash',
      props: { href: 'getting-started/' },
      location: { pathname: '/page-1/' },
      expected: { role: 'history-link', href: '/page-1/getting-started/' },
    },
    {
      title: 'history link to a parent page',
      props: { href: '../page-2' },
      location: { pathname: '/page-1/' },
      expected: { role: 'history-link', href: '/page-2' },
    },
    {
      title: 'history link to another page with hash',
      props: { href: '/page-2#title' },
      location: { pathname: '/page-1/' },
      expected: { role: 'history-link', href: '/page-2#title' },
    },
    {
      title: 'internal link',
      props: { href: 'https://docs.commercetools.com/site-key/page-1' },
      location: { pathname: '/page-1/' },
      expected: { role: 'internal-link', href: '/site-key/page-1' },
    },
    {
      title: 'internal link using "/../" notation',
      props: { href: '/../site-key/page-1' },
      location: { pathname: '/page-1/' },
      expected: { role: 'internal-link', href: '/site-key/page-1' },
    },
    {
      title: 'internal link with hash',
      props: { href: 'https://docs.commercetools.com/site-key/page-1#title' },
      location: { pathname: '/page-1/' },
      expected: { role: 'internal-link', href: '/site-key/page-1#title' },
    },
  ];

  const scenariosInProdMode = scenarios.map(scenario => ({
    ...scenario,
    location: { pathname: withPrefix(scenario.location.pathname) },
    isProd: true,
  }));

  scenarios.concat(scenariosInProdMode).forEach(scenario => {
    it(`${scenario.isProd ? `[pathPrefix: ${pathPrefix}] ` : ''}${
      scenario.title
    }: ${scenario.props.href}`, () => {
      const rendered = renderLink(
        <Link {...scenario.props}>{scenario.title}</Link>,
        scenario.location.pathname
      );
      expect(rendered.queryByText(scenario.title)).toBeInTheDocument();
      expect(rendered.queryByRole(scenario.expected.role)).toHaveAttribute(
        'href',
        'href' in scenario.expected
          ? scenario.expected.href
          : scenario.props.href
      );
    });
  });
});
