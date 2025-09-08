export interface UserData {
  upvote: { [key: string]: number };
  lastId: number;
  currentUser: User;
  comments: Comment[];
}

export interface User {
  username: string;
  image: Image;
}

export type CurrentUser = User;

export interface Image {
  png: string;
  webp: string;
}

export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  replies?: Comment[];
  replyingTo?: string;
  user: User;
  status?: CommentStatusType;
}

export interface Reply {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  replyingTo: string;
  user: User;
}

export const CommentStatus = {
  INITIAL: 'INITIAL',
  INFORMATION: 'INFORMATION',
  UPDATE: 'UPDATE',
  REPLY: 'REPLY',
  DELETE: 'DELETE',
  SEND: 'SEND',
  UPVOTE: 'UPVOTE',
};

export type CommentStatusType = (typeof CommentStatus)[keyof typeof CommentStatus];
