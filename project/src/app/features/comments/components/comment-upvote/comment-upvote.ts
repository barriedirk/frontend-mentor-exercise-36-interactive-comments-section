import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-comment-upvote',
  imports: [],
  templateUrl: './comment-upvote.html',
  styleUrl: './comment-upvote.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CommentUpvote {
  score = 0;
}
