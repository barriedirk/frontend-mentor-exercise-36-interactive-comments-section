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

  @Output() content = new EventEmitter<string>();

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
}
