import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { CommentCardState } from '../../services/comment-card-state';

import { CommentStatus } from '../../services/comment-card-models';

import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-comment-content',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './comment-content.html',
  styleUrl: './comment-content.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CommentContent {
  CommentStatus = CommentStatus;

  @Output() content = new EventEmitter<string>();

  form = new FormGroup({
    content: new FormControl('', [Validators.required, Validators.minLength(1)]),
  });

  constructor(public state: CommentCardState) {
    const content = state.comment()?.content ?? '';

    this.form.patchValue({
      content: '',
    });
  }

  update() {
    const contentValue = this.form.get('content')!.value;

    this.content.emit(contentValue!);

    if (this.state.status() === CommentStatus.SEND) {
      this.form.patchValue({
        content: '',
      });
    }
  }
}
