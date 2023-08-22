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



const onUpdateChannelQuery = `
subscription OnUpdateChannel($objectId: String, $workspaceId: String) {
    onUpdateChannel(objectId: $objectId, workspaceId: $workspaceId) {
      ${channelFields}
    }
}
`;

export const CHANNEL = gql(onUpdateChannelQuery);

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



const onUpdateUserQuery = `
subscription OnUpdateUser($objectId: String) {
    onUpdateUser(objectId: $objectId) {
      ${userFields}
    }
}
`;

export const USER = gql(onUpdateUserQuery);

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



const onUpdateWorkspaceQuery = `
subscription OnUpdateWorkspace($objectId: String) {
    onUpdateWorkspace(objectId: $objectId) {
      ${workspaceFields}
    }
}
`;

export const WORKSPACE = gql(onUpdateWorkspaceQuery);

const presenceFields = `
objectId 
lastPresence 
updatedAt 
createdAt 
`;



const onUpdatePresenceQuery = `
subscription OnUpdatePresence($objectId: String) {
    onUpdatePresence(objectId: $objectId) {
      ${presenceFields}
    }
}
`;

export const PRESENCE = gql(onUpdatePresenceQuery);

const detailFields = `
objectId 
chatId 
lastRead 
userId 
workspaceId 
createdAt 
updatedAt 
`;



const onUpdateDetailQuery = `
subscription OnUpdateDetail($objectId: String, $workspaceId: String, $userId: String) {
    onUpdateDetail(objectId: $objectId, workspaceId: $workspaceId, userId: $userId) {
      ${detailFields}
    }
}
`;

export const DETAIL = gql(onUpdateDetailQuery);

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



const onUpdateDirectQuery = `
subscription OnUpdateDirect($objectId: String, $workspaceId: String) {
    onUpdateDirect(objectId: $objectId, workspaceId: $workspaceId) {
      ${directFields}
    }
}
`;

export const DIRECT = gql(onUpdateDirectQuery);

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



const onUpdateMessageQuery = `
subscription OnUpdateMessage($objectId: String, $chatId: String) {
    onUpdateMessage(objectId: $objectId, chatId: $chatId) {
      ${messageFields}
    }
}
`;

export const MESSAGE = gql(onUpdateMessageQuery);

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



const onUpdateReactionQuery = `
subscription OnUpdateReaction($objectId: String, $chatId: String) {
    onUpdateReaction(objectId: $objectId, chatId: $chatId) {
      ${reactionFields}
    }
}
`;

export const REACTION = gql(onUpdateReactionQuery);