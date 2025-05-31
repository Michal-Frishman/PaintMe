import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UsersService } from '../../../../services/users/users.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { BackButtonComponent } from '../../../back-button/back-button.component';
import { LoadingSpinnerComponent } from '../../../loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-add-user-form',
  standalone: true,
  imports: [BackButtonComponent, MatIconModule,MatCardModule,RouterModule,MatSelectModule,MatRadioModule,MatButtonModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule,LoadingSpinnerComponent],
  templateUrl: './add-user-form.component.html',
  styleUrls: ['./add-user-form.component.css']
})
export class AddUserFormComponent implements OnInit {
  userForm!: FormGroup;
  router = inject(Router);
  hidePassword = true;
loading=false
  constructor(private fb: FormBuilder, private http: HttpClient, private usersService: UsersService) {

  }

  addUser() {
    if (this.userForm.valid) {
      this.loading = true;
      this.usersService.addUser(this.userForm.value).subscribe({
        next: res => {
          this.userForm.reset();
          this.loading = false;
          this.userForm.markAsPristine();
        }
      });
    }
  }

  ngOnInit(): void {    
    this.userForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });}
}
