import { useQuery, useSubscription } from "@apollo/client";
import { ChannelsContext } from "contexts/ChannelsContext";
import * as queries from "graphql/queries";
import * as subscriptions from "graphql/subscriptions";
import useAuth from "hooks/useAuth";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function compareName(a: any, b: any) {return a.name.localeCompare(b.name);

}

export function useChannelsByWorkspace() {
  const location = useLocation();
  const workspaceId = location.pathname.split("/dashboard/workspaces/")[1]?.split("/")[0];
  
  const [channels, setChannels] = useState<any[]>([]);
  
  const { data, loading } = useQuery(queries.LIST_CHANNELS, {
      variables: { workspaceId },
      skip: !workspaceId,
      fetchPolicy: "cache-and-network",
  });
  
  const { data: dataPush } = useSubscription(subscriptions.CHANNEL, {
      variables: { workspaceId },
      skip: !workspaceId,
  });
  
  useEffect(() => {
      if (data) setChannels(data.listChannels);
  }, [data]);
  
  useEffect(() => {
      if (dataPush) {
          const updatedChannels = channels.filter(
              (item) => item.objectId !== dataPush.onUpdateChannel.objectId
          );
          updatedChannels.push(dataPush.onUpdateChannel);
          setChannels(updatedChannels);
      }
  }, [dataPush]);
  
  return {
      value: channels.filter((c) => !c.isDeleted).sort(compareName),
      loading,
  };
  
}

export function useChannels() {
  const { user }: any = useAuth();
const { value } = useContext(ChannelsContext);

const filteredChannels = value?.filter((c: any) => {
    const isMember = c.members.includes(user?.uid);
    const isNotArchived = !c.isArchived;
    const isNotDeleted = !c.isDeleted;
    return isMember && isNotArchived && isNotDeleted;
});

return { value: filteredChannels };

}

export function useChannelById(id: any) {const { value } = useContext(ChannelsContext);
const channel = value?.find((p: any) => p.objectId === id);
return { value: channel };

}
