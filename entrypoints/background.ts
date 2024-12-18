export default defineBackground(() => {
  console.log('Hello background!', { id: browser.runtime.id });

  let isSidePanelOpen = false;

  browser.action.onClicked.addListener(async (tab) => {
    if (isSidePanelOpen) {
      browser.runtime.sendMessage('closeSidePanel');
      isSidePanelOpen = false;
    } else {
      await browser.sidePanel.open({ windowId: tab.windowId });
      isSidePanelOpen = true;
    }
  });
  browser.runtime.onConnect.addListener((port) => {
    if (port.name === 'mySidepanel') {
      port.onDisconnect.addListener(() => {
        isSidePanelOpen = false;
      });
    }
  });
  // to find the windowId of the active tab
  let windowId: number;
  chrome.tabs.onActivated.addListener(function (activeInfo) {
    windowId = activeInfo.windowId;
  });

  // to receive messages from popup script
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'open_side_panel') {
      if (isSidePanelOpen) {
        browser.runtime.sendMessage('closeSidePanel');
        isSidePanelOpen = false;
      } else {
        browser.sidePanel.open({ windowId: windowId });
        isSidePanelOpen = true;
      }
    }
    return false;
  });


});
