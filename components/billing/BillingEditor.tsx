"use client";

import { useEffect, useRef, useState } from "react";
import { FilePlus2, LogOut, Plus, Printer, Trash2 } from "lucide-react";
import { signOut } from "@/app/billing/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DocumentPreview } from "@/components/billing/DocumentPreview";
import {
  DRAFT_KEY,
  defaultDoc,
  emptyItem,
  addDays,
  nextNumber,
  retitle,
  type BillingDoc,
  type DocKind,
  type LineItem,
} from "@/lib/billing";

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="rounded-2xl border-2 border-brand-dark bg-card p-5">
    <h2 className="mb-4 text-lg">{title}</h2>
    {children}
  </section>
);

const Field = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-1.5">
    <Label className="text-xs uppercase tracking-wide text-muted-foreground">{label}</Label>
    {children}
  </div>
);

/** Lets the box be empty while typing instead of snapping back to 0. */
function NumberInput({
  value,
  onChange,
  ...props
}: {
  value: number;
  onChange: (value: number) => void;
} & Omit<React.ComponentProps<"input">, "value" | "onChange">) {
  const [draft, setDraft] = useState(String(value));
  const focused = useRef(false);

  useEffect(() => {
    if (!focused.current) setDraft(String(value));
  }, [value]);

  return (
    <Input
      {...props}
      type="number"
      inputMode="decimal"
      value={draft}
      onFocus={() => (focused.current = true)}
      onBlur={() => {
        focused.current = false;
        setDraft(String(value));
      }}
      onChange={(event) => {
        setDraft(event.target.value);
        onChange(Number(event.target.value) || 0);
      }}
    />
  );
}

