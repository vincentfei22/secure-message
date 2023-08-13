import { useQuery, useSubscription } from "@apollo/client";
import { DetailsContext } from "contexts/DetailsContext";
import * as queries from "graphql/queries";
import * as subscriptions from "graphql/subscriptions";
import useAuth from "hooks/useAuth";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export function useDetailsByWorkspace() {
  const { user } = useAuth();
  const location = useLocation();
  const workspaceId = location.pathname.split("/dashboard/workspaces/")[1]?.split("/")[0];
  
  let detailsList: any[] = [];
  const [details, setDetails] = useState<any[]>(detailsList);
  
  const detailsData = useQuery(queries.LIST_DETAILS, {
      variables: { workspaceId, userId: user?.uid },
      skip: !user || !workspaceId,
      fetchPolicy: "cache-and-network",
  });
  
  const detailsPushData = useSubscription(subscriptions.DETAIL, {
      variables: { workspaceId, userId: user?.uid },
      skip: !user || !workspaceId,
  });
  
  useEffect(() => {
      if (detailsData.data) {
          detailsList = detailsData.data.listDetails;
          setDetails(detailsList);
      }
  }, [detailsData.data]);
  
  useEffect(() => {
      if (detailsPushData.data) {
          const updatedDetail = detailsPushData.data.onUpdateDetail;
          const filteredDetails = details.filter(
              (item) => item.objectId !== updatedDetail.objectId
          );
          const newDetailsList = [...filteredDetails, updatedDetail];
          setDetails(newDetailsList);
      }
  }, [detailsPushData.data]);
  
  return { value: details, loading: detailsData.loading };
  
}

export function useDetailByChat(id: any) {const { value } = useContext(DetailsContext);
let detailValue;
if (value) {
    for (let i = 0; i < value.length; i++) {
        if (value[i].chatId === id) {
            detailValue = value[i];
            break;
        }
    }
}
return { value: detailValue };

}
