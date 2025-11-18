import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable, map } from 'rxjs';
import { Version, VersionResponse } from '../../models/version.model';

@Injectable({
    providedIn: 'root'
})
export class VersionService {
    constructor(private http: HttpService) { }

    getVersions(): Observable<Version[]> {
        return this.http.get<VersionResponse>('/versions').pipe(
            map((response) => this.parseVersionResponse(response))
        );
    }

    private parseVersionResponse(response: VersionResponse): Version[] {
        const versions: Version[] = [];

        Object.keys(response).forEach((key) => {
            if (key !== 'updatedAt' && typeof response[key] === 'object') {
                const data = response[key] as any;
                let displayName = key.charAt(0).toUpperCase() + key.slice(1);

                // Formatar nomes especiais
                if (key.toLowerCase() === 'dotnet') {
                    displayName = '.NET';
                }

                versions.push({
                    name: displayName,
                    version: data.version,
                    releaseDate: data.releaseDate,
                    extra: data.extra
                });
            }
        });

        return versions;
    }
}

