import { Component, OnInit } from '@angular/core';

import { iPost } from '../../interfaces/i-post';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss',
})
export class WelcomeComponent implements OnInit {
  isCollapsed: any;
  Math: any;
  router: any;
  constructor(private postsSvc: PostsService) {}
  posts: iPost[] = [];
  postGroups: iPost[][] = [];

  ngOnInit() {
    this.postsSvc.getAllPosts().subscribe((posts) => {
      this.posts = posts;
      this.groupPosts(); // Raggruppa i post una volta caricati
    });
  }

  groupPosts() {
    this.postGroups = [];
    for (let i = 0; i < this.posts.length; i += 5) {
      this.postGroups.push(this.posts.slice(i, i + 5));
    }
  }
}
