import { iPost } from './i-post';
import { iUser } from './i-user';

export interface iComment {
  id: number;
  comment: string;
  post: iPost;
}
