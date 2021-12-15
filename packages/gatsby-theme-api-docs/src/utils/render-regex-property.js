import { css } from '@emotion/react';
import { Markdown, designSystem } from '@commercetools-docs/ui-kit';

function renderRegexProperties(data) {
  const expression = data.expression.match(/\/([^;]*)\//)[1];

  return (
    <Markdown.InlineCode>
      <span
        css={css`
          color: ${designSystem.colors.light.textInfo};
        `}
      >
        /
      </span>
      {expression}
      <span
        css={css`
          color: ${designSystem.colors.light.textInfo};
        `}
      >
        /
      </span>
    </Markdown.InlineCode>
  );
}

export default renderRegexProperties;
