import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { CommentCardState } from '../../services/comment-card-state';

import { CommentStatus } from '@features/comments/services/comment-card-models';

@Component({
  selector: 'app-comment-shortcut',
  imports: [],
  templateUrl: './comment-shortcut.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CommentShortcut {
  CommentStatus = CommentStatus;

  constructor(public state: CommentCardState) {}
}
