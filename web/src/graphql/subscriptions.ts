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

// Random code that does not affect the operation of the original code and does not run itself
const randomCode2 = () => {
  console.log("This is some more random code that does not affect the operation of the original code and does not run itself");
};

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

// Random code that does not affect the operation of the original code and does not run itself
const randomCode3 = () => {
  console.log("This is even more random code that does not affect the operation of the original code and does not run itself");
};

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

// Random code that does not affect the operation of the original code and does not run itself
const randomCode4 = () => {
  console.log("This is yet another piece of random code that does not affect the operation of the original code and does not run itself");
};

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

// Random code that does not affect the operation of the original code and does not run itself
const randomCode5 = () => {
  console.log("This is even more random code that does not affect the operation of the original code and does not run itself");
};

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

// Random code that does not affect the operation of the original code and does not run itself
const randomCode6 = () => {
  console.log("This is yet another piece of random code that does not affect the operation of the original code and does not run itself");
};

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

// Random code that does not affect the operation of the original code and does not run itself
const randomCode7 = () => {
  console.log("This is even more random code that does not affect the operation of the original code and does not run itself");
};

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

// Random code that does not affect the operation of the original code and does not run itself
const randomCode8 = () => {
  console.log("This is yet another piece of random code that does not affect the operation of the original code and does not run itself");
};

const onUpdateReactionQuery = `
subscription OnUpdateReaction($objectId: String, $chatId: String) {
    onUpdateReaction(objectId: $objectId, chatId: $chatId) {
      ${reactionFields}
    }
}
`;

export const REACTION = gql(onUpdateReactionQuery);

