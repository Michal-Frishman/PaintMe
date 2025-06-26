import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CategoriesService } from '../../../services/categories/categories.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingSpinnerComponent } from '../../loading-spinner/loading-spinner.component';
import { BackButtonComponent } from '../../back-button/back-button.component';

@Component({
  selector: 'app-add-category-form',
  standalone: true,
  imports: [BackButtonComponent, MatProgressSpinnerModule, MatIconModule, RouterModule, MatButtonModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule, LoadingSpinnerComponent],
  templateUrl: './add-category-form.component.html',
  styleUrl: './add-category-form.component.css'
})
export class AddCategoryFormComponent implements OnInit {
  categoryForm!: FormGroup;
  router = inject(Router);
  loading = false
  constructor(private fb: FormBuilder, private categoriesService: CategoriesService) { }


  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  addCategory(): void {
    if (this.categoryForm.invalid) return;
    this.loading = true;
    this.categoriesService.addCategory(this.categoryForm.value).subscribe({
      next: () => {
        this.loading = false;
        this.categoryForm.reset();
        this.categoryForm.markAsPristine();
        this.categoryForm.markAsUntouched();
      },
      error: () => {
        this.loading = false;
      }
    });
  }

}
