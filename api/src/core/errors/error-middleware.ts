import { HttpError } from "./http-error";

export function handleError(err: any) {

    if (err instanceof HttpError) {
        return {
            statusCode: err.statusCode,
            body: JSON.stringify({
                error: err.message,
                details: err.details ?? null
            })
        };
    }

    return {
        statusCode: 500,
        body: JSON.stringify({
            error: "Erro interno do servidor"
        })
    };
}
