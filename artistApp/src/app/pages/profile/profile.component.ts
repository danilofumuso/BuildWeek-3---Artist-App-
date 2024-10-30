import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { PostsService } from '../../services/posts.service';
import { iUser } from '../../interfaces/i-user';
import { iPost } from '../../interfaces/i-post';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  users: iUser[] = [];
  userPosts: iPost[] = [];
  favorites: iPost[] = [];
  userId: number | null = null;
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

  constructor(
    private postSvc: PostsService,
    private authSvc: AuthService,
    private favoriteSvc: FavoritesService
  ) {}

  ngOnInit() {
    this.authSvc.user$.subscribe((user) => {
      if (user) {
        this.userId = user.id;
        this.loadUserData();
      }
    });

    // Sottoscrizione ai cambiamenti dei preferiti
    this.favoriteSvc.favoritesChanged$.subscribe(() => {
      this.loadFavorites();
    });
  }

  loadUserData() {
    if (this.userId) {
      // Carica gli utenti
      this.authSvc
        .getAllUsers()
        .subscribe(
          (users) =>
            (this.users = users.filter((user) => user.id === this.userId))
        );

      // Carica i post
      this.loadUserPosts();

      // Carica i preferiti
      this.loadFavorites();
    }
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
      this.isEditing = true;
      this.editingPostId = post.id;
      this.newPost = { ...post };
    } else {
      this.isEditing = false;
      this.editingPostId = null;
      this.resetForm();
    }
    this.showCreatePostForm = true;
  }

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

  createOrUpdatePost() {
    this.authSvc.user$.subscribe((user) => {
      if (user && this.newPost.title && this.newPost.caption) {
        this.newPost.user = {
          email: user.email,
          password: user.password,
          name: user.name,
          surname: user.surname,
          userName: user.userName,
          id: user.id,
        };

        if (this.isEditing && this.editingPostId) {
          const postToUpdate = this.newPost as iPost;
          this.postSvc.updatePost(postToUpdate).subscribe({
            next: (updatedPost) => {
              console.log('Post aggiornato con successo:', updatedPost);
              this.loadUserPosts();
              this.showCreatePostForm = false;
              this.resetForm();
            },
            error: (error) => {
              console.error("Errore nell'aggiornamento del post:", error);
            },
          });
        } else {
          const postToCreate = this.newPost as iPost;
          this.postSvc.createPost(postToCreate).subscribe({
            next: (post) => {
              console.log('Post creato con successo:', post);
              this.loadUserPosts();
              this.showCreatePostForm = false;
              this.resetForm();
            },
            error: (error) => {
              console.error('Errore nella creazione del post:', error);
            },
          });
        }
      }
    });
  }

  deletePost(id: number) {
    if (confirm('Sei sicuro di voler eliminare questo post?')) {
      this.postSvc.deletePost(id).subscribe({
        next: () => {
          console.log('Post eliminato con successo');
          this.loadUserPosts();
        },
        error: (error) => {
          console.error("Errore nell'eliminazione del post:", error);
        },
      });
    }
  }

  loadFavorites() {
    if (this.userId) {
      this.favoriteSvc.getFavorites(this.userId).subscribe({
        next: (favorites) => {
          // Estrai solo i post dai preferiti
          this.favorites = favorites.map((fav) => fav.post);
        },
        error: (error) => {
          console.error('Errore nel caricamento dei preferiti:', error);
        },
      });
    }
  }

  removeFromFavorites(post: iPost) {
    if (this.userId) {
      this.favoriteSvc.getFavorites(this.userId).subscribe({
        next: (favorites) => {
          const favoriteToRemove = favorites.find(
            (fav) => fav.post.id === post.id
          );
          if (
            favoriteToRemove &&
            confirm(`Vuoi davvero rimuovere ${post.title} dai preferiti?`)
          ) {
            this.favoriteSvc.removeFromFavorites(favoriteToRemove).subscribe({
              next: () => {
                this.loadFavorites();
                this.favoriteSvc.notifyFavoritesChanged();
              },
              error: (error) => {
                console.error('Errore nella rimozione del preferito:', error);
              },
            });
          }
        },
        error: (error) => {
          console.error('Errore nel recupero dei preferiti:', error);
        },
      });
    }
  }
}
