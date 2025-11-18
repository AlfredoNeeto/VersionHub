import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    constructor(
        private http: HttpClient,
        private configService: ConfigService
    ) { }

    private getApiUrl(): string {
        return this.configService.getApiUrl();
    }

    get<T>(endpoint: string): Observable<T> {
        return this.http.get<T>(`${this.getApiUrl()}${endpoint}`);
    }

    post<T>(endpoint: string, body: any): Observable<T> {
        return this.http.post<T>(`${this.getApiUrl()}${endpoint}`, body);
    }

    put<T>(endpoint: string, body: any): Observable<T> {
        return this.http.put<T>(`${this.getApiUrl()}${endpoint}`, body);
    }

    delete<T>(endpoint: string): Observable<T> {
        return this.http.delete<T>(`${this.getApiUrl()}${endpoint}`);
    }
}
