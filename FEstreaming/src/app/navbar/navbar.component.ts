import { Component, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthHttpService } from '../services/AuthHttp.service';
import { Subscription } from 'rxjs';
declare var google:any;
@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnDestroy {
  currentUrl: string = '';
  private publicRoutes = ['/index', '/login', '/signup', '/contact',''];
  private routerSubscription: Subscription;

  constructor(
    private router: Router,
    public authService: AuthHttpService
  ) {
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
      }
    });
  }

  isPublicRoute(): boolean {
    return this.publicRoutes.some(route => this.currentUrl.includes(route));
  }

  isAdmin(): boolean {
    return this.authService.getUserRole() === 'admin';
  }

  logout(): void {
    this.authService.logout();

    if (typeof google !== 'undefined' && google.accounts && google.accounts.id) {
      try {
        google.accounts.id.disableAutoSelect();
        google.accounts.id.revoke(localStorage.getItem('email'), (done: {success: boolean})  => {
          console.log('Google session revoked');
        });
      } catch (e) {
        console.warn('Google Sign-Out error:', e);
      }
    }

    localStorage.clear();

    this.router.navigate(['/index']).then(() => {
      window.location.reload();
    });

  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }
}
