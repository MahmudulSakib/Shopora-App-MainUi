import { Suspense } from "react";
import OrderSuccessClient from "@/components/OrderSuccessClient";

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
      <OrderSuccessClient />
    </Suspense>
  );
}
