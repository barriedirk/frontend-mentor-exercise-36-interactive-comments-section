import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommentCardState } from '../../services/comment-card-state';
import { TimeAgoPipe } from '@app/shared/pipes/time-ago-pipe';

@Component({
  selector: 'app-comment-header',
  imports: [TimeAgoPipe],
  templateUrl: './comment-header.html',
  styleUrl: './comment-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CommentHeader {
  constructor(public state: CommentCardState) {}
}
