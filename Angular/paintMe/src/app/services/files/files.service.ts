import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of, tap } from 'rxjs';
import { File } from '../../models/File';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  private apiUrl = `${environment.apiUrl}/Files`;

  private filesSubject = new BehaviorSubject<File[]>([]);
  files$ = this.filesSubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(true);
  isLoading$ = this.loadingSubject.asObservable();


  constructor(private http: HttpClient) {
    this.loadFiles();
  }

  private loadFiles() {
    this.loadingSubject.next(true);
    this.http.get<File[]>(`${this.apiUrl}/admin-only`)
      .subscribe({
        next: files => {
          this.filesSubject.next(files);
          this.loadingSubject.next(false);
        },
        error: () => {
          this.filesSubject.next([]);
          this.loadingSubject.next(false);
        }
      });
  }


  getAllFiles(): Observable<File[]> {
    return this.http.get<File[]>(`${this.apiUrl}/admin-only`)
      .pipe(
        catchError(error => {
          if (error.status === 403) {
            alert("You don't have permission");
          }
          return of([]);
        })
      );
  }

  addFile(file: File): Observable<File> {
    return this.http.post<File>(this.apiUrl, file)
      .pipe(
        catchError(error => {
          alert("addFile failed: " + error.message);
          return of({} as File);
        }),
        tap(() => this.loadFiles())
      );
  }

  getFileById(id: number): Observable<File> {
    return this.http.get<File>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(error => {
          alert("getFileById failed: " + error.message);
          return of({} as File);
        })
      );
  }

  updateFile(id: number, file: File): Observable<File> {
    return this.http.put<File>(`${this.apiUrl}/${id}`, file)
      .pipe(
        catchError(error => {
          alert("updateFile failed: " + error.message);
          return of({} as File);
        }),
        tap(() => this.loadFiles())
      );
  }

  deleteFile(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(error => {
          alert("deleteFile failed: " + error.message);
          return of();
        }),
        tap(() => this.loadFiles())
      );
  }
}
