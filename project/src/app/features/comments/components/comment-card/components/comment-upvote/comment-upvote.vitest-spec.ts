import { beforeEach, describe, expect, it } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommentUpvote } from './comment-upvote';
import { Injectable, provideZonelessChangeDetection } from '@angular/core';
import { CommentCardState } from '../../services/comment-card-state';
import { Comment, CommentStatus } from '@models/comment';

@Injectable()
class MockCommentCardState extends CommentCardState {
  constructor() {
    super();
    this.comment.set({
      id: 42,
      user: { username: 'test', image: { png: 'fake-image.png', webp: 'fake-image.webp' } },
    } as Comment);
    this.status.set(CommentStatus.INITIAL);
    this.isYourOwnComment.set(true);
  }
}

describe('CommentUpvote (Vitest)', () => {
  let component: CommentUpvote;
  let fixture: ComponentFixture<CommentUpvote>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentUpvote],
      providers: [
        provideZonelessChangeDetection(),
        { provide: CommentCardState, useClass: MockCommentCardState },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CommentUpvote);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
