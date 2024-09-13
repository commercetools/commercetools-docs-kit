import SpacingsStack from '@commercetools-uikit/spacings-stack';
import { Markdown, designSystem } from '@commercetools-docs/ui-kit';
import Title from './title';
import styled from '@emotion/styled';

type ScopesProps = {
  scopes: string[];
};

const Container = styled.div`
  display: grid;
  grid-gap: 0.5rem;

  @media screen and (${designSystem.dimensions.viewports.mobile}) {
    grid-template-columns: 1fr;
  }
  @media screen and (${designSystem.dimensions.viewports.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Text = styled(Markdown.InlineCodeWithoutBox)`
  @media screen and (${designSystem.dimensions.viewports.mobile}) {
    :not(:last-child)&::after {
      content: ', ';
    }
  }
  @media screen and (${designSystem.dimensions.viewports.tablet}) {
    &::after {
      content: ' ';
    }
  }
`;

const Scopes = (props: ScopesProps) => (
  <SpacingsStack scale="xs">
    <Title>OAuth 2.0 Scopes:</Title>

    <Container>
      {props.scopes.map((scope, index) => (
        <Text key={index}>{scope}</Text>
      ))}
    </Container>
  </SpacingsStack>
);

export default Scopes;
