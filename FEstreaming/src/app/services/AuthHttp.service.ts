import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthHttpService {
  private apiUrl = 'http://localhost:3000/auth';
  private tokenKey = 'auth_token';
  private roleKey = 'user_role';

  constructor(private http: HttpClient) {}

  register(name: string, email: string, password: string, role: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { name, email, password, role });
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((response: any) => {
        if (response.token && response.role) {
          this.setToken(response.token);
          this.setUserRole(response.role);
        }
      })
    );
  }

  // Helper methods
  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  setUserRole(role: string): void {
    localStorage.setItem(this.roleKey, role);
  }

  getUserRole(): string | null {
    return localStorage.getItem(this.roleKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.roleKey);
  }

  isAdmin(): boolean {
    return this.getUserRole() === 'admin';
  }
}
