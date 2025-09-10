import { CommentCard } from './comment-card';
import { CommentCardState } from './services/comment-card-state';
import { CommentStatus } from './services/comment-card-models';

import { GlobalStore } from '@app/state';

describe('CommentCard', () => {
  let component: CommentCard;
  let mockStore: jasmine.SpyObj<InstanceType<typeof GlobalStore>>;

  beforeEach(() => {
    mockStore = jasmine.createSpyObj<InstanceType<typeof GlobalStore>>('GlobalStore', [
      'updateComment',
      'getUpvote',
      'deleteComment',
      'updateStatus',
      'replyComment',
      'setUpvote',
    ]);
    component = new CommentCard(new CommentCardState());
    (component as any).store = mockStore;

    component.idx1 = 0;
    component.id = 1;
    component.currentUser = {
      username: 'test-user',
      image: { png: '', webp: '' },
    };
  });

  it('should call updateComment with correct data on updateContent', () => {
    component.state.status.set(CommentStatus.UPDATE);
    component.state.currentUser.set(component.currentUser!);

    component.updateContent('Updated content');

    expect(mockStore.updateComment).toHaveBeenCalledWith(
      jasmine.objectContaining({
        content: 'Updated content',
        id: 1,
        status: CommentStatus.UPDATE,
      })
    );
  });
});
