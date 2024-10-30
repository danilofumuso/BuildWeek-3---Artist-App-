import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentComponent } from './comment/comment.component';
import { PostComponent } from './post/post.component';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CommentInputComponent } from './comment-input/comment-input.component';

@NgModule({
  declarations: [CommentComponent, PostComponent, CommentInputComponent],
  imports: [CommonModule, NgbCollapseModule, FormsModule],
  exports: [CommentComponent, PostComponent, CommentInputComponent],
})
export class SharedModule {}
