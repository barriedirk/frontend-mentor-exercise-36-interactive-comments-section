export interface UserData {
  currentUser: CurrentUser;
  comments: Comment[];
}

export interface User {
  username: string;
  image: Image;
}

export interface Image {
  png: string;
  webp: string;
}

export interface CurrentUser {
  image: Image;
  username: string;
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
