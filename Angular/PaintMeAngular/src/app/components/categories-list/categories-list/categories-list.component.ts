import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../../models/Category';
import { CategoriesService } from '../../../services/categories/categories.service';
import { AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-categories-list',
  standalone: true,
  imports: [RouterModule, MatButtonModule, MatCardModule, AsyncPipe],
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.css'
})
export class CategoriesListComponent implements OnInit {
  categories$!: Observable<Category[]>;

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.categories$ = this.categoriesService.getAllCategories(); 
  }

  deleteCategory(categoryId: number): void {
    this.categoriesService.deleteCategory(categoryId).subscribe(() => {
      // כאן אפשר להוסיף לוגיקה לעדכון הרשימה לאחר מחיקה
      this.categories$ = this.categoriesService.getAllCategories(); // טוען מחדש את הקטגוריות
    });
  }
}
