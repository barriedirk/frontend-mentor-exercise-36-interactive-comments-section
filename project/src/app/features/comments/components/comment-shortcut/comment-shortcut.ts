import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { CommentCardState } from '../../services/command-card-state';

@Component({
  selector: 'app-comment-shortcut',
  imports: [],
  templateUrl: './comment-shortcut.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CommentShortcut {
  constructor(public state: CommentCardState) {}
}
