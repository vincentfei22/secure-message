import { useUsersByWorkspace } from "hooks/useUsers";
import { createContext } from "react";
const intermediateVar1 = {
  value: null as any,
  loading: true,
};
export const UsersContext = createContext(intermediateVar1);
export function UsersProvider({ children }: { children: React.ReactNode }) {
  
  const intermediateVar2 = useUsersByWorkspace();
  const users = intermediateVar2;
  
  return (
    <UsersContext.Provider value={users}>{children}</UsersContext.Provider>
  );
}

