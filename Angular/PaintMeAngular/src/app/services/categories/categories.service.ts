// services/categories/categories.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private apiUrl = 'https://localhost:7209/api/Categories'; 

  constructor(private http: HttpClient) {}

  // מתודה להוספת קטגוריה
  addCategory(category: { name: string; description: string }): Observable<any> {
    return this.http.post(this.apiUrl, category);
  }

  // מתודה לעדכון קטגוריה
  updateCategory(id: number, category: { name: string; description: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, category);
  }

  // מתודה לקבלת קטגוריה לפי ID
  getCategoryById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // מתודה לקבלת כל הקטגוריות
  getAllCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // מתודה למחיקת קטגוריה
  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
