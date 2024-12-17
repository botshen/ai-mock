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
 
});
