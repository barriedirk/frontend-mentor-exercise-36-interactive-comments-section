import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { CommentCardState } from '../../services/comment-card-state';

import { CommentStatus } from '../../services/comment-card-models';

import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import { AutoFocus } from '@app/shared/directives/auto-focus';
import { isMacPlatform } from '@app/shared/utils/helper';

@Component({
  selector: 'app-comment-content',
  imports: [ReactiveFormsModule, NgClass, AutoFocus],
  templateUrl: './comment-content.html',
  styleUrl: './comment-content.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CommentContent implements OnInit {
  CommentStatus = CommentStatus;
  id: number = 0;

  @Output() content = new EventEmitter<string>();
  @Output() cancel = new EventEmitter<boolean>();

  form = new FormGroup({
    content: new FormControl('', [Validators.required, Validators.minLength(1)]),
  });

  constructor(public state: CommentCardState) {}

  ngOnInit() {
    const content = this.state.comment()?.content ?? '';

    this.form.patchValue({
      content,
    });
  }

  update() {
    const contentValue = this.form.get('content')!.value;

    if (this.state.status() === CommentStatus.SEND) {
      this.form.patchValue({
        content: '',
      });
    }

    if (
      this.state.status() === CommentStatus.REPLY ||
      this.state.status() === CommentStatus.UPDATE
    ) {
      const comment = this.state.comment();

      if (comment) {
        comment.content = contentValue ?? '';

        this.state.comment.set(comment);
      }
    }

    this.content.emit(contentValue!);
  }

  private cancelEdit() {
    if (this.state.status() === CommentStatus.SEND) {
      this.form.patchValue({
        content: '',
      });
    }

    if (
      this.state.status() === CommentStatus.REPLY ||
      this.state.status() === CommentStatus.UPDATE
    ) {
      this.cancel.emit();
    }
  }

  contentKeyDown(event: KeyboardEvent) {
    const isMac = isMacPlatform();
    const ctrlOrCmd = isMac ? event.metaKey : event.ctrlKey;

    if (ctrlOrCmd && event.key === 'Enter') {
      event.preventDefault();

      if (this.form.valid) {
        this.update();
      }
    }

    if (event.key === 'Escape') {
      this.cancelEdit();
    }
  }
}
