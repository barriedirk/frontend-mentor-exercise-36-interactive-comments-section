import { beforeEach, describe, expect, it } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeleteComment } from './modal-delete-comment';
import { provideZonelessChangeDetection } from '@angular/core';

describe('ModalDeleteCommentComponent (Vitest)', () => {
  let component: ModalDeleteComment;
  let fixture: ComponentFixture<ModalDeleteComment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalDeleteComment],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalDeleteComment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
