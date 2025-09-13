import { describe, it, beforeEach, expect, vi } from 'vitest';

import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { CommentCard } from './comment-card';
import { Comment } from '@models/comment';
import { provideZonelessChangeDetection } from '@angular/core';

@Component({
  standalone: true,
  selector: 'test-host',
  imports: [CommentCard],
  template: `
    <app-comment-card
      [comment]="comment"
      [currentUser]="currentUser"
      [idx1]="0"
      [isReply]="false"
    ></app-comment-card>
  `,
})
class TestHostComponent {
  comment: Comment = {
    id: 1,
    content: 'Test comment',
    createdAt: '1 day ago',
    score: 0,
    user: {
      username: 'test-user',
      image: { png: '', webp: '' },
    },
  };

  currentUser = {
    username: 'test-user',
    image: { png: '', webp: '' },
  };
}

describe('CommentCard (Integration with Vitest)', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  it('should render the comment content', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('Test comment');
  });

  it('should render comment content and action buttons', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    const commentText = compiled.querySelector('app-comment-card')?.textContent ?? '';

    expect(commentText).toContain('Test comment');

    expect(compiled.querySelector('[aria-label="Delete comment"]')).toBeTruthy();
    expect(compiled.querySelector('[aria-label="Edit comment"]')).toBeTruthy();
  });

  it('should show Delete and Edit buttons if the comment belongs to current user', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    const deleteBtn = compiled.querySelector('[aria-label="Delete comment"]');
    const editBtn = compiled.querySelector('[aria-label="Edit comment"]');

    expect(deleteBtn).toBeTruthy();
    expect(editBtn).toBeTruthy();
  });
});
