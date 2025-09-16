import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { AutoFocus } from '@app/shared/directives/auto-focus';

@Component({
  selector: 'app-modal-delete-comment',
  imports: [AutoFocus],
  templateUrl: './modal-delete-comment.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalDeleteComment {
  @Output() close = new EventEmitter<string>();

  onClose(action: string) {
    this.close.emit(action);
  }
}
