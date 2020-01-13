import styled from '@emotion/styled';
import { designSystem } from '@commercetools-docs/ui-kit';
import { tokens, dimensions, colors, typography } from '../../design-system';

const Table = styled.table`
  width: 100%;
  max-width: 100%;
  background-color: transparent;
  border: ${tokens.borderRadius1} solid ${colors.light.borderTable};
  border-radius: ${designSystem.tokens.borderRadius6};
  background-color: ${designSystem.colors.light.textInverted};
  box-shadow: ${tokens.shadow1};
  border-collapse: separate;
  border-spacing: 0;

  thead {
    display: block;
    padding: ${designSystem.dimensions.spacings.s};
    background-color: ${colors.light.surfaceTableHead};
    border-radius: ${designSystem.tokens.borderRadius6}
      ${designSystem.tokens.borderRadius6} 0 0;
  }

  th {
    vertical-align: bottom;
    text-align: left;
    border: none;
    font-weight: ${designSystem.typography.fontWeights.bold};
    line-height: ${typography.lineHeights.th};
  }

  tbody {
    tr {
      display: block;
      padding: 0 ${designSystem.dimensions.spacings.s};

      :not(:first-of-type) {
        border-top: ${tokens.borderRadius1} solid ${colors.light.borderTable};
      }
    }

    td {
      padding: ${designSystem.dimensions.spacings.s};
      vertical-align: top;
      border-top: none;

      :first-of-type {
        width: ${dimensions.widths.tableColumn};
      }

      :last-of-type {
        padding-left: ${designSystem.dimensions.spacings.m};
      }
    }
  }
`;

export default Table;
