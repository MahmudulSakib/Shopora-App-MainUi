import { Suspense } from "react";
import OrderSuccessClient from "@/components/OrderSuccessClient";

export const metadata = {
  title: "Order Success",
};

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
      <OrderSuccessClient />
    </Suspense>
  );
}
