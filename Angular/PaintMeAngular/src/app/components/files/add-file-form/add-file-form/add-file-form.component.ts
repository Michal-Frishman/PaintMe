import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { FilesService } from '../../../../services/files/files.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
// import {File} from "../../../../models/File"
@Component({
  selector: 'app-add-file-form',
  standalone: true,
  imports: [RouterModule,MatSelectModule,MatRadioModule,MatButtonModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './add-file-form.component.html',
  styleUrl: './add-file-form.component.css'
})
// export class AddFileFormComponent implements OnInit {
//   fileForm!: FormGroup;
//   router = inject(Router);

//   constructor(private fb: FormBuilder, private filesService: FilesService) {}

//   ngOnInit(): void {
//     this.fileForm = this.fb.group({
//       name: ['', Validators.required],
//       categoryId: ['', Validators.required],
//       fileUrl: ['', Validators.required],
//     });
//   }

//   addFile(): void {
//     if (this.fileForm.valid) {
//       this.filesService.addFile(this.fileForm.value).subscribe(() => {
//         this.router.navigate(['/files']);
//       });
//     }
//   }
// }
export class AddFileFormComponent implements OnInit {
  file: File | null = null;
  fileName: string = '';
  progress: number = 0;
  isUploading: boolean = false;
  dragOver: boolean = false;
  fileForm: FormGroup;
  categories = []; // טעינת הקטגוריות שלך

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private fb: FormBuilder) {
    this.fileForm = this.fb.group({
      name: ['', Validators.required],
      categoryId: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // כאן תוכל לטעון את הקטגוריות מהשרת
  }

  handleFileChange(event: any): void {
    if (event.target.files) {
      this.file = event.target.files[0];
      this.fileName = this.file?.name||"image.png";
    }
  }

  handleDragOver(event: DragEvent): void {
    event.preventDefault();
    this.dragOver = true;
  }

  handleDragLeave(): void {
    this.dragOver = false;
  }

  handleDrop(event: DragEvent): void {
    event.preventDefault();
    this.dragOver = false;
    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      this.file = event.dataTransfer.files[0];
      this.fileName = this.file.name;
    }
  }

  getPresignedUrl(fileName: string): Observable<any> {
    const url = `https://localhost:7209/api/upload/presigned-url`; 
    return this.http.get(url, { params: { fileName } });
  }

  handleUpload(): void {
    if (!this.file || this.fileForm.invalid) {
      return;
    }
  
    this.isUploading = true;
    this.getPresignedUrl(this.file.name).subscribe(
      (response: any) => {
        const uploadUrl = response.url;
  
        const formData = new FormData();
        if (this.file) {
          formData.append('file', this.file, this.file.name);
        } else {
          console.error('לא נבחר קובץ');
          return;
        }
  
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', uploadUrl, true);
        xhr.setRequestHeader('Content-Type', this.file?.type || '');
  
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percent = Math.round((event.loaded * 100) / event.total);
            this.progress = percent;
          }
        };
  
        xhr.onload = () => {
          if (xhr.status === 200) {
            this.http.get(`https://localhost:7209/api/upload/download-url/${this.fileName}`, { responseType: 'text' }).subscribe(
              (downloadResponse: string) => {
                const downloadUrl = downloadResponse;
                this.saveFile(downloadUrl);
              },
              (error) => {
                this.handleError(error);
              }
            );
          } else {
            this.handleError(xhr.statusText);
          }
        };
  
        xhr.onerror = () => {
          this.handleError('Error during file upload');
        };
  
        xhr.send(this.file);
      },
      (error) => {
        this.handleError(error);
      }
    );
  }
  
  saveFile(downloadUrl: string): void {
    const body = {
      CategoryId: this.fileForm.get('categoryId')?.value,
      Name: this.fileForm.get('name')?.value,
      FileUrl: downloadUrl,
    };

    this.http.post('https://localhost:7209/api/Files', body).subscribe(
      () => {
        this.snackBar.open('הקובץ הועלה בהצלחה!', 'סגור', { duration: 2000 });
        this.resetForm();
      },
      (error) => {
        this.handleError(error);
      }
    );
  }

  handleError(error: any): void {
    console.error('Error uploading file:', error);
    this.snackBar.open('שגיאה בהעלאת הקובץ', 'סגור', { duration: 2000 });
    this.resetForm();
  }

  resetForm(): void {
    this.file = null;
    this.fileName = '';
    this.progress = 0;
    this.isUploading = false;
    this.fileForm.reset();
  }

  addFile(): void {
    if (this.fileForm.valid) {
      this.handleUpload();
    }
  }
}