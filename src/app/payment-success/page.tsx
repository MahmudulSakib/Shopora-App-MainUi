import { Suspense } from "react";
import PaymentSuccessClient from "@/components/PaymentSuccessClient";

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
      <PaymentSuccessClient />
    </Suspense>
  );
}
