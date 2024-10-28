import { iPost } from './i-post';

export interface iFavorite {
  id?: number;
  userId: number;
  post: iPost;
}
