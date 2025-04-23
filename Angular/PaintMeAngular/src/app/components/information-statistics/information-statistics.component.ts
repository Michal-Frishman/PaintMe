import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChartConfiguration, ChartType } from 'chart.js';
import { MatCardModule } from '@angular/material/card';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-information-statistics',
  standalone: true,
  imports: [MatCardModule,NgChartsModule],
  templateUrl: './information-statistics.component.html',
  styleUrl: './information-statistics.component.css'
})
export class InformationStatisticsComponent implements OnInit{
 // גרף 1: ציורים לפי ימים (Line)
 lineChartData: ChartConfiguration<'line'>['data'] = {
  labels: [],
  datasets: [{ data: [], label: 'ציורים שצבעו ביום' }]
};

// גרף 2: שעות פעילות (Bar)
barChartData: ChartConfiguration<'bar'>['data'] = {
  labels: [],
  datasets: [{ data: [], label: 'שעות פעילות פופולריות' }]
};

// גרף 3: משתמשים חדשים (Pie)
pieChartData: ChartConfiguration<'pie'>['data'] = {
  labels: [],
  datasets: [{
    data: [],
    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], // דוגמה לצבעים
  }]
};


constructor(private http: HttpClient) {}

ngOnInit(): void {
  this.loadColoredDrawings();
  this.loadActivityHours();
  this.loadNewUsers();
}

loadColoredDrawings() {
  this.http.get<{ [key: string]: number }>('https://paintme-server-16qu.onrender.com/api/ColoredFiles/stats/colored-drawings-per-day').subscribe(data => {
    this.lineChartData.labels = Object.keys(data);
    this.lineChartData.datasets[0].data = Object.values(data);
  });
}

loadActivityHours() {
  this.http.get<{ [key: number]: number }>('https://paintme-server-16qu.onrender.com/api/ColoredFiles/stats/activity-hours').subscribe(data => {
    this.barChartData.labels = Object.keys(data).map(hour => `${hour}:00`);
    this.barChartData.datasets[0].data = Object.values(data);
  });
}

loadNewUsers() {
  this.http.get<{ [key: string]: number }>('https://paintme-server-16qu.onrender.com/api/Users/stats/new-users-per-month').subscribe(data => {
    this.pieChartData.labels = Object.keys(data);
    this.pieChartData.datasets[0].data = Object.values(data);
  });
}
}
