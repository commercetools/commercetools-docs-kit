import { defineConfig } from 'cypress';

export default defineConfig({
  retries: 1,
  viewportWidth: 1600,
  viewportHeight: 1024,
  video: false,
  e2e: {
    baseUrl: 'http://localhost:8000',
  },
});
