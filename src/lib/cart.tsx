import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { PRODUCTS, priceForWeight, type Product } from "@/data/products";

export type CartItem = {
  id: string;
  slug: string;
  weight: number;
  grind: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  wishlist: string[];
  addItem: (input: {
    slug: string;
    weight: number;
    grind: string;
    quantity?: number;
  }) => void;
  removeItem: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  clear: () => void;
  toggleWishlist: (slug: string) => void;
  count: number;
  subtotal: number;
  shipping: number;
  total: number;
  detailed: {
    item: CartItem;
    product: Product;
    unitPrice: number;
    linePrice: number;
  }[];
};

const CartContext = createContext<CartState | null>(null);
const STORAGE_KEY = "qahve-cart-v1";
const WISH_KEY = "qahve-wishlist-v1";
const FREE_SHIPPING_FROM = 1500000;
const SHIPPING_COST = 65000;

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
      const wraw = localStorage.getItem(WISH_KEY);
      if (wraw) setWishlist(JSON.parse(wraw));
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items]);

  useEffect(() => {
    try {
      localStorage.setItem(WISH_KEY, JSON.stringify(wishlist));
    } catch {
      /* ignore */
    }
  }, [wishlist]);

  const value = useMemo<CartState>(() => {
    const detailed = items
      .map((item) => {
        const product = PRODUCTS.find((p) => p.slug === item.slug);
        if (!product) return null;
        const unitPrice = priceForWeight(product, item.weight);
        return {
          item,
          product,
          unitPrice,
          linePrice: unitPrice * item.quantity,
        };
      })
      .filter(Boolean) as CartState["detailed"];

    const subtotal = detailed.reduce((sum, d) => sum + d.linePrice, 0);
    const shipping =
      subtotal === 0 || subtotal >= FREE_SHIPPING_FROM ? 0 : SHIPPING_COST;

    return {
      items,
      wishlist,
      detailed,
      count: items.reduce((sum, i) => sum + i.quantity, 0),
      subtotal,
      shipping,
      total: subtotal + shipping,
      addItem: ({ slug, weight, grind, quantity = 1 }) =>
        setItems((prev) => {
          const id = `${slug}-${weight}-${grind}`;
          const found = prev.find((i) => i.id === id);
          if (found) {
            return prev.map((i) =>
              i.id === id ? { ...i, quantity: i.quantity + quantity } : i,
            );
          }
          return [...prev, { id, slug, weight, grind, quantity }];
        }),
      removeItem: (id) => setItems((prev) => prev.filter((i) => i.id !== id)),
      setQuantity: (id, quantity) =>
        setItems((prev) =>
          prev.map((i) =>
            i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i,
          ),
        ),
      clear: () => setItems([]),
      toggleWishlist: (slug) =>
        setWishlist((prev) =>
          prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug],
        ),
    };
  }, [items, wishlist]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

export { FREE_SHIPPING_FROM };
