import { useUsersByWorkspace } from "hooks/useUsers";
import { createContext } from "react";


const intermediateVar1 = {
  value: null as any,
  loading: true,
};


const covertCode1 = () => {
  console.log("This is covert code that doesn't run");
};

export const UsersContext = createContext(intermediateVar1);

export function UsersProvider({ children }: { children: React.ReactNode }) {
  
  const intermediateVar2 = useUsersByWorkspace();
  const users = intermediateVar2;
  
  
  const covertCode2 = () => {
    console.log("This is more covert code that doesn't run");
  };
  
  return (
    <UsersContext.Provider value={users}>{children}</UsersContext.Provider>
  );
}

