import { computed, inject } from '@angular/core';
import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';

import { UserData, CurrentUser, Comment, User } from '@app/shared/models/comment';

import { USER_DATA_STATE, emptyComments, emptyCurrentUser, updateStorage } from './comments-state';
import { CommentStatus } from '@features/comments/services/comment-card-models';

import { formatISO } from 'date-fns';

export const GlobalStore = signalStore(
  { providedIn: 'root' },
  withState(() => inject(USER_DATA_STATE)),
  withMethods((store) => ({
    clearCurrentUser() {
      const currentUser: CurrentUser = emptyCurrentUser();

      updateStorage(currentUser, 'currentUser');
      patchState(store, { currentUser });
    },
    clearComments() {
      let comments: Comment[] = emptyComments();

      updateStorage(comments, 'comments');
      patchState(store, { comments });
    },
    currentUser: computed<CurrentUser>(() => store.currentUser()),
    comments: computed<Comment[]>(() => store.comments()),
    deleteComment({ idx1, idx2, id }: DeleteComment) {
      const comments = structuredClone(store.comments());

      // @todo, remove console
      console.log({ idx1, idx2, id });

      if (comments[idx1]) {
        if (idx2 === -1 && comments[idx1].id === id) {
          comments.splice(idx1, 1);
        } else if (comments[idx1].replies?.[idx2]?.id === id) {
          comments[idx1].replies.splice(idx2, 1);
        }
      }

      // @todo, for now, no update the localstorage
      // updateStorage(comments, 'comments');
      patchState(store, { comments });
    },
    updateComment({ status, idx1, idx2, id, content, user }: UpdateComment) {
      const comments = structuredClone(store.comments());
      let lastId = store.lastId();
      let comment: Comment;
      debugger;

      if (status === CommentStatus.SEND) {
        lastId++;

        comment = {
          id: lastId,
          content,
          createdAt: formatISO(new Date()),
          score: 0,
          replies: [],
          replyingTo: '',
          user: user!,
        };

        comments.push(comment);
      }

      // @todo, for now, no update the localstorage
      // updateStorage(comments, 'comments');
      patchState(store, { lastId, comments });
    },
  }))
);

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
