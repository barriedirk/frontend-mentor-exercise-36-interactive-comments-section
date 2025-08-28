import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-comment-actions',
  imports: [],
  templateUrl: './comment-actions.html',
  styleUrl: './comment-actions.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CommentActions {}
