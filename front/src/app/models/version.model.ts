export interface VersionData {
    version: string;
    releaseDate: string;
    extra?: Record<string, any>;
}

export interface VersionResponse {
    [key: string]: VersionData | string;
}

export interface Version {
    name: string;
    version: string;
    releaseDate: string;
    extra?: Record<string, any>;
}
