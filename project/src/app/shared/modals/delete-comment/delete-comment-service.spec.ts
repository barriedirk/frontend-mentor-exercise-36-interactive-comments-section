import { TestBed } from '@angular/core/testing';

import { ModalDeleteCommentService } from './delete-comment-service';

describe('ModalDeleteCommentService', () => {
  let service: ModalDeleteCommentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalDeleteCommentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
