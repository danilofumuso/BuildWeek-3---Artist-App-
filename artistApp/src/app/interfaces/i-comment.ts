import { iPost } from './i-post';

export interface iComment {
  id: number;
  comment: string;
  postId: number;
  userName: string;
  date: string;
}
