import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import '../../assets/global.css';

export default defineContentScript({
  matches: ['*://*/*'],
  cssInjectionMode: 'ui',

  async main(ctx) {
    const ui = await createShadowRootUi(ctx, {
      name: 'wxt-react-example',
      position: 'overlay',
      anchor: 'body',
      append: 'first',
      onMount: (container) => {
        const appContainer = document.createElement('div');
        appContainer.id = 'mock-app-container';
        appContainer.style.cssText = `
          position: fixed;
          z-index: 2147483647;
          top: 0;
          left: 0;
        `;
        container.appendChild(appContainer);

        const root = ReactDOM.createRoot(appContainer);
        root.render(<App />);
        return root;
      },
      onRemove: (root) => {
        root?.unmount();
      },
    });

    ui.mount();
  },
});