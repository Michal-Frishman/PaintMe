// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Chart, registerables } from 'chart.js';
// import { MatCardModule } from '@angular/material/card';

// Chart.register(...registerables);
// @Component({
//   selector: 'app-stats-chart',
//   standalone: true,
//   imports: [MatCardModule],
//   templateUrl: './stats-chart.component.html',
//   styleUrl: './stats-chart.component.css'
// })
// export class StatsChartComponent implements OnInit {
//   public coloredDrawingsChart: any;
//   public activityHoursChart: any;
//   public newUsersChart: any;

//   constructor(private http: HttpClient) {}

//   ngOnInit(): void {
//     this.getColoredDrawingsPerDay();
//     this.getActivityHours();
//     this.getNewUsersPerMonth();
//   }

//   getColoredDrawingsPerDay() {
//     this.http.get<{ [key: number]: number }>('https://paintme-server.onrender.com/api/ColoredFiles/stats/colored-drawings-per-day').subscribe(data => {
//       const labels = Object.keys(data);
//       const values = Object.values(data);
//       this.coloredDrawingsChart = new Chart('coloredDrawingsChart', {
//         type: 'bar',
//         data: {
//           labels: labels,
//           datasets: [{
//             label: 'ציורים צבועים לפי ימים',
//             data: values,
//             backgroundColor: 'rgba(75, 192, 192, 0.2)',
//             borderColor: 'rgba(75, 192, 192, 1)',
//             borderWidth: 1
//           }]
//         },
//         options: {
//           responsive: true,
//           scales: {
//             y: {
//               beginAtZero: true
//             }
//           }
//         }
//       });
//     });
//   }

//   getActivityHours() {
//     this.http.get<{ [key: number]: number }>('https://paintme-server.onrender.com/api/ColoredFiles/stats/activity-hours').subscribe(data => {
//       const labels = Object.keys(data);
//       const values = Object.values(data);
//       this.activityHoursChart = new Chart('activityHoursChart', {
//         type: 'line',
//         data: {
//           labels: labels,
//           datasets: [{
//             label: 'Activity Hours',
//             data: values,
//             fill: false,
//             borderColor: 'rgba(153, 102, 255, 1)',
//             tension: 0.1
//           }]
//         },
//         options: {
//           responsive: true
//         }
//       });
//     });
//   }

//   getNewUsersPerMonth() {
//     this.http.get<{ [key: number]: number }>('https://paintme-server.onrender.com/api/Users/stats/new-users-per-month').subscribe(data => {
//       const labels = Object.keys(data);
//       const values = Object.values(data);
//       this.newUsersChart = new Chart('newUsersChart', {
//         type: 'pie',
//         data: {
//           labels: labels,
//           datasets: [{
//             label: 'New Users Per Month',
//             data: values,
//             backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'],
//             borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
//             borderWidth: 1
//           }]
//         },
//         options: {
//           responsive: true
//         }
//       });
//     });
//   }
// }