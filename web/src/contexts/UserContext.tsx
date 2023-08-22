import { useQuery, useSubscription } from "@apollo/client";
import * as queries from "graphql/queries";
import * as subscriptions from "graphql/subscriptions";
import useAuth from "hooks/useAuth";
import { createContext, useContext, useEffect, useState } from "react";


const intermediateVar1 = {
  user: null as any,
  userdata: null as any,
};

export const UserContext = createContext(intermediateVar1);

export const UserProvider = ({ children }: any) => {
  const { user: authUser, logout } = useAuth();

 
  const intermediateVar2 = {
    variables: { objectId: authUser?.uid },
    skip: !authUser?.uid,
  };
  const { data, error } = useQuery(queries.GET_USER, intermediateVar2);

  switch (error?.message) {
    case "Cannot read property 'dataValues' of null":
      logout();
  }

  const intermediateVar3 = {
    variables: { objectId: authUser?.uid },
    skip: !authUser?.uid,
  };
  const { data: dataPush } = useSubscription(subscriptions.USER, intermediateVar3);

  const [user, setUser] = useState(null);

  useEffect(() => {
    switch (data) {
      case data:
        setUser(data.getUser);
    }
  }, [data]);

  useEffect(() => {
    switch (dataPush) {
      case dataPush:
        setUser(dataPush.onUpdateUser)
    }
  }, [dataPush]);
  
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


