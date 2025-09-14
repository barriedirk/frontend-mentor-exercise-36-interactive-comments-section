import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommentCard } from './comment-card';
import { CommentCardState } from './services/comment-card-state';
import { CommentStatus } from './services/comment-card-models';

import { GlobalStore } from '@app/state';
import { provideZonelessChangeDetection } from '@angular/core';

describe('CommentCard', () => {
  let component: CommentCard;
  let fixture: ComponentFixture<CommentCard>;
  let mockStore: jasmine.SpyObj<InstanceType<typeof GlobalStore>>;

  beforeEach(async () => {
    mockStore = jasmine.createSpyObj<InstanceType<typeof GlobalStore>>('GlobalStore', [
      'updateComment',
      'getUpvote',
      'deleteComment',
      'updateStatus',
      'replyComment',
      'setUpvote',
    ]);

    await TestBed.configureTestingModule({
      imports: [CommentCard],
      providers: [
        { provide: GlobalStore, useValue: mockStore },
        provideZonelessChangeDetection(), // Optional: to avoid Zone.js
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CommentCard);
    component = fixture.componentInstance;

    // Set input values
    component.idx1 = 0;
    component.id = 1;
    component.currentUser = {
      username: 'test-user',
      image: { png: '', webp: '' },
    };

    fixture.detectChanges();
  });

  it('should call updateComment with correct data on updateContent', () => {
    component.state.status.set(CommentStatus.UPDATE);
    component.state.currentUser.set(component.currentUser!);

    component.updateContent('Updated content');

    expect(mockStore.updateComment).toHaveBeenCalledWith(
      jasmine.objectContaining({
        content: 'Updated content',
        id: 1,
        status: CommentStatus.UPDATE,
      })
    );
  });
});
