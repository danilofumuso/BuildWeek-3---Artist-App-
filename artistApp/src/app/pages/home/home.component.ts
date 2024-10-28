import { Component } from '@angular/core';
import { iPost } from '../../interfaces/i-post';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  posts: iPost[] = [];

  constructor(private postSvc: PostsService) {}

  ngOnInit() {
    this.postSvc.getAllPosts().subscribe((posts) => {
      this.posts = posts;
    });
  }
}
