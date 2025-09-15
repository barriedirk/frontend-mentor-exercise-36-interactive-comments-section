import { computed, inject } from '@angular/core';
import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';

import {
  CurrentUser,
  Comment,
  UpdateStatus,
  UpdateComment,
  DeleteComment,
  ReplyComment,
  UpvoteComment,
} from '@app/shared/models/comment';

import { USER_DATA_STATE, emptyComments, emptyCurrentUser, updateStorage } from './comments-state';
import { CommentStatus } from '@features/comments/components/comment-card/services/comment-card-models';

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
    getUpvote: (id: string | number): number | undefined => {
      return store.upvote()[id] ?? undefined;
    },
    setUpvote({ idx1, idx2, id, score, formerVote, vote }: UpvoteComment) {
      const upvote = structuredClone(store.upvote());
      const comments = structuredClone(store.comments());

      score += vote - formerVote;

      if (comments[idx1!]) {
        if (idx2 === -1 && comments[idx1!].id === id) {
          comments[idx1!].score = score;
        } else if (comments[idx1!].replies?.[idx2!]?.id === id) {
          comments[idx1!].replies![idx2!].score = score;
        }
      }

      upvote[id] = vote;

      // @todo, for now, no update the localstorage
      // updateStorage(comments, 'comments');
      // updateStorage(upvote, 'upvote');
      patchState(store, { upvote, comments });
    },
    loggedInUser: computed<CurrentUser>(() => store.currentUser()),
    postComments: computed<Comment[]>(() => store.comments()),
    deleteComment({ idx1, idx2, id }: DeleteComment) {
      const comments = structuredClone(store.comments());

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
    updateStatus({ status, idx1, idx2, id }: UpdateStatus) {
      const comments = structuredClone(store.comments());

      if (comments[idx1!]) {
        if (idx2 === -1 && comments[idx1!].id === id) {
          comments[idx1!].status = status;
        } else if (comments[idx1!].replies?.[idx2!]?.id === id) {
          comments[idx1!].replies![idx2!].status = status;
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
          status: CommentStatus.INFORMATION,
        };

        comments.push(comment);
      }

      if (comments[idx1!] && (status === CommentStatus.REPLY || status === CommentStatus.UPDATE)) {
        if (idx2 === -1 && comments[idx1!].id === id) {
          comments[idx1!].content = content!;
          comments[idx1!].status = CommentStatus.INFORMATION;
        } else if (comments[idx1!].replies?.[idx2!]?.id === id) {
          comments[idx1!].replies![idx2!].content = content;
          comments[idx1!].replies![idx2!].status = CommentStatus.INFORMATION;
        }
      }

      // @todo, for now, no update the localstorage
      // updateStorage(comments, 'comments');
      patchState(store, { lastId, comments });
    },
    replyComment({ idx1, idx2, id, user }: ReplyComment) {
      const comments = structuredClone(store.comments());
      let lastId = store.lastId();
      let comment: Comment;

      // remove any previous reply
      for (let i = comments.length - 1; i >= 0; i--) {
        if (comments[i].status === CommentStatus.REPLY) {
          comments.splice(i, 1);
        } else if (comments[i].replies?.length) {
          for (let j = comments[i].replies!.length - 1; j >= 0; j--) {
            if (comments[i].replies![j].status === CommentStatus.REPLY) {
              comments[i].replies!.splice(j, 1);
            }
          }
        }
      }

      comment = {
        id: ++lastId,
        content: '',
        createdAt: formatISO(new Date()),
        score: 0,
        replies: [],
        replyingTo: '',
        user: user!,
      };

      if (comments[idx1]) {
        if (idx2 === -1 && comments[idx1].id === id) {
          const replies = comments[idx1].replies ?? [];
          const replyingTo = comments[idx1].user.username;

          comment.replyingTo = replyingTo;
          comment.content = `@${replyingTo} `;
          comment.content = `@${replyingTo} `;
          comment.status = CommentStatus.REPLY;

          replies.push(comment);

          comments[idx1].replies = replies;
        } else if (comments[idx1].replies?.[idx2]?.id === id) {
          const replies = comments[idx1].replies;
          const replyingTo = comments[idx1].replies[idx2].user.username;

          comment.replyingTo = replyingTo;
          comment.content = `@${replyingTo} `;
          comment.status = CommentStatus.REPLY;

          replies.splice(idx2 + 1, 0, comment);
          comments[idx1].replies = replies;
        }
      }

      // @todo, for now, no update the localstorage
      // updateStorage(comments, 'comments');
      patchState(store, { lastId, comments });
    },
  }))
);
