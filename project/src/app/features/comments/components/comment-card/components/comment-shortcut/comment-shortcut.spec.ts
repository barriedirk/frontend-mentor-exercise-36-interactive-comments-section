import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentShortcut } from './comment-shortcut';

describe('CommentActions', () => {
  let component: CommentShortcut;
  let fixture: ComponentFixture<CommentShortcut>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentShortcut],
    }).compileComponents();

    fixture = TestBed.createComponent(CommentShortcut);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
