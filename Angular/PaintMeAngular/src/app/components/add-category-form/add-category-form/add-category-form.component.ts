import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CategoriesService } from '../../../services/categories/categories.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-category-form',
  standalone: true,
  imports: [RouterModule, MatButtonModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './add-category-form.component.html',
  styleUrl: './add-category-form.component.css'
})
  export class AddCategoryFormComponent implements OnInit {
    categoryForm!: FormGroup;
    router = inject(Router);
  
    constructor(private fb: FormBuilder, private categoriesService: CategoriesService) {}
  
    ngOnInit(): void {
      this.categoryForm = this.fb.group({
        name: ['', Validators.required],
        // description: ['', Validators.required]
      });
    }
  
    addCategory(): void {
      if (this.categoryForm.valid) {
        this.categoriesService.addCategory(this.categoryForm.value).subscribe(() => {
          this.router.navigate(['/categories']);
        });
      }
    }
}
