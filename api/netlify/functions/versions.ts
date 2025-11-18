import { Handler } from "@netlify/functions";
import { handleError } from "../../src/core/errors/error-middleware";
import { getVersions } from "./versions/versions.service";

export const handler: Handler = async () => {
    try {
        const data = await getVersions();

        return {
            statusCode: 200,
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
                "Cache-Control": "no-cache, no-store, must-revalidate",
                "Pragma": "no-cache",
                "Expires": "0",
            },
        };
    } catch (err) {
        return handleError(err);
    }
}

export default handler;
