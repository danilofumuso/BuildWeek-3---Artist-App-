import { PostComponent } from './../../shared/post/post.component';
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
      const shuffle = (array: iPost[]) => {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      };

      this.posts = shuffle(this.posts);
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
}
