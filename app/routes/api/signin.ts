import { API_URL } from '~/constants/api';
import type { Route } from './+types/signin';
import { data, redirect } from 'react-router';

type FieldErrors = Record<string, string>;

type BackendErrorBody = {
  message?: string | string[];
  errors?: { field?: string; message?: string }[];
}

function parseBackendErrors(body: BackendErrorBody): FieldErrors {
  const errors: FieldErrors = {};
  if (Array.isArray(body.errors)) {
    for (const item of body.errors) {
      if (item.field && item.message) errors[item.field] = item.message;
    }
  }
  if (Object.keys(errors).length > 0) return errors;

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
        email: String(formData.get('email') ?? ''),
        password: String(formData.get('password') ?? '')
    }

    try {
        const res = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values),
        });

        if (!res.ok) {
            const errorData = (await res.json().catch(() => ({}))) as BackendErrorBody;
            return data(
              { errors: parseBackendErrors(errorData), values },
              { status: res.status }
            );
        }

        const setCookie = res.headers.get('set-cookie');

        return redirect('/dashboard', {
          headers: setCookie ? { 'Set-Cookie': setCookie } : undefined
        } );


    } catch {
        return data(
            { errors: { _global: "Não foi possível conectar ao servidor." }, values },
            { status: 500 }
        );
    }
}