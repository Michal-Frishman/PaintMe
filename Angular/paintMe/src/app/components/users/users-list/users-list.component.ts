import { Component, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelect } from '@angular/material/select';
import { BehaviorSubject, combineLatest, map, Observable, startWith, tap } from 'rxjs';

import { User } from '../../../models/User';
import { UsersService } from '../../../services/users/users.service';
import { LoadingSpinnerComponent } from '../../loading-spinner/loading-spinner.component';
import { BackButtonComponent } from '../../back-button/back-button.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    AsyncPipe,
    CommonModule,
    RouterModule,
    MatSelect,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    BackButtonComponent,
    LoadingSpinnerComponent
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent implements OnInit {
  users$!: Observable<User[]>;
  isLoading$!: Observable<boolean>;
  filteredUsers$!: Observable<User[]>;

  private filterSubject = new BehaviorSubject<string>('');
  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.users$ = this.usersService.users$;
    this.isLoading$ = this.usersService.isLoading$;
    this.filteredUsers$ = combineLatest([
      this.users$,
      this.filterSubject.asObservable().pipe(startWith(''))
    ]).pipe(
      map(([users, filter]) =>
        users.filter(user =>
          user.email.toLowerCase().includes(filter.toLowerCase())
        )
      )
    );
  }
  applyFilter(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value.trim();
    this.filterSubject.next(value);
  }
  deleteUser(userId: number): void {
    Swal.fire({
      title: '?האם אתם בטוחים',
      text: "!המחיקה בלתי הפיכה",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'מחק',
      cancelButtonText: 'ביטול'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usersService.deleteUser(userId).subscribe(
          {
            next: () => {
              Swal.fire('נמחק בהצלחה!', '', 'success');
              this.users$ = this.users$.pipe(
                map(users => users.filter(user => user.id !== userId))
              );
            },
            error: (err) => {
              Swal.fire('שגיאה במחיקה', 'נסה שוב מאוחר יותר', 'error');
              console.error('Error deleting category:', err);
            }
          });
      }
    });
  }
}



