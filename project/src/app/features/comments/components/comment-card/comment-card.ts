import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { NgClass } from '@angular/common';

import { Comment, CurrentUser } from '@models/comment';
import { CommentHeader } from '../comment-header/comment-header';
import { CommentContent } from '../comment-content/comment-content';
import { CommentUpvote } from '../comment-upvote/comment-upvote';
import { CommentActions } from '../comment-actions/comment-actions';
import { CommentAddComment } from '../comment-add-comment/comment-add-comment';

import { CommentCardState } from '../../services/command-card-state';

@Component({
  selector: 'app-comment-card',
  imports: [
    NgClass,
    CommentHeader,
    CommentContent,
    CommentUpvote,
    CommentActions,
    CommentAddComment,
  ],
  templateUrl: './comment-card.html',
  styleUrl: './comment-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CommentCardState],
})
export class CommentCard implements OnInit {
  @Input() comment?: Comment;
  @Input() currentUser?: CurrentUser;
  @Input() isReply: boolean = false;
  @Input() isAddComment: boolean = false;

  constructor(public state: CommentCardState) {}

  ngOnInit() {
    if (this.comment) {
      this.state.comment.set(this.comment);
      this.state.allowDelete.set(true);
      this.state.allowEdit.set(true);
      this.state.allowReply.set(true);
    }

    if (this.currentUser) {
      this.state.currentUser.set(this.currentUser);
    }

    if (this.comment?.user?.username === this.currentUser?.username) {
      this.state.isCurrentUser.set(true);
    }
  }
}
