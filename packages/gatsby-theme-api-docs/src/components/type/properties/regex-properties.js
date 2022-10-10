import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { Markdown, designSystem } from '@commercetools-docs/ui-kit';

const RegexProperties = (props) => {
  const expression = props.expression.match(/\/([^;]*)\//)[1];

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
};

RegexProperties.propTypes = {
  expression: PropTypes.string.isRequired,
};

export default RegexProperties;
