export const CommentStatus = {
  INITIAL: 'INITIAL',
  INFORMATION: 'INFORMATION',
  UPDATE: 'UPDATE',
  REPLY: 'REPLY',
  DELETE: 'DELETE',
  SEND: 'SEND',
};

export type CommentStatusType = (typeof CommentStatus)[keyof typeof CommentStatus];
