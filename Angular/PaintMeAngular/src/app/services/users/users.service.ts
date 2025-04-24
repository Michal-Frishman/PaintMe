import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import { User } from '../../models/User';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  apiUrl = 'https://paintme-server.onrender.com/api/Users';
  private usersSubject = new BehaviorSubject<User[]>([]);
  users$ = this.usersSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadUsers();
  }
  private loadUsers() {
    this.http.get<User[]>(this.apiUrl)
      .subscribe(users => this.usersSubject.next(users));
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl)
      .pipe(
        catchError(error => {
          if (error.status == 403) {
            alert("you dont have a permission")
          }
          return of([]);
        })
      );
  }
  addUser(user: User): Observable<User> {
    // user.role = parseInt(user.role.toString());
    return this.http.post<User>(this.apiUrl, user)
      .pipe(
        catchError(error => {
          alert("addUser failed: " + error.message);
          return of({} as User);
        }),
        tap(() => this.loadUsers()) // Reload users after adding a new user
      );
  }

  // postLoginOrRegister( data : PartialUser, userStatus: string): Observable<{ token: string ,userId:number}>{
  //   return this.http.post<{ token: string, userId:number }>(`http://localhost:3000/api/auth/${userStatus}`, data);
  // }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(error => {
          alert("getUserById failed: " + error.message);
          return of({} as User);
        })
      );
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user)
      .pipe(
        catchError(error => {
          alert("updateUser failed: " + error.message);
          return of({} as User);
        }), tap(() => this.loadUsers()
        ));
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(error => {
          alert("deleteUser failed: " + error.message);
          return of();
        }), tap(() => this.loadUsers()
        ));
  }
}
