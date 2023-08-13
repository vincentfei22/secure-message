import { useQuery, useSubscription } from "@apollo/client";
import { useUser } from "contexts/UserContext";
import * as queries from "graphql/queries";
import * as subscriptions from "graphql/subscriptions";
import React, { createContext, useContext, useEffect, useState } from "react";

export const WorkspacesContext = createContext({
  value: null as any,
  loading: true,
});

export function useMyWorkspaces() {const { user } = useUser();
const { value, loading } = useContext(WorkspacesContext);

let workspacesValue: any[] = [];
if (value) {
    for (let i = 0; i < value.length; i++) {
        if (
            value[i].isDeleted === false &&
            value[i].members.includes(user?.uid)
        ) {
            workspacesValue.push(value[i]);
        }
    }
}

workspacesValue.sort((a: any, b: any) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return dateB - dateA;
});

return { value: workspacesValue, loading };

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
    const updatedWorkspaces = workspaces.filter(
      (item) => item.objectId !== dataPush.onUpdateWorkspace.objectId
    );
    updatedWorkspaces.push(dataPush.onUpdateWorkspace);
    setWorkspaces(updatedWorkspaces);
  }
}, [dataPush]);

return (
  <WorkspacesContext.Provider
    value={{
      value: workspaces?.filter((w: any) => w.isDeleted === false),
      loading,
    }}
  >
    {children}
  </WorkspacesContext.Provider>
);

}

export function useWorkspaceById(id: any) {
  const { value } = useContext(WorkspacesContext);
let workspace;
for (let i = 0; i < value.length; i++) {
  if (value[i].objectId === id) {
    workspace = value[i];
    break;
  }
}
return { value: workspace };

}
