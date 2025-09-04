import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { NgClass } from '@angular/common';

import { CommentCardState } from '../../services/comment-card-state';

@Component({
  selector: 'app-comment-upvote',
  imports: [NgClass],
  templateUrl: './comment-upvote.html',
  styleUrl: './comment-upvote.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CommentUpvote {
  hostClasses = 'comment-upvote rounded-[10px] p-[8px] bg-grey-50';

  @Input()
  set classes(value: string) {
    this.hostClasses = this.hostClasses + (value ? ` ${value}` : '');
  }

  constructor(public state: CommentCardState) {}
}
