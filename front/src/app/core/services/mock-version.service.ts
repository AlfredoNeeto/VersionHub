import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Version, VersionResponse } from '../../models/version.model';

@Injectable({
    providedIn: 'root'
})
export class MockVersionService {
    private mockData: VersionResponse = {
        flutter: {
            version: '3.38.2',
            releaseDate: '18/11/2025',
            extra: {
                dartVersion: '3.10.0'
            }
        },
        dart: {
            version: '3.10.1',
            releaseDate: '18/11/2025'
        },
        angular: {
            version: '20.3.12',
            releaseDate: '14/11/2025'
        },
        node: {
            version: '25.2.1',
            releaseDate: '16/11/2025'
        },
        dotnet: {
            version: '10.0',
            releaseDate: '11/11/2025',
            extra: {
                supportPhase: 'active',
                eolDate: '14/11/2028',
                releaseType: 'lts'
            }
        },
        react: {
            version: '19.0.0',
            releaseDate: '05/12/2024',
            extra: {
                license: 'MIT'
            }
        },
        vue: {
            version: '3.5.13',
            releaseDate: '17/11/2025'
        },
        typescript: {
            version: '5.7.2',
            releaseDate: '15/11/2025'
        },
        updatedAt: '19/11/2025'
    };

    getVersions(): Observable<Version[]> {
        return of(this.parseVersionResponse(this.mockData)).pipe(delay(500));
    }

    private parseVersionResponse(response: VersionResponse): Version[] {
        const versions: Version[] = [];

        Object.keys(response).forEach((key) => {
            if (key !== 'updatedAt' && typeof response[key] === 'object') {
                const data = response[key] as any;
                versions.push({
                    name: key.charAt(0).toUpperCase() + key.slice(1),
                    version: data.version,
                    releaseDate: data.releaseDate,
                    extra: data.extra
                });
            }
        });

        return versions;
    }
}
