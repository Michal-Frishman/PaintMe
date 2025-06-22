import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  getColoredDrawingsPerDay(): Observable<{ [key: number]: number }> {
    return this.http.get<{ [key: number]: number }>(`${this.apiUrl}/ColoredFiles/stats/colored-drawings-per-day`);
  }

  getActivityHours(): Observable<{ [key: number]: number }> {
    return this.http.get<{ [key: number]: number }>(`${this.apiUrl}/ColoredFiles/stats/activity-hours`);
  }

  getCategoryPopularity(): Observable<{ [category: string]: number }> {
    return this.http.get<{ [category: string]: number }>(`${this.apiUrl}/Categories/popularity`);
  }

  getNewUsersPerMonth(): Observable<{ [key: number]: number }> {
    return this.http.get<{ [key: number]: number }>(`${this.apiUrl}/Users/stats/new-users-per-month`);
  }}
