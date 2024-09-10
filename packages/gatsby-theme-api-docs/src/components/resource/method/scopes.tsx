import SpacingsStack from '@commercetools-uikit/spacings-stack';
import { Markdown } from '@commercetools-docs/ui-kit';
import Title from './title';
import { css } from '@emotion/react';

const scopesGridStyle = css`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 0.5rem;
`;

type ScopesProps = {
  scopes: string[];
};

const Scopes = (props: ScopesProps) => {
  const hasMultiColumnScope = props.scopes.length >= 10;
  const canAppendComma = (index: number) =>
    !hasMultiColumnScope && index < props.scopes.length - 1;

  return (
    <SpacingsStack scale="xs">
      <Title>OAuth 2.0 Scopes:</Title>

      <div css={hasMultiColumnScope && scopesGridStyle}>
        {props.scopes.map((scope, index) => (
          <Markdown.InlineCodeWithoutBox
            key={scope}
            css={css`
              word-break: break-all;
            `}
          >
            {scope}
            {canAppendComma(index) && ' , '}
          </Markdown.InlineCodeWithoutBox>
        ))}
      </div>
    </SpacingsStack>
  );
};

export default Scopes;
