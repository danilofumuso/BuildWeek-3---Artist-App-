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
  userPosts: iPost[] = [];
  showCreatePostForm = false;
  isEditing = false;
  editingPostId: number | null = null;

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
    this.loadUserPosts();
  }

  loadUserPosts() {
    this.postSvc.getAllPosts().subscribe((posts) => {
      this.userPosts = posts.filter(
        (post) => post.user.id === this.users[0]?.id
      );
    });
  }

  toggleCreatePost(post?: iPost) {
    if (post) {
      // Se viene passato un post, stiamo modificando
      this.isEditing = true;
      this.editingPostId = post.id;
      this.newPost = { ...post };
    } else {
      // Se non viene passato un post, stiamo creando
      this.isEditing = false;
      this.editingPostId = null;
      this.resetForm();
    }
    this.showCreatePostForm = true;
  }

  // funzione svuota form
  resetForm() {
    this.newPost = {
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
  }

  //creo o aggiorno il post al submit
  createOrUpdatePost() {
    this.authSvc.user$.subscribe((user) => {
      if (user && this.newPost.title && this.newPost.caption) {
        // Completa i dettagli utente nel post
        this.newPost.user = {
          email: user.email,
          password: user.password,
          name: user.name,
          surname: user.surname,
          userName: user.userName,
          id: user.id,
        };

        if (this.isEditing && this.editingPostId) {
          // Aggiorna post esistente
          const postToUpdate = this.newPost as iPost;
          this.postSvc.updatePost(postToUpdate).subscribe(
            (updatedPost) => {
              console.log('Post aggiornato con successo:', updatedPost);
              this.loadUserPosts(); // Ricarica i post
              this.showCreatePostForm = false;
              this.resetForm();
            },
            (error) => {
              console.error("Errore nell'aggiornamento del post:", error);
            }
          );
        } else {
          // Crea nuovo post
          const postToCreate = this.newPost as iPost;
          this.postSvc.createPost(postToCreate).subscribe(
            (post) => {
              console.log('Post creato con successo:', post);
              this.loadUserPosts(); // Ricarica i post
              this.showCreatePostForm = false;
              this.resetForm();
            },
            (error) => {
              console.error('Errore nella creazione del post:', error);
            }
          );
        }
      }
    });
  }

  deletePost(id: number) {
    if (confirm('Sei sicuro di voler eliminare questo post?')) {
      this.postSvc.deletePost(id).subscribe(
        () => {
          console.log('Post eliminato con successo');
          this.loadUserPosts(); // Ricarica i post
        },
        (error) => {
          console.error("Errore nell'eliminazione del post:", error);
        }
      );
    }
  }
}
