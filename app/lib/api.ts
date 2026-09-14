type ApiErrorBody = {
    message?: string | string[];
    errors?: { message?: string }[];
};

function extractErrorMessage(body: unknown): string | undefined {
    if (!body || typeof body !== "object") {
        return undefined;
    }

    const parsed = body as ApiErrorBody;

    if (Array.isArray(parsed.errors) && parsed.errors.length > 0) {
        return parsed.errors
            .map((error) => error?.message)
            .filter(Boolean)
            .join(", ");
    }

    if (typeof parsed.message === "string") {
        return parsed.message;
    }

    if (Array.isArray(parsed.message)) {
        return parsed.message.join(", ");
    }

    return undefined;
}

export async function apiRequest<T = any>(url: string, init?: RequestInit): Promise<T> {
    let response: Response;

    try {
        response = await fetch(url, init);
    } catch {
        throw new Error("Falha de conexão com o servidor.");
    }

    if (!response.ok) {
        let body: unknown;

        try {
            body = await response.json();
        } catch {
        }

        const message =
            extractErrorMessage(body) ??
            `Erro na requisição (status ${response.status}).`;

        throw new Error(message);
    }

    return (await response.json()) as T;
}
