import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { NgOptimizedImage } from '@angular/common';

import { v4 as uuidv4 } from 'uuid';
import { Comment } from '@models/comment';
import { CommentUpvote } from '../comment-upvote/comment-upvote';
import { CommentActions } from '../comment-actions/comment-actions';

@Component({
  selector: 'app-comment-card',
  imports: [NgOptimizedImage, CommentUpvote, CommentActions],
  templateUrl: './comment-card.html',
  styleUrl: './comment-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentCard {
  @Input() comment!: Comment;

  uniqueId = uuidv4();

  constructor() {
    console.log({ comment: this.comment });
  }
}
