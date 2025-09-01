import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentAddComment } from './comment-add-comment';

describe('CommentAddComment', () => {
  let component: CommentAddComment;
  let fixture: ComponentFixture<CommentAddComment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentAddComment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentAddComment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
