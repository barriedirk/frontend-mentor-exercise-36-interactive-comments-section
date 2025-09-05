export interface UserData {
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
}

export interface Reply {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  replyingTo: string;
  user: User;
}
