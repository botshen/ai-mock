import { useState, useEffect } from 'react';

export default () => {
  const [count, setCount] = useState(1);
  const increment = () => setCount((count) => count + 1);
  
  useEffect(() => {
    const messageListener = (message: string) => {
      if (message === 'closeSidePanel') {
         window.close();
      }
    };

    browser.runtime.onMessage.addListener(messageListener);
    browser.runtime.connect({ name: 'mySidepanel' });
    return () => {
      browser.runtime.onMessage.removeListener(messageListener);
    };
  }, []);

  return (
    <div>
      <p>This is React. {count}</p>
      <button onClick={increment}>Increment</button>
     </div>
  );
};