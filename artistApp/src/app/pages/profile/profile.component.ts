import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { PostsService } from '../../services/posts.service';
import { map } from 'rxjs/operators';
import { iUser } from '../../interfaces/i-user';
import { iPost } from '../../interfaces/i-post';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  users: iUser[] = [];
  showCreatePostForm = false;

  newPost: Partial<iPost> = {
    id: 0,
    title: '',
    imageUrl: '',
    caption: '',
    date: new Date().toISOString(),
    user: {
      email: '',
      password: '',
      name: '',
      surname: '',
      userName: '',
      id: 0,
    },
  };

  constructor(private postSvc: PostsService, private authSvc: AuthService) {}

  ngOnInit() {
    this.authSvc.user$.pipe(map((user) => user?.id)).subscribe((userId) => {
      this.authSvc
        .getAllUsers()
        .subscribe(
          (users) => (this.users = users.filter((user) => user.id === userId))
        );
    });
  }

  toggleCreatePost() {
    this.showCreatePostForm = !this.showCreatePostForm;
  }

  createPost() {
    this.authSvc.user$.subscribe((user) => {
      if (user && this.newPost.title && this.newPost.caption) {
        // Completa i dettagli utente nel nuovo post
        this.newPost.user = {
          email: user.email,
          password: user.password, // Evita di includere la password se non necessaria
          name: user.name,
          surname: user.surname,
          userName: user.userName,
          id: user.id,
        };

        const postToCreate = this.newPost as iPost;

        // Salva il post usando il PostsService
        this.postSvc.createPost(postToCreate).subscribe(
          (post) => {
            console.log('Post creato con successo:', post);
            this.showCreatePostForm = false; // Nascondi il form
            this.newPost = {}; // Resetta i campi del form
          },
          (error) => {
            console.error('Errore nella creazione del post:', error);
          }
        );
      }
    });
  }
}
