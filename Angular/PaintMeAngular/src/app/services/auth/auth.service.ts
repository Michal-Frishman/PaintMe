import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { SignIn } from '../../models/SignIn';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = "http://localhost:7209/api/Auth";
  constructor(private http: HttpClient) { }
  signIn(details: SignIn) {
    console.log(details);
    return this.http.post<any>(`${this.apiUrl}/login`, details, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
