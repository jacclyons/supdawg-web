"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Status = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg(null);

    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      subject: String(fd.get("subject") ?? ""),
      message: String(fd.get("message") ?? ""),
      website: String(fd.get("website") ?? ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
      setStatus("success");
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 240, damping: 14 }}
        className="rounded-2xl border-2 border-brand-dark bg-white p-10 text-center shadow-[6px_6px_0_0_hsl(var(--brand-dark))]"
      >
        <CheckCircle2 className="mx-auto h-14 w-14 text-brand-pink" />
        <h2 className="mt-4 font-display text-3xl">Message sent!</h2>
        <p className="mt-2 text-brand-dark/80">
          We&apos;ll get back to you as soon as our needles cool down.
        </p>
        <Button
          type="button"
          variant="outline"
          className="mt-6"
          onClick={() => setStatus("idle")}
        >
          Send another
        </Button>
      </motion.div>
    );
  }

  const disabled = status === "sending";

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border-2 border-brand-dark bg-white p-6 md:p-8 shadow-[6px_6px_0_0_hsl(var(--brand-dark))] space-y-5"
    >
      {/* Honeypot — hidden from humans, bots will fill it. */}
      <div className="hidden" aria-hidden="true">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <Label 
          htmlFor="name" className="font-display uppercase tracking-wider text-sm">
            Name
          </Label>
          <Input
          placeholder="Mr. Dawg"
          id="name" name="name" required maxLength={100} disabled={disabled} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="font-display uppercase tracking-wider text-sm">
            Email
          </Label>
          <Input 
          placeholder="dawg@wassup.com"
          id="email" name="email" type="email" required maxLength={200} disabled={disabled} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject" className="font-display uppercase tracking-wider text-sm">
          Subject <span className="text-brand-dark/50 normal-case">(optional)</span>
        </Label>
        <Input
          placeholder="Just saying hi!"
          id="subject" name="subject" maxLength={150} disabled={disabled} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="font-display uppercase tracking-wider text-sm">
          Message
        </Label>
        <Textarea
          id="message"
          name="message"
          required
          maxLength={5000}
          rows={6}
          disabled={disabled}
          placeholder="Don't be shy, say helloooo!"
        />
      </div>

      {status === "error" && errorMsg && (
        <p className="rounded-lg border-2 border-destructive bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {errorMsg}
        </p>
      )}

      <div className="flex justify-end">
        <Button type="submit" size="lg" disabled={disabled}>
          {disabled ? "Sending…" : "Send it"} <Send className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
}
