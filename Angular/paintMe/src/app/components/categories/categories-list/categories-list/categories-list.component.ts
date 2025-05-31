import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable, startWith } from 'rxjs';
import { Category } from '../../../../models/Category';
import { CategoriesService } from '../../../../services/categories/categories.service';
import { AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { LoadingSpinnerComponent } from '../../../loading-spinner/loading-spinner.component';
import { BackButtonComponent } from '../../../back-button/back-button.component';
import { MatDialogModule } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-categories-list',
  standalone: true,
  imports: [MatInputModule,MatFormFieldModule,BackButtonComponent, RouterModule, MatButtonModule, MatCardModule, AsyncPipe, MatIconModule, LoadingSpinnerComponent, MatDialogModule
  ],
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.css'
})
export class CategoriesListComponent implements OnInit {
  categories$!: Observable<Category[]>;
  isLoading$!: Observable<boolean>;
filteredCategories$!: Observable<Category[]>;

  private filterSubject = new BehaviorSubject<string>('');


  ngOnInit(): void {
    this.categories$ = this.categoriesService.categories$;
    this.isLoading$ = this.categoriesService.isLoading$;
        this.filteredCategories$ = combineLatest([
      this.categories$,
      this.filterSubject.asObservable().pipe(startWith(''))
    ]).pipe(
      map(([categorys, filter]) =>
        categorys.filter(category =>
          category.name.toLowerCase().includes(filter.toLowerCase())
        )
      )
    );
  }

  constructor(private categoriesService: CategoriesService) { }
  applyFilter(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value.trim();
    this.filterSubject.next(value);
  }

  deleteCategory(categoryId: number): void {
    Swal.fire({
      title: 'האם אתם בטוחים?',
      text: "!המחיקה בלתי הפיכה",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'מחק',
      cancelButtonText: 'ביטול'
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoriesService.deleteCategory(categoryId).subscribe({
          next: () => {
            Swal.fire('נמחק בהצלחה!', '', 'success');
            this.categories$ = this.categories$.pipe(
              map(categories => categories.filter(category => category.id !== categoryId))
            );
          },
          error: (err) => {
            Swal.fire('שגיאה במחיקה', 'נסה שוב מאוחר יותר', 'error');
            console.error('Error deleting category:', err);
          }
        });
      }
    });
  }
}
