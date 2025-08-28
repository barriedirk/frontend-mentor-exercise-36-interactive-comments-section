import { ChangeDetectionStrategy, Component } from '@angular/core';

import { CommentCard } from './components/comment-card/comment-card';

import { Comment } from '@models/comment';

@Component({
  standalone: true,
  selector: 'app-comments',
  imports: [CommentCard],
  templateUrl: './comments.html',
  styleUrl: './comments.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Comments {
  dumbComment: Comment = {
    id: 1,
    content:
      "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
    createdAt: '1 month ago',
    score: 12,
    user: {
      image: {
        png: 'assets/images/avatars/image-amyrobson.png',
        webp: 'assets/images/avatars/image-amyrobson.webp',
      },
      username: 'amyrobson',
    },
    replies: [],
  };
}
