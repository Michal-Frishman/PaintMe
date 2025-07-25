import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatFormFieldModule,
  MatLabel,
} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../services/auth/auth.service';
import { CategoriesService } from '../../../../services/categories/categories.service';
import { firstValueFrom, map, Observable } from 'rxjs';
import { Category } from '../../../../models/Category';
import { HttpClient } from '@angular/common/http';
import { LoadingSpinnerComponent } from '../../../loading-spinner/loading-spinner.component';
import { BackButtonComponent } from '../../../back-button/back-button.component';
import { UploadService } from '../../../../services/upload/upload.service';
@Component({
  selector: 'app-add-file-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatStepperModule,
    MatProgressBarModule,
    LoadingSpinnerComponent,
    BackButtonComponent
  ],

  templateUrl: './add-file-form.component.html',
  styleUrls: ['./add-file-form.component.css'],
})
export class AddFileFormComponent {
  fb = inject(FormBuilder);

  activeStep = signal(0);
  file: File | null = null;
  fileName = '';
  isUploading = signal(false);
  uploadSuccess = signal(false);
  progress = signal(0);
  loading = false;
  categories$!: Observable<Category[]>;

  constructor(private categoriesService: CategoriesService, private http: HttpClient,private uploadService :UploadService) { }

  ngOnInit(): void {
    this.categories$ = this.categoriesService.categories$;

  }
  uploadForm = this.fb.group({
    category: ['', Validators.required],
    artworkName: ['', Validators.required],
  });

  steps = ['בחר קובץ', 'פרטי הציור', 'אישור והעלאה'];
  getSelectedCategoryName(): string | undefined {
    const categoryId = this.uploadForm.get('category')?.value;
    let selectedCategoryName: string | undefined;
    this.categories$.pipe(
      map(categories => categories.find(cat => cat.id === Number(categoryId))?.name)
    ).subscribe(name => selectedCategoryName = name);
    return selectedCategoryName;
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.file = input.files[0];
      this.fileName = this.file.name;
    }
  }

  removeFile() {
    this.file = null;
    this.fileName = '';
  }

  nextStep() {
    this.activeStep.update((step) => step + 1);
  }

  previousStep() {
    this.activeStep.update((step) => step - 1);
  }

  async upload() {
     if (!this.file || this.uploadForm.invalid) return;
    this.loading = true;
    this.isUploading.set(true);
    this.progress.set(0);

    try {
      const presignedUrl = await this.uploadService.getPresignedUrl(this.file.name);

      await this.uploadService.uploadFileToS3(presignedUrl, this.file);

      const downloadUrl = await this.uploadService.getDownloadUrl(this.file.name);

      const name = this.uploadForm.get('artworkName')?.value;
      const categoryId = this.uploadForm.get('category')?.value;
      if (typeof name !== 'string' || !name || typeof categoryId !== 'string' && typeof categoryId !== 'number') {
        throw new Error('Invalid form values');
      }
      const saveFileBody = {
        name: name,
        categoryId: Number(categoryId),
        fileUrl: downloadUrl
      };
      await this.uploadService.saveFileRecord(saveFileBody);

      this.uploadSuccess.set(true);
      this.uploadForm.reset();
      this.file = null;
      this.fileName = '';

    } catch (error) {
      console.error('שגיאה בהעלאה:', error);
      this.uploadSuccess.set(false);
    } finally {
      this.isUploading.set(false);
      this.loading = false;
    }
  }

}
