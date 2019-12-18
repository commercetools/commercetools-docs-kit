import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import styled from '@emotion/styled';
import PageNavigation from './page-navigation';

const Container = styled.div`
  height: 100vh;
  width: 100%;
`;
const Content = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
`;
const Section = styled.section`
  height: 100px;
  width: 100%;
`;

const createTestProps = custom => ({
  tableOfContents: {
    items: [
      {
        title: 'Link 1',
        url: '#link-1',
      },
      {
        title: 'Link 2',
        url: '#link-2',
        items: [
          {
            title: 'Link 2/1',
            url: '#link-2-1',
            items: [
              {
                title: 'Link 2/1/1',
                url: '#link-2-1-1',
              },
            ],
          },
        ],
      },
    ],
  },
  ...custom,
});

const renderApp = ui =>
  render(
    <Container>
      <Content role="application">
        <Section id="section-link-1" className="section-h2">
          <h2 id="link-1">{'Title for link 1'}</h2>
        </Section>
        <Section id="section-link-2" className="section-h2">
          <h2 id="link-2">{'Title for link 2'}</h2>
        </Section>
        <Section id="section-link-2-1" className="section-h3">
          <h3 id="link-2-1">{'Title for link 2/1'}</h3>
        </Section>
        <Section id="section-link-2-1-1" className="section-h4">
          <h4 id="link-2-1-1">{'Title for link 2/1/1'}</h4>
        </Section>
      </Content>
      {ui}
    </Container>
  );

// Apply some mocks to the (section) elements in order to control the behavior,
// since the normal HTML calculations do not apply in a test environment.
// For example, calculating the `getBoundingClientRect`.
const applySectionElementsMocks = (elements, selectElement) => {
  elements.forEach(el => {
    const isElementSelected = selectElement(el);
    // eslint-disable-next-line no-param-reassign
    el.getBoundingClientRect = jest.fn(() => ({
      // - `48 - 1` is the min value so that the difference with the offset
      // results in a value < 0.
      // - `9999` is just a random high value to indicate that the element
      // should be ignored from the calculation.
      top: isElementSelected ? 48 - 1 : 9999,
    }));
  });
};

jest.useFakeTimers();

describe('rendering', () => {
  it('should mark links as active for visible sections when scrolling', () => {
    const props = createTestProps();
    const rendered = renderApp(<PageNavigation {...props} />);

    expect(rendered.queryByText('Link 1')).toBeInTheDocument();
    expect(rendered.queryByText('Link 2')).toBeInTheDocument();
    expect(rendered.queryByText('Link 2/1')).toBeInTheDocument();
    expect(rendered.queryByText('Link 2/1/1')).toBeInTheDocument();

    expect(rendered.queryByRole(/^active-(.*)/)).not.toBeInTheDocument();

    const hrefIds = ['link-1', 'link-2', 'link-2-1', 'link-2-1-1'];

    hrefIds.forEach(hrefId => {
      applySectionElementsMocks(
        rendered.container.querySelectorAll('section[class^="section-h"]'),
        el => el.id === `section-${hrefId}`
      );
      fireEvent.scroll(document.querySelector('[role="application"]'), {
        // It does not matter how much we scroll since we control the `getBoundingClientRect`
        target: { scrollY: 1 },
      });
      jest.runAllTimers();
      expect(
        rendered.container.querySelector('[aria-current=true]')
      ).toHaveAttribute('href', `#${hrefId}`);
    });
  });
});
