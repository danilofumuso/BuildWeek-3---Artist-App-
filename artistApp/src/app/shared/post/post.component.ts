import { Component, Input } from '@angular/core';
import { iPost } from '../../interfaces/i-post';
import { iComment } from '../../interfaces/i-comment';
import { CommentsService } from '../../services/comments.service';
import { FavoritesService } from '../../services/favorites.service';
import { AuthService } from '../../auth/auth.service';
import { iFavorite } from '../../interfaces/i-favorite';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent {
  @Input() post!: iPost;
  comments: iComment[] = [];
  favorites: iFavorite[] = [];
  isVisible: boolean = true;
  callBlocking: boolean = false;
  isCollapsed: boolean = true;
  userId: number | null = null;

  constructor(
    private authSvc: AuthService,
    private commentsSvc: CommentsService,
    private router: Router,
    private favoriteSvc: FavoritesService
  ) {}

  ngOnInit() {
    this.authSvc.user$.subscribe((user) => {
      if (user) {
        this.userId = user.id;
        this.loadFavorites();
      }
    });

    // Sottoscrizione ai cambiamenti dei preferiti
    this.favoriteSvc.favoritesChanged$.subscribe(() => {
      this.loadFavorites();
    });
  }

  getComments(postId: number) {
    if (this.callBlocking) {
      return;
    }

    this.commentsSvc.getCommentsOfPost(postId).subscribe({
      next: (comments) => {
        this.comments = comments;
        this.callBlocking = !this.callBlocking;
      },
      error: (error) => {
        console.error('Errore nel caricamento dei commenti:', error);
        this.callBlocking = false;
      },
    });
  }

  showComments() {
    this.isVisible = !this.isVisible;
  }

  loadFavorites() {
    if (this.userId) {
      this.favoriteSvc.getFavorites(this.userId).subscribe({
        next: (favorites) => {
          this.favorites = favorites;
        },
        error: (error) => {
          console.error('Errore nel caricamento dei preferiti:', error);
        },
      });
    }
  }

  addToFavorites(post: iPost) {
    if (!this.userId) return;

    const isFavorite = this.isFavorite(post);
    if (isFavorite) {
      const favoriteToRemove = this.favorites.find(
        (fav) => fav.post.id === post.id && fav.userId === this.userId
      );
      if (favoriteToRemove) {
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
    } else {
      const favorite: iFavorite = { userId: this.userId, post };
      this.favoriteSvc.addToFavorites(favorite).subscribe({
        next: () => {
          this.loadFavorites();
          this.favoriteSvc.notifyFavoritesChanged();
        },
        error: (error) => {
          console.error("Errore nell'aggiunta del preferito:", error);
        },
      });
    }
  }

  isFavorite(post: iPost): boolean {
    return this.favorites.some(
      (fav) => fav.post.id === post.id && fav.userId === this.userId
    );
  }
  navigateToArtist(userId: number) {
    this.router.navigate(['/artist', userId]);
    console.log(userId);
  }
}
