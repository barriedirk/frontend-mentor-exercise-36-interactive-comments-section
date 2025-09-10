import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { CommentCard } from './components/comment-card/comment-card';

import { CommentStatus } from '@features/comments/components/comment-card/services/comment-card-models';

import { GlobalStore } from '@app/state';

@Component({
  standalone: true,
  selector: 'app-comments',
  imports: [CommentCard],
  templateUrl: './comments.html',
  styleUrl: './comments.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Comments {
  CommentStatus = CommentStatus;

  store = inject(GlobalStore);
}
