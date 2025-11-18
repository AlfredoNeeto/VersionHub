import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

interface AppConfig {
    api: {
        baseUrl: string;
        timeout: number;
    };
    app: {
        name: string;
        description: string;
        version: string;
    };
}

@Injectable({
    providedIn: 'root'
})
export class ConfigService {
    private config: AppConfig | null = null;

    constructor(private http: HttpClient) { }

    async loadConfig(): Promise<AppConfig> {
        if (this.config) {
            return this.config;
        }

        try {
            this.config = await firstValueFrom(
                this.http.get<AppConfig>('/assets/config.json')
            );
            return this.config;
        } catch (error) {
            console.error('Erro ao carregar configuração:', error);
            // Retorna configuração padrão em caso de erro
            return {
                api: {
                    baseUrl: 'https://versionhub-api.netlify.app/api',
                    timeout: 60000
                },
                app: {
                    name: 'VersionHub',
                    description: 'Rastreie versões de tecnologias em tempo real',
                    version: '1.0.0'
                }
            };
        }
    }

    getConfig(): AppConfig | null {
        return this.config;
    }

    getApiUrl(): string {
        return this.config?.api.baseUrl || '/api';
    }

    getApiTimeout(): number {
        return this.config?.api.timeout || 60000;
    }
}
