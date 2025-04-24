// services/categories/categories.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
//   apiUrl = 'https://paintme-server.onrender.com/api/Categories'; 
//   private categoriesSubject = new BehaviorSubject<File[]>([]);
//   categories$ = this.categoriesSubject.asObservable();
//   constructor(private http: HttpClient) {}

//   // מתודה להוספת קטגוריה
//   addCategory(category: { name: string; description: string }): Observable<any> {
//     return this.http.post(this.apiUrl, category);
//   }

//   // מתודה לעדכון קטגוריה
//   updateCategory(id: number, category: { name: string; description: string }): Observable<any> {
//     return this.http.put(`${this.apiUrl}/${id}`, category);
//   }

//   // מתודה לקבלת קטגוריה לפי ID
//   getCategoryById(id: number): Observable<any> {
//     return this.http.get(`${this.apiUrl}/${id}`);
//   }

//   // מתודה לקבלת כל הקטגוריות
//   getAllCategories(): Observable<any[]> {
//     return this.http.get<any[]>(this.apiUrl);
//   }

//   // מתודה למחיקת קטגוריה
//   deleteCategory(id: number): Observable<any> {
//     return this.http.delete(`${this.apiUrl}/${id}`);
//   }
apiUrl = 'https://paintme-server.onrender.com/api/Categories'; 
private categoriesSubject = new BehaviorSubject<any[]>([]);
categories$ = this.categoriesSubject.asObservable();

constructor(private http: HttpClient) {
  this.loadCategories();
}

// מתודה לטעינת קטגוריות
private loadCategories() {
  this.http.get<any[]>(this.apiUrl)
    .subscribe(categories => this.categoriesSubject.next(categories));
}

// מתודה להוספת קטגוריה
addCategory(category: { name: string; description: string }): Observable<any> {
  return this.http.post<any>(this.apiUrl, category)
    .pipe(
      catchError(error => {
        alert("addCategory failed: " + error.message);
        return of(null);
      }),
      tap(() => this.loadCategories())
    );
}

// מתודה לעדכון קטגוריה
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

// מתודה לקבלת קטגוריה לפי ID
getCategoryById(id: number): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/${id}`)
    .pipe(
      catchError(error => {
        alert("getCategoryById failed: " + error.message);
        return of(null);
      })
    );
}

// מתודה לקבלת כל הקטגוריות
getAllCategories(): Observable<any[]> {
  return this.http.get<any[]>(this.apiUrl)
    .pipe(
      catchError(error => {
        alert("getAllCategories failed: " + error.message);
        return of([]);
      })
    );
}

// מתודה למחיקת קטגוריה
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
