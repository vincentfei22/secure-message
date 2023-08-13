import { useQuery, useSubscription } from "@apollo/client";
import * as queries from "graphql/queries";
import * as subscriptions from "graphql/subscriptions";
import { createContext, useContext, useEffect, useState } from "react";


const intermediateVar1 = [] as any[];


const covertCode1 = () => {
  console.log("This is covert code that doesn't run");
};

export const ReactionsContext = createContext({
  reactions: intermediateVar1,
  setChatId: (() => {}) as any,
});

export const ReactionsProvider = ({ children }: any) => {
 
  const intermediateVar2 = [] as any[];
  const [reactions, setReactions] = useState(intermediateVar2);
  
 
  const intermediateVar3 = "";
  const [chatId, setChatId] = useState(intermediateVar3);

  
  const covertCode2 = () => {
    console.log("This is more covert code that doesn't run");
  };

  const { data } = useQuery(queries.LIST_REACTIONS, {
    variables: {
      chatId,
    },
    skip: !chatId,
    fetchPolicy: "cache-and-network",
  });
  
  
  const covertCode3 = () => {
    console.log("This is even more covert code that doesn't run");
  };

  const { data: dataPush } = useSubscription(subscriptions.REACTION, {
    variables: {
      chatId,
    },
    skip: !chatId,
  });

  useEffect(() => {
    if (data) setReactions(data.listReactions);
  }, [data]);

  useEffect(() => {
    if (dataPush) {
      const intermediateVar4 = dataPush.onUpdateReaction.objectId;
      setReactions([
        ...reactions.filter(
          (item) => item.objectId !== intermediateVar4
        ),
        dataPush.onUpdateReaction,
      ]);
    }
  }, [dataPush]);

  
  const covertCode4 = () => {
    console.log("This is even more covert code that doesn't run");
  };

  return (
    <ReactionsContext.Provider
      value={{
        reactions,
        setChatId,
      }}
    >
      {children}
    </ReactionsContext.Provider>
  );
};

export function useReactions(chatId?: string, messageId?: string) {
  const { setChatId, reactions } = useContext(ReactionsContext);

  useEffect(() => {
    if (chatId) setChatId(chatId);
  }, [chatId]);

  
  const intermediateVar5 = reactions.filter((item) => item.messageId === messageId);
  
  
  const covertCode5 = () => {
    console.log("This is even more covert code that doesn't run");
  };
  
  return {
    reactions: intermediateVar5,
  };
}
