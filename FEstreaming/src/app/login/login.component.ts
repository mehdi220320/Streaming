import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthHttpService } from '../services/AuthHttp.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;
  loading: boolean = false;
  errorMessage: string | null = null;

  constructor(
    private router: Router,
    private authService: AuthHttpService
  ) {}

  onSubmit() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Please enter both email and password';
      return;
    }

    this.loading = true;
    this.errorMessage = null;

    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        this.loading = false;

        if (response.token) {
          if (this.rememberMe) {
            localStorage.setItem('rememberMe', 'true');
          } else {
            localStorage.removeItem('rememberMe');
          }

          try {
            const decoded: any = jwtDecode(response.token);
            const userId = decoded.userId;
            const role = decoded.role;

            this.authService.setToken(response.token);
            this.authService.setUserRole(role);

            if (role === 'admin') {
              this.router.navigate(['/admin']);
            } else {
              this.router.navigate(['/home']);
            }
          } catch (error) {
            console.error('Error decoding token:', error);
            this.errorMessage = 'Login error. Please try again.';
          }
        }
      },
      error: (error) => {
        this.loading = false;
        console.error('Login error:', error);

        if (error.status === 401) {
          this.errorMessage = 'Invalid email or password';
        } else if (error.status === 0) {
          this.errorMessage = 'Cannot connect to server. Please check your connection.';
        } else {
          this.errorMessage = 'Login failed. Please try again later.';
        }
      }
    });
  }

  ngOnInit() {
    if (localStorage.getItem('rememberMe') ){
      this.rememberMe = true;
    }
  }
}
