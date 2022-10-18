import { cssVarToValue } from './css-variables';

describe.each`
  cssVariable                                        | expectedColor
  ${'#222222'}                                       | ${'#222222'}
  ${'hsl(195, 35.1234%, 40%)'}                       | ${'hsl(195, 35.1234%, 40%)'}
  ${'var(--color-solid, #222222)'}                   | ${'#222222'}
  ${'var(--color-surface, hsl(195, 35.1234%, 40%))'} | ${'hsl(195, 35.1234%, 40%)'}
`(
  'extracting color value from CSS variable "$cssVariable"',
  ({ cssVariable, expectedColor }) => {
    it(`should extract color "${expectedColor}"`, () => {
      expect(cssVarToValue(cssVariable)).toEqual(expectedColor);
    });
  }
);
