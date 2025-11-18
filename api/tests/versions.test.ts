import { getVersions } from "../netlify/functions/versions/versions.service";
import * as repository from "../netlify/functions/versions/versions.repository";

jest.mock("../src/infra/cache/cache.provider", () => ({
    default: {
        get: jest.fn().mockResolvedValue(null),
        set: jest.fn().mockResolvedValue(true),
    },
}));

const mockTechVersion = (version: string, releaseDate: string | null = null, extra: any = {}) => ({
    version,
    releaseDate,
    extra,
});

const mockVersionInfo = {
    flutter: mockTechVersion("3.38.1", "15/01/2025", { dartVersion: "3.0.6" }),
    dart: mockTechVersion("3.0.6", "10/01/2025", { revision: "abc123" }),
    angular: mockTechVersion("19.1.0", "12/01/2025"),
    node: mockTechVersion("20.5.1", "08/01/2025"),
    dotnet: mockTechVersion("9.0.100", "15/01/2025", {
        supportPhase: "lts",
        eolDate: "10/05/2026",
        releaseType: "lts",
    }),
    updatedAt: "01/01/2025",
};

describe("Versions Service", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
    });

    describe("getVersions", () => {
        it("deve retornar dados de versões com estrutura correta", async () => {
            jest.spyOn(repository, "getFlutterVersion").mockResolvedValue(mockVersionInfo.flutter);
            jest.spyOn(repository, "getDartVersion").mockResolvedValue(mockVersionInfo.dart);
            jest.spyOn(repository, "getAngularVersion").mockResolvedValue(mockVersionInfo.angular);
            jest.spyOn(repository, "getNodeVersion").mockResolvedValue(mockVersionInfo.node);
            jest.spyOn(repository, "getDotnetVersion").mockResolvedValue(mockVersionInfo.dotnet);

            const result = await getVersions();

            expect(result).toBeDefined();
            expect(result.flutter.version).toBe("3.38.1");
            expect(result.dart.version).toBe("3.0.6");
            expect(result.angular.version).toBe("19.1.0");
            expect(result.node.version).toBe("20.5.1");
            expect(result.dotnet.version).toBe("9.0.100");
            expect(result.updatedAt).toBeDefined();
        });

        it("deve incluir dados adicionais (extra) para Flutter", async () => {
            jest.spyOn(repository, "getFlutterVersion").mockResolvedValue(mockVersionInfo.flutter);
            jest.spyOn(repository, "getDartVersion").mockResolvedValue(mockVersionInfo.dart);
            jest.spyOn(repository, "getAngularVersion").mockResolvedValue(mockVersionInfo.angular);
            jest.spyOn(repository, "getNodeVersion").mockResolvedValue(mockVersionInfo.node);
            jest.spyOn(repository, "getDotnetVersion").mockResolvedValue(mockVersionInfo.dotnet);

            const result = await getVersions();

            expect(result.flutter.extra).toBeDefined();
            expect(result.flutter.extra?.dartVersion).toBe("3.0.6");
        });

        it("deve incluir dados adicionais (extra) para .NET", async () => {
            jest.spyOn(repository, "getFlutterVersion").mockResolvedValue(mockVersionInfo.flutter);
            jest.spyOn(repository, "getDartVersion").mockResolvedValue(mockVersionInfo.dart);
            jest.spyOn(repository, "getAngularVersion").mockResolvedValue(mockVersionInfo.angular);
            jest.spyOn(repository, "getNodeVersion").mockResolvedValue(mockVersionInfo.node);
            jest.spyOn(repository, "getDotnetVersion").mockResolvedValue(mockVersionInfo.dotnet);

            const result = await getVersions();

            expect(result.dotnet.extra).toBeDefined();
            expect(result.dotnet.extra?.supportPhase).toBe("lts");
            expect(result.dotnet.extra?.eolDate).toBe("10/05/2026");
        });
    });
});