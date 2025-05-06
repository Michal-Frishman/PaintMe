import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UsersService } from '../../../../services/users/users.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-update-user-form',
    standalone: true,

  templateUrl: './update-user-form.component.html',
   imports: [RouterModule, MatSelectModule, MatRadioModule, MatButtonModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule],

  styleUrls: ['./update-user-form.component.css']
})
export class UpdateUserFormComponent implements OnInit {
  userForm!: FormGroup;
  userId!: number;
  router = inject(Router);
  initialValues: any;

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.userId = parseInt(this.route.snapshot.paramMap.get('id')?.toString() ?? '');
    this.userForm = this.fb.group({
      // firstName: ['', Validators.required],
      // lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      // role: ['', Validators.required]
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
        this.usersService.updateUser(this.userId, this.userForm.value).subscribe({
          next: res => {
            this.router.navigate(['/users']);
          },
          error: err => {
            console.error('Error updating user:', err);
          }
        });
      }
    }
  }
