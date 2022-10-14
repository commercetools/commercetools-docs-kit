const cssVarFallbackValueRe = /^var\(--(.*),\s?(.*)\)$/;
const cssVarToValue = (value: string) =>
  // Apparently Mermaid does not like the usage of CSS variables like `var(--color-solid, #222)`.
  value.replace(cssVarFallbackValueRe, '$2');

export { cssVarToValue };
