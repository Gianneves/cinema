import { data, redirect } from "react-router";
import type { Route } from "./+types/create-account";
import { API_URL } from "~/constants/api";

type FieldErrors = Record<string, string>;

type BackendErrorBody = {
  message?: string | string[];
  errors?: { field?: string; message?: string }[];
};

function parseBackendErrors(body: BackendErrorBody): FieldErrors {
  const errors: FieldErrors = {};

  if (Array.isArray(body.errors)) {
    for (const item of body.errors) {
      if (item.field && item.message) {
        errors[item.field] = item.message;
      }
    }
  }

  if (Object.keys(errors).length > 0) {
    return errors;
  }

  if (Array.isArray(body.message)) {
    errors._global = body.message.join(" ");
  } else if (typeof body.message === "string") {
    errors._global = body.message;
  }

  return errors;
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();

  const values = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    password: String(formData.get("password") ?? ""),
  };

  const url = `${API_URL}/users`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (import.meta.env.DEV) {
      console.log(`[create-account] POST ${url} -> ${res.status}`);
    }

    if (!res.ok) {
      const errorData = (await res.json().catch(() => ({}))) as BackendErrorBody;

      if (res.status === 404) {
        return data(
          {
            errors: {
              _global:
                "Endpoint não encontrado no backend. Verifique a URL em API_URL.",
            },
            values,
          },
          { status: res.status }
        );
      }

      return data(
        {
          errors: parseBackendErrors(errorData),
          values,
        },
        { status: res.status }
      );
    }

    return redirect("/dashboard");
  } catch {
    return data(
      {
        errors: { _global: "Não foi possível conectar ao servidor." },
        values,
      },
      { status: 500 }
    );
  }
}
