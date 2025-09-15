import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core';

import { NgClass } from '@angular/common';

import { Comment, CurrentUser } from '@models/comment';
import { CommentHeader } from './components/comment-header/comment-header';
import { CommentContent } from './components/comment-content/comment-content';
import { CommentUpvote } from './components/comment-upvote/comment-upvote';
import { CommentShortcut } from './components/comment-shortcut/comment-shortcut';

import { CommentCardState } from './services/comment-card-state';

import {
  CommentStatusType,
  CommentStatus,
} from '@features/comments/components/comment-card/services/comment-card-models';
import { GlobalStore } from '@app/state';

@Component({
  selector: 'app-comment-card',
  imports: [NgClass, CommentHeader, CommentContent, CommentUpvote, CommentShortcut],
  templateUrl: './comment-card.html',
  styleUrl: './comment-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CommentCardState],
})
export class CommentCard implements OnInit {
  CommentStatus = CommentStatus;

  store = inject(GlobalStore);

  @Input() idx1?: number;
  @Input() idx2?: number;

  @Input() comment?: Comment;
  @Input() currentUser?: CurrentUser;
  @Input() initialStatus?: CommentStatusType;
  @Input() isReply: boolean = false;
  @Input() replyingTo: string = '';

  id: number = 0;

  constructor(public state: CommentCardState) {}

  ngOnInit() {
    const status = this.initialStatus || this.comment?.status || CommentStatus.INFORMATION;

    this.state.status.set(status);
    this.state.replyingTo.set(this.replyingTo ?? '');

    if (this.comment) {
      this.id = this.comment.id;
      this.state.comment.set(this.comment);
    }

    if (this.currentUser) {
      this.state.currentUser.set(this.currentUser);
    }

    if (this.comment?.user?.username === this.currentUser?.username) {
      this.state.isYourOwnComment.set(true);
    }
  }

  updateContent(content: string) {
    const status = this.state.status()!;

    const values = {
      idx1: this.idx1,
      idx2: this.idx2 ?? -1,
      id: this.id,
      content,
      user: this.state.currentUser(),
      status,
    };

    console.log(values);

    this.store.updateComment(values);
  }

  deleteAction() {
    if (this.id && this.idx1 !== -1) {
      const values = {
        idx1: this.idx1!,
        idx2: this.idx2 ?? -1,
        id: this.id,
      };

      this.store.deleteComment(values);
    }
  }

  editAction() {
    if (this.id && this.idx1 !== -1) {
      const values = {
        idx1: this.idx1!,
        idx2: this.idx2 ?? -1,
        id: this.id,
        status: CommentStatus.UPDATE,
      };

      this.store.updateStatus(values);
    }
  }

  replyAction() {
    if (this.comment?.id && this.idx1 !== -1) {
      const values = {
        idx1: this.idx1!,
        idx2: this.idx2 ?? -1,
        id: this.comment!.id,
        user: this.state.currentUser(),
      };

      this.store.replyComment(values);
    }
  }

  upvote(vote: number) {
    if (this.comment?.id && this.idx1 !== -1) {
      const values = {
        idx1: this.idx1!,
        idx2: this.idx2 ?? -1,
        id: this.id,
        score: this.comment?.score ?? 0,
        formerVote: this.store.getUpvote(this.id) ?? 0,
        vote,
      };

      this.store.setUpvote(values);
    }
  }

  cancelEdit() {
    if (this.state.status() === CommentStatus.REPLY) {
      this.deleteAction();
    } else if (this.id && this.idx1 !== -1) {
      const values = {
        idx1: this.idx1!,
        idx2: this.idx2 ?? -1,
        id: this.id,
        status: CommentStatus.INFORMATION,
      };

      this.store.updateStatus(values);
    }
  }
}
