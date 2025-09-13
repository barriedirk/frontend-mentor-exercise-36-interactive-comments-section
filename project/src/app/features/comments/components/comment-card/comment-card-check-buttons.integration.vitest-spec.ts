import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';
import { provideZonelessChangeDetection } from '@angular/core';

import { CommentCard } from './comment-card';
import { Comment } from '@models/comment';
import { ModalDeleteCommentService } from '@modals/delete-comment/delete-comment-service';

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
  @ViewChild(CommentCard) commentCard!: CommentCard;

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

class MockModalDeleteCommentService {
  open() {
    return Promise.resolve('yes');
  }
}

describe('CommentCard - check Delete, Edit, or Reply emits the correct events - (Integration with Vitest)', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;

  async function setupTest(spyFns?: (commentCard: CommentCard) => void) {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [
        provideZonelessChangeDetection(),
        { provide: ModalDeleteCommentService, useClass: MockModalDeleteCommentService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;

    if (spyFns) {
      fixture.detectChanges(); // allow @ViewChild to resolve
      spyFns(hostComponent.commentCard);
    }

    fixture.detectChanges();
  }

  it('should call deleteAction when Delete button is clicked', async () => {
    await setupTest((commentCard) => {
      vi.spyOn(commentCard, 'deleteAction').mockImplementation(() => {});
    });

    const deleteBtn = fixture.nativeElement.querySelector('[aria-label="Delete comment"]');
    expect(deleteBtn, 'Delete button should exist').toBeTruthy();

    deleteBtn.click();

    await fixture.whenStable();

    expect(hostComponent.commentCard.deleteAction).toHaveBeenCalled();
  });

  it('should call editAction when Edit button is clicked', async () => {
    await setupTest((commentCard) => {
      vi.spyOn(commentCard, 'editAction').mockImplementation(() => {});
    });

    const editBtn = fixture.nativeElement.querySelector('[aria-label="Edit comment"]');
    expect(editBtn, 'Edit button should exist').toBeTruthy();

    editBtn.click();

    expect(hostComponent.commentCard.editAction).toHaveBeenCalled();
  });

  it('should call replyAction when Reply button is clicked (for others)', async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;

    hostComponent.currentUser = { username: 'other-user', image: { png: '', webp: '' } };
    hostComponent.comment.user.username = 'comment-owner';

    fixture.detectChanges();

    vi.spyOn(hostComponent.commentCard, 'replyAction').mockImplementation(() => {});

    fixture.detectChanges();

    const replyBtn = fixture.nativeElement.querySelector('[aria-label="Reply to comment"]');
    expect(replyBtn, 'Reply button should exist').toBeTruthy();

    replyBtn.click();

    expect(hostComponent.commentCard.replyAction).toHaveBeenCalled();
  });
});
