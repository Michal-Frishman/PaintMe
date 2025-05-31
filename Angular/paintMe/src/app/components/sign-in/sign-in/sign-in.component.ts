import { Component, EventEmitter, Inject, inject, Input, OnInit, Output, signal } from '@angular/core';
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
import Swal from 'sweetalert2';
import { LoadingSpinnerComponent } from '../../loading-spinner/loading-spinner.component';
@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule, MatSelectModule, ReactiveFormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatRadioModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule,LoadingSpinnerComponent],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent implements OnInit {
  showSignUp = false;
  // router = inject(Router);
  hide = signal(true);
  user!: SignIn;
  signInForm!: FormGroup;
loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }
  getUserIdFromToken(token: string) {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.id;
  }
  signIn(): void {
    if (this.signInForm?.valid) {
        this.loading = true;
      this.user = this.signInForm.value;
      if (this.user) {
        this.authService.signIn(this.user).subscribe({
          next: (res) => {
             sessionStorage.setItem('token', res.token);
            if (isPlatformBrowser(this.platformId)) {
              const isAdmin = this.authService.isAdmin();
              if (!isAdmin) {
                Swal.fire({
                  title: 'אין הרשאה',
                  text: 'אין לך הרשאות גישה למערכת',
                  icon: 'warning',
                  confirmButtonText: 'אישור',
                  confirmButtonColor: '#2575fc'
                });
                return; 
              }
              this.router.navigate(['/']);
              sessionStorage.setItem('token', res.token);
            }
          },

          error: (error) => {
            alert("login failed");
          }
        });
      }
    }
  }


  ngOnInit(): void {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

  }
}
