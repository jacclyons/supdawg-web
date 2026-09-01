export type DocKind = "quote" | "invoice";

export type LineItem = {
  id: string;
  description: string;
  qty: number;
  unitPrice: number;
};

export type Party = {
  name: string;
  email: string;
  phone: string;
  address: string;
};

export type BillingDoc = {
  kind: DocKind;
  number: string;
  issueDate: string;
  dueDate: string;
  from: Party & { website: string };
  to: Party;
  items: LineItem[];
  discount: number;
  taxRate: number;
  shipping: number;
  amountPaid: number;
  notes: string;
  terms: string;
};

export const DRAFT_KEY = "supdawg-billing-draft";

export const newId = () =>
  typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2);

export const today = () => new Date().toISOString().slice(0, 10);

export const addDays = (isoDate: string, days: number) => {
  const date = new Date(`${isoDate}T00:00:00`);
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
};

export const emptyItem = (): LineItem => ({
  id: newId(),
  description: "",
  qty: 1,
  unitPrice: 0,
});

export function defaultDoc(kind: DocKind = "invoice"): BillingDoc {
  const issueDate = today();
  return {
    kind,
    number: startingNumber(kind),
    issueDate,
    dueDate: addDays(issueDate, kind === "quote" ? 30 : 14),
    from: {
      name: "SUPDAWG",
      email: "supdawgcrafts@gmail.com",
      phone: "",
      address: "",
      website: "supdawgcrafts.com",
    },
    to: { name: "", email: "", phone: "", address: "" },
    items: [emptyItem()],
    discount: 0,
    taxRate: 0,
    shipping: 0,
    amountPaid: 0,
    notes: "",
    terms:
      kind === "quote"
        ? "This quote is valid for 30 days. A 50% deposit is required to start work."
        : "Payment due within 14 days. Thank you for supporting handmade!",
  };
}

export const prefixFor = (kind: DocKind) => (kind === "quote" ? "Q" : "INV");

export function startingNumber(kind: DocKind) {
  return `${prefixFor(kind)}-${new Date().getFullYear()}-001`;
}

/** Bumps the trailing digits: INV-2026-007 -> INV-2026-008. */
export function nextNumber(current: string, kind: DocKind) {
  const match = current.match(/^(.*?)(\d+)(\D*)$/);
  if (!match) return startingNumber(kind);
  const [, head, digits, tail] = match;
  const bumped = String(Number(digits) + 1).padStart(digits.length, "0");
  return `${head}${bumped}${tail}`;
}

export function retitle(current: string, kind: DocKind) {
  const other = prefixFor(kind === "quote" ? "invoice" : "quote");
  return current.startsWith(`${other}-`)
    ? `${prefixFor(kind)}-${current.slice(other.length + 1)}`
    : current;
}

export function totals(doc: BillingDoc) {
  const subtotal = doc.items.reduce((sum, item) => sum + item.qty * item.unitPrice, 0);
  const discounted = Math.max(subtotal - doc.discount, 0);
  const tax = discounted * (doc.taxRate / 100);
  const total = discounted + tax + doc.shipping;
  return {
    subtotal,
    discount: doc.discount,
    tax,
    shipping: doc.shipping,
    total,
    balance: total - doc.amountPaid,
  };
}

const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
export const money = (value: number) => currency.format(Number.isFinite(value) ? value : 0);

export const formatDate = (iso: string) => {
  if (!iso) return "—";
  const date = new Date(`${iso}T00:00:00`);
  return Number.isNaN(date.getTime())
    ? iso
    : date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
};
