import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-comment-add-comment',
  imports: [ReactiveFormsModule],
  templateUrl: './comment-add-comment.html',
  styleUrl: './comment-add-comment.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CommentAddComment {
  form = new FormGroup({
    content: new FormControl('', [Validators.required, Validators.minLength(1)]),
  });
}
