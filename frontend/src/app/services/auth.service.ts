import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    createdAt: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/user/login`;
  private token$ = new BehaviorSubject<string | null>(this.getStoredToken());
  private userName$ = new BehaviorSubject<string | null>(this.getStoredUserName());
  token = this.token$.asObservable();
  userName = this.userName$.asObservable();

  constructor(private http: HttpClient) {}

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiUrl, credentials).pipe(
      tap(response => {
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('userName', response.user.name);
        this.token$.next(response.token);
        this.userName$.next(response.user.name);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName');
    this.token$.next(null);
    this.userName$.next(null);
  }

  getToken(): string | null {
    return this.token$.value;
  }

  private getStoredToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('authToken');
    }
    return null;
  }

  private getStoredUserName(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('userName');
    }
    return null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
