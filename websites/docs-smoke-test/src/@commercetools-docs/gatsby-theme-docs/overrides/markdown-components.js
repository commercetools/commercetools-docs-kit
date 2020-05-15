import styled from '@emotion/styled';
import Card from '@commercetools-uikit/card';
import { designSystem } from '@commercetools-docs/ui-kit';

import addonComponents from './addon-components';

// Explanation about the following sizes:
// https://github.com/commercetools/commercetools-docs-kit/pull/427#discussion_r425442556
const cardNarrowMinWidth = '242px';
const cardRegularMinWidth = '328px';
const DummyCards = styled.div`
  display: grid;
  gap: ${designSystem.dimensions.spacings.m};
  grid-auto-columns: 1fr;
  grid-template-columns: ${(props) =>
    `repeat(auto-fill, minmax(${
      props.narrow ? cardNarrowMinWidth : cardRegularMinWidth
    }, 1fr))`};
`;
const DummyCard = styled(Card)``;

export default { ...addonComponents, Cards: DummyCards, Card: DummyCard };