export function BillingEditor() {
  const [doc, setDoc] = useState<BillingDoc>(() => defaultDoc());
  const [loaded, setLoaded] = useState(false);

  // Drafts live in this browser only — closing the tab won't lose your work,
  // but nothing is stored on a server.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(DRAFT_KEY);
      if (saved) setDoc({ ...defaultDoc(), ...(JSON.parse(saved) as BillingDoc) });
    } catch {
      // Corrupt draft — start clean.
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(doc));
    } catch {
      // Storage full or blocked — the editor still works.
    }
  }, [doc, loaded]);

  const set = <K extends keyof BillingDoc>(key: K, value: BillingDoc[K]) =>
    setDoc((prev) => ({ ...prev, [key]: value }));

  const setParty = (party: "from" | "to", key: string, value: string) =>
    setDoc((prev) => ({ ...prev, [party]: { ...prev[party], [key]: value } }));

  const setItem = (id: string, patch: Partial<LineItem>) =>
    setDoc((prev) => ({
      ...prev,
      items: prev.items.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    }));

  const removeItem = (id: string) =>
    setDoc((prev) => ({
      ...prev,
      items: prev.items.length > 1 ? prev.items.filter((item) => item.id !== id) : prev.items,
    }));

  const switchKind = (kind: DocKind) =>
    setDoc((prev) => ({ ...prev, kind, number: retitle(prev.number, kind) }));

  const startNew = () =>
    setDoc((prev) => {
      const fresh = defaultDoc(prev.kind);
      return {
        ...fresh,
        // Keep your own details and roll the number forward.
        from: prev.from,
        number: nextNumber(prev.number, prev.kind),
        terms: prev.terms,
      };
    });

  const print = () => {
    const previousTitle = document.title;
    document.title = `${doc.number || doc.kind}${doc.to.name ? ` — ${doc.to.name}` : ""}`;
    const restore = () => {
      document.title = previousTitle;
      window.removeEventListener("afterprint", restore);
    };
    window.addEventListener("afterprint", restore);
    window.print();
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 print:hidden">
        <div>
          <h1 className="text-3xl">Billing</h1>
          <p className="text-sm text-muted-foreground">
            Build a quote or invoice, then print it to PDF.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button variant="ghost" size="sm" onClick={startNew}>
            <FilePlus2 /> New
          </Button>
          <Button size="sm" onClick={print}>
            <Printer /> Save as PDF
          </Button>
          <form action={signOut}>
            <Button variant="ghost" size="sm" type="submit">
              <LogOut /> Sign out
            </Button>
          </form>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)]">
        <div className="space-y-5 print:hidden">
          <Section title="Document">
            <div className="mb-4 inline-flex rounded-full border-2 border-brand-dark p-1">
              {(["quote", "invoice"] as DocKind[]).map((kind) => (
                <button
                  key={kind}
                  type="button"
                  onClick={() => switchKind(kind)}
                  className={`rounded-full px-5 py-1.5 font-display text-sm uppercase tracking-wide transition-colors ${
                    doc.kind === kind
                      ? "bg-brand-pink text-brand-cream"
                      : "text-brand-dark hover:bg-brand-pink/10"
                  }`}
                >
                  {kind}
                </button>
              ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Number">
                <Input
                  value={doc.number}
                  onChange={(event) => set("number", event.target.value)}
                />
              </Field>
              <Field label="Issue date">
                <Input
                  type="date"
                  value={doc.issueDate}
                  onChange={(event) => {
                    const issueDate = event.target.value;
                    setDoc((prev) => ({
                      ...prev,
                      issueDate,
                      dueDate: issueDate
                        ? addDays(issueDate, prev.kind === "quote" ? 30 : 14)
                        : prev.dueDate,
                    }));
                  }}
                />
              </Field>
              <Field label={doc.kind === "quote" ? "Valid until" : "Due date"}>
                <Input
                  type="date"
                  value={doc.dueDate}
                  onChange={(event) => set("dueDate", event.target.value)}
                />
              </Field>
            </div>
          </Section>

          <Section title="From">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Business name">
                <Input
                  value={doc.from.name}
                  onChange={(event) => setParty("from", "name", event.target.value)}
                />
              </Field>
              <Field label="Email">
                <Input
                  value={doc.from.email}
                  onChange={(event) => setParty("from", "email", event.target.value)}
                />
              </Field>
              <Field label="Phone">
                <Input
                  value={doc.from.phone}
                  onChange={(event) => setParty("from", "phone", event.target.value)}
                />
              </Field>
              <Field label="Website">
                <Input
                  value={doc.from.website}
                  onChange={(event) => setParty("from", "website", event.target.value)}
                />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Address">
                  <Textarea
                    rows={2}
                    value={doc.from.address}
                    onChange={(event) => setParty("from", "address", event.target.value)}
                  />
                </Field>
              </div>
            </div>
          </Section>

          <Section title={doc.kind === "quote" ? "Prepared for" : "Bill to"}>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Name">
                <Input
                  value={doc.to.name}
                  onChange={(event) => setParty("to", "name", event.target.value)}
                />
              </Field>
              <Field label="Email">
                <Input
                  value={doc.to.email}
                  onChange={(event) => setParty("to", "email", event.target.value)}
                />
              </Field>
              <Field label="Phone">
                <Input
                  value={doc.to.phone}
                  onChange={(event) => setParty("to", "phone", event.target.value)}
                />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Address">
                  <Textarea
                    rows={2}
                    value={doc.to.address}
                    onChange={(event) => setParty("to", "address", event.target.value)}
                  />
                </Field>
              </div>
            </div>
          </Section>

          <Section title="Line items">
            <div className="space-y-4">
              {doc.items.map((item) => (
                <div key={item.id} className="rounded-xl border-2 border-brand-dark/20 p-4">
                  <Field label="Description">
                    <Textarea
                      rows={2}
                      value={item.description}
                      placeholder="Custom hoop art — 8in, 3 colors"
                      onChange={(event) => setItem(item.id, { description: event.target.value })}
                    />
                  </Field>
                  <div className="mt-3 grid grid-cols-[1fr_1fr_auto] items-end gap-3">
                    <Field label="Qty">
                      <NumberInput
                        min={0}
                        step="1"
                        value={item.qty}
                        onChange={(qty) => setItem(item.id, { qty })}
                      />
                    </Field>
                    <Field label="Rate">
                      <NumberInput
                        min={0}
                        step="0.01"
                        value={item.unitPrice}
                        onChange={(unitPrice) => setItem(item.id, { unitPrice })}
                      />
                    </Field>
                    <Button
                      variant="ghost"
                      size="icon"
                      type="button"
                      aria-label="Remove line item"
                      disabled={doc.items.length === 1}
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              type="button"
              className="mt-4"
              onClick={() => set("items", [...doc.items, emptyItem()])}
            >
              <Plus /> Add item
            </Button>
          </Section>

          <Section title="Totals">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Discount ($)">
                <NumberInput
                  min={0}
                  step="0.01"
                  value={doc.discount}
                  onChange={(value) => set("discount", value)}
                />
              </Field>
              <Field label="Tax rate (%)">
                <NumberInput
                  min={0}
                  step="0.01"
                  value={doc.taxRate}
                  onChange={(value) => set("taxRate", value)}
                />
              </Field>
              <Field label="Shipping ($)">
                <NumberInput
                  min={0}
                  step="0.01"
                  value={doc.shipping}
                  onChange={(value) => set("shipping", value)}
                />
              </Field>
              <Field label="Amount paid ($)">
                <NumberInput
                  min={0}
                  step="0.01"
                  value={doc.amountPaid}
                  onChange={(value) => set("amountPaid", value)}
                />
              </Field>
            </div>
          </Section>

          <Section title="Notes & terms">
            <div className="space-y-4">
              <Field label="Notes">
                <Textarea
                  rows={3}
                  value={doc.notes}
                  placeholder="Payment by Venmo @supdawg or card link on request."
                  onChange={(event) => set("notes", event.target.value)}
                />
              </Field>
              <Field label="Terms">
                <Textarea
                  rows={3}
                  value={doc.terms}
                  onChange={(event) => set("terms", event.target.value)}
                />
              </Field>
            </div>
          </Section>

          <p className="text-xs text-muted-foreground">
            Drafts are kept in this browser only. Nothing is saved to a server.
          </p>
        </div>

        <div className="lg:sticky lg:top-6 lg:self-start">
          <div className="overflow-hidden rounded-2xl border-2 border-brand-dark shadow-dark-pop print:rounded-none print:border-0 print:shadow-none">
            <DocumentPreview doc={doc} />
          </div>
        </div>
      </div>
    </div>
  );
}
