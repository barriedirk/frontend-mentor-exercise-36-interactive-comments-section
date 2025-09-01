import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeleteComment } from './modal-delete-comment';

describe('ModalDeleteCommentComponent', () => {
  let component: ModalDeleteComment;
  let fixture: ComponentFixture<ModalDeleteComment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalDeleteComment],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalDeleteComment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
