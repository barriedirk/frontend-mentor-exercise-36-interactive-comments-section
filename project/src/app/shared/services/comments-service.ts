import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Comment } from '@app/shared/models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private http: HttpClient = Inject(HttpClient);

  // Render Comments & Replies	Use recursive component or flatten replies under each comment
  // Add a Comment	Bind a textarea form, push to state
  // Reply to Comment	Track which comment is being replied to (replyingTo logic)
  // Edit a Comment	Inline editing, update state
  // Delete a Comment	Show confirmation modal, then remove from state
  // Score (Upvote/Downvote)	Add logic to increase/decrease, limit per user
  // Current User	Store in a global service or localStorage
  // Responsiveness	Use CSS Grid/Flexbox + mobile-first styles
  // Keyboard Accessibility	Make sure buttons and inputs are focusable and navigable

  getComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>('/assets/data.json');
  }

  saveCommentsToLocalStorage(comments: Comment[]) {
    localStorage.setItem('comments', JSON.stringify(comments));
  }
}
