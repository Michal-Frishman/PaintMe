import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { SignIn } from '../../models/SignIn';
import { BehaviorSubject, tap } from 'rxjs';

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
  // signIn(details: SignIn) {
  //   return this.http.post<any>(`${this.apiUrl}/login`, details, {
  //     headers: { 'Content-Type': 'application/json' }
  //   });
  // }
  signIn(details: SignIn) {
    return this.http.post<any>(`${this.apiUrl}/login`, details, {
      headers: { 'Content-Type': 'application/json' }
    }).pipe(
      tap(response => {
        sessionStorage.setItem('token', response.token);
        this.loggedIn.next(true);
        // this.router.navigate(['/']); // נווט הביתה אחרי התחברות
      })
    );
  }
}
