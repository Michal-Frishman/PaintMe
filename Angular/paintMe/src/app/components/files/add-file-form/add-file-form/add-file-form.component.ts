// // import { Component, inject, OnInit } from '@angular/core';
// // import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
// // import { FilesService } from '../../../../services/files/files.service';
// // import { MatButtonModule } from '@angular/material/button';
// // import { MatFormFieldModule } from '@angular/material/form-field';
// // import { MatInputModule } from '@angular/material/input';
// // import { MatRadioModule } from '@angular/material/radio';
// // import { MatSelectModule } from '@angular/material/select';
// // import { Router, RouterModule } from '@angular/router';
// // import { HttpClient } from '@angular/common/http';
// // import { MatSnackBar } from '@angular/material/snack-bar';
// // import { Observable } from 'rxjs';
// // // import {File} from "../../../../models/File"
// // @Component({
// //   selector: 'app-add-file-form',
// //   standalone: true,
// //   imports: [RouterModule,MatSelectModule,MatRadioModule,MatButtonModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule],
// //   templateUrl: './add-file-form.component.html',
// //   styleUrl: './add-file-form.component.css'
// // })
// // // export class AddFileFormComponent implements OnInit {
// // //   fileForm!: FormGroup;
// // //   router = inject(Router);

// // //   constructor(private fb: FormBuilder, private filesService: FilesService) {}

// // //   ngOnInit(): void {
// // //     this.fileForm = this.fb.group({
// // //       name: ['', Validators.required],
// // //       categoryId: ['', Validators.required],
// // //       fileUrl: ['', Validators.required],
// // //     });
// // //   }

// // //   addFile(): void {
// // //     if (this.fileForm.valid) {
// // //       this.filesService.addFile(this.fileForm.value).subscribe(() => {
// // //         this.router.navigate(['/files']);
// // //       });
// // //     }
// // //   }
// // // }
// // export class AddFileFormComponent implements OnInit {
// //   file: File | null = null;
// //   fileName: string = '';
// //   progress: number = 0;
// //   isUploading: boolean = false;
// //   dragOver: boolean = false;
// //   fileForm: FormGroup;
// //   categories = []; // טעינת הקטגוריות שלך

// //   constructor(private http: HttpClient, private snackBar: MatSnackBar, private fb: FormBuilder) {
// //     this.fileForm = this.fb.group({
// //       name: ['', Validators.required],
// //       categoryId: ['', Validators.required],
// //     });
// //   }

// //   ngOnInit(): void {
// //     // כאן תוכל לטעון את הקטגוריות מהשרת
// //   }

// //   handleFileChange(event: any): void {
// //     if (event.target.files) {
// //       this.file = event.target.files[0];
// //       this.fileName = this.file?.name||"image.png";
// //     }
// //   }

// //   handleDragOver(event: DragEvent): void {
// //     event.preventDefault();
// //     this.dragOver = true;
// //   }

// //   handleDragLeave(): void {
// //     this.dragOver = false;
// //   }

// //   handleDrop(event: DragEvent): void {
// //     event.preventDefault();
// //     this.dragOver = false;
// //     if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
// //       this.file = event.dataTransfer.files[0];
// //       this.fileName = this.file.name;
// //     }
// //   }

// //   getPresignedUrl(fileName: string): Observable<any> {
// //     const url = `https://localhost:7209/api/upload/presigned-url`; 
// //     return this.http.get(url, { params: { fileName } });
// //   }

// //   handleUpload(): void {
// //     if (!this.file || this.fileForm.invalid) {
// //       return;
// //     }

// //     this.isUploading = true;
// //     this.getPresignedUrl(this.file.name).subscribe(
// //       (response: any) => {
// //         const uploadUrl = response.url;

// //         const formData = new FormData();
// //         if (this.file) {
// //           formData.append('file', this.file, this.file.name);
// //         } else {
// //           console.error('לא נבחר קובץ');
// //           return;
// //         }

// //         const xhr = new XMLHttpRequest();
// //         xhr.open('PUT', uploadUrl, true);
// //         xhr.setRequestHeader('Content-Type', this.file?.type || '');

