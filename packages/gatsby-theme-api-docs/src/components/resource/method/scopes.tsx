import SpacingsStack from '@commercetools-uikit/spacings-stack';
import { Markdown } from '@commercetools-docs/ui-kit';
import Title from './title';
import styled from '@emotion/styled';

type ScopesProps = {
  scopes: string[];
};

const Container = styled.div`
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 0.5rem;
    > code {
      word-break: break-all;
    }
  }
`;

const Text = styled(Markdown.InlineCodeWithoutBox)`
  :not(:last-child)&::after {
    content: ', ';
  }
  @media only screen and (min-width: 768px) {
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
