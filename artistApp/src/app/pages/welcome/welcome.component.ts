import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { iPost } from '../../interfaces/i-post';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss',
})
export class WelcomeComponent implements OnInit {
  posts: iPost[] = []; // Array di post randomici
i: any;

  constructor(private authSvc: AuthService, private router: Router) {}
  ngOnInit() {
    this.loadRandomPosts();
  }

  loadRandomPosts() {
    this.posts = [
      // Esempi di dati fittizi
      {
        id: 1,
        title: 'Post 1',
        imageUrl: 'path/to/image1.jpg',
        user: {
          userName: 'User1',
          id: 0,
          name: '',
          surname: '',
          email: '',
          password: '',
        },
        caption: 'Descrizione 1',
      },
      {
        id: 2,
        title: 'Post 2',
        imageUrl: 'path/to/image2.jpg',
        user: {
          userName: 'User2',
          id: 0,
          name: '',
          surname: '',
          email: '',
          password: '',
        },
        caption: 'Descrizione 2',
      },
    ];
  }
}
