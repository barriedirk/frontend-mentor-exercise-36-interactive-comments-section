import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { CommentCardState } from '../../services/command-card-state';

@Component({
    selector: 'app-comment-content',
    imports: [],
    templateUrl: './comment-content.html',
    styleUrl: './comment-content.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class CommentContent {
    constructor(public state: CommentCardState) {}
}
