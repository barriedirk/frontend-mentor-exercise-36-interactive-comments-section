import { computed, inject } from '@angular/core';
import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';

import { UserData, CurrentUser, Comment } from '@app/shared/models/comment';

import { USER_DATA_STATE, emptyComments, emptyCurrentUser, updateStorage } from './comments-state';

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
  }))
);
