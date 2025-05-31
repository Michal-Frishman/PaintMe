import { Component } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable, startWith, tap } from 'rxjs';
import { FilesService } from '../../../../services/files/files.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { File } from '../../../../models/File';
import { MatIconModule } from '@angular/material/icon';
import { LoadingSpinnerComponent } from '../../../loading-spinner/loading-spinner.component';
import { MatFormField } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { BackButtonComponent } from '../../../back-button/back-button.component';
import Swal from 'sweetalert2';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-files-list',
  standalone: true,
  imports: [MatFormFieldModule,MatInputModule,BackButtonComponent,MatLabel, MatFormField, MatIconModule, RouterModule, MatButtonModule, MatCardModule, AsyncPipe, LoadingSpinnerComponent],
  templateUrl: './files-list.component.html',
  styleUrl: './files-list.component.css'
})
export class FilesListComponent {
  files$!: Observable<File[]>;
  isLoading$!: Observable<boolean>;
 filteredFiles$!: Observable<File[]>;
isDeleting = false;
  private filterSubject = new BehaviorSubject<string>('');
  ngOnInit(): void {
    this.files$ = this.filesService.files$;
    this.isLoading$ = this.filesService.isLoading$;
        this.filteredFiles$ = combineLatest([
      this.files$,
      this.filterSubject.asObservable().pipe(startWith(''))
    ]).pipe(
      map(([files, filter]) =>
        files.filter(file =>
          file.name.toLowerCase().includes(filter.toLowerCase())
        )
      )
    );
  }

  constructor(private filesService: FilesService) { }

  applyFilter(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value.trim();
    this.filterSubject.next(value);
  }


  deleteFile(fileId: number): void {
    this.isDeleting = true;
     Swal.fire({
          title: 'האם אתם בטוחים?',
          text: "!המחיקה בלתי הפיכה",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'מחק',
          cancelButtonText: 'ביטול'
        }).then((result) => {
          if (result.isConfirmed) {
             this.filesService.deleteFile(fileId).subscribe({
              next: () => {
                Swal.fire('נמחק בהצלחה!', '', 'success');
                this.files$ = this.files$.pipe(
                  map(files => files.filter(file => file.id !== fileId))
                );
              },
              error: (err) => {
                Swal.fire('שגיאה במחיקה', 'נסה שוב מאוחר יותר', 'error');
                console.error('Error deleting category:', err);
              }
            });
          }
        });
    this.isDeleting = false;
  }
}
