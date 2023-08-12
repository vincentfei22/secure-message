import { useDirectMessagesByWorkspace } from "hooks/useDirects";
import { createContext, ReactNode } from "react";

interface DirectMessagesContextType {
  value: any;
  loading: boolean;
}

interface DirectMessagesProviderProps {
  children: ReactNode;
}

export const DirectMessagesContext = createContext<DirectMessagesContextType>({
  value: null,
  loading: true,
});

export function DirectMessagesProvider({
  children,
}: DirectMessagesProviderProps) {
  const dmData = useDirectMessagesByWorkspace();
  return (
    <DirectMessagesContext.Provider value={dmData}>
      {children}
    </DirectMessagesContext.Provider>
  );
}


