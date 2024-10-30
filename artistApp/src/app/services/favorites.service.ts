import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { iFavorite } from '../interfaces/i-favorite';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private favoritesChanged = new Subject<void>();
  favoritesChanged$ = this.favoritesChanged.asObservable();

  constructor(private http: HttpClient) {}

  notifyFavoritesChanged() {
    this.favoritesChanged.next();
  }

  getFavorites(userId: number) {
    return this.http.get<iFavorite[]>(
      `${environment.favoritesUrl}?userId=${userId}`
    );
  }

  addToFavorites(favorite: iFavorite) {
    return this.http.post<iFavorite>(environment.favoritesUrl, favorite);
  }

  removeFromFavorites(favorite: iFavorite) {
    return this.http.delete(`${environment.favoritesUrl}/${favorite.id}`);
  }
}
