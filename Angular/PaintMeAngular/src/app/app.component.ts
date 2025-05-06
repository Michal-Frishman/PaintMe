import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UsersListComponent } from './components/users/users-list/users-list.component';
import { InformationStatisticsComponent } from './components/information-statistics/information-statistics.component';
// import { StatsChartComponent } from './components/stats-chart/stats-chart.component';
import { HeaderComponent } from './components/header/header.component';
import { AddFileFormComponent } from './components/files/add-file-form/add-file-form/add-file-form.component';
import { SignInComponent } from './components/sign-in/sign-in/sign-in.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SignInComponent, RouterOutlet,UsersListComponent,InformationStatisticsComponent,HeaderComponent,AddFileFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'PaintMeAngular';
}
