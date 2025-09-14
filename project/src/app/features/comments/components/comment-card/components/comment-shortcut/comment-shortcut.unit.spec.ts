import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
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

describe('CommentShortcut', () => {
  let fixture: ComponentFixture<CommentShortcut>;
  let component: CommentShortcut;
  let modalService: jasmine.SpyObj<ModalDeleteCommentService>;

  beforeEach(async () => {
    modalService = jasmine.createSpyObj('ModalDeleteCommentService', ['open']);

    await TestBed.configureTestingModule({
      imports: [CommentShortcut],
      providers: [
        provideZonelessChangeDetection(),
        { provide: CommentCardState, useClass: MockCommentCardState },
        { provide: ModalDeleteCommentService, useValue: modalService },
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

    expect(deleteBtn).not.toBeNull();
    expect(editBtn).not.toBeNull();
    expect(replyBtn).toBeNull();
  });

  it('should render Reply button when isYourOwnComment is false', () => {
    component.state.isYourOwnComment.set(false);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    const replyBtn = compiled.querySelector('[data-cy^="Reply comment"]');
    const deleteBtn = compiled.querySelector('[data-cy^="Delete comment"]');
    const editBtn = compiled.querySelector('[data-cy^="Edit comment"]');

    expect(replyBtn).not.toBeNull();
    expect(deleteBtn).toBeNull();
    expect(editBtn).toBeNull();
  });

  it('should emit reply event when Reply button clicked', () => {
    component.state.isYourOwnComment.set(false);
    fixture.detectChanges();

    spyOn(component.reply, 'emit');

    const replyBtn = fixture.nativeElement.querySelector('[data-cy^="Reply comment"]');
    replyBtn.click();

    expect(component.reply.emit).toHaveBeenCalled();
  });

  it('should emit edit event when Edit button clicked', () => {
    spyOn(component.edit, 'emit');

    const editBtn = fixture.nativeElement.querySelector('[data-cy^="Edit comment"]');
    editBtn.click();

    expect(component.edit.emit).toHaveBeenCalled();
  });

  it('should emit delete when modal confirms "yes"', async () => {
    spyOn(component.delete, 'emit');
    modalService.open.and.returnValue(Promise.resolve('yes'));

    const deleteBtn = fixture.nativeElement.querySelector('[data-cy^="Delete comment"]');
    await deleteBtn.click();

    expect(modalService.open).toHaveBeenCalled();
    expect(component.delete.emit).toHaveBeenCalled();
  });

  it('should NOT emit delete when modal returns "no"', async () => {
    spyOn(component.delete, 'emit');
    modalService.open.and.returnValue(Promise.resolve('no'));

    const deleteBtn = fixture.nativeElement.querySelector('[data-cy^="Delete comment"]');
    await deleteBtn.click();

    expect(modalService.open).toHaveBeenCalled();
    expect(component.delete.emit).not.toHaveBeenCalled();
  });
});
