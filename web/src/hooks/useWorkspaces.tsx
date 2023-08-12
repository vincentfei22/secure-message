import { useQuery, useSubscription } from "@apollo/client";
import { useUser } from "contexts/UserContext";
import * as queries from "graphql/queries";
import * as subscriptions from "graphql/subscriptions";
import React, { createContext, useContext, useEffect, useState } from "react";

export const WorkspacesContext = createContext({
  value: null as any,
  loading: true,
});

function compareDate(a: any, b: any) {
  return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
}

export function useMyWorkspaces() {
  const { user } = useUser();
  const { value, loading } = useContext(WorkspacesContext);

  const filteredWorkspaces = value?.filter(
    (w: any) => w.isDeleted === false && w.members.includes(user?.uid)
  );
  
  const sortedWorkspaces = filteredWorkspaces?.sort(compareDate);

  return {
    value: sortedWorkspaces,
    loading,
  };
}

export function WorkspacesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useUser();
  const [workspaces, setWorkspaces] = useState<any[]>([]);

  const { data, loading } = useQuery(queries.LIST_WORKSPACES, {
    skip: !user,
    fetchPolicy: "cache-and-network",
  });
  const { data: dataPush } = useSubscription(subscriptions.WORKSPACE, {
    skip: !user,
  });

  useEffect(() => {
    if (data) setWorkspaces(data.listWorkspaces);
  }, [data]);

  useEffect(() => {
    if (dataPush) {
      setWorkspaces([
        ...workspaces.filter(
          (item) => item.objectId !== dataPush.onUpdateWorkspace.objectId
        ),
        dataPush.onUpdateWorkspace,
      ]);
    }
  }, [dataPush]);

  const filteredWorkspaces = workspaces?.filter((w: any) => w.isDeleted === false);

  return (
    <WorkspacesContext.Provider
      value={{
        value: filteredWorkspaces,
        loading,
      }}
    >
      {children}
    </WorkspacesContext.Provider>
  );
}

export function useWorkspaceById(id: any) {
  const { value } = useContext(WorkspacesContext);
  
  const workspace = value?.find((p: any) => p.objectId === id);
  
  return {
    value: workspace,
  };
}
