import styled from '@emotion/styled';
import Card from '@commercetools-uikit/card';
import { designSystem } from '@commercetools-docs/ui-kit';

import addonComponents from './addon-components';

const DummyCards = styled.div`
  display: grid;
  gap: ${designSystem.dimensions.spacings.m};
  grid-auto-columns: 1fr;
  grid-template-columns: ${(props) =>
    `repeat(auto-fill, minmax(${props.narrow ? '200' : '250'}px, 1fr))`};
`;
const DummyCard = styled(Card)``;

export default { ...addonComponents, Cards: DummyCards, Card: DummyCard };
