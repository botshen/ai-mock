import { useEffect } from "react";

export const useMessageListener = () => {
    useEffect(() => {
        // 创建一个持久连接
        const port = browser.runtime.connect({ name: "sidepanel-port" });
    
        // 使用消息监听器
        const messageListener = (message: any) => {
          console.log("Sidepanel received message:", message);
          if (message === "closeSidePanel") {
            window.close();
          }
        };
    
        browser.runtime.onMessage.addListener(messageListener);
    
        // 清理函数
        return () => {
          browser.runtime.onMessage.removeListener(messageListener);
          port.disconnect();
        };
      }, []);
};