import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommentContent } from './comment-content';
import { Comment, CommentStatus } from '@models/comment';
import { Injectable, provideZonelessChangeDetection } from '@angular/core';
import { CommentCardState } from '../../services/comment-card-state';

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

describe('CommentContent', () => {
  let component: CommentContent;
  let fixture: ComponentFixture<CommentContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentContent],
      providers: [
        provideZonelessChangeDetection(),
        { provide: CommentCardState, useClass: MockCommentCardState },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CommentContent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
