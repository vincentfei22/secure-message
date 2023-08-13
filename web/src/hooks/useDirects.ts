import { useQuery, useSubscription } from "@apollo/client";
import { DirectMessagesContext } from "contexts/DirectMessagesContext";
import * as queries from "graphql/queries";
import * as subscriptions from "graphql/subscriptions";
import useAuth from "hooks/useAuth";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export function useDirectMessagesByWorkspace() {const { user } = useAuth();
const location = useLocation();
const workspaceId = location.pathname.split("/dashboard/workspaces/")[1]?.split("/")[0];

let directsList: any[] = [];
const [directs, setDirects] = useState<any[]>(directsList);

const directsData = useQuery(queries.LIST_DIRECTS, {
    variables: { workspaceId },
    skip: !workspaceId,
    fetchPolicy: "cache-and-network",
});

const directsPushData = useSubscription(subscriptions.DIRECT, {
    variables: { workspaceId },
    skip: !workspaceId,
});

useEffect(() => {
    if (directsData.data) {
        directsList = directsData.data.listDirects;
        setDirects(directsList);
    }
}, [directsData.data]);

useEffect(() => {
    if (directsPushData.data) {
        const updatedDirect = directsPushData.data.onUpdateDirect;
        const filteredDirects = directs.filter(
            (item) => item.objectId !== updatedDirect.objectId
        );
        const newDirectsList = [...filteredDirects, updatedDirect];
        setDirects(newDirectsList);
    }
}, [directsPushData.data]);

return {
    value: directs.filter((item: any) => item.active.includes(user?.uid)),
    loading: directsData.loading,
};

}

export function useDirectMessageById(id: any) {
  const { value } = useContext(DirectMessagesContext);
  let directMessageValue;
  if (value) {
      for (let i = 0; i < value.length; i++) {
          if (value[i].objectId === id) {
              directMessageValue = value[i];
              break;
          }
      }
  }
  return { value: directMessageValue };
}
