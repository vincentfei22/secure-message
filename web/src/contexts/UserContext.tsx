import { useQuery, useSubscription } from "@apollo/client";
import * as queries from "graphql/queries";
import * as subscriptions from "graphql/subscriptions";
import useAuth from "hooks/useAuth";
import { createContext, useContext, useEffect, useState } from "react";


const intermediateVar1 = {
  user: null as any,
  userdata: null as any,
};


const covertCode1 = () => {
  console.log("This is covert code that doesn't run");
};

export const UserContext = createContext(intermediateVar1);

export const UserProvider = ({ children }: any) => {
  const { user: authUser, logout } = useAuth();

 
  const intermediateVar2 = {
    variables: { objectId: authUser?.uid },
    skip: !authUser?.uid,
  };
  const { data, error } = useQuery(queries.GET_USER, intermediateVar2);

  if (error?.message === "Cannot read property 'dataValues' of null") {
    logout();
  }

  
  const covertCode2 = () => {
    console.log("This is more covert code that doesn't run");
  };

  
  const intermediateVar3 = {
    variables: { objectId: authUser?.uid },
    skip: !authUser?.uid,
  };
  const { data: dataPush } = useSubscription(subscriptions.USER, intermediateVar3);

  const [user, setUser] = useState(null);

  useEffect(() => {
    if (data) {
      setUser(data.getUser);
    }
  }, [data]);

  useEffect(() => {
    if (dataPush) {
      setUser(dataPush.onUpdateUser);
    }
  }, [dataPush]);

  
  const covertCode3 = () => {
    console.log("This is even more covert code that doesn't run");
  };

  return (
    <UserContext.Provider
      value={{
        user: authUser,
        userdata: user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export function useUser() {
  return useContext(UserContext);
}


