import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { iComment } from '../../interfaces/i-comment';
import { iUser } from '../../interfaces/i-user';
import { CommentsService } from '../../services/comments.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-comment-input',
  templateUrl: './comment-input.component.html',
  styleUrls: ['./comment-input.component.scss'],
})
export class CommentInputComponent {
  @ViewChild('form') form!: NgForm;
  @Input() comment!: iComment | Partial<iComment>; // Proprietà comment esistente
  @Input() postId!: number;
  @Output() commentSubmitted = new EventEmitter<iComment>();

  user!: iUser;
  newComment: Partial<iComment> = {};

  constructor(
    private commentsSvc: CommentsService,
    private authSvc: AuthService
  ) {}

  ngOnInit() {
    // Recupera l'utente dall'AuthService
    this.authSvc.user$.subscribe((user) => {
      if (user) this.user = user;
    });

    // Prepopola newComment se comment esiste (caso di modifica)
    if (this.comment) {
      this.newComment = { ...this.comment };
    }
  }

  submit() {
    if (this.comment && this.comment.id) {
      // Caso di aggiornamento del commento
      this.commentsSvc
        .updateComment(this.newComment as iComment)
        .subscribe((updatedComment) => {
          this.commentSubmitted.emit(updatedComment);
          this.form.reset();
        });
    } else {
      // Caso di creazione di un nuovo commento
      this.newComment.date = new Date().toISOString();
      this.newComment.userName = this.user.userName;
      this.newComment.postId = this.postId;

      this.commentsSvc
        .createComment(this.newComment as iComment)
        .subscribe((comment) => {
          this.commentSubmitted.emit(comment);
          this.form.reset();
        });
    }
  }
}
