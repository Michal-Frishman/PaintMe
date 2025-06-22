import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
 private baseUrl = `${environment.apiUrl}/Files`;

  constructor(private http: HttpClient) {}

  async getPresignedUrl(fileName: string): Promise<string> {
    const url = `${this.baseUrl}/upload/presigned-url`;
    const response = await firstValueFrom(this.http.get<{ url: string }>(url, {
      params: { fileName }
    })) as { url: string };
    return response.url;
  }

  async uploadFileToS3(url: string, file: File): Promise<void> {
    await firstValueFrom(this.http.put(url, file, {
      headers: {
        'Content-Type': file.type
      }
    }));
  }

  async getDownloadUrl(fileName: string): Promise<string> {
    const url = `${this.baseUrl}/upload/download-url/${fileName}`;
    const downloadUrl = await firstValueFrom(this.http.get(url, { responseType: 'text' as 'json' }));
    return downloadUrl as string;
  }

  async saveFileRecord(body: { name: string, categoryId: number, fileUrl: string }): Promise<void> {
    const url = `${this.baseUrl}/Files`;
    await firstValueFrom(this.http.post(url, body));
  }}
