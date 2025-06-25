"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import NavMenu from "@/components/NavMenu";

type Product = {
  id: string;
  name: string;
  details: string;
  imageUrl: string;
  price: string;
  createdAt: string;
};

const PRODUCTS_PER_PAGE = 50;

export default function ShopPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  const currentPage = parseInt(searchParams.get("page") || "1");

  useEffect(() => {
    axios
      .get<{
        products: Product[];
        total: number;
      }>("https://shopora-backend-deploy.onrender.com/all-products", {
        params: { page: currentPage, limit: PRODUCTS_PER_PAGE },
      })
      .then((res) => {
        setProducts(res.data.products);
        setTotalPages(Math.ceil(res.data.total / PRODUCTS_PER_PAGE));
      })
      .catch(() => toast.error("Failed to load products"));
  }, [currentPage]);

  const handleOrder = async (productId: string) => {
    if (!user) {
      toast.error("Please log in to order");
      router.push("/log-in");
      return;
    }

    try {
      await axios.post(
        "https://shopora-backend-deploy.onrender.com/add-to-cart",
        { productId, quantity: 1 },
        { withCredentials: true }
      );

      toast.success("Added to cart!");
      window.dispatchEvent(new Event("cart-updated"));
    } catch (err) {
      toast.error("Failed to add to cart");
    }
  };

  const handleDetails = (productId: string) => {
    router.push(`/product/${productId}`);
  };

  return (
    <>
      <NavMenu />
      <div className="flex flex-col px-6 py-10">
        <h1 className="text-2xl font-bold text-center">Shop All Products</h1>
        <Separator className="my-4" />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card
              key={product.id}
              className="relative group w-full overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border"
            >
              <div className="w-full h-60 overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <CardContent className="p-4 space-y-2">
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <p className="text-muted-foreground line-clamp-2">
                  {product.details}
                </p>
                <p className="text-lg font-bold">${product.price}</p>
              </CardContent>

              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center space-y-3">
                <Button
                  onClick={() => handleOrder(product.id)}
                  className="w-40 hover:cursor-pointer bg-teal-700"
                >
                  Order Product
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => handleDetails(product.id)}
                  className="w-40 hover:cursor-pointer bg-stone-300"
                >
                  Details
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-10">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => router.push(`/shop?page=${i + 1}`)}
                className={`px-4 py-2 border rounded-md ${
                  currentPage === i + 1
                    ? "bg-blue-600 text-white"
                    : "hover:bg-blue-100"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
