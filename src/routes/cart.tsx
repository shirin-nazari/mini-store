import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore, selectCartTotal } from "../store/cartStore";

export const Route = createFileRoute("/cart")({
  component: Cart,
});

function Cart() {
  const items = useCartStore((s) => s.items);
  const total = useCartStore(selectCartTotal);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  if (items.length === 0) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-16 text-center">
        <div className="w-44 h-44 bg-rose-50 px-2 rounded-full mx-auto my-2">
          <img
            src="/icon-shop.png"
            alt="logo"
            className="w-40 h-40 object-contain"
          />
        </div>
        <h1 className="text-xl font-bold text-gray-900">Your Cart is empty!</h1>
        <p className="mt-1 text-sm text-gray-500">
          Looks like you haven't added anything yet.
        </p>
        <Link
          to="/products"
          className="mt-6 inline-block rounded-lg bg-red-800 px-6 py-3 text-sm font-semibold text-white hover:bg-red-900"
        >
          Start Shopping
        </Link>
      </section>
    );
  }
  return (
    <section className="mx-auto max-w-7xl px-4 py-6">
      <h1 className="text-xl font-bold text-gray-900">Shopping Cart</h1>
      <p className="mb-6 text-sm text-gray-500">{items.length} items</p>
      <div className="grid items-start gap-6 md:grid-cols-[1fr_320px]">
        {/* items */}
        <ul className="space-y-3">
          {items.map((item) => (
            <li
              className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-3"
              key={item.id}
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                className="h-20 w-20 rounded-lg bg-gray-50 object-contain"
              />
              <div className="min-w-0 flex-1">
                <Link
                  to="/products/$productId"
                  params={{ productId: String(item.id) }}
                  className="line-clamp-1 text-sm font-semibold text-gray-900"
                >
                  {item.title}
                </Link>
                <p className="mt-1 text-sm font-bold text-red-900">
                  ${item.price.toFixed(2)}
                </p>
              </div>
              <div className="flex items-center rounded-lg border border-gray-300">
                <button
                  className="p-2 cursor-pointer"
                  onClick={() => setQuantity(item.id, item.quantity - 1)}
                  aria-label="Decrease quantity"
                >
                  <Minus size={14} className="text-gray-800" />
                </button>
                <span className="w-6 text-center text-sm text-gray-900">
                  {item.quantity}
                </span>
                <button
                  className="p-2 cursor-pointer"
                  aria-label="Increase quantity"
                  onClick={() => setQuantity(item.id, item.quantity + 1)}
                >
                  <Plus size={14} className="text-gray-800" />
                </button>
              </div>
              <button
                className="p-2 text-red-600 cursor-pointer"
                onClick={() => removeItem(item.id)}
                aria-label="Remove Item"
              >
                <Trash2 size={18} className="text-red-600" />
              </button>
            </li>
          ))}
        </ul>
        {/* order Summary  */}
        <aside className="rounded-xl border border-gray-200 bg-white p-4">
          <h2 className="mb-4 font-semibold text-gray-900">Order Summary</h2>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>SubTotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shopping</span>
              <span>$0.00</span>
            </div>
          </div>
          <div className="mt-4 flex justify-between border-t border-gray-200 pt-4 font-bold text-gray-900">
            <span>Total</span>
            <span>{total.toFixed(2)}</span>
          </div>
          <button className="mt-4 w-full rounded-lg bg-red-800 py-3 text-sm font-semibold text-white">
            Proceed to Checkout
          </button>
          <Link
            to="/products"
            className="mt-3 block text-center text-sm text-red-800"
          >
            Continue Shopping
          </Link>
        </aside>
      </div>
    </section>
  );
}
