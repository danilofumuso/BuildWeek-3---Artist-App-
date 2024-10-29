import { Component, Input } from '@angular/core';
import { iPost } from '../../interfaces/i-post';
import { iComment } from '../../interfaces/i-comment';
import { CommentsService } from '../../services/comments.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent {
  @Input() post!: iPost;
  @Input() comments: iComment[] = [];

  visible: boolean = true;

  isCollapsed: boolean = true;

  constructor(private commentsSvc: CommentsService) {}

  showComments(postId: number) {
    this.commentsSvc.getCommentsOfPost(postId).subscribe((comments) => {
      this.comments = comments;
      this.visible = !this.visible;
    });
  }
}
