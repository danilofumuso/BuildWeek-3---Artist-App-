import { Component, inject, TemplateRef } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../auth/auth.service';
import { iUser } from '../../interfaces/i-user';
import { map, switchMap, take } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  //per il funzionamento del off-canvas
  private offcanvasService = inject(NgbOffcanvas);

  openEnd(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { position: 'end' });
  }
  //per il funzionamento del off-canvas

  users: iUser[] = [];

  isLoggedIn: boolean = false;

  constructor(private authSvc: AuthService) {}

  ngOnInit() {
    this.authSvc.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  //prendo l'id dall'utente loggato e lo uso per filtrare l'array di user che uso per la "friendlist"
  clickToGetFriends() {
    this.authSvc.user$.pipe(map((user) => user?.id)).subscribe((userId) => {
      this.authSvc
        .getAllUsers()
        .subscribe(
          (users) => (this.users = users.filter((user) => user.id !== userId))
        );
    });
  }

  logout(): void {
    this.authSvc.logout();
  }
}
