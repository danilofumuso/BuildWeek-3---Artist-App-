import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { iPost } from '../interfaces/i-post';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}

  getAllPosts() {
    return this.http.get<iPost[]>(environment.postsUrl);

  }

  createPost(post: iPost) {
    return this.http.post<iPost>(environment.postsUrl, post);
  }

  updatePost(post: iPost) {
    return this.http.put<iPost>(`${environment.postsUrl}/${post.id}`, post);
  }

  deletePost(postId: number) {
    return this.http.delete(`${environment.postsUrl}/${postId}`);
  }
}
