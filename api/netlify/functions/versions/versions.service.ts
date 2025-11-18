import { formatDateBR } from "../../../src/core/utils/date";
import cache from "../../../src/infra/cache/cache.provider";
import {
    getFlutterVersion,
    getDartVersion,
    getAngularVersion,
    getNodeVersion,
    getDotnetVersion
} from "./versions.repository";
import { VersionInfo } from "./versions.types";

const CACHE_KEY = "versions";
const CACHE_TTL = 60 * 10;

let inMemoryCache: VersionInfo | null = null;

export async function getVersions(): Promise<VersionInfo> {

    if (inMemoryCache) return inMemoryCache;

    try {
        const cached = await cache.get(CACHE_KEY);
        if (cached) {
            inMemoryCache = cached as VersionInfo;
            return cached as VersionInfo;
        }
    } catch (err) {
        console.warn("Redis indisponível no GET — seguindo sem cache.");
    }

    const [flutter, dart, angular, node, dotnet] = await Promise.all([
        getFlutterVersion(),
        getDartVersion(),
        getAngularVersion(),
        getNodeVersion(),
        getDotnetVersion()
    ]);

    const data: VersionInfo = {
        flutter,
        dart,
        angular,
        node,
        dotnet,
        updatedAt: formatDateBR(new Date().toISOString())
    };

    inMemoryCache = data;

    try {
        await cache.set(CACHE_KEY, data, CACHE_TTL);
    } catch (err) {
        console.warn("Redis indisponível no SET — ignorando.");
    }

    return data;
}