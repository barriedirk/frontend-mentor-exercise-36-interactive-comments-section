import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentUpvote } from './comment-upvote';

describe('CommentUpvote', () => {
  let component: CommentUpvote;
  let fixture: ComponentFixture<CommentUpvote>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentUpvote]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentUpvote);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
