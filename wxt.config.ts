import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  manifest: {
    permissions: ['cookies', 'storage'],
    host_permissions: ['<all_urls>'],
    name: 'Cookie Manager Pro',
    description: 'Advanced cookie inspection and management tool.',
  },
});
