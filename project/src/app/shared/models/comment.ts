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

export interface UpdateStatus {
  status: string;
  idx1: number;
  idx2: number;
  id: number;
}

export interface UpdateComment {
  status: string;
  idx1?: number;
  idx2?: number;
  id?: number;
  content: string;
  user?: User;
}

export interface DeleteComment {
  idx1: number;
  idx2: number;
  id: number;
}

export interface ReplyComment {
  idx1: number;
  idx2: number;
  id: number;
  user?: User;
}

export interface UpvoteComment {
  idx1: number;
  idx2: number;
  id: number;
  score: number;
  formerVote: number;
  vote: number;
}
