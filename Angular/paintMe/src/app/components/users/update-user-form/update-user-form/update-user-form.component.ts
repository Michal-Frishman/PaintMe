import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UsersService } from '../../../../services/users/users.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { BackButtonComponent } from '../../../back-button/back-button.component';
import { LoadingSpinnerComponent } from '../../../loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-update-user-form',
    standalone: true,

  templateUrl: './update-user-form.component.html',
   imports: [BackButtonComponent, RouterModule, MatSelectModule, MatRadioModule, MatButtonModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule,LoadingSpinnerComponent],

  styleUrls: ['./update-user-form.component.css']
})
export class UpdateUserFormComponent implements OnInit {
  userForm!: FormGroup;
  userId!: number;
  router = inject(Router);
  initialValues: any;
loading=false

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.userId = parseInt(this.route.snapshot.paramMap.get('id')?.toString() ?? '');
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    this.loadUserData(); 
  }

    loadUserData() {
      this.usersService.getUserById(this.userId).subscribe({
        next: user => {
          this.userForm.patchValue(user);
          this.initialValues = user;

        },
        error: err => {
          console.error('Error fetching user data:', err);
        }
      });
    }

    updateUser() {
      if (this.userForm.valid) {
        this.loading = true;
        this.usersService.updateUser(this.userId, this.userForm.value).subscribe({
          next: res => {
            this.loading = false;
          },
          error: err => {
            console.error('Error updating user:', err);
          }
        });
      }
    }
  }
