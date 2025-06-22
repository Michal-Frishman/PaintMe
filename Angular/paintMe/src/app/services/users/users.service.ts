import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import { User } from '../../models/User';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = `${environment.apiUrl}/Users`;

  private usersSubject = new BehaviorSubject<User[]>([]);
  users$ = this.usersSubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(true);
  isLoading$ = this.loadingSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadUsers();
  }
  private loadUsers() {
    this.loadingSubject.next(true);
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: users => {
        this.usersSubject.next(users);
        this.loadingSubject.next(false);
      },
      error: () => {
        this.usersSubject.next([]);
        this.loadingSubject.next(false);
      }
    });
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
    return this.http.post<User>(this.apiUrl, user)
      .pipe(
        catchError(error => {
          alert("addUser failed: " + error.message);
          return of({} as User);
        }),
        tap(() => this.loadUsers())
      );
  }
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
