"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ShoppingBasket, ShoppingCart, X, Trash2 } from "lucide-react";
import { ShimmerButton } from "./magicui/shimmer-button";
import { VideoText } from "@/components/magicui/video-text";
import SearchWithSuggestions from "./SearchInput";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

type CartItem = {
  productId: string;
  name: string;
  imageUrl: string;
  quantity: number;
  price: number;
};

type Product = {
  id: string;
  name: string;
  category: string;
  details: string;
  imageUrl: string;
  price: string;
  createdAt: string;
};

const NavMenu = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [products, setProducts] = useState<Product[]>([]);

  const fetchCart = async () => {
    try {
      const res = await axios.get(
        "https://shopora-backend-deploy.onrender.com/cart-items",
        {
          withCredentials: true,
        }
      );
      const data = res.data as CartItem[];
      setCartItems(data);
      setCartCount(data.reduce((sum, item) => sum + item.quantity, 0));
    } catch {
      toast.error("Failed to load cart");
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (quantity < 1) return;
    try {
      await axios.patch(
        "https://shopora-backend-deploy.onrender.com/update-cart-item",
        { productId, quantity },
        { withCredentials: true }
      );
      fetchCart();
    } catch {
      toast.error("Failed to update quantity");
    }
  };

  const deleteItem = async (productId: string) => {
    try {
      await axios.request({
        method: "DELETE",
        url: "https://shopora-backend-deploy.onrender.com/remove-cart-item",
        data: { productId },
        withCredentials: true,
      });

      setCartItems((prevItems) =>
        prevItems.filter((item) => item.productId !== productId)
      );
      setCartCount(
        (prevCount) =>
          prevCount -
          (cartItems.find((item) => item.productId === productId)?.quantity ||
            0)
      );

      toast.success("Item removed from cart");
    } catch {
      toast.error("Failed to remove item");
    }
  };

  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setCartItems([]);
      setCartCount(0);
    }

    const handleCartUpdated = () => {
      fetchCart();
    };

    window.addEventListener("cart-updated", handleCartUpdated);

    return () => {
      window.removeEventListener("cart-updated", handleCartUpdated);
    };
  }, [user]);

  useEffect(() => {
    axios
      .get<{ category: string }[]>(
        "https://shopora-backend-deploy.onrender.com/nav-categories"
      )
      .then((res) => {
        const data = res.data.map(
          (item: { category: string }) => item.category
        );
        setCategories(data);
      });
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      axios
        .get<Product[]>(
          `https://shopora-backend-deploy.onrender.com/products-by-category/${selectedCategory}`
        )
        .then((res) => setProducts(res.data));
    }
  }, [selectedCategory]);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/60 backdrop-blur-md border-b shadow-sm px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <ShoppingBasket className="w-7 h-7 text-teal-700" />
          <Link href="/" className="w-[160px] h-[60px] ml-[-20px] pt-[5px]">
            <VideoText src="https://cdn.magicui.design/ocean-small.webm">
              Shopora
            </VideoText>
          </Link>
        </div>

        <div className="w-full max-w-md">
          <SearchWithSuggestions />
        </div>

        <div className="flex items-center gap-3">
          {!loading &&
            (user ? (
              <Link href="/profile">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-teal-500 text-white flex items-center justify-center font-bold">
                  {user.email.charAt(0).toUpperCase()}
                </div>
              </Link>
            ) : (
              <>
                <Link href="/log-in">
                  <ShimmerButton>
                    <span>Log In</span>
                  </ShimmerButton>
                </Link>
                <Link href="/sign-up">
                  <ShimmerButton>
                    <span>Sign Up</span>
                  </ShimmerButton>
                </Link>
              </>
            ))}

          <div
            className="relative cursor-pointer"
            onClick={() => setDrawerOpen(true)}
          >
            <ShoppingCart className="w-6 h-6 text-gray-800" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </div>
        </div>
      </header>

      <nav className="w-full py-3 flex flex-wrap justify-center gap-6 text-gray-700 text-sm sm:text-base border-b bg-white/60 backdrop-blur-md shadow-sm z-40 cursor-pointer">
        <Link href="/" className="hover:text-blue-600 transition-colors">
          Home
        </Link>
        <Link href="/shop" className="hover:text-blue-600 transition-colors">
          Shop
        </Link>

        <div className="relative group cursor-pointer">
          <button className="flex items-center gap-1 hover:text-blue-600 transition cursor-pointer">
            Category
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-44 max-h-44 overflow-y-auto rounded-md border bg-white/70 backdrop-blur-md shadow z-50 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-200">
            {categories.map((cat) => (
              <a
                key={cat}
                href={`/category/${cat}`}
                className="block px-4 py-2 text-sm text-gray-800 hover:text-blue-600 transition-colors"
              >
                {cat}
              </a>
            ))}
          </div>
        </div>

        <Link href="/contact" className="hover:text-blue-600 transition-colors">
          Contact
        </Link>
      </nav>

      <aside
        className={`fixed top-0 right-0 h-full w-80 sm:w-96 bg-white/60 backdrop-blur-md border-l shadow-xl z-50 transition-transform duration-300 ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <X onClick={() => setDrawerOpen(false)} className="cursor-pointer" />
        </div>

        <div className="p-4 overflow-y-auto max-h-[80vh] space-y-4">
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500 text-sm">
              Your cart is empty
            </p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.productId}
                className="flex items-center gap-3 border rounded-lg p-3 bg-gray-50"
              >
                <img
                  src={item.imageUrl}
                  className="w-12 h-12 object-cover rounded border"
                  alt={item.name}
                />
                <div className="flex-1">
                  <h4 className="text-sm font-medium">{item.name}</h4>
                  <p className="text-xs text-gray-600">${item.price}</p>
                </div>
                <Trash2
                  className="text-red-600 w-4 h-4 cursor-pointer"
                  onClick={() => deleteItem(item.productId)}
                />
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="p-4 border-t">
            <button
              onClick={() => {
                setDrawerOpen(false);
                router.push("/public-cart");
              }}
              className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
            >
              Go to Checkout
            </button>
          </div>
        )}
      </aside>
    </>
  );
};

export default NavMenu;
