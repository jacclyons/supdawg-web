"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, Paperclip, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Status = "idle" | "sending" | "success" | "error";

const ACCEPT = ".jpg,.jpeg,.png,.gif,.webp,.heic,.heif,.pdf,.svg,.ai,.eps,image/*,application/pdf";
const MAX_FILES = 6;
const MAX_PER_FILE_BYTES = 10 * 1024 * 1024;
const MAX_TOTAL_BYTES = 25 * 1024 * 1024;

function formatBytes(n: number) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(0)} KB`;
  return `${(n / 1024 / 1024).toFixed(1)} MB`;
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function addFiles(incoming: FileList | null) {
    if (!incoming) return;
    setErrorMsg(null);
    const merged = [...files];
    for (const f of Array.from(incoming)) {
      if (merged.some((m) => m.name === f.name && m.size === f.size)) continue;
      if (f.size > MAX_PER_FILE_BYTES) {
        setErrorMsg(`"${f.name}" is over 10MB.`);
        continue;
      }
      merged.push(f);
    }
    if (merged.length > MAX_FILES) {
      setErrorMsg(`Max ${MAX_FILES} files.`);
      merged.splice(MAX_FILES);
    }
    const total = merged.reduce((sum, f) => sum + f.size, 0);
    if (total > MAX_TOTAL_BYTES) {
      setErrorMsg("Attachments total over 25MB.");
      return;
    }
    setFiles(merged);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function removeFile(idx: number) {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg(null);

    const formEl = e.currentTarget;
    const fd = new FormData(formEl);
    fd.delete("attachments");
    for (const f of files) fd.append("attachments", f);

    try {
      const res = await fetch("/api/contact", { method: "POST", body: fd });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
      setStatus("success");
      formEl.reset();
      setFiles([]);
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
        className="rounded-2xl border-2 border-brand-dark bg-transparent p-10 text-center shadow-[6px_6px_0_0_hsl(var(--brand-dark))]"
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
  const totalBytes = files.reduce((sum, f) => sum + f.size, 0);

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border-2 border-brand-dark bg-transparent p-6 md:p-8 shadow-[6px_6px_0_0_hsl(var(--brand-dark))] space-y-5"
    >
      {/* Honeypot: hidden from humans, bots will fill it. */}
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

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept={ACCEPT}
        className="sr-only"
        onChange={(e) => addFiles(e.target.files)}
        disabled={disabled}
      />

      {files.length > 0 && (
        <div className="space-y-2">
          <ul className="space-y-2">
            <AnimatePresence initial={false}>
              {files.map((f, idx) => (
                <motion.li
                  key={`${f.name}-${f.size}-${idx}`}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-center justify-between gap-3 rounded-lg border-2 border-brand-dark bg-brand-cream px-3 py-2"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-brand-dark">{f.name}</p>
                    <p className="text-xs text-brand-dark/60">{formatBytes(f.size)}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile(idx)}
                    disabled={disabled}
                    className="rounded-full p-1 text-brand-dark hover:bg-brand-pink/20 disabled:opacity-50"
                    aria-label={`Remove ${f.name}`}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </motion.li>
              ))}
            </AnimatePresence>
            <p className="text-xs text-brand-dark/60">
              {files.length} file{files.length === 1 ? "" : "s"} · {formatBytes(totalBytes)} total
            </p>
          </ul>
        </div>
      )}

      {status === "error" && errorMsg && (
        <p className="rounded-lg border-2 border-destructive bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {errorMsg}
        </p>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled || files.length >= MAX_FILES}
        >
          <Paperclip className="h-4 w-4" />
          Add attachment
          <span className="ml-1 text-xs text-brand-dark/60">
            [optional]
          </span>
        </Button>
        <Button type="submit" size="lg" disabled={disabled}>
          {disabled ? "Sendin'…" : "Send"} <Send className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
}
