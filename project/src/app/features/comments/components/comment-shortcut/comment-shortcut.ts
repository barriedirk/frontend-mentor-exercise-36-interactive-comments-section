import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Output,
  ViewEncapsulation,
} from '@angular/core';

import { CommentCardState } from '../../services/comment-card-state';

import { CommentStatus } from '@features/comments/services/comment-card-models';
import { ModalDeleteCommentService } from '@modals/delete-comment/delete-comment-service';

@Component({
  selector: 'app-comment-shortcut',
  imports: [],
  templateUrl: './comment-shortcut.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CommentShortcut {
  @Output() delete = new EventEmitter<void>();
  @Output() reply = new EventEmitter<void>();
  @Output() edit = new EventEmitter<void>();

  modalDelete = inject(ModalDeleteCommentService);

  CommentStatus = CommentStatus;

  constructor(public state: CommentCardState) {}

  async deleteAction() {
    const action = await this.modalDelete.open();

    if (action === 'yes') {
      this.delete.emit();
    }
  }

  replyAction() {
    this.reply.emit();
  }

  editAction() {
    this.edit.emit();
  }
}
