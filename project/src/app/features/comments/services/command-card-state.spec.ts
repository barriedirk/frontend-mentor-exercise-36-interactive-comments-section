import { TestBed } from '@angular/core/testing';

import { CommentCardState } from './command-card-state';

describe('CommentCardState', () => {
  let service: CommentCardState;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommentCardState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
