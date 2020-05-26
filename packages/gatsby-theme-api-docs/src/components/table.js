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
    background-color: ${colors.light.surfaceTableHead};

    th {
      vertical-align: bottom;
      text-align: left;
      border: none;
      font-weight: ${uiKitDesignSystem.typography.fontWeights.bold};
      line-height: ${typography.lineHeights.th};
      padding: ${uiKitDesignSystem.dimensions.spacings.xs}
        ${uiKitDesignSystem.dimensions.spacings.s};
    }
  }

  tbody {
    tr {
      padding: 0 ${uiKitDesignSystem.dimensions.spacings.s};

      :not(:first-of-type) {
        td {
          border-top: ${dimensions.widths.tableBorder} solid
            ${colors.light.border};
        }
      }
    }

    td {
      padding: ${uiKitDesignSystem.dimensions.spacings.s};
      vertical-align: top;
      border-top: none;
      word-break: break-word;
      font-size: ${typography.fontSizes.small};

      :first-of-type {
        min-width: ${dimensions.widths.typeTableLeftColumnWidthMin};
        max-width: ${dimensions.widths.typeTableLeftColumnWidthMax};
      }

      :last-of-type {
        padding-left: ${uiKitDesignSystem.dimensions.spacings.m};
      }

      .name-type {
        line-height: ${typography.lineHeights.propertyType};
      }

      .name {
        color: ${uiKitDesignSystem.colors.light.textFaded};
      }
    }
  }
`;

export default Table;
