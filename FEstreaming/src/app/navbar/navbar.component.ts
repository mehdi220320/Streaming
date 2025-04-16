import { Component, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthHttpService } from '../services/AuthHttp.service';
import { Subscription } from 'rxjs';

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
    this.router.navigate(['/index']);
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }
}
