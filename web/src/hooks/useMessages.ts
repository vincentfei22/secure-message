import { useQuery, useSubscription } from "@apollo/client";
import * as queries from "graphql/queries";
import * as subscriptions from "graphql/subscriptions";
import { useEffect, useState } from "react";

function compareDate(a: any, b: any) {
  return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
}

export function useMessagesByChat(
  id: any,
  page = 1 // eslint-disable-line
) {
  const [messages, setMessages] = useState<any[]>([]);
const [nextToken, setNextToken] = useState<any>(null);

const messagesData = useQuery(queries.LIST_MESSAGES, {
    variables: {
        chatId: id,
        ...(nextToken &&
            messages?.length &&
            id === messages[0]?.chatId && { nextToken }),
    },
    skip: !id || !page,
    fetchPolicy: "cache-and-network",
});

const messagesPushData = useSubscription(subscriptions.MESSAGE, {
    variables: { chatId: id },
    skip: !id,
});

useEffect(() => {
    if (page > 1) setNextToken(messages[messages.length - 1].createdAt);
}, [page]);

useEffect(() => {
    setNextToken(null);
}, [id]);

useEffect(() => {
    if (messagesData.data) {
        if (nextToken) {
            const newMessagesList = [...messages, ...messagesData.data.listMessages];
            setMessages(newMessagesList);
        } else {
            setMessages(messagesData.data.listMessages);
        }
    }
}, [messagesData.data]);

useEffect(() => {
    if (messagesPushData.data) {
        const updatedMessage = messagesPushData.data.onUpdateMessage;
        const filteredMessages = messages.filter(
            (item) => item.objectId !== updatedMessage.objectId
        );
        const newMessagesList = [...filteredMessages, updatedMessage];
        setMessages(newMessagesList);
    }
}, [messagesPushData.data]);

return {
    value: messages.filter((m) => !m.isDeleted).sort(compareDate),
    loading: messagesData.loading,
};

}
