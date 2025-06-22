import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { MatCardModule } from '@angular/material/card';
import { MatTabGroup } from '@angular/material/tabs'; import { BackButtonComponent } from '../back-button/back-button.component';
;
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { StatsService } from '../../services/stats/stats.service';

Chart.register(...registerables);
@Component({
  selector: 'app-stats-chart',
  standalone: true,
  imports: [MatCardModule, MatTabGroup, BackButtonComponent, MatProgressSpinnerModule],
  templateUrl: './stats-chart.component.html',
  styleUrl: './stats-chart.component.css'
})
export class StatsChartComponent implements OnInit {
  public coloredDrawingsChart: any;
  public activityHoursChart: any;
  public newUsersChart: any;
  public categoryPopularityChart: any;

  public isLoadingColoredDrawings = true;
  public isLoadingActivityHours = true;
  public isLoadingNewUsers = true;
  public isLoadingCategoryPopularity = true;

  private pastelColors = [
    'rgba(255, 158, 181, 0.7)',
    'rgba(173, 216, 230, 0.7)',
    'rgba(255, 218, 185, 0.7)',
    'rgba(204, 204, 255, 0.7)',
    'rgba(152, 251, 152, 0.7)'
  ];
  private pastelBorders = [
    'rgba(255, 158, 181, 1)',
    'rgba(173, 216, 230, 1)',
    'rgba(255, 218, 185, 1)',
    'rgba(204, 204, 255, 1)',
    'rgba(152, 251, 152, 1)'
  ];

  constructor(private statsService: StatsService) {}

  ngOnInit(): void {
    this.getColoredDrawingsPerDay();
    this.getActivityHours();
    this.getNewUsersPerMonth();
    this.getCategoryPopularity();
  }

  getColoredDrawingsPerDay() {
    this.isLoadingColoredDrawings = true;
    this.statsService.getColoredDrawingsPerDay().subscribe((data: Record<string, number>) => {
      const labels = Object.keys(data);
      const values = Object.values(data);
      this.coloredDrawingsChart = new Chart('coloredDrawingsChart', {
        type: 'bar',
        data: {
          labels,
          datasets: [{
            label: 'ציורים צבועים לפי ימים',
            data: values,
            backgroundColor: this.pastelColors,
            borderColor: this.pastelBorders,
            borderWidth: 2,
            borderRadius: 6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: { font: { family: 'Roboto' } }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: { color: 'rgba(0, 0, 0, 0.05)' }
            },
            x: { grid: { display: false } }
          }
        }
      });
      this.isLoadingColoredDrawings = false;
    });
  }

  getActivityHours() {
    this.isLoadingActivityHours = true;
    this.statsService.getActivityHours().subscribe((data: any) => {
      const labels = Object.keys(data);
      const values = Object.values(data);
      this.activityHoursChart = new Chart('activityHoursChart', {
        type: 'line',
        data: {
          labels,
          datasets: [{
            label: 'שעות פעילות',
            data: values,
            fill: true,
            backgroundColor: this.pastelColors[1],
            borderColor: this.pastelBorders[1],
            tension: 0.4,
            pointBackgroundColor: this.pastelBorders[0],
            pointBorderColor: '#fff',
            pointRadius: 4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: { font: { family: 'Roboto' } }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: { color: 'rgba(0, 0, 0, 0.05)' }
            },
            x: { grid: { display: false } }
          }
        }
      });
      this.isLoadingActivityHours = false;
    });
  }

  getCategoryPopularity() {
    this.isLoadingCategoryPopularity = true;
    this.statsService.getCategoryPopularity().subscribe({
      next: (data: any) => {
        const labels = Object.keys(data);
        const values = Object.values(data);
        this.categoryPopularityChart = new Chart('categoryPopularityChart', {
          type: 'doughnut',
          data: {
            labels,
            datasets: [{
              label: 'פופולריות קטגוריות',
              data: values,
              backgroundColor: this.pastelColors,
              borderColor: this.pastelBorders,
              borderWidth: 2
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'bottom',
                labels: {
                  font: { family: 'Roboto', size: 12 }
                }
              }
            }
          }
        });
      },
      error: err => console.error('Category popularity error:', err),
      complete: () => this.isLoadingCategoryPopularity = false
    });
  }

  getNewUsersPerMonth() {
    this.isLoadingNewUsers = true;
    this.statsService.getNewUsersPerMonth().subscribe((data: any) => {
      const labels = Object.keys(data);
      const values = Object.values(data);
      this.newUsersChart = new Chart('newUsersChart', {
        type: 'pie',
        data: {
          labels,
          datasets: [{
            label: 'משתמשים חדשים לפי חודש',
            data: values,
            backgroundColor: this.pastelColors,
            borderColor: this.pastelBorders,
            borderWidth: 2
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                padding: 20,
                font: {
                  family: 'Roboto',
                  size: 12
                }
              }
            }
          }
        }
      });
      this.isLoadingNewUsers = false;
    });
  }

}