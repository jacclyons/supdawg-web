import Image from "next/image";
import { formatDate, money, totals, type BillingDoc } from "@/lib/billing";

const Row = ({
  label,
  value,
  strong,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) => (
  <div
    className={`flex justify-between gap-8 py-1 ${
      strong ? "border-t-2 border-brand-dark pt-2 text-lg font-bold" : "text-sm"
    }`}
  >
    <span>{label}</span>
    <span className="tabular-nums">{value}</span>
  </div>
);

export function DocumentPreview({ doc }: { doc: BillingDoc }) {
  const sums = totals(doc);
  const heading = doc.kind === "quote" ? "Quote" : "Invoice";
  const dateLabel = doc.kind === "quote" ? "Valid until" : "Due";
  const visibleItems = doc.items.filter(
    (item) => item.description.trim() || item.qty || item.unitPrice
  );

  return (
    <div
      id="billing-print"
      className="mx-auto w-full max-w-[850px] bg-white p-10 text-brand-dark print:max-w-none print:p-0"
    >
      <header className="flex items-start justify-between gap-8 border-b-2 border-brand-dark pb-6">
        <div>
          <Image
            src="/supdawg-logo-noshadow.svg"
            alt=""
            width={140}
            height={56}
            className="mb-3 h-14 w-auto"
          />
          <p className="font-display text-lg leading-tight">{doc.from.name}</p>
          <div className="mt-1 whitespace-pre-line text-xs leading-relaxed text-muted-foreground">
            {[doc.from.address, doc.from.email, doc.from.phone, doc.from.website]
              .filter(Boolean)
              .join("\n")}
          </div>
        </div>

        <div className="text-right">
          <h2 className="font-display text-4xl uppercase tracking-wide">{heading}</h2>
          <p className="mt-1 font-mono text-sm">{doc.number}</p>
          <p className="mt-3 text-xs">
            <span className="text-muted-foreground">Issued </span>
            {formatDate(doc.issueDate)}
          </p>
          <p className="text-xs">
            <span className="text-muted-foreground">{dateLabel} </span>
            {formatDate(doc.dueDate)}
          </p>
        </div>
      </header>

      <section className="py-6">
        <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
          {doc.kind === "quote" ? "Prepared for" : "Bill to"}
        </p>
        <p className="mt-1 font-display text-lg">{doc.to.name || "—"}</p>
        <div className="whitespace-pre-line text-xs leading-relaxed text-muted-foreground">
          {[doc.to.address, doc.to.email, doc.to.phone].filter(Boolean).join("\n")}
        </div>
      </section>

      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-y-2 border-brand-dark text-[11px] uppercase tracking-widest">
            <th className="py-2 text-left font-bold">Description</th>
            <th className="w-20 py-2 text-right font-bold">Qty</th>
            <th className="w-28 py-2 text-right font-bold">Rate</th>
            <th className="w-28 py-2 text-right font-bold">Amount</th>
          </tr>
        </thead>
        <tbody>
          {visibleItems.length === 0 ? (
            <tr>
              <td colSpan={4} className="py-6 text-center text-muted-foreground">
                No line items yet.
              </td>
            </tr>
          ) : (
            visibleItems.map((item) => (
              <tr key={item.id} className="border-b border-brand-dark/20 align-top">
                <td className="whitespace-pre-line py-3 pr-4">{item.description || "—"}</td>
                <td className="py-3 text-right tabular-nums">{item.qty}</td>
                <td className="py-3 text-right tabular-nums">{money(item.unitPrice)}</td>
                <td className="py-3 text-right tabular-nums">
                  {money(item.qty * item.unitPrice)}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="mt-6 flex justify-end">
        <div className="w-full max-w-xs">
          <Row label="Subtotal" value={money(sums.subtotal)} />
          {doc.discount > 0 && <Row label="Discount" value={`−${money(sums.discount)}`} />}
          {doc.taxRate > 0 && <Row label={`Tax (${doc.taxRate}%)`} value={money(sums.tax)} />}
          {doc.shipping > 0 && <Row label="Shipping" value={money(sums.shipping)} />}
          <Row label="Total" value={money(sums.total)} strong />
          {doc.amountPaid > 0 && (
            <>
              <Row label="Paid" value={`−${money(doc.amountPaid)}`} />
              <Row label="Balance due" value={money(sums.balance)} strong />
            </>
          )}
        </div>
      </div>

      {(doc.notes || doc.terms) && (
        <footer className="mt-10 space-y-4 border-t-2 border-brand-dark pt-6 text-xs leading-relaxed">
          {doc.notes && (
            <div>
              <p className="font-bold uppercase tracking-widest">Notes</p>
              <p className="mt-1 whitespace-pre-line text-muted-foreground">{doc.notes}</p>
            </div>
          )}
          {doc.terms && (
            <div>
              <p className="font-bold uppercase tracking-widest">Terms</p>
              <p className="mt-1 whitespace-pre-line text-muted-foreground">{doc.terms}</p>
            </div>
          )}
        </footer>
      )}
    </div>
  );
}
