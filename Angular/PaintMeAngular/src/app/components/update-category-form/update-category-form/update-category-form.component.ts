// components/update-category-form/update-category-form.component.ts
import { ActivatedRoute } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CategoriesService } from '../../../services/categories/categories.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-update-category-form',
  standalone: true,
  imports: [RouterModule, MatButtonModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './update-category-form.component.html',
  styleUrls: ['./update-category-form.component.css']
})
export class UpdateCategoryFormComponent implements OnInit {
  categoryForm!: FormGroup;
  categoryId!: number;
  router = inject(Router);

  constructor(
    private fb: FormBuilder,
    private categoriesService: CategoriesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.categoryId = parseInt(this.route.snapshot.paramMap.get('id')?.toString() ?? '');
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      // description: ['', Validators.required]
    });
    this.loadCategoryData(); 
  }

  loadCategoryData() {
    this.categoriesService.getCategoryById(this.categoryId).subscribe({
      next: category => {
        this.categoryForm.patchValue(category);
      },
      error: err => {
        console.error('Error fetching category data:', err);
      }
    });
  }

  updateCategory() {
    if (this.categoryForm.valid) {
      this.categoriesService.updateCategory(this.categoryId, this.categoryForm.value).subscribe({
        next: res => {
          this.router.navigate(['/categories']);
        },
        error: err => {
          console.error('Error updating category:', err);
        }
      });
    }
  }
}
