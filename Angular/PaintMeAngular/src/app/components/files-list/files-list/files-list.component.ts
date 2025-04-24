import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { FilesService } from '../../../services/files/files.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import {File} from '../../../models/File';
import { MatIconModule } from '@angular/material/icon';
import { LoadingSpinnerComponent } from '../../loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-files-list',
  standalone: true,
  imports: [MatIconModule,RouterModule, MatButtonModule,MatCardModule,AsyncPipe,LoadingSpinnerComponent],
  templateUrl: './files-list.component.html',
  styleUrl: './files-list.component.css'
})
export class FilesListComponent {
  files$!: Observable<File[]>;

  constructor(private filesService: FilesService) {}

  ngOnInit(): void {
    this.files$ = this.filesService.files$;     
  }

  deleteFile(fileId: number): void {
    this.filesService.deleteFile(fileId).subscribe();
  }
}
