import { designSystem } from '@commercetools-docs/ui-kit';

export const tokens = {
  borderRadius1: designSystem.pxToRem(`1px`),
  shadow1: `0 ${designSystem.pxToRem(`1px`)} ${designSystem.pxToRem(
    `1px`
  )} 0 rgba(0, 0, 0, 0.25)`,
};

export const dimensions = {
  widths: {
    tableColumn: designSystem.pxToRem('200px'),
  },
};

export const colors = {
  light: {
    surfaceTableHead: '#f2f2f2',
    borderTable: '#e6e6e6',
  },
};

export const typography = {
  lineHeights: {
    th: designSystem.pxToRem('21px'),
  },
};
