import { describe, it, beforeEach, expect, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';

import { CommentCard } from './comment-card';
import { CommentCardState } from './services/comment-card-state';
import { CommentStatus } from './services/comment-card-models';

import { GlobalStore } from '@app/state';

class MockGlobalStore {
  updateComment = vi.fn();
  getUpvote = vi.fn();
  deleteComment = vi.fn();
  updateStatus = vi.fn();
  replyComment = vi.fn();
  setUpvote = vi.fn();
}

describe('CommentCard (Vitest)', () => {
  let component: CommentCard;
  let mockStore: MockGlobalStore;

  beforeEach(async () => {
    mockStore = new MockGlobalStore();

    await TestBed.configureTestingModule({
      imports: [CommentCard],
      providers: [{ provide: GlobalStore, useValue: mockStore }, provideZonelessChangeDetection()],
    }).compileComponents();

    const fixture = TestBed.createComponent(CommentCard);
    component = fixture.componentInstance;

    component.idx1 = 0;
    component.id = 1;
    component.currentUser = {
      username: 'test-user',
      image: { png: '', webp: '' },
    };
  });

  it('should call updateComment with correct data on updateContent', () => {
    component.state.status.set(CommentStatus.UPDATE);
    component.state.currentUser.set(component.currentUser!);

    component.updateContent('Updated content');

    expect(mockStore.updateComment).toHaveBeenCalledWith(
      expect.objectContaining({
        content: 'Updated content',
        id: 1,
        status: CommentStatus.UPDATE,
        user: component.currentUser,
      })
    );
  });
});
