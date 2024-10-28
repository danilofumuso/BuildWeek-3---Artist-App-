import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { iComment } from '../interfaces/i-comment';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  constructor(private http: HttpClient) {}

  getCommentsById(postId: number) {
    return this.http.get<iComment[]>(
      `${environment.commentsUrl}?postId=${postId}`
    );
  }
}
