import { Component, Input } from '@angular/core';
import { iPost } from '../../interfaces/i-post';
import { iComment } from '../../interfaces/i-comment';
import { CommentsService } from '../../services/comments.service';
import { FavoritesService } from '../../services/favorites.service';
import { AuthService } from '../../auth/auth.service';
import { iFavorite } from '../../interfaces/i-favorite';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent {
  @Input() post!: iPost;
  comments: (iComment | Partial<iComment>)[] = [{}];
  favorites: iFavorite[] = [];
  isVisible: boolean = true;
  callBlocking: boolean = false;
  isCollapsed: boolean = true;
  userId: number | null = null;

  constructor(
    private authSvc: AuthService,
    private commentsSvc: CommentsService,
    private favoriteSvc: FavoritesService
  ) {}

  ngOnInit() {
    this.authSvc.user$.subscribe((user) => {
      if (user) {
        this.userId = user.id;
        this.loadFavorites();
      }
    });
  }

  getComments(postId: number) {
    if (this.callBlocking) {
      return;
    }

    this.commentsSvc.getCommentsOfPost(postId).subscribe((comments) => {
      this.comments = [...comments];
      this.callBlocking = !this.callBlocking;
    });
  }

  showComments() {
    this.isVisible = !this.isVisible;
  }

  //favorites

  loadFavorites() {
    if (this.userId) {
      this.favoriteSvc.getFavorites(this.userId).subscribe((favorites) => {
        this.favorites = favorites;
      });
    }
  }

  addToFavorites(post: iPost) {
    if (this.userId) {
      const isFavorite = this.isFavorite(post);
      if (isFavorite) {
        const favoriteToRemove = this.favorites.find(
          (fav) => fav.post.id === post.id && fav.userId === this.userId
        );
        if (favoriteToRemove) {
          this.favoriteSvc
            .removeFromFavorites(favoriteToRemove)
            .subscribe(() => this.loadFavorites());
        }
      } else {
        const favorite: iFavorite = { userId: this.userId, post };
        this.favoriteSvc
          .addToFavorites(favorite)
          .subscribe(() => this.loadFavorites());
      }
      console.log(this.favorites);
    }
  }

  isFavorite(post: iPost): boolean {
    return this.favorites.some((fav) => fav.post.id === post.id);
  }
}
