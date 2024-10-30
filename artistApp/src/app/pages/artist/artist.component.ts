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
    private route: ActivatedRoute,
    private authSvc: AuthService
  ) {}

  ngOnInit() {
    const userId = +this.route.snapshot.paramMap.get('id')!; // Prendi l'ID dall'URL
    this.loadUserData(userId);
    this.loadUserPosts(userId);
  }

  loadUserData(userId: number) {
    // Qui dovresti avere un metodo per caricare i dati dell'utente
    // Ad esempio, puoi avere un servizio UsersService
    this.authSvc
      .getAllUsers()
      .subscribe(
        (users) => (this.users = users.filter((user) => user.id === userId))
      );
  }

  loadUserPosts(userId: number) {
    this.postSvc.getAllPosts().subscribe((posts) => {
      this.userPosts = posts.filter((post) => post.user.id === userId);
    });
  }
}