// //         xhr.upload.onprogress = (event) => {
// //           if (event.lengthComputable) {
// //             const percent = Math.round((event.loaded * 100) / event.total);
// //             this.progress = percent;
// //           }
// //         };

// //         xhr.onload = () => {
// //           if (xhr.status === 200) {
// //             this.http.get(`https://localhost:7209/api/upload/download-url/${this.fileName}`, { responseType: 'text' }).subscribe(
// //               (downloadResponse: string) => {
// //                 const downloadUrl = downloadResponse;
// //                 this.saveFile(downloadUrl);
// //               },
// //               (error) => {
// //                 this.handleError(error);
// //               }
// //             );
// //           } else {
// //             this.handleError(xhr.statusText);
// //           }
// //         };

// //         xhr.onerror = () => {
// //           this.handleError('Error during file upload');
// //         };

// //         xhr.send(this.file);
// //       },
// //       (error) => {
// //         this.handleError(error);
// //       }
// //     );
// //   }

// //   saveFile(downloadUrl: string): void {
// //     const body = {
// //       CategoryId: this.fileForm.get('categoryId')?.value,
// //       Name: this.fileForm.get('name')?.value,
// //       FileUrl: downloadUrl,
// //     };

// //     this.http.post('https://localhost:7209/api/Files', body).subscribe(
// //       () => {
// //         this.snackBar.open('הקובץ הועלה בהצלחה!', 'סגור', { duration: 2000 });
// //         this.resetForm();
// //       },
// //       (error) => {
// //         this.handleError(error);
// //       }
// //     );
// //   }

// //   handleError(error: any): void {
// //     console.error('Error uploading file:', error);
// //     this.snackBar.open('שגיאה בהעלאת הקובץ', 'סגור', { duration: 2000 });
// //     this.resetForm();
// //   }

// //   resetForm(): void {
// //     this.file = null;
// //     this.fileName = '';
// //     this.progress = 0;
// //     this.isUploading = false;
// //     this.fileForm.reset();
// //   }

// //   addFile(): void {
// //     if (this.fileForm.valid) {
// //       this.handleUpload();
// //     }
// //   }
// // }
// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
// import { MatStepperModule } from '@angular/material/stepper';

// @Component({
//   selector: 'app-add-file-form',

//   standalone: true,
//   imports: [MatStepperModule],
//   templateUrl: './add-file-form.component.html',
//   styleUrl: './add-file-form.component.css'
// })
// // @Component({
// //   selector: 'app-add-file-form',
// //   standalone: true,
// //   imports: [RouterModule,MatSelectModule,MatRadioModule,MatButtonModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule],
// //   templateUrl: './add-file-form.component.html',
// //   styleUrl: './add-file-form.component.css'
// // })
// export class AddFileFormComponent implements OnInit {
//   uploadForm: FormGroup;
//   file: File | null = null;
//   fileName: string = '';
//   progress: number = 0;
//   isUploading: boolean = false;
//   uploadSuccess: boolean = false;
//   errorMessage: string = '';
//   activeStep: number = 0;
//   steps: string[] = ['בחירת קובץ', 'פרטי הציור', 'העלאה'];
//   categories = [
//     { id: 1, name: 'נוף' },
//     { id: 2, name: 'פורטרט' },
//     { id: 3, name: 'אבסטרקט' }
//   ];

//   constructor(private fb: FormBuilder, private http: HttpClient) {
//     this.uploadForm = this.fb.group({
//       category: ['', Validators.required],
//       artworkName: ['', Validators.required]
//     });
//   }

//   ngOnInit(): void {}

//   onFileChange(event: any): void {
//     const selectedFile = event.target.files[0];
//     if (selectedFile && selectedFile.type.startsWith('image/')) {
//       this.file = selectedFile;
//       this.fileName = selectedFile.name;
//       this.errorMessage = '';
//       if (this.activeStep === 0) {
//         this.activeStep = 1;
//       }
//     } else {
//       this.errorMessage = 'יש לבחור קובץ תמונה בלבד';
//     }
//   }

