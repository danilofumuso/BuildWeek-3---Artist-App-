import { Component, Input } from '@angular/core';
import { iComment } from '../../interfaces/i-comment';
import { CommentsService } from '../../services/comments.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
})
export class CommentComponent {
  @Input() comment!: iComment | Partial<iComment>;

  constructor(private commentsSvc: CommentsService) {}

  deleteComment(id: number) {
    this.commentsSvc.deleteComment(id).subscribe();
  }

  updateComment() {}
}
