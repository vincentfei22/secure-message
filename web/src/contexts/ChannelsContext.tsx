import { useChannelsByWorkspace } from "hooks/useChannels";
import { createContext } from "react";

const initialContextValue = {
  value: null as any,
  loading: true,
};

export const ChannelsContext = createContext(initialContextValue);

export function ChannelsProvider({ children }: { children: React.ReactNode }) {
  const channelsData = useChannelsByWorkspace();
  const providerValue = channelsData;
  const contextProvider = (
    <ChannelsContext.Provider value={providerValue}>
      {children}
    </ChannelsContext.Provider>
  );


  return contextProvider;
}
