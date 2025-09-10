import { CommentCardState } from './comment-card-state';
import { CommentStatus } from './comment-card-models';

describe('CommentCardState', () => {
  let state: CommentCardState;

  beforeEach(() => {
    state = new CommentCardState();
  });

  it('should initialize with default values', () => {
    expect(state.status()).toBe(CommentStatus.INITIAL);
    expect(state.comment()).toBeUndefined();
    expect(state.currentUser()).toBeUndefined();
    expect(state.replyingTo()).toBe('');
    expect(state.isYourOwnComment()).toBe(false);
    expect(state.uniqueId()).toBeTruthy();
  });

  it('should allow updating status', () => {
    state.status.set(CommentStatus.SEND);
    expect(state.status()).toBe(CommentStatus.SEND);
  });

  it('should update replyingTo value', () => {
    state.replyingTo.set('maxblagun');
    expect(state.replyingTo()).toBe('maxblagun');
  });

  it('should update isYourOwnComment flag', () => {
    state.isYourOwnComment.set(true);
    expect(state.isYourOwnComment()).toBe(true);
  });
});
