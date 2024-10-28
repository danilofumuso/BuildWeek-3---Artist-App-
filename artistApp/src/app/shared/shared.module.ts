import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { CommentComponent } from './comment/comment.component';



@NgModule({
  declarations: [
    CardComponent,
    CommentComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
