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
  styleUrl: './comment-input.component.scss',
})
export class CommentInputComponent {
  @ViewChild('form') form!: NgForm;
  @Input() comment!: iComment | Partial<iComment>;
  @Input() postId!: number;
  user!: iUser;
  @Output() commentSubmitted = new EventEmitter<iComment>();

  newComment: Partial<iComment> = {};

  constructor(
    private commentsSvc: CommentsService,
    private authSvc: AuthService
  ) {}

  ngOnInit() {
    this.authSvc.user$.subscribe((user) => {
      if (user) this.user = user;
    });
  }

  submit() {
    this.newComment.date = new Date().toISOString();
    this.newComment.userName = this.user.userName;
    this.newComment.postId = this.postId;
    this.commentsSvc.createComment(this.newComment).subscribe((comment) => {
      this.commentSubmitted.emit(comment);
      this.form.reset();
    });
  }
}
