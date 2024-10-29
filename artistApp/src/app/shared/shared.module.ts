import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentComponent } from './comment/comment.component';
import { PostComponent } from './post/post.component';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [CommentComponent, PostComponent],
  imports: [CommonModule, NgbCollapseModule],
  exports: [CommentComponent, PostComponent],
})
export class SharedModule {}
