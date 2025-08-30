import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommentCardState } from '../../services/command-card-state';

@Component({
    selector: 'app-comment-header',
    imports: [],
    templateUrl: './comment-header.html',
    styleUrl: './comment-header.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class CommentHeader implements OnInit {
    constructor(public state: CommentCardState) {}

    ngOnInit() {
        const comment = this.state.comment();

        console.log(comment);
    }
}
