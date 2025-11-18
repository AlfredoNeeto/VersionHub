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
            },
        };
    } catch (err) {
        return handleError(err);
    }
}

export default handler;
