import { isCI } from './env';

export const URL_DOCS_SMOKE_TEST = isCI ? `/docs-smoke-test/` : `/`;
export const URL_API_DOCS_SMOKE_TEST = isCI ? `/api-docs-smoke-test/` : `/`;
export const URL_SELF_LEARNING_SMOKE_TEST = isCI
  ? `/self-learning-smoke-test/`
  : `/`;
