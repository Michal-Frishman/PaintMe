import { Component } from '@angular/core';
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

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive,MatToolbarModule, MatMenuModule, MatButtonModule, MatTableModule, MatListModule, MatDividerModule, MatGridListModule, MatCardModule, MatIconModule, HeaderComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  currentYear = new Date().getFullYear();

  stats = [
    { title: 'משתמשים', value: '1,234', icon: 'people', color: 'users' },
    { title: 'ציורים', value: '5,678', icon: 'brush', color: 'drawings' },
    { title: 'קטגוריות', value: '42', icon: 'category', color: 'categories' },
    { title: 'העלאות', value: '987', icon: 'cloud_upload', color: 'uploads' }
  ];
}
