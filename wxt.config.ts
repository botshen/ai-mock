import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  extensionApi: 'chrome',
  modules: ['@wxt-dev/module-react'],
  runner: {
    disabled: true,
  },
  manifest: {
    side_panel: {
      default_path: 'entrypoints/sidepanel/index.html',
      default_width: 500,
    },
    action: {},
    name: 'ai-mock',
    description: 'A browser extension for mocking data in the sidebar.',
    version: '0.0.1',
    permissions: [
      'sidePanel',
    ],
    web_accessible_resources: [
      {
        resources: ['/injected.js'],
        matches: ['<all_urls>'],
      },
    ],
    commands: {
      'toggle-sidebar': {
        suggested_key: {
          default: 'Ctrl+Shift+S',
          mac: 'Command+Shift+S',
        },
        description: 'Toggle sidebar',
      },
      'close-sidebar': {
        suggested_key: {
          default: 'Ctrl+Shift+W',
          mac: 'Command+Shift+W',
        },
        description: 'Close sidebar',
      },
    },
  },
});
