// See https://emotion.sh/docs/ssr#gatsby
import createCache from '@emotion/cache';

export const docsCacheKey = 'docs-kit';

// To be used in gatsby-ssr.js
export const createDocsCache = () => createCache({ key: docsCacheKey });

// To be used in gatsby-browser.js
export const docsCache = createDocsCache();
