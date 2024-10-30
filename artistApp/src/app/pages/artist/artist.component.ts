import { Component } from '@angular/core';
import { iUser } from '../../interfaces/i-user';
import { iPost } from '../../interfaces/i-post';
import { AuthService } from '../../auth/auth.service';
import { PostsService } from '../../services/posts.service';
import { map } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrl: './artist.component.scss',
})
export class ArtistComponent {
  users: iUser[] = [];
  userPosts: iPost[] = [];

  constructor(
    private postSvc: PostsService,
    private authSvc: AuthService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params) => {
      const userName = params['userName'];
      // Fetch artist data using the userName
    });
  }

  ngOnInit() {
    this.authSvc.user$.pipe(map((user) => user?.id)).subscribe((userId) => {
      this.authSvc
        .getAllUsers()
        .subscribe(
          (users) => (this.users = users.filter((user) => user.id === userId))
        );
    });
    this.loadUserPosts();
  }

  loadUserPosts() {
    this.postSvc.getAllPosts().subscribe((posts) => {
      this.userPosts = posts.filter(
        (post) => post.user.id === this.users[0]?.id
      );
    });
  }
}
