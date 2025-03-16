import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { FilesService } from '../../../services/files/files.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-file-form',
  standalone: true,
  imports: [RouterModule,MatSelectModule,MatRadioModule,MatButtonModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './add-file-form.component.html',
  styleUrl: './add-file-form.component.css'
})
export class AddFileFormComponent implements OnInit {
  fileForm!: FormGroup;
  router = inject(Router);

  constructor(private fb: FormBuilder, private filesService: FilesService) {}

  ngOnInit(): void {
    this.fileForm = this.fb.group({
      name: ['', Validators.required],
      categoryId: ['', Validators.required],
      fileUrl: ['', Validators.required],
    });
  }

  addFile(): void {
    if (this.fileForm.valid) {
      this.filesService.addFile(this.fileForm.value).subscribe(() => {
        this.router.navigate(['/files']);
      });
    }
  }
}
