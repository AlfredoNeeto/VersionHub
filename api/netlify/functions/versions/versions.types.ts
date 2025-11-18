export interface TechVersion {
    version: string;
    releaseDate: string | null;
    extra?: Record<string, any>;
}

export interface VersionInfo {
    flutter: TechVersion;
    dart: TechVersion;
    angular: TechVersion;
    node: TechVersion;
    dotnet: TechVersion;
    updatedAt: string;
}
