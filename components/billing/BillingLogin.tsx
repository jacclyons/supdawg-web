"use client";

import { useActionState } from "react";
import { Lock } from "lucide-react";
import { signIn, type LoginState } from "@/app/billing/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function BillingLogin({ configured }: { configured: boolean }) {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(signIn, {});

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md items-center px-4 py-16">
      <div className="w-full rounded-2xl border-2 border-brand-dark bg-card p-8 shadow-dark-pop">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-brand-dark bg-brand-pink text-brand-cream">
            <Lock className="h-5 w-5" />
          </span>
          <div>
            <h1 className="text-2xl">Billing</h1>
            <p className="text-sm text-muted-foreground">Quotes &amp; invoices. Staff only.</p>
          </div>
        </div>

        {!configured ? (
          <p className="rounded-lg border-2 border-destructive/40 bg-destructive/10 p-4 text-sm">
            No password set yet. Add <code className="font-mono">BILLING_PASSWORD</code> to your
            <code className="font-mono"> .env.local</code> file, then restart the dev server.
          </p>
        ) : (
          <form action={formAction} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                autoFocus
                required
              />
            </div>

            {state.error && (
              <p className="text-sm font-medium text-destructive">{state.error}</p>
            )}

            <Button type="submit" className="w-full" disabled={pending}>
              {pending ? "Checking…" : "Sign in"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
