import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { NgClass } from '@angular/common';

import { Comment } from '@models/comment';
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
  @Input() isReply: boolean = false;
  @Input() isAddComment: boolean = false;

  constructor(public state: CommentCardState) {}

  ngOnInit() {
    if (this.comment) {
      this.state.comment.set(this.comment);
      this.state.currentUser.set(true);
      this.state.allowDelete.set(true);
      this.state.allowEdit.set(true);
      this.state.allowReply.set(true);

      console.log({ comment: this.comment });
    }
  }
}
