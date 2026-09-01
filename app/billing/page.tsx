import type { Metadata } from "next";
import { isBillingConfigured, isSignedIn } from "@/lib/billing-auth";
import { BillingLogin } from "@/components/billing/BillingLogin";
import { BillingEditor } from "@/components/billing/BillingEditor";

export const metadata: Metadata = {
  title: "Billing — SUPDAWG",
  robots: { index: false, follow: false },
};

export default async function BillingPage() {
  const signedIn = await isSignedIn();

  if (!signedIn) {
    return <BillingLogin configured={isBillingConfigured()} />;
  }

  return <BillingEditor />;
}
