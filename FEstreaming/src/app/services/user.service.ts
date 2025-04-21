import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../models/User';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/all`).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${email}`).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  updateUser(id: string, userData: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/update/${id}`, userData).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('API Error:', error);

    if (error.status === 401 || error.status === 403) {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }

    const message = error.error?.message ||
      error.message ||
      'Server error occurred';
    return throwError(() => new Error(message));
  }
}
