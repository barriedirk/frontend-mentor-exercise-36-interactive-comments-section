import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';

import { Comments } from './comments';
import { GlobalStore } from '@app/state';
import { initialData } from '@app/state/initial-data';

describe('Comments Component (Integration)', () => {
  let fixture: ComponentFixture<Comments>;
  let component: Comments;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Comments],
      providers: [
        provideZonelessChangeDetection(),
        {
          provide: GlobalStore,
          useValue: {
            ...initialData,
            comments: () => initialData.comments,
            currentUser: () => initialData.currentUser,
            getUpvote: () => 0,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Comments);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render the new comment input box (SEND)', () => {
    const sendInputCard = Array.from(
      fixture.nativeElement.querySelectorAll('app-comment-card')
    ).find((el) => (el as HTMLElement).outerHTML.includes('comment-card__send'));

    expect(sendInputCard).toBeTruthy();
  });

  it('should include reply threading inside replies container', () => {
    const replyContainer = fixture.nativeElement.querySelector('[aria-label="List of replies"]');

    expect(replyContainer).toBeTruthy();

    const replyCards = replyContainer.querySelectorAll('app-comment-card');

    expect(replyCards.length).toBe(2);
  });

  it('should render the correct number of top-level comments', () => {
    const topLevelCards = fixture.nativeElement.querySelectorAll(
      'app-comment-card:not([data-cy^="Reply to comment id:"])'
    );

    expect(topLevelCards.length).toBe(3);
  });

  it('should render the correct number of replies', () => {
    const replyCards = fixture.nativeElement.querySelectorAll(
      'app-comment-card[data-cy^="Reply to comment id"]'
    );

    expect(replyCards.length).toBe(2); // 2 replies inside comment id: 2
  });
});
