import { customProperties } from '@commercetools-uikit/design-system';
import { designSystem } from '@commercetools-docs/ui-kit';

export const tokens = {
  borderRadiusForTable: customProperties.borderRadius6,
  borderRadiusForMethodType: designSystem.pxToRem(`16px`),
  borderRadiusForResponseCode: designSystem.pxToRem(`10px`),
  shadowForTable: `0 ${designSystem.pxToRem(`1px`)} ${designSystem.pxToRem(
    `1px`
  )} 0 rgba(0, 0, 0, 0.25)`,
  shadowForUrlScopesResponse: `0 ${designSystem.pxToRem(
    `1px`
  )} ${designSystem.pxToRem(`2px`)} 0 rgba(0, 0, 0, 0.25)`,
};

export const dimensions = {
  widths: {
    tableColumn: designSystem.pxToRem('200px'),
    tableBorder: designSystem.pxToRem(`1px`),
    methodBorderLeft: designSystem.pxToRem('8px'),
  },
  spacings: {
    xxs: designSystem.pxToRem('2px'),
  },
};

export const colors = {
  light: {
    surfaceTableHead: '#f2f2f2',
    border: '#e6e6e6',
    methods: {
      get: '#078cdf',
      post: '#00ccb4',
      delete: '#e60050',
    },
  },
};

export const typography = {
  lineHeights: {
    th: designSystem.pxToRem('21px'),
    methodType: designSystem.pxToRem('26px'),
    methodTitle: designSystem.pxToRem('32px'),
    responseCode: designSystem.pxToRem('16px'),
    responseBodyType: designSystem.pxToRem('19px'),
  },
};
