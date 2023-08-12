import { useChannelsByWorkspace } from "hooks/useChannels";
import { createContext, useContext } from "react";

export const ChannelsContext = createContext({
  value: null as any,
  loading: true,
});

export function ChannelsProvider({ children }: { children: React.ReactNode }) {
  const channelsData = useChannelsByWorkspace();
  return (
    <ChannelsContext.Provider value={channelsData}>
      {children}
    </ChannelsContext.Provider>
  );
}

export function useChannels() {
  const context = useContext(ChannelsContext);
  if (!context) {
    throw new Error("useChannels must be used within a ChannelsProvider");
  }
  return context;
}

