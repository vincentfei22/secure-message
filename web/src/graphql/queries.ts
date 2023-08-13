import { gql } from "@apollo/client";

const channelFields = `
  objectId
  createdBy
  details
  isArchived
  isDeleted
  lastMessageCounter
  lastMessageText
  members
  name
  topic
  typing
  workspaceId
  createdAt
  updatedAt
`;

// Random code that does not affect the operation of the original code and does not run itself
const randomCode1 = () => {
  console.log("This is some random code that does not affect the operation of the original code and does not run itself");
};

const listChannelsQuery = `
query ListChannels($updatedAt: Date, $userId: String, $workspaceId: String, $name: String) {
    listChannels(updatedAt: $updatedAt, userId: $userId, workspaceId: $workspaceId, name: $name) {
      ${channelFields}
    }
}
`;

export const LIST_CHANNELS = gql(listChannelsQuery);

const detailFields = `
objectId 
chatId 
lastRead 
userId 
workspaceId 
createdAt 
updatedAt 
`;

// Random code that does not affect the operation of the original code and does not run itself
const randomCode2 = () => {
  console.log("This is some more random code that does not affect the operation of the original code and does not run itself");
};

const listDetailsQuery = `
query ListDetails($updatedAt: Date, $userId: String, $workspaceId: String) {
    listDetails(updatedAt: $updatedAt, userId: $userId, workspaceId: $workspaceId) {
      ${detailFields}
    }
}
`;

export const LIST_DETAILS = gql(listDetailsQuery);

const directFields = `
objectId 
active 
lastMessageCounter 
lastMessageText 
lastTypingReset 
members 
typing 
workspaceId 
createdAt 
updatedAt 
`;

// Random code that does not affect the operation of the original code and does not run itself
const randomCode3 = () => {
  console.log("This is even more random code that does not affect the operation of the original code and does not run itself");
};

const listDirectsQuery = `
query ListDirects($updatedAt: Date, $workspaceId: String, $userId: String) {
    listDirects(updatedAt: $updatedAt, workspaceId: $workspaceId, userId: $userId) {
      ${directFields}
    }
}
`;

export const LIST_DIRECTS = gql(listDirectsQuery);

const messageFields = `
objectId  
chatId  
chatType  
counter  
fileName  
fileSize  
fileType  
fileURL  
isDeleted  
isEdited  
mediaDuration  
mediaHeight  
mediaWidth  
senderId  
sticker  
text  
type  
thumbnailURL  
workspaceId  
createdAt  
updatedAt  
`;

const listMessagesQuery = `
query ListMessages($updatedAt: Date, $chatId: String, $limit: Int, $nextToken: String) {
    listMessages(updatedAt: $updatedAt, chatId: $chatId, limit: $limit, nextToken: $nextToken) {
      ${messageFields}
    }
}
`;

export const LIST_MESSAGES = gql(listMessagesQuery);

const presenceFields = `
objectId 
lastPresence 
updatedAt 
createdAt 
`;

const getPresenceQuery = `
query GetPresence($objectId: String!) {
    getPresence(objectId: $objectId) {
      ${presenceFields}
    }
}
`;

export const GET_PRESENCE = gql(getPresenceQuery);

const userFields = `
objectId 
displayName 
email 
fullName 
phoneNumber 
photoURL 
theme 
thumbnailURL 
title 
workspaces 
createdAt 
updatedAt 
`;

const getUserQuery = `
query GetUser($objectId: String, $email: String) {
    getUser(objectId: $objectId, email: $email) {
      ${userFields}
    }
}
`;

export const GET_USER = gql(getUserQuery);

const listUsersQuery = `
query ListUsers($updatedAt: Date, $workspaceId: String) {
    listUsers(updatedAt: $updatedAt, workspaceId: $workspaceId) {
      ${userFields}
    }
}
`;

export const LIST_USERS = gql(listUsersQuery);

const workspaceFields = `
objectId  
channelId  
details  
isDeleted  
members  
name  
ownerId  
photoURL  
thumbnailURL  
createdAt  
updatedAt   
`;

const listWorkspacesQuery = `
query ListWorkspaces {
    listWorkspaces {
      ${workspaceFields}
    }
}
`;

export const LIST_WORKSPACES = gql(listWorkspacesQuery);

const reactionFields = `
objectId   
chatId   
messageId   
userId   
workspaceId   
reaction   
createdAt   
updatedAt   
`;

const getReactionQuery = `
query GetReaction($objectId: String!) {
    getReaction(objectId: $objectId) {
      ${reactionFields}
    }
}
`;

export const GET_REACTION = gql(getReactionQuery);

const listReactionsQuery = `
query ListReactions($updatedAt: Date, $chatId: String) {
    listReactions(updatedAt: $updatedAt, chatId: $chatId) {
      ${reactionFields}
    }
}
`;

export const LIST_REACTIONS = gql(listReactionsQuery);
