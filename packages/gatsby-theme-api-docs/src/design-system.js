import { customProperties } from '@commercetools-uikit/design-system';
import { designSystem } from '@commercetools-docs/ui-kit';

export const tokens = {
  ...designSystem.tokens,
  borderRadiusForTable: customProperties.borderRadius6,
  borderRadiusForMethodType: designSystem.pxToRem(`12px`),
  borderRadiusForResponseCode: designSystem.pxToRem(`10px`),
  shadowForTable: `0 ${designSystem.pxToRem(`1px`)} ${designSystem.pxToRem(
    `1px`
  )} 0 rgba(0, 0, 0, 0.25)`,
  shadowForUrlScopesResponse: `0 ${designSystem.pxToRem(
    `1px`
  )} ${designSystem.pxToRem(`2px`)} 0 rgba(0, 0, 0, 0.25)`,
};

export const dimensions = {
  ...designSystem.dimensions,
  widths: {
    ...designSystem.dimensions.widths,
    typeTableLeftColumnWidthMin: '25%',
    typeTableLeftColumnWidthMax: '45%',
    tableBorder: designSystem.pxToRem(`1px`),
    methodBorderLeft: designSystem.pxToRem('8px'),
  },
  spacings: {
    ...designSystem.dimensions.spacings,
    xxs: designSystem.pxToRem('2px'),
  },
};

export const colors = {
  light: {
    ...designSystem.colors.light,
    surfaceTableHead: '#f2f2f2',
    border: '#e6e6e6',
    methods: {
      get: '#078cdf',
      post: '#00ccb4',
      put: '#b866ff',
      delete: '#e60050',
    },
  },
};

export const typography = {
  ...designSystem.typography,
  lineHeights: {
    th: designSystem.pxToRem('24px'),
    methodType: designSystem.pxToRem('24px'),
    methodTitle: designSystem.pxToRem('32px'),
    responseCode: designSystem.pxToRem('16px'),
    responseBodyType: designSystem.pxToRem('24px'),
    propertyType: designSystem.pxToRem('20px'),
  },
};
