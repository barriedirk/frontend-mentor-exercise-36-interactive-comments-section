import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modal-delete-comment',
  imports: [],
  templateUrl: './modal-delete-comment.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalDeleteComment {
  @Output() close = new EventEmitter<string>();

  onClose(action: string) {
    this.close.emit(action);
  }
}
