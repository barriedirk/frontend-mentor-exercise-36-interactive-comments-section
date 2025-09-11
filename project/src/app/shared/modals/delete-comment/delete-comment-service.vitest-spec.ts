import { beforeEach, describe, expect, it, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentRef, EnvironmentInjector, createComponent } from '@angular/core';
import { ModalDeleteCommentService } from './delete-comment-service';
import { ModalDeleteComment } from './modal-delete-comment';
import { Component, EventEmitter, Output } from '@angular/core';

// Mock component to avoid templateUrl issues
@Component({
  selector: 'app-modal-delete-comment',
  standalone: true,
  template: `<div>Mock Modal</div>`,
})
export class MockModalDeleteComment {
  @Output() close = new EventEmitter<string>();
}

describe('ModalDeleteCommentService (Vitest)', () => {
  let service: ModalDeleteCommentService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MockModalDeleteComment],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    service = TestBed.inject(ModalDeleteCommentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open and close the modal', async () => {
    const promise = service.open();

    const modalElement = document.querySelector('app-modal-delete-comment');
    expect(modalElement).toBeTruthy();

    const modalRef = (service as any).modalRef;
    modalRef.instance.close.emit('confirmed');

    const result = await promise;
    expect(result).toBe('confirmed');

    expect(document.querySelector('app-modal-delete-comment')).toBeNull();
  });
});
