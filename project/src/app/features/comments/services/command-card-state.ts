import { Injectable, Signal, signal, WritableSignal } from '@angular/core';

import { v4 as uuidv4 } from 'uuid';

import { Comment } from '@models/comment';

@Injectable()
export class CommentCardState {
  public uniqueId: Signal<string>;
  public comment: WritableSignal<Comment | undefined>;
  public currentUser: WritableSignal<boolean>;
  public allowReply: WritableSignal<boolean>;
  public allowDelete: WritableSignal<boolean>;
  public allowEdit: WritableSignal<boolean>;

  constructor() {
    this.uniqueId = signal<string>(uuidv4());
    this.comment = signal<Comment | undefined>(undefined);
    this.currentUser = signal<boolean>(true);
    this.allowReply = signal<boolean>(true);
    this.allowDelete = signal<boolean>(true);
    this.allowEdit = signal<boolean>(true);
  }
}
