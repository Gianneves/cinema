
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useFetcher } from "react-router"
import { Input } from "./ui/input"

type ActionData = {
    errors?: Record<string, string>,
    values: { email: string, passoword: string }
}

export function SignIn() {
    const fetcher = useFetcher<ActionData>();
    const errors = fetcher.data?.errors ?? {};
    const isSubmitting = fetcher.state !== "idle";

    return (
        <div className="mt-4">
            {errors._global && (
                <p className="mb-4 text-red-400 text-sm">{errors._global}</p>
            )}

            <fetcher.Form action="/api/signin" method="post">
                <div>
                    <div className="grid gap-2">
                        <Label className="text-white" htmlFor="email">Email</Label>
                        <Input
                            className="text-white p-5 bg-[#141430] "
                            id="email"
                            type="email"
                            name="email"
                            placeholder="you@example.com"
                            required
                            aria-invalid={errors.email ? true : undefined}
                        />
                        {errors.email && (
                            <p className="text-red-400 text-sm">{errors.email}</p>
                        )}
                    </div>

                    <div className="mt-4 grid gap-2">
                        <div className="flex items-center">
                            <Label className="text-white" htmlFor="password">Senha</Label>
                        </div>
                        <Input
                            className="text-white p-5 bg-[#141430]"
                            id="password" type="password" name="password" required
                            aria-invalid={errors.password ? true : undefined} />

                        {errors.password && (
                            <p className="text-red-400 text-sm">{errors.password}</p>
                        )}
                    </div>

                    <Button
                        className="w-full mt-4 bg-[#F0A42E] p-5 cursor-pointer"
                        variant="link"
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Logando" : "Login"}
                    </Button>
                </div >
            </fetcher.Form>
        </div >
    );
}