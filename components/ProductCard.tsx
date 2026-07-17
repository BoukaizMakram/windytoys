"use client";

import Image from "next/image";
import type { Product } from "@/lib/products";

const LEVEL_STYLES: Record<Product["level"], string> = {
  Débutant: "bg-emerald-50 text-emerald-700",
  Intermédiaire: "bg-amber-50 text-amber-700",
  Pro: "bg-rose-50 text-rose-700",
  Collection: "bg-sky-50 text-sky-700",
};

export default function ProductCard({
  product,
  onJoinWaitlist,
}: {
  product: Product;
  onJoinWaitlist: (product: Product) => void;
}) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/10">
      <div
        className={`relative aspect-[4/3] overflow-hidden ${
          product.imageFit === "cover" ? "bg-slate-100" : "bg-white"
        }`}
      >
        {product.badge && (
          <span className="absolute top-4 left-4 z-10 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm">
            {product.badge}
          </span>
        )}
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={`transition duration-500 ease-out group-hover:scale-105 ${
            product.imageFit === "cover" ? "object-cover" : "object-contain p-5"
          }`}
        />
      </div>

      <div className="flex flex-1 flex-col gap-2.5 p-6">
        <div className="flex items-center gap-2 text-xs">
          <span
            className={`rounded-full px-2.5 py-1 font-semibold ${LEVEL_STYLES[product.level]}`}
          >
            {product.level}
          </span>
          <span className="text-slate-400">{product.meta}</span>
        </div>
        <h3 className="font-display text-lg font-semibold text-slate-900">
          {product.name}
        </h3>
        <p className="text-sm leading-relaxed text-slate-500">{product.tagline}</p>

        <div className="mt-auto flex items-end justify-between gap-4 pt-3">
          <div>
            {product.oldPrice && (
              <p className="text-xs text-slate-400 line-through">
                {product.oldPrice} DH
              </p>
            )}
            <p className="font-display text-2xl font-bold text-slate-900">
              {product.price}
              <span className="ml-1 text-sm font-semibold text-slate-400">DH</span>
            </p>
          </div>
          <button
            type="button"
            onClick={() => onJoinWaitlist(product)}
            className="shrink-0 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-500"
          >
            Waitlist
          </button>
        </div>
      </div>
    </article>
  );
}
