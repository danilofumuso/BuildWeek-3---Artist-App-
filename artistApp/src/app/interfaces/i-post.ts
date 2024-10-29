import { DatePipe } from '@angular/common';
import { iUser } from './i-user';

export interface iPost {
  id: number;
  title: string;
  imageUrl: string;
  user: iUser;
  caption: string;
  date: string;
}
