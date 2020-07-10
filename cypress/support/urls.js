import { isCI } from './env';

export const URL_DOCS_SMOKE_TEST = isCI ? `/docs-smoke-test/` : `/`;
export const URL_API_DOCS_SMOKE_TEST = isCI ? `/api-docs-smoke-test/` : `/`;
