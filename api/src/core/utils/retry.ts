export async function withRetry<T>(
    fn: () => Promise<T>,
    retries = 3,
    delayMs = 300
): Promise<T> {
    let attempt = 0;

    while (true) {
        try {
            return await fn();
        } catch (err) {
            attempt++;

            if (attempt > retries) {
                throw err;
            }

            const jitter = Math.random() * 100;

            await new Promise(res => setTimeout(res, delayMs + jitter));

            delayMs *= 2;
        }
    }
}
