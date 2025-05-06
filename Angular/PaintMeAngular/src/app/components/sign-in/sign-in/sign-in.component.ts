import { Component, EventEmitter, inject, Input, OnInit, Output, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { User } from '../../../models/User';
import { SignIn } from '../../../models/SignIn';
import { AuthService } from '../../../services/auth/auth.service';
import { log } from 'node:console';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule, MatSelectModule, ReactiveFormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatRadioModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent implements OnInit {
  showSignUp = false;
  router = inject(Router);
  hide = signal(true);
  user!: SignIn;
  signInForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) { }
  getUserIdFromToken(token: string) {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.id;
  }
  signIn(): void {
    if (this.signInForm?.valid) {
      this.user = this.signInForm.value;
      if (this.user) {
        console.log("details" + this.user);

        this.authService.signIn(this.user).subscribe({
          next: (res) => {
            // const id=this.getUserIdFromToken(res.token);
            const platformId = inject(PLATFORM_ID);
            if (isPlatformBrowser(platformId)) {
              sessionStorage.setItem('token', res.token);
            }
            // sessionStorage.setItem('userId', this.getUserIdFromToken(res.token));
            console.log(res);


            // sessionStorage.setItem('role', res.role);
            console.log("sessionStorage");

            this.router.navigate(['/users']);
          },
          error: (error) => {
            alert("login failed");
            this.signInForm.reset();
          }
        });
      }
    }
  }

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', Validators.required]
    });
  }
}
