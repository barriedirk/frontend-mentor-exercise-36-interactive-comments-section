import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { ModalDeleteCommentService } from './delete-comment-service';
import { ModalDeleteComment } from './modal-delete-comment';

describe('ModalDeleteCommentService', () => {
  let service: ModalDeleteCommentService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalDeleteComment],
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

    // Simulate closing the modal
    const modalRef = (service as any).modalRef;
    modalRef.instance.close.emit('confirmed');

    const result = await promise;
    expect(result).toBe('confirmed');

    // Modal should be removed
    expect(document.querySelector('app-modal-delete-comment')).toBeNull();
  });
});
