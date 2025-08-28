export interface User {
  username: string;
  image: { png: string; webp: string };
}

export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: User;
  replies: Comment[];
  replyingTo?: string; // Only for replies
}
