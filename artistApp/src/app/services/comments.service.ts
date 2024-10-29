import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { iComment } from '../interfaces/i-comment';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  constructor(private http: HttpClient) {}

  getCommentsOfPost(postId: number): Observable<iComment[]> {
    return this.http.get<iComment[]>(
      `${environment.commentsUrl}?postId=${postId}`
    );
  }

  createComment(comment: iComment): Observable<iComment> {
    return this.http.post<iComment>(`${environment.commentsUrl}`, comment);
  }

  updateComment(comment: iComment): Observable<iComment> {
    return this.http.put<iComment>(
      `${environment.commentsUrl}?commentId=${comment.id}`,
      comment
    );
  }

  deleteComment(comment: iComment): Observable<iComment> {
    return this.http.delete<iComment>(
      `${environment.commentsUrl}?commentId=${comment.id}`
    );
  }
}
