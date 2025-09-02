import { Injectable, Signal, signal, WritableSignal } from '@angular/core';

import { v4 as uuidv4 } from 'uuid';

import { Comment, CurrentUser } from '@models/comment';

@Injectable()
export class CommentCardState {
  uniqueId: Signal<string>;
  comment: WritableSignal<Comment | undefined>;
  currentUser: WritableSignal<CurrentUser | undefined>;
  isCurrentUser: WritableSignal<boolean>;
  allowReply: WritableSignal<boolean>;
  allowDelete: WritableSignal<boolean>;
  allowEdit: WritableSignal<boolean>;

  constructor() {
    this.uniqueId = signal<string>(uuidv4());
    this.comment = signal<Comment | undefined>(undefined);
    this.currentUser = signal<CurrentUser | undefined>(undefined);
    this.isCurrentUser = signal<boolean>(false);
    this.allowReply = signal<boolean>(true);
    this.allowDelete = signal<boolean>(true);
    this.allowEdit = signal<boolean>(true);
  }
}
