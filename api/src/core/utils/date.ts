export function formatDateBR(date: string | null | undefined): string {
    if (!date) return "Data inválida";

    const parsed = new Date(date);
    if (isNaN(parsed.getTime())) return "Data inválida";

    const day = String(parsed.getUTCDate()).padStart(2, "0");
    const month = String(parsed.getUTCMonth() + 1).padStart(2, "0");
    const year = parsed.getUTCFullYear();

    return `${day}/${month}/${year}`;
}
