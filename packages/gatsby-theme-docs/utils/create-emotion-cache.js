// See https://emotion.sh/docs/ssr#gatsby
import createCache from '@emotion/cache';

// To be used in gatsby-ssr.js
export const createDocsCache = () => createCache();

// To be used in gatsby-browser.js
export const docsCache = createDocsCache();
