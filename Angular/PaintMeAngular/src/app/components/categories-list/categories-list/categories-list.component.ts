import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../../models/Category';
import { CategoriesService } from '../../../services/categories/categories.service';
import { AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { LoadingSpinnerComponent } from '../../loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-categories-list',
  standalone: true,
  imports: [RouterModule, MatButtonModule, MatCardModule, AsyncPipe,MatIconModule,LoadingSpinnerComponent],
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.css'
})
export class CategoriesListComponent implements OnInit {
  categories$!: Observable<Category[]>;

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.categories$ = this.categoriesService.categories$;     

  }

  deleteCategory(categoryId: number): void {
    this.categoriesService.deleteCategory(categoryId).subscribe();
  }
}
