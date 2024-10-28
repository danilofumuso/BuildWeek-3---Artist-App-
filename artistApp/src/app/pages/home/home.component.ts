import { Component } from '@angular/core';
import { iPost } from '../../interfaces/i-post';
import { PostsService } from '../../services/posts.service';
import { iComment } from '../../interfaces/i-comment';
import { CommentsService } from '../../services/comments.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  posts: iPost[] = [];
  comments: iComment[] = [];

  constructor(
    private postSvc: PostsService,
    private commentSvc: CommentsService
  ) {}

  ngOnInit() {
    this.postSvc.getAllPosts().subscribe((posts) => {
      this.posts = posts;
    });
  }
}
