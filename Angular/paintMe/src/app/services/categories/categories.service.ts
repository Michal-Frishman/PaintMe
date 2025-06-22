import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private apiUrl = `${environment.apiUrl}/Categories`;

  private categoriesSubject = new BehaviorSubject<any[]>([]);
  categories$ = this.categoriesSubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(true);
  isLoading$ = this.loadingSubject.asObservable();

  constructor(private http: HttpClient) {
    console.log("constructor");
    this.loadCategories();
  }

  private loadCategories() {
    this.loadingSubject.next(true);
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: categories => {
        this.categoriesSubject.next(categories);
        this.loadingSubject.next(false);
      },
      error: () => {
        this.categoriesSubject.next([]);
        this.loadingSubject.next(false);
      }
    });
  }

  addCategory(category: { name: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, category)
      .pipe(
        catchError(error => {
          alert("addCategory failed: " + error.message);
          return of(null);
        }),
        tap(() => this.loadCategories())
      );
  }

  updateCategory(id: number, category: { name: string; description: string }): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, category)
      .pipe(
        catchError(error => {
          alert("updateCategory failed: " + error.message);
          return of(null);
        }),
        tap(() => this.loadCategories())
      );
  }

  getCategoryById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(error => {
          alert("getCategoryById failed: " + error.message);
          return of(null);
        })
      );
  }

  getAllCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl)
      .pipe(
        catchError(error => {
          alert("getAllCategories failed: " + error.message);
          return of([]);
        })
      );
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(error => {
          alert("deleteCategory failed: " + error.message);
          return of();
        }),
        tap(() => this.loadCategories())
      );
  }

}
