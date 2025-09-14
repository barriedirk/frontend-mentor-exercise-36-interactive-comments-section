import { describe, it, beforeEach, expect, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { CommentShortcut } from './comment-shortcut';
import { CommentCardState } from '../../services/comment-card-state';
import { ModalDeleteCommentService } from '@modals/delete-comment/delete-comment-service';
import { CommentStatus } from '@features/comments/components/comment-card/services/comment-card-models';
import { Comment } from '@models/comment';
import { Injectable } from '@angular/core';

@Injectable()
class MockCommentCardState extends CommentCardState {
  constructor() {
    super();
    this.comment.set({ id: 42 } as Comment);
    this.status.set(CommentStatus.INITIAL);
    this.isYourOwnComment.set(true);
  }
}

const mockModalService = {
  open: vi.fn(),
};

describe('CommentShortcut (Vitest)', () => {
  let component: CommentShortcut;
  let fixture: ComponentFixture<CommentShortcut>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentShortcut],
      providers: [
        provideZonelessChangeDetection(),
        { provide: CommentCardState, useClass: MockCommentCardState },
        { provide: ModalDeleteCommentService, useValue: mockModalService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CommentShortcut);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render Delete and Edit buttons when isYourOwnComment is true', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    const deleteBtn = compiled.querySelector('[data-cy^="Delete comment"]');
    const editBtn = compiled.querySelector('[data-cy^="Edit comment"]');
    const replyBtn = compiled.querySelector('[data-cy^="Reply comment"]');

    expect(deleteBtn).toBeTruthy();
    expect(editBtn).toBeTruthy();
    expect(replyBtn).toBeNull(); // Not your own = no reply
  });

  it('should render Reply button when isYourOwnComment is false', async () => {
    component.state.isYourOwnComment.set(false);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    const replyBtn = compiled.querySelector('[data-cy^="Reply comment"]');
    expect(replyBtn).toBeTruthy();

    const deleteBtn = compiled.querySelector('[data-cy^="Delete comment"]');
    const editBtn = compiled.querySelector('[data-cy^="Edit comment"]');
    expect(deleteBtn).toBeNull();
    expect(editBtn).toBeNull();
  });

  it('should emit reply event when Reply button clicked', () => {
    const spy = vi.fn();
    component.reply.subscribe(spy);

    component.state.isYourOwnComment.set(false);
    fixture.detectChanges();

    const replyBtn = fixture.nativeElement.querySelector('[data-cy^="Reply comment"]');
    replyBtn.click();

    expect(spy).toHaveBeenCalled();
  });

  it('should emit edit event when Edit button clicked', () => {
    const spy = vi.fn();
    component.edit.subscribe(spy);

    const editBtn = fixture.nativeElement.querySelector('[data-cy^="Edit comment"]');
    editBtn.click();

    expect(spy).toHaveBeenCalled();
  });

  it('should call modal and emit delete when confirmed', async () => {
    const spy = vi.fn();
    component.delete.subscribe(spy);

    mockModalService.open.mockResolvedValueOnce('yes');

    const deleteBtn = fixture.nativeElement.querySelector('[data-cy^="Delete comment"]');
    await deleteBtn.click();

    expect(mockModalService.open).toHaveBeenCalled();
    expect(spy).toHaveBeenCalled();
  });

  it('should not emit delete when modal canceled', async () => {
    const spy = vi.fn();
    component.delete.subscribe(spy);

    mockModalService.open.mockResolvedValueOnce('no');

    const deleteBtn = fixture.nativeElement.querySelector('[data-cy^="Delete comment"]');
    await deleteBtn.click();

    expect(spy).not.toHaveBeenCalled();
  });
});
