import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UsersService } from '../../../services/users/users.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-add-user-form',
  standalone: true,
  imports: [RouterModule,MatSelectModule,MatRadioModule,MatButtonModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './add-user-form.component.html',
  styleUrls: ['./add-user-form.component.css']
})
export class AddUserFormComponent implements OnInit {
  userForm!: FormGroup;
  router = inject(Router);

  constructor(private fb: FormBuilder, private http: HttpClient, private usersService: UsersService) {

  }

  addUser() {
    if (this.userForm.valid) {
      this.usersService.addUser(this.userForm.value).subscribe({
        next: res => {
          this.userForm.reset();
          this.router.navigate(['/users']);
        }
      });
    }
  }

  ngOnInit(): void {    
    this.userForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    role:['', Validators.required]
  });}
}
