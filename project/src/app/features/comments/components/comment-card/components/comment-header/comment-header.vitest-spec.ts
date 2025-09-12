import { beforeEach, describe, expect, it } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommentHeader } from './comment-header';
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

describe('CommentHeader (Vitest)', () => {
  let component: CommentHeader;
  let fixture: ComponentFixture<CommentHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentHeader],
      providers: [
        provideZonelessChangeDetection(),
        { provide: CommentCardState, useClass: MockCommentCardState },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CommentHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
