const cssVarFallbackValueColorRe = /^var\(--(.*),\s?([#|hsl].*)\)$/;
const cssVarToValue = (value: string) =>
  // Apparently Mermaid does not like the usage of CSS variables
  // like `var(--color-solid, #222222)` or `var(--color-solid, hsl(195, 35.123%, 40%))`.
  value.replace(cssVarFallbackValueColorRe, '$2');

export { cssVarToValue };
