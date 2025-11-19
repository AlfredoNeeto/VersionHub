import { fetcher } from "../../../src/core/utils/fetcher";
import { withRetry } from "../../../src/core/utils/retry";
import { formatDateBR } from "../../../src/core/utils/date";
import { TechVersion } from "./versions.types";

// Função genérica para obter versões do NPM Registry
async function getNpmPackageVersion(packageName: string, errorMessage: string): Promise<TechVersion> {
    const json = await withRetry(() =>
        fetcher.get<any>(`https://registry.npmjs.org/${packageName}`)
    );

    const latest = json["dist-tags"]?.latest;
    if (!latest) {
        throw new Error(errorMessage);
    }
    
    const releaseDateIso = json.time?.[latest];
    return {
        version: latest,
        releaseDate: formatDateBR(releaseDateIso),
    };
}

export async function getFlutterVersion(): Promise<TechVersion> {
    const json = await withRetry(() =>
        fetcher.get<any>(
            "https://storage.googleapis.com/flutter_infra_release/releases/releases_windows.json"
        )
    );

    const stableHash = json.current_release.stable;
    const stableRelease = json.releases.find((r: any) => r.hash === stableHash);

    if (!stableRelease) {
        throw new Error("Flutter stable release não encontrada.");
    }

    return {
        version: stableRelease.version,
        releaseDate: formatDateBR(stableRelease.release_date),
        extra: {
            dartVersion: stableRelease.dart_sdk_version,
        },
    };
}

export async function getDartVersion(): Promise<TechVersion> {
    const json = await withRetry(() =>
        fetcher.get<any>(
            "https://storage.googleapis.com/dart-archive/channels/stable/release/latest/VERSION"
        )
    );

    return {
        version: json.version,
        releaseDate: formatDateBR(json.date)
    };
}

export async function getAngularVersion(): Promise<TechVersion> {
    const json = await withRetry(() =>
        fetcher.get<any>("https://registry.npmjs.org/@angular/core")
    );

    const latestVersion = json["dist-tags"].latest;
    const releaseDate = json.time[latestVersion] ?? null;

    return {
        version: latestVersion,
        releaseDate: formatDateBR(releaseDate),
    };
}

export async function getNodeVersion(): Promise<TechVersion> {
    const list = await withRetry(() =>
        fetcher.get<any[]>("https://nodejs.org/dist/index.json")
    );

    const latest = list.find((release: any) => release.lts && release.lts !== false);

    if (!latest) {
        throw new Error("Não foi possível obter a versão LTS mais recente do Node.js");
    }

    return {
        version: latest.version.replace(/^v/, ""),
        releaseDate: formatDateBR(latest.date),
    };
}

export async function getDotnetVersion(): Promise<TechVersion> {
    const json = await withRetry(() =>
        fetcher.get<any>(
            "https://dotnetcli.blob.core.windows.net/dotnet/release-metadata/releases-index.json"
        )
    );

    const releases = json["releases-index"];

    if (!releases || releases.length === 0) {
        throw new Error("Releases do .NET não encontrados.");
    }

    const latestChannel = releases[0];

    return {
        version: latestChannel["channel-version"],
        releaseDate: formatDateBR(latestChannel["latest-release-date"]),
        extra: {
            supportPhase: latestChannel["support-phase"],
            eolDate: formatDateBR(latestChannel["eol-date"]),
            releaseType: latestChannel["release-type"],
        },
    };
}

export async function getReactVersion(): Promise<TechVersion> {
    return getNpmPackageVersion("react", "Releases do React não encontrados.");
}

export async function getVueVersion(): Promise<TechVersion> {
    return getNpmPackageVersion("vue", "Releases do Vue não encontrados.");
}

export async function getNextjsVersion(): Promise<TechVersion> {
    return getNpmPackageVersion("next", "Releases do Next.js não encontrados.");
}