//   onDragOver(event: DragEvent): void {
//     event.preventDefault();
//   }

//   onDrop(event: DragEvent): void {
//     event.preventDefault();
//     const droppedFile = event.dataTransfer?.files[0];
//     if (droppedFile && droppedFile.type.startsWith('image/')) {
//       this.file = droppedFile;
//       this.fileName = droppedFile.name;
//       this.errorMessage = '';
//       if (this.activeStep === 0) {
//         this.activeStep = 1;
//       }
//     } else {
//       this.errorMessage = 'יש לבחור קובץ תמונה בלבד';
//     }
//   }

//   removeFile(): void {
//     this.file = null;
//     this.fileName = '';
//     this.activeStep = 0;
//   }

//   nextStep(): void {
//     if (this.activeStep === 1 && this.uploadForm.invalid) {
//       this.errorMessage = 'יש למלא את כל השדות';
//       return;
//     }
//     this.errorMessage = '';
//     this.activeStep++;
//   }

//   previousStep(): void {
//     if (this.activeStep > 0) {
//       this.activeStep--;
//     }
//   }

//   upload(): void {
//     if (!this.file || this.uploadForm.invalid) {
//       this.errorMessage = 'יש למלא את כל השדות';
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', this.file);
//     formData.append('category', this.uploadForm.get('category')?.value);
//     formData.append('artworkName', this.uploadForm.get('artworkName')?.value);

//     this.isUploading = true;
//     this.http.post('YOUR_UPLOAD_ENDPOINT', formData, {
//       reportProgress: true,
//       observe: 'events'
//     }).subscribe(
//       (event: HttpEvent<any>) => {
//         if (event.type === HttpEventType.UploadProgress && event.total) {
//           this.progress = Math.round((100 * event.loaded) / event.total);
//         } else if (event.type === HttpEventType.Response) {
//           this.uploadSuccess = true;
//           this.resetForm();
//         }
//       },
//       (error) => {
//         this.errorMessage = 'שגיאה בהעלאת הקובץ';
//         this.isUploading = false;
//       }
//     );
//   }

//   resetForm(): void {
//     setTimeout(() => {
//       this.uploadForm.reset();
//       this.file = null;
//       this.fileName = '';
//       this.progress = 0;
//       this.activeStep = 0;
//       this.uploadSuccess = false;
//       this.isUploading = false;
//     }, 3000);
//   }
// }
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
// // @Component({
// //   selector: 'app-add-file-form',
// //   standalone: true,
// //   imports: [RouterModule,MatSelectModule,MatRadioModule,MatButtonModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule],
// //   templateUrl: './add-file-form.component.html',
// //   styleUrl: './add-file-form.component.css'
// // })
// // // export class AddFileFormComponent implements OnInit {
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

  constructor(private categoriesService: CategoriesService, private http: HttpClient) { }

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
      const fileName = this.file.name;
      const fileType = this.file.type;
      const getPresignedUrl = `https://paintme-server.onrender.com/api/upload/presigned-url`;

      const response = await firstValueFrom(
        this.http.get<{ url: string }>(getPresignedUrl, {
          params: { fileName }
        })
      );

      this.http.put(response.url, this.file, {
        headers: {
          'Content-Type': fileType
        },
      });

      const downloadUrlResponse = await firstValueFrom(
        this.http.get(`https://paintme-server.onrender.com/api/upload/download-url/${fileName}`, {
          responseType: 'text'
        })
      );

      const downloadUrl = downloadUrlResponse;

      const saveFileBody = {
        name: this.uploadForm.get('artworkName')?.value,
        categoryId: this.uploadForm.get('category')?.value,
        fileUrl: downloadUrl
      };      

      await firstValueFrom(
        this.http.post('https://paintme-server.onrender.com/api/Files', saveFileBody)
      );

      this.uploadSuccess.set(true);
      this.uploadForm.reset();
    } catch (error) {
      console.error('שגיאה בהעלאה:', error);
      this.uploadSuccess.set(false);
    } finally {
      this.isUploading.set(false);
      this.loading=false
    }
  }

}
