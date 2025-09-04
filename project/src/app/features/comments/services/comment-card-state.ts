import { Injectable, Signal, signal, WritableSignal } from '@angular/core';

import { v4 as uuidv4 } from 'uuid';

import { Comment, CurrentUser } from '@models/comment';

import { CommentStatus, CommentStatusType } from './comment-card-models';

@Injectable()
export class CommentCardState {
  uniqueId: Signal<string>;
  status: WritableSignal<CommentStatusType | undefined>;
  comment: WritableSignal<Comment | undefined>;
  currentUser: WritableSignal<CurrentUser | undefined>;
  replyingTo: WritableSignal<string | undefined>;
  isCurrentUser: WritableSignal<boolean>;

  constructor() {
    this.uniqueId = signal<string>(uuidv4());
    this.status = signal<CommentStatusType>(CommentStatus.INITIAL);
    this.comment = signal<Comment | undefined>(undefined);
    this.currentUser = signal<CurrentUser | undefined>(undefined);
    this.replyingTo = signal<string | undefined>('');
    this.isCurrentUser = signal<boolean>(true);
  }
}
