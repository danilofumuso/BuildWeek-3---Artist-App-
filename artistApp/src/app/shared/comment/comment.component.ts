import { Component, Input } from '@angular/core';
import { iComment } from '../../interfaces/i-comment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
})
export class CommentComponent {
  @Input() comment!: iComment | Partial<iComment>;
}
