import { useDetailsByWorkspace } from "hooks/useDetails";
import { createContext, ReactNode } from "react";

interface DetailsContextValue {
  value: any;
  loading: boolean;
}

export const DetailsContext = createContext<DetailsContextValue>({
  value: null,
  loading: true,
});

interface DetailsProviderProps {
  children: ReactNode;
}

export function DetailsProvider({ children }: DetailsProviderProps) {
  const details = useDetailsByWorkspace();
  return (
    <DetailsContext.Provider value={details}>
      {children}
    </DetailsContext.Provider>
  );
}
