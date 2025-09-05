import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommentCardState } from '../../services/comment-card-state';

@Component({
  selector: 'app-comment-header',
  imports: [],
  templateUrl: './comment-header.html',
  styleUrl: './comment-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CommentHeader {
  constructor(public state: CommentCardState) {}
}
