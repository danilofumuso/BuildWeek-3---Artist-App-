import { Component, Input } from '@angular/core';
import { iPost } from '../../interfaces/i-post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent {
  @Input() post!: iPost;

  isCollapsed: boolean = true;
}
