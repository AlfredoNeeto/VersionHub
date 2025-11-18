import { Component, OnInit, OnDestroy, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VersionService } from '../../core/services/version.service';
import { VersionWidgetComponent } from '../../shared/components/version-widget/version-widget.component';
import { Version } from '../../models/version.model';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, VersionWidgetComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
    versions = signal<Version[]>([]);
    loading = signal(true);
    error = signal<string | null>(null);
    darkMode = signal(true);
    private autoRefreshInterval: ReturnType<typeof setInterval> | null = null;
    private readonly AUTO_REFRESH_INTERVAL = 2 * 60 * 60 * 1000; // 2 horas em ms

    constructor(private versionService: VersionService) {
        effect(() => {
            if (this.darkMode()) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        });
    }

    ngOnInit(): void {
        this.loadVersions();
        this.startAutoRefresh();
    }

    ngOnDestroy(): void {
        this.stopAutoRefresh();
    }

    loadVersions(): void {
        this.loading.set(true);
        this.error.set(null);

        this.versionService.getVersions().subscribe({
            next: (data) => {
                this.versions.set(data);
                this.loading.set(false);
            },
            error: (err) => {
                this.error.set('Erro ao carregar versões');
                this.loading.set(false);
                console.error('Erro:', err);
            }
        });
    }

    toggleTheme(): void {
        this.darkMode.set(!this.darkMode());
    }

    refreshVersions(): void {
        this.loadVersions();
    }

    private startAutoRefresh(): void {
        this.autoRefreshInterval = setInterval(() => {
            console.log('Auto-atualizando versões...');
            this.loadVersions();
        }, this.AUTO_REFRESH_INTERVAL);
    }

    private stopAutoRefresh(): void {
        if (this.autoRefreshInterval) {
            clearInterval(this.autoRefreshInterval);
            this.autoRefreshInterval = null;
        }
    }
}
