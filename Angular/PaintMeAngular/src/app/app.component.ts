import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UsersListComponent } from './components/users-list/users-list.component';
import { InformationStatisticsComponent } from './components/information-statistics/information-statistics.component';
// import { StatsChartComponent } from './components/stats-chart/stats-chart.component';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,UsersListComponent,InformationStatisticsComponent,HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'PaintMeAngular';
}
