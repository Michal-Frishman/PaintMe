import { ActivatedRoute } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { FilesService } from '../../../../services/files/files.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { Category } from '../../../../models/Category';
import { CategoriesService } from '../../../../services/categories/categories.service';
import { CommonModule } from '@angular/common';
import { File } from '../../../../models/File';
import { BackButtonComponent } from '../../../back-button/back-button.component';
import { LoadingSpinnerComponent } from '../../../loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-update-file-form',
  standalone: true,
  imports: [    LoadingSpinnerComponent,
  BackButtonComponent, CommonModule, RouterModule, MatSelectModule, MatRadioModule, MatButtonModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './update-file-form.component.html',
  styleUrl: './update-file-form.component.css'
})
export class UpdateFileFormComponent implements OnInit {
  fileForm!: FormGroup;
  fileId!: number;
  router = inject(Router);
  initialValues: any;
  categories$!: Observable<Category[]>;
  file!: File;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private categoriesService: CategoriesService,
    private filesService: FilesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.fileId = parseInt(this.route.snapshot.paramMap.get('id')?.toString() ?? '');
    this.fileForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required]
    });
    this.loadfileData();
    this.categories$ = this.categoriesService.getAllCategories();
  }

  loadfileData() {
    this.filesService.getFileById(this.fileId).subscribe({
      next: file => {
        this.fileForm.patchValue(file);
        this.initialValues = file;
        this.file = file;
      },
      error: err => {
        console.error('Error fetching file data:', err);
      }
    });
  }

  updateFile() {
    if (this.fileForm.valid) {
      this.loading = true;
      const updatedFile = {
        name: this.fileForm.value.name,
        fileUrl: this.file.fileUrl,
        categoryId: this.fileForm.value.category
      }
      this.filesService.updateFile(this.fileId, updatedFile).subscribe({
        next: res => {
          this.router.navigate(['/files']);
        },
        error: err => {
          console.error('Error updating file:', err);
        }
      });
        this.loading = false;

    }
  }


}
