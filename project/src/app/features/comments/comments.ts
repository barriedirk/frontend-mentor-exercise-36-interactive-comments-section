import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { CommentCard } from './components/comment-card/comment-card';

import { Comment, UserData } from '@models/comment';
import { HttpClient } from '@angular/common/http';

import { CommentStatus } from '@features/comments/services/comment-card-models';

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
  // http = inject(HttpClient);
  // comments: WritableSignal<Comment[]> = signal([]);

  // ngOnInit(): void {
  //   this.http.get<UserData>('/assets/data.json').subscribe((data: UserData) => {
  //     this.comments.set(data.comments);
  //   });
  // }
}
