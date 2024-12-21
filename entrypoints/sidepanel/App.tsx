import { useMessageListener } from "@/entrypoints/sidepanel/hooks/use-message-listener";
import { useLogStore } from "@/entrypoints/sidepanel/store/use-log-store";

export const App = () => {
  const { count, inc } = useLogStore();
  useMessageListener();
  return (
    <div>
      <span>{count}</span>
      <button onClick={inc}>one up</button>
    </div>
  );
};
