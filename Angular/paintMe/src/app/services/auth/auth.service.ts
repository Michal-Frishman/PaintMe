import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignIn } from '../../models/SignIn';
import { BehaviorSubject, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  role?: string | null;
  [claim: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedIn.asObservable();
  private apiUrl = "https://paintme-server.onrender.com/api/Auth";

  constructor(private http: HttpClient) {
    const token = typeof window !== 'undefined' ? sessionStorage.getItem('token') : null;
    this.loggedIn.next(!!token);
  }

  signIn(details: SignIn) {
    return this.http.post<any>(`${this.apiUrl}/login`, details, {
      headers: { 'Content-Type': 'application/json' }
    }).pipe(
      tap(response => {
        this.loggedIn.next(true);
      })
    );
  }

  isAdmin(): boolean {
    const token = typeof window !== 'undefined' ? sessionStorage.getItem('token') : null;
    if (!token) return false;
    try {
      const decoded = jwtDecode<DecodedToken>(token);
      const role = decoded.role || decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      return role === 'Admin';
    } catch (error) {
      console.error('Invalid token', error);
      return false;
    }
  }
}
