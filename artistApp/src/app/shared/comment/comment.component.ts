import { Component, EventEmitter, Input, Output } from '@angular/core';
import { iComment } from '../../interfaces/i-comment';
import { CommentsService } from '../../services/comments.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
})
export class CommentComponent {
  @Input() comment!: iComment | Partial<iComment>;
  @Output() commentDeleted = new EventEmitter<number | undefined>();

  constructor(private commentsSvc: CommentsService) {}

  deleteComment(id: number | undefined) {
    if (!id) {
      return;
    }
    this.commentsSvc.deleteComment(id).subscribe(() => {
      this.commentDeleted.emit(id);
    });
  }

  updateComment() {}
}
