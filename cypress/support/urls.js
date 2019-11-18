import { isCI } from './env';

// eslint-disable-next-line import/prefer-default-export
export const URL_DOCS_SMOKE_TEST = isCI ? `/docs-smoke-test/` : `/`;
