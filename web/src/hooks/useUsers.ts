import { useQuery, useSubscription } from "@apollo/client";
import { UsersContext } from "contexts/UsersContext";
import * as queries from "graphql/queries";
import * as subscriptions from "graphql/subscriptions";
import useAuth from "hooks/useAuth";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function compareFullName(a: any, b: any) {
  if (a.fullName < b.fullName) {
    return -1;
  }
  if (a.fullName > b.fullName) {
    return 1;
  }
  return 0;
}

export function useUsersByWorkspace() {
  const { user } = useAuth();
  const location = useLocation();
  const workspaceId = location.pathname
    .split("/dashboard/workspaces/")[1]
    ?.split("/")[0];

  const [users, setUsers] = useState<any[]>([]);

  const { data, loading } = useQuery(queries.LIST_USERS, {
    skip: !user,
    fetchPolicy: "cache-and-network",
  });
  const { data: dataPush } = useSubscription(subscriptions.USER, {
    skip: !user,
  });

  useEffect(() => {
    if (data) setUsers(data.listUsers);
  }, [data]);

  useEffect(() => {
    if (dataPush) {
      setUsers([
        ...users.filter(
          (item) => item.objectId !== dataPush.onUpdateUser.objectId
        ),
        dataPush.onUpdateUser,
      ]);
    }
  }, [dataPush]);

  const filteredUsers = users?.filter((u: any) => u.workspaces.includes(workspaceId));
  
  const sortedUsers = filteredUsers?.sort(compareFullName);

  return {
    value: sortedUsers,
    loading,
  };
}

export function useUserById(id?: string) {
  const { value } = useContext(UsersContext);
  
  const user = value?.find((p: any) => p.objectId === id);
  
  return {
    value: user,
  };
}

