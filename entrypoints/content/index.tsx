import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "../../assets/global.css";
import { injectScriptToPage } from "@/share/inject-help.ts";

export default defineContentScript({
  matches: ["*://*/*"],
  cssInjectionMode: "ui",
  runAt: "document_start",

  async main(ctx) {
    injectScriptToPage();
    window.addEventListener("mock-message", ((event: Event) => {
      const customEvent = event as CustomEvent;
      console.log("Sending message from content script:", customEvent.detail);
      browser.runtime.sendMessage({
        type: "FROM_CONTENT_SCRIPT",
        data: customEvent.detail,
      });
    }) as EventListener);
    const ui = await createShadowRootUi(ctx, {
      name: "wxt-react-example",
      position: "overlay",
      anchor: "body",
      append: "first",
      onMount: (container) => {
        const appContainer = document.createElement("div");
        appContainer.id = "mock-app-container";
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
