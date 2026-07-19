"use client";

import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import WaitlistModal from "./WaitlistModal";

export default function CartDrawer() {
  const { lines, count, total, isOpen, setOpen, setQty, remove, clear } =
    useCart();
  const [checkout, setCheckout] = useState(false);

  if (!isOpen) return null;

  const summary = lines
    .map((line) => `${line.qty}× ${line.product.name} (${line.product.price} DH)`)
    .join(", ");

  return (
    <>
      <div className="fixed inset-0 z-[60] flex justify-end bg-slate-950/45 backdrop-blur-sm">
        <button
          type="button"
          aria-label="Fermer le panier"
          className="absolute inset-0 cursor-default"
          onClick={() => setOpen(false)}
        />

        <aside className="relative flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
            <h2 className="font-display text-xl font-bold text-slate-900">
              Mon panier{" "}
              <span className="text-sm font-semibold text-slate-400">
                ({count} article{count > 1 ? "s" : ""})
              </span>
            </h2>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Fermer le panier"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-xl leading-none text-slate-600 transition hover:bg-slate-200"
            >
              ×
            </button>
          </div>

          {lines.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
              <p className="text-4xl" aria-hidden>
                🛒
              </p>
              <p className="font-semibold text-slate-900">Ton panier est vide</p>
              <p className="text-sm text-slate-500">
                Ouvre un avion et ajoute-le au panier pour préparer ta commande.
              </p>
            </div>
          ) : (
            <>
              <ul className="flex-1 overflow-y-auto px-6 py-4">
                {lines.map(({ product, qty }) => (
                  <li
                    key={product.id}
                    className="flex items-center gap-4 border-b border-slate-50 py-4 last:border-none"
                  >
                    <div className="relative h-20 w-20 shrink-0 rounded-2xl bg-[#dbdbdb]">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="80px"
                        className="object-contain p-2"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold text-slate-900">
                        {product.name}
                      </p>
                      <p className="text-sm text-slate-400">{product.price} DH</p>
                      <div className="mt-2 flex items-center gap-1">
                        <button
                          type="button"
                          aria-label="Diminuer"
                          onClick={() => setQty(product.id, qty - 1)}
                          className="flex h-7 w-7 items-center justify-center rounded-full bg-cloud text-slate-700 transition hover:bg-brand-50"
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-sm font-semibold">
                          {qty}
                        </span>
                        <button
                          type="button"
                          aria-label="Augmenter"
                          onClick={() => setQty(product.id, qty + 1)}
                          className="flex h-7 w-7 items-center justify-center rounded-full bg-cloud text-slate-700 transition hover:bg-brand-50"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-display font-bold text-slate-900">
                        {product.price * qty} DH
                      </p>
                      <button
                        type="button"
                        onClick={() => remove(product.id)}
                        className="mt-1 text-xs text-slate-400 transition hover:text-rose-500"
                      >
                        Retirer
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="border-t border-slate-100 px-6 py-5 [padding-bottom:max(1.25rem,env(safe-area-inset-bottom))]">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-slate-400">Prix total</p>
                  <p className="font-display text-2xl font-bold text-slate-900">
                    {total}{" "}
                    <span className="text-sm font-semibold text-slate-400">DH</span>
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setCheckout(true)}
                  className="mt-4 w-full rounded-full bg-brand px-7 py-4 font-semibold text-white transition hover:bg-brand-600"
                >
                  Commander via la waitlist
                </button>
                <p className="mt-2 text-center text-xs text-slate-400">
                  Aucun paiement en ligne : on te contacte pour confirmer.
                </p>
              </div>
            </>
          )}
        </aside>
      </div>

      {checkout && lines.length > 0 && (
        <WaitlistModal
          product={{
            id: "panier",
            name: `Panier (${count} article${count > 1 ? "s" : ""})`,
            price: total,
          }}
          defaultNote={`Ma commande : ${summary}. Total ${total} DH.`}
          onSuccess={clear}
          onClose={() => setCheckout(false)}
        />
      )}
    </>
  );
}
