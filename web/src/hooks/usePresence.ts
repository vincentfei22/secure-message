import { useQuery, useSubscription } from "@apollo/client";
import * as queries from "graphql/queries";
import * as subscriptions from "graphql/subscriptions";
import useAuth from "hooks/useAuth";
import { useEffect, useState } from "react";
import timeDiff from "utils/time-diff";

export function usePresenceByUserId(id?: string | null) {const { user } = useAuth();
const isMe = user?.uid === id;

let currentTimeValue = Date.now();
const [currentTime, setCurrentTime] = useState(currentTimeValue);

useEffect(() => {
    const interval = setInterval(() => {
        currentTimeValue = Date.now();
        setCurrentTime(currentTimeValue);
    }, 3000);
    return () => clearInterval(interval);
}, []);

let currentPresenceValue: any = null;
const [currentPresence, setCurrentPresence] = useState<any>(currentPresenceValue);

const presenceData = useQuery(queries.GET_PRESENCE, {
    variables: { objectId: id },
    skip: !id,
});

const presencePushData = useSubscription(subscriptions.PRESENCE, {
    variables: { objectId: id },
    skip: !id,
});

useEffect(() => {
    if (presenceData.data) {
        currentPresenceValue = presenceData.data.getPresence;
        setCurrentPresence(currentPresenceValue);
    }
}, [presenceData.data]);

useEffect(() => {
    if (presencePushData.data) {
        currentPresenceValue = presencePushData.data.onUpdatePresence;
        setCurrentPresence(currentPresenceValue);
    }
}, [presencePushData.data]);

let isPresent = false;
if (isMe) isPresent = true;
else if (currentPresence?.lastPresence)
    isPresent =
        timeDiff(new Date(currentPresence.lastPresence), currentTime) < 35;

return { isPresent, loading: presenceData.loading };

}
