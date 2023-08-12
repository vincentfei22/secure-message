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

export const LIST_CHANNELS = gql`
  query ListChannels($updatedAt: Date, $userId: String, $workspaceId: String, $name: String) {
    listChannels(updatedAt: $updatedAt, userId: $userId, workspaceId: $workspaceId, name: $name) {
      ${channelFields}
    }
  }
`;


const detailFields = `
  objectId
  chatId
  lastRead
  userId
  workspaceId
  createdAt
  updatedAt
`;

export const LIST_DETAILS = gql`
  query ListDetails($updatedAt: Date, $userId: String, $workspaceId: String) {
    listDetails(updatedAt: $updatedAt, userId: $userId, workspaceId: $workspaceId) {
      ${detailFields}
    }
  }
`;


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

export const LIST_DIRECTS = gql`
  query ListDirects($updatedAt: Date, $workspaceId: String, $userId: String) {
    listDirects(updatedAt: $updatedAt, workspaceId: $workspaceId, userId: $userId) {
      ${directFields}
    }
  }
`;


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

export const LIST_MESSAGES = gql`
  query ListMessages($updatedAt: Date, $chatId: String, $limit: Int, $nextToken: String) {
    listMessages(updatedAt: $updatedAt, chatId: $chatId, limit: $limit, nextToken: $nextToken) {
      ${messageFields}
    }
  }
`;

const presenceFields = `
  objectId
  lastPresence
  updatedAt
  createdAt
`;

export const GET_PRESENCE = gql`
  query GetPresence($objectId: String!) {
    getPresence(objectId: $objectId) {
      ${presenceFields}
    }
  }
`;

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

export const GET_USER = gql`
  query GetUser($objectId: String, $email: String) {
    getUser(objectId: $objectId, email: $email) {
      ${userFields}
    }
  }
`;

export const LIST_USERS = gql`
  query ListUsers($updatedAt: Date, $workspaceId: String) {
    listUsers(updatedAt: $updatedAt, workspaceId: $workspaceId) {
      ${userFields}
    }
  }
`;

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

export const LIST_WORKSPACES = gql`
  query ListWorkspaces {
    listWorkspaces {
      ${workspaceFields}
    }
  }
`;

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

export const GET_REACTION = gql`
  query GetReaction($objectId: String!) {
    getReaction(objectId: $objectId) {
      ${reactionFields}
    }
  }
`;


export const LIST_REACTIONS = gql`
  query ListReactions($updatedAt: Date, $chatId: String) {
    listReactions(updatedAt: $updatedAt, chatId: $chatId) {
      ${reactionFields}
    }
  }
`;