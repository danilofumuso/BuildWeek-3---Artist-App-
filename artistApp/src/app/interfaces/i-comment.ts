import { iPost } from './i-post';

export interface iComment {
  id: number;
  comment: string;
  post: iPost;
  date: string;
}
