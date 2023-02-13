import React from 'react';
import { render } from '@testing-library/react';
import {
  createMemorySource,
  createHistory,
  LocationProvider,
} from '@reach/router';
import { useSiteData } from '../hooks/use-site-data';
import getEnv from '../utils/get-env';
import Link from './link';

jest.mock('../hooks/use-site-data');
jest.mock('../utils/get-env');

// for some types of tests you want a memory source
const renderLink = (ui, initialPath) => {
  const source = createMemorySource(initialPath);
  const history = createHistory(source);
  return render(<LocationProvider history={history}>{ui}</LocationProvider>);
};

const pathPrefix = '/prefix';
const withPrefix = (path) =>
  [pathPrefix, path].join('/').replace(/\/\/+/g, '/');

describe('rendering', () => {
  beforeEach(() => {
    useSiteData.mockClear();
    useSiteData.mockReturnValue({
      pathPrefix,
      siteMetadata: { productionHostname: 'docs.commercetools.com' },
    });
  });
  const scenarios = [
    {
      title: 'image link',
      props: { href: '/static/123' },
      location: { pathname: '/page-1' },
      expected: { 'data-link-type': 'image-link' },
    },
    {
      title: 'static link in /downloads folder',
      props: { href: '/downloads/hello.html' },
      location: { pathname: '/page-1' },
      expected: { 'data-link-type': 'static-link' },
    },
    {
      title: 'static link ending with .html',
      props: { href: '/any/folder/hello.html' },
      location: { pathname: '/page-1' },
      expected: { 'data-link-type': 'static-link' },
    },
    {
      title: 'external link',
      props: {
        href: 'https://github.com/commercetools/commercetools-docs-kit',
      },
      location: { pathname: '/page-1' },
      expected: { 'data-link-type': 'external-link' },
    },
    {
      title: 'empty link',
      props: { href: '' },
      location: { pathname: '/page-1' },
      expected: { 'data-link-type': 'anchor-link' },
    },
    {
      title: 'anchor link',
      props: { href: '#title-1' },
      location: { pathname: '/page-1' },
      expected: { 'data-link-type': 'anchor-link' },
    },
    {
      title: 'gatsby link to another page',
      props: { href: '/page-2' },
      location: { pathname: '/page-1' },
      expected: { 'data-link-type': 'gatsby-link', href: '/page-2' },
    },
    {
      title: 'gatsby link to another page',
      props: { href: '/page-2/getting-started' },
      location: { pathname: '/page-1' },
      expected: {
        'data-link-type': 'gatsby-link',
        href: '/page-2/getting-started',
      },
    },
    {
      title: 'gatsby link to a sub-page',
      props: { href: 'page-1/getting-started' },
      location: { pathname: '/page-1' },
      expected: {
        'data-link-type': 'gatsby-link',
        href: '/page-1/getting-started',
      },
    },
    {
      title: 'gatsby link to a sub-page using a trailing slash',
      props: { href: 'page-1/getting-started/' },
      location: { pathname: '/page-1' },
      expected: {
        'data-link-type': 'gatsby-link',
        href: '/page-1/getting-started',
      },
    },
    {
      title: 'gatsby link to a parent page',
      props: { href: '../page-2' },
      location: { pathname: '/page-1' },
      expected: { 'data-link-type': 'gatsby-link', href: '/page-2' },
    },
    {
      title: 'gatsby link to a parent sub-page',
      props: { href: '../page-2/getting-started' },
      location: { pathname: '/page-1' },
      expected: {
        'data-link-type': 'gatsby-link',
        href: '/page-2/getting-started',
      },
    },
    {
      title: 'gatsby link to a parent page using a wrong path',
      props: { href: '../../../../../page-2' },
      location: { pathname: '/page-1' },
      expected: { 'data-link-type': 'gatsby-link', href: '/page-2' },
    },
    {
      title: 'gatsby link to another page with hash',
      props: { href: '/page-2#title' },
      location: { pathname: '/page-1' },
      expected: { 'data-link-type': 'gatsby-link' },
    },
    {
      title: 'internal link',
      props: { href: 'https://docs.commercetools.com/site-key/page-1' },
      location: { pathname: '/page-1' },
      expected: { 'data-link-type': 'internal-link' },
    },
    {
      title: 'internal link',
      props: { href: 'https://docs.commercetools.com/site-key/page-1' },
      location: { pathname: '/page-1' },
      expected: { 'data-link-type': 'internal-link', href: '/site-key/page-1' },
      isProd: true,
    },
    {
      title: 'internal link using "/../" notation',
      props: { href: '/../site-key/page-1' },
      location: { pathname: '/page-1' },
      expected: { 'data-link-type': 'internal-link', href: '/site-key/page-1' },
    },
    {
      title: 'internal link with hash',
      props: { href: 'https://docs.commercetools.com/site-key/page-2#title' },
      location: { pathname: '/page-1' },
      expected: { 'data-link-type': 'internal-link' },
    },
    {
      title: 'internal link with hash',
      props: { href: 'https://docs.commercetools.com/site-key/page-2#title' },
      location: { pathname: '/page-1' },
      expected: {
        'data-link-type': 'internal-link',
        href: '/site-key/page-2#title',
      },
      isProd: true,
    },
  ];

  const scenariosWithPathPrefix = scenarios.map((scenario) => ({
    ...scenario,
    location: { pathname: withPrefix(scenario.location.pathname) },
    withPathPrefix: true,
  }));

  scenarios.concat(scenariosWithPathPrefix).forEach((scenario) => {
    const title = [
      scenario.withPathPrefix && `[pathPrefix: ${pathPrefix}]`,
      scenario.title,
      scenario.isProd === true && '(prod)',
      scenario.props.href,
    ]
      .filter(Boolean)
      .join(' ');
    // eslint-disable-next-line jest/valid-title
    it(title, () => {
      getEnv.mockReturnValue(scenario.isProd === true);

      const rendered = renderLink(
        <Link {...scenario.props}>{scenario.title}</Link>,
        scenario.location.pathname
      );
      expect(rendered.getByText(scenario.title)).toBeInTheDocument();
      expect(
        // eslint-disable-next-line testing-library/no-node-access, testing-library/no-container
        rendered.container.querySelector(
          `[data-link-type="${scenario.expected['data-link-type']}"]`
        )
      ).toHaveAttribute(
        'href',
        'href' in scenario.expected
          ? scenario.expected.href
          : scenario.props.href
      );
    });
  });
});
