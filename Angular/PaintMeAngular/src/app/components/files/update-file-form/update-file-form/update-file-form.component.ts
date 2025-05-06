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

@Component({
  selector: 'app-update-file-form',
  standalone: true,
  imports: [RouterModule, MatSelectModule, MatRadioModule, MatButtonModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './update-file-form.component.html',
  styleUrl: './update-file-form.component.css'
})
export class UpdateFileFormComponent implements OnInit {
  fileForm!: FormGroup;
  fileId!: number;
  router = inject(Router);
  initialValues: any;

  constructor(
    private fb: FormBuilder,
    private filesService: FilesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.fileId = parseInt(this.route.snapshot.paramMap.get('id')?.toString() ?? '');
    this.fileForm = this.fb.group({
      name: ['', Validators.required],
      fileUrl: ['', Validators.required],
      category:['', Validators.required]

    });
    this.loadfileData(); 
  }

    loadfileData() {
      this.filesService.getFileById(this.fileId).subscribe({
        next: file => {
          this.fileForm.patchValue(file);
          this.initialValues = file;

        },
        error: err => {
          console.error('Error fetching file data:', err);
        }
      });
    }

    updateFile() {
      if (this.fileForm.valid) {
        this.filesService.updateFile(this.fileId, this.fileForm.value).subscribe({
          next: res => {
            this.router.navigate(['/files']);
          },
          error: err => {
            console.error('Error updating file:', err);
          }
        });
      }
    }

}
