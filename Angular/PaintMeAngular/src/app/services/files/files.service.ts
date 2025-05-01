import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of, tap } from 'rxjs';
import {File} from '../../models/File';

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  // apiUrl = 'https://paintme-server.onrender.com/api/Files';
    apiUrl = 'https://localhost:7209/api/Files';

  private filesSubject = new BehaviorSubject<File[]>([]);
  files$ = this.filesSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadFiles();
  }

  private loadFiles() {
    this.http.get<File[]>(this.apiUrl)
      .subscribe(files => this.filesSubject.next(files));
  }

  getAllFiles(): Observable<File[]> {
    return this.http.get<File[]>(this.apiUrl)
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
