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
  data: CurrentUser | Comment[] | number,
  key: 'comments' | 'currentUser' | 'lastId'
) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const USER_DATA_STATE = new InjectionToken<UserData>('UserData', {
  factory: () => {
    const lastIdRaw = localStorage.getItem('lastId');
    const commentsRaw = localStorage.getItem('comments');
    const currentUserRaw = localStorage.getItem('currentUser');

    let comments: Comment[] = emptyComments();
    let currentUser: CurrentUser = emptyCurrentUser();
    let lastId: number = 100;

    if (!lastIdRaw) {
      localStorage.setItem('lastId', '100');

      lastId = 100;
    } else {
      lastId = parseInt(lastIdRaw!, 10);
    }

    if (!commentsRaw) {
      localStorage.setItem('comments', JSON.stringify(initialData['comments']));

      comments = initialData['comments'];
    } else {
      comments = JSON.parse(commentsRaw);
    }

    if (!currentUserRaw) {
      localStorage.setItem('currentUser', JSON.stringify(initialData['currentUser']));

      currentUser = initialData['currentUser'];
    } else {
      currentUser = JSON.parse(currentUserRaw);
    }

    return {
      lastId,
      comments,
      currentUser,
    };
  },
});
