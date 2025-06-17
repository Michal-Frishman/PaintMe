import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderComponent } from '../header/header.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CategoriesService } from '../../services/categories/categories.service';
import { UsersService } from '../../services/users/users.service';
import { FilesService } from '../../services/files/files.service';
import { Observable, combineLatest, map } from 'rxjs';
import { Category } from '../../models/Category';
import { User } from '../../models/User';
import {File} from '../../models/File';

 
@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    RouterOutlet, RouterLink, RouterLinkActive,
    MatToolbarModule, MatMenuModule, MatButtonModule,
    MatTableModule, MatListModule, MatDividerModule,
    MatGridListModule, MatCardModule, MatIconModule,
    HeaderComponent,CommonModule
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  currentYear = new Date().getFullYear();
  categories$!: Observable<Category[]>;
  users$!: Observable<User[]>;
  files$!: Observable<File[]>;
  stats$!: Observable<any[]>;

  constructor(
    private categoriesService: CategoriesService,
    private usersService: UsersService,
    private filesService: FilesService
  ) {
    this.categories$ = this.categoriesService.categories$;
    this.users$ = this.usersService.users$;
    this.files$ = this.filesService.files$;

    this.stats$ = combineLatest([
      this.users$, this.files$, this.categories$
    ]).pipe(
      map(([users, files, categories]) => [
        { title: 'משתמשים', value: users.length, icon: 'people', color: 'users' },
        { title: 'ציורים', value: files.length, icon: 'brush', color: 'drawings' },
        { title: 'קטגוריות', value: categories.length, icon: 'category', color: 'categories' }
      ])
    );
  }
}
