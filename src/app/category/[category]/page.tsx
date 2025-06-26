"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import NavMenu from "@/components/NavMenu";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

type Product = {
  id: string;
  name: string;
  details: string;
  imageUrl: string;
  price: string;
  createdAt: string;
};

export default function CategoryPage() {
  const { user } = useAuth();
  const router = useRouter();
  const params = useParams();
  const category = decodeURIComponent(params.category as string);

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios
      .get<Product[]>(
        `https://shopora-backend-deploy.onrender.com/products-by-category/${category}`
      )
      .then((res) => setProducts(res.data))
      .catch(() => toast.error("Failed to load products"));
  }, [category]);

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
        <h1 className="text-2xl font-bold capitalize text-center">
          {category} Products
        </h1>
        <Separator className="my-4" />

        {products.length === 0 ? (
          <p className="text-center text-gray-500">No products found.</p>
        ) : (
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
        )}
      </div>
    </>
  );
}
