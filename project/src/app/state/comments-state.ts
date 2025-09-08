import { InjectionToken } from '@angular/core';
import { initialData } from './initial-data';

import { UserData, CurrentUser, Comment } from '@app/shared/models/comment';

export const emptyComments = (): Comment[] => [];
export const emptyCurrentUser = (): CurrentUser => ({
  username: '',
  image: {
    png: '',
    webp: '',
  },
});

export const updateStorage = async (
  data: CurrentUser | Comment[] | number | { [key: string]: number },
  key: 'comments' | 'currentUser' | 'lastId' | 'upvote'
) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const USER_DATA_STATE = new InjectionToken<UserData>('UserData', {
  factory: () => {
    const upvoteRaw = localStorage.getItem('upvote');
    const lastIdRaw = localStorage.getItem('lastId');
    const commentsRaw = localStorage.getItem('comments');
    const currentUserRaw = localStorage.getItem('currentUser');

    let comments: Comment[] = emptyComments();
    let currentUser: CurrentUser = emptyCurrentUser();
    let lastId: number = 100;
    let upvote: { [key: string]: number } = {};

    if (!upvoteRaw) {
      updateStorage({}, 'upvote');
    } else {
      upvote = JSON.parse(upvoteRaw);
    }

    if (!lastIdRaw) {
      updateStorage(100, 'lastId');

      lastId = 100;
    } else {
      lastId = parseInt(lastIdRaw!, 10);
    }

    if (!commentsRaw) {
      updateStorage(initialData['comments'], 'comments');

      comments = initialData['comments'];
    } else {
      comments = JSON.parse(commentsRaw);
    }

    if (!currentUserRaw) {
      updateStorage(initialData['currentUser'], 'currentUser');

      currentUser = initialData['currentUser'];
    } else {
      currentUser = JSON.parse(currentUserRaw);
    }

    return {
      upvote,
      lastId,
      comments,
      currentUser,
    };
  },
});
