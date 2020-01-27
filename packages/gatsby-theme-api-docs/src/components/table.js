import styled from '@emotion/styled';
import { designSystem as uiKitDesignSystem } from '@commercetools-docs/ui-kit';
import { tokens, dimensions, colors, typography } from '../design-system';

const Table = styled.table`
  width: 100%;
  max-width: 100%;
  border: ${dimensions.widths.tableBorder} solid ${colors.light.border};
  border-radius: ${tokens.borderRadiusForTable};
  background-color: ${uiKitDesignSystem.colors.light.textInverted};
  box-shadow: ${tokens.shadowForTable};
  border-collapse: separate;
  border-spacing: 0;

  thead {
    display: block;
    padding: ${uiKitDesignSystem.dimensions.spacings.s};
    background-color: ${colors.light.surfaceTableHead};
    border-radius: ${tokens.borderRadiusForTable} ${tokens.borderRadiusForTable}
      0 0;
  }

  th {
    vertical-align: bottom;
    text-align: left;
    border: none;
    font-weight: ${uiKitDesignSystem.typography.fontWeights.bold};
    line-height: ${typography.lineHeights.th};
  }

  tbody {
    tr {
      display: block;
      padding: 0 ${uiKitDesignSystem.dimensions.spacings.s};

      :not(:first-of-type) {
        border-top: ${dimensions.widths.tableBorder} solid
          ${colors.light.border};
      }
    }

    td {
      padding: ${uiKitDesignSystem.dimensions.spacings.s};
      vertical-align: top;
      border-top: none;
      word-break: break-word;

      :first-of-type {
        width: ${dimensions.widths.tableColumn};
      }

      :last-of-type {
        padding-left: ${uiKitDesignSystem.dimensions.spacings.m};
      }
    }
  }
`;

export default Table;
