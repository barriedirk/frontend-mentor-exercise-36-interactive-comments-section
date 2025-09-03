import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommentCardState } from '@features/comments/services/command-card-state';

@Component({
  selector: 'app-comment-form',
  imports: [ReactiveFormsModule],
  templateUrl: './comment-form.html',
  styleUrl: './comment-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CommentForm {
  @Input() isTextSend: boolean = false;
  @Input() isTextReply: boolean = false;
  @Input() isTextUpdate: boolean = false;
  @Input() replyingTo: string = '';

  form = new FormGroup({
    content: new FormControl('', [Validators.required, Validators.minLength(1)]),
  });

  constructor(public state: CommentCardState) {}
}
