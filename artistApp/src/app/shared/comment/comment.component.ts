import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { iComment } from '../../interfaces/i-comment';
import { CommentsService } from '../../services/comments.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent {
  @Input() comment!: iComment | Partial<iComment>;
  @Output() commentDeleted = new EventEmitter<number | undefined>();
  @Output() commentUpdated = new EventEmitter<number | undefined>();
  @ViewChild('form') form!: NgForm; // Aggiungi il ViewChild per il tuo form

  editingCommentId?: number; // Aggiungi una variabile per tenere traccia del commento in modifica
  newComment: Partial<iComment> = {}; // Variabile per i dati del commento in modifica

  constructor(private commentsSvc: CommentsService) {}

  deleteComment(id: number | undefined) {
    if (!id) {
      return;
    }
    this.commentsSvc.deleteComment(id).subscribe(() => {
      this.commentDeleted.emit(id);
    });
  }

  updateThisComment(comment: iComment | Partial<iComment>) {
    if (comment && comment.id) {
      this.editingCommentId = comment.id;
      this.newComment = { ...comment }; // Prepopola i dati del commento in modifica
    }
  }

  updateComment() {
    if (this.newComment.id) {
      this.commentsSvc
        .updateComment(this.newComment as iComment)
        .subscribe(() => {
          this.commentUpdated.emit(this.newComment.id);
          this.form.reset();
        });
    }
  }
}
