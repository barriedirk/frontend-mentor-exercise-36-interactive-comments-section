import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentContent } from './comment-content';

describe('CommentContent', () => {
  let component: CommentContent;
  let fixture: ComponentFixture<CommentContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentContent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentContent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
