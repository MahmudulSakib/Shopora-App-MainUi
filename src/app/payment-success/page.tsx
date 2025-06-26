import { Suspense } from "react";
import PaymentSuccessClient from "@/components/PaymentSuccessClient";

export const metadata = {
  title: "Payment Success",
};

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
      <PaymentSuccessClient />
    </Suspense>
  );
}
