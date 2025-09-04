import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { NgClass } from '@angular/common';

import { Comment, CurrentUser } from '@models/comment';
import { CommentHeader } from '../comment-header/comment-header';
import { CommentContent } from '../comment-content/comment-content';
import { CommentUpvote } from '../comment-upvote/comment-upvote';
import { CommentShortcut } from '../comment-shortcut/comment-shortcut';

import { CommentCardState } from '../../services/comment-card-state';

import { CommentStatusType, CommentStatus } from '@features/comments/services/comment-card-models';

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

  @Input() comment?: Comment;
  @Input() currentUser?: CurrentUser;
  @Input() initialStatus?: CommentStatusType;
  @Input() isReply: boolean = false;
  @Input() replyingTo: string = '';

  constructor(public state: CommentCardState) {}

  ngOnInit() {
    this.state.status.set(this.initialStatus ?? CommentStatus.INFORMATION);
    this.state.replyingTo.set(this.replyingTo ?? '');

    if (this.comment) {
      this.state.comment.set(this.comment);
    }

    if (this.currentUser) {
      this.state.currentUser.set(this.currentUser);
    }

    if (this.comment?.user?.username === this.currentUser?.username) {
      this.state.isCurrentUser.set(true);
    }
  }
}
