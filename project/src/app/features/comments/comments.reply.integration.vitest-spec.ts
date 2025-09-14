import { beforeEach, describe, expect, it } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Comments } from './comments';
import { GlobalStore } from '@app/state';
import { provideZonelessChangeDetection } from '@angular/core';

describe('Comments Component (Reply flow integration)', () => {
  let fixture: ComponentFixture<Comments>;
  let component: Comments;
  let store: InstanceType<typeof GlobalStore>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Comments],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(Comments);
    component = fixture.componentInstance;
    store = TestBed.inject(GlobalStore);
    fixture.detectChanges();
  });

  it('should insert a reply input when "Reply" is clicked', async () => {
    const commentCards = fixture.nativeElement.querySelectorAll(
      'app-comment-card:not([data-cy^="Reply to comment id"])'
    );
    const commentToReply = commentCards[0];
    expect(commentToReply, 'Expected at least one comment').toBeTruthy();

    const replyInputsBefore = fixture.nativeElement.querySelectorAll(
      'app-comment-card[data-cy^="Reply to comment id:"] textarea'
    );
    expect(replyInputsBefore.length, 'Should be no reply textareas before interaction').toBe(0);

    const replyButton = commentToReply.querySelector('[aria-label="Reply to comment"]');
    expect(replyButton, 'Reply button should exist').toBeTruthy();

    (replyButton as HTMLButtonElement).click();
    fixture.detectChanges();
    await fixture.whenStable();

    const replyInputsAfter = fixture.nativeElement.querySelectorAll(
      'app-comment-card[data-cy^="Reply to comment id:"] textarea'
    );
    expect(
      replyInputsAfter.length,
      'One reply input should be rendered after clicking "Reply"'
    ).toBe(1);

    const commentsState = store.postComments();
    const hasReplyComment = commentsState.some((comment) =>
      comment.replies?.some((reply) => reply.status === 'REPLY')
    );
    expect(hasReplyComment, 'Store should contain reply with REPLY status').toBe(true);
  });
});
