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
    private defaultConfig: AppConfig = {
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

    constructor(private http: HttpClient) {
        // Inicializar com valores padrão
        this.config = this.defaultConfig;
    }

    async loadConfig(): Promise<AppConfig> {
        if (this.config && this.config !== this.defaultConfig) {
            return this.config;
        }

        try {
            this.config = await firstValueFrom(
                this.http.get<AppConfig>('/assets/config.json')
            );
            return this.config;
        } catch (error) {
            console.warn('Configuração não carregada, usando padrão:', error);
            this.config = this.defaultConfig;
            return this.config;
        }
    }

    getConfig(): AppConfig | null {
        return this.config;
    }

    getApiUrl(): string {
        return this.config?.api.baseUrl || this.defaultConfig.api.baseUrl;
    }

    getApiTimeout(): number {
        return this.config?.api.timeout || this.defaultConfig.api.timeout;
    }
}
