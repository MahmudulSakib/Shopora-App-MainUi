import { Suspense } from "react";
import ShopPageClient from "@/components/ShopPageClient";

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
      <ShopPageClient />
    </Suspense>
  );
}
