import { Component, OnInit } from '@angular/core';

import { iPost } from '../../interfaces/i-post';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss',
})
export class WelcomeComponent implements OnInit {
  constructor(private postsSvc: PostsService) {}
  posts: iPost[] = [];
  ngOnInit() {
    this.postsSvc.getAllPosts().subscribe((posts) => {
      this.posts = posts;
    });
  }
}
