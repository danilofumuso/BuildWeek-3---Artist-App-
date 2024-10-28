import { Component } from '@angular/core';
import { iPost } from '../../interfaces/i-post';
import { PostsService } from '../../services/posts.service';
import { iComment } from '../../interfaces/i-comment';
import { AuthService } from '../../auth/auth.service';
import { iUser } from '../../interfaces/i-user';
import { map } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  posts: iPost[] = [];
  comments: iComment[] = [];
  users: iUser[] = [];

  constructor(private postSvc: PostsService, private authSvc: AuthService) {}

  ngOnInit() {
    this.postSvc.getAllPosts().subscribe((posts) => {
      this.posts = posts;
    });

    //funzione per user loggato
    this.authSvc.user$.pipe(map((user) => user?.id)).subscribe((userId) => {
      this.authSvc
        .getAllUsers()
        .subscribe(
          (users) => (this.users = users.filter((user) => user.id === userId))
        );
    });
  }
}
