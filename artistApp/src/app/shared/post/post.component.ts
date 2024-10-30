import { Component, Input } from '@angular/core';
import { iPost } from '../../interfaces/i-post';
import { iComment } from '../../interfaces/i-comment';
import { CommentsService } from '../../services/comments.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent {
  @Input() post!: iPost;
  comments: iComment[] = [];
  isVisible: boolean = true;
  callBlocking: boolean = false;
  isCollapsed: boolean = true;

  constructor(private commentsSvc: CommentsService, private router: Router) {}

  getComments(postId: number) {
    if (this.callBlocking) {
      return;
    }

    this.commentsSvc.getCommentsOfPost(postId).subscribe((comments) => {
      this.comments = comments;
      this.callBlocking = !this.callBlocking;
    });
  }

  showComments() {
    this.isVisible = !this.isVisible;
  }
  navigateToArtist(userId: number) {
    this.router.navigate(['/artist', userId]);
    console.log(userId);
  }
}
