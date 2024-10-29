import { Component } from '@angular/core';
import { iPost } from '../../interfaces/i-post';
import { PostsService } from '../../services/posts.service';
import { iComment } from '../../interfaces/i-comment';
import { AuthService } from '../../auth/auth.service';
import { iUser } from '../../interfaces/i-user';
import { map } from 'rxjs';
import { CommentsService } from '../../services/comments.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  posts: iPost[] = [];
  comments: iComment[] = [];
  users: iUser[] = [];
  visible: boolean = false;

  constructor(
    private postsSvc: PostsService,
    private authSvc: AuthService,
    private commentsSvc: CommentsService
  ) {}

  ngOnInit() {
    this.postsSvc.getAllPosts().subscribe((posts) => {
      this.posts = posts;
      this.getComments();
    });

    this.authSvc.user$ //funzione per user loggato
      .pipe(map((user) => user?.id))
      .subscribe((userId) => {
        this.authSvc
          .getAllUsers()
          .subscribe(
            (users) => (this.users = users.filter((user) => user.id === userId))
          );
      });
  }

  getComments() {
    this.posts.forEach((post) => {
      this.commentsSvc.getCommentsById(post.id).subscribe((comments) => {
        this.comments = comments;
      });
    });
  }

  showComments(postId: number) {
    if (postId) {
      this.visible = !this.visible;
    }
  }
}
