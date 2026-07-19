"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import type { Product } from "@/lib/products";
import { useCart } from "@/lib/cart";

const LEVEL_STYLES: Record<Product["level"], string> = {
  Débutant: "bg-emerald-50 text-emerald-700",
  Intermédiaire: "bg-amber-50 text-amber-700",
  Pro: "bg-rose-50 text-rose-700",
  Collection: "bg-brand-50 text-brand-700",
};

function Gallery({ images, name }: { images: string[]; name: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const onScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    setActive(Math.round(track.scrollLeft / track.clientWidth));
  };

  const goTo = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: index * track.clientWidth, behavior: "smooth" });
  };

  return (
    <div>
      <div
        ref={trackRef}
        onScroll={onScroll}
        className="flex snap-x snap-mandatory overflow-x-auto rounded-[2rem] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((src, i) => (
          <div
            key={src}
            className="relative aspect-square w-full shrink-0 snap-center bg-[#dbdbdb]"
          >
            <Image
              src={src}
              alt={`${name} — photo ${i + 1}`}
              fill
              priority={i === 0}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain p-8"
            />
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              aria-label={`Photo ${i + 1}`}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                active === i ? "w-6 bg-brand" : "w-2 bg-slate-300"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProductDetail({ product }: { product: Product }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const images = [product.image, ...(product.gallery ?? [])];
  const total = product.price * qty;

  return (
    <>
      <main className="mx-auto w-full max-w-6xl px-4 pt-24 pb-40 sm:px-6 lg:pt-28">
        <Link
          href="/#avions"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-brand"
        >
          <span aria-hidden>←</span> Tous les avions
        </Link>

        <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-14">
          <Gallery images={images} name={product.name} />

          <div>
            <div className="flex items-center gap-2 text-xs">
              <span
                className={`rounded-full px-2.5 py-1 font-semibold ${LEVEL_STYLES[product.level]}`}
              >
                {product.level}
              </span>
              <span className="text-slate-400">{product.meta}</span>
            </div>

            <h1 className="font-display mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {product.name}
            </h1>

            <div className="mt-3 flex items-baseline gap-3">
              <p className="font-display text-2xl font-bold text-slate-900">
                {product.price}
                <span className="ml-1 text-sm font-semibold text-slate-400">DH</span>
              </p>
              {product.oldPrice && (
                <p className="text-sm text-slate-400 line-through">
                  {product.oldPrice} DH
                </p>
              )}
            </div>

            <p className="mt-5 leading-relaxed text-slate-500">{product.tagline}</p>

            <div className="mt-6 rounded-2xl bg-white p-5">
              <p className="text-sm font-semibold text-slate-900">Inclus</p>
              <ul className="mt-2 grid gap-1.5 text-sm text-slate-500">
                <li>{product.meta}</li>
                <li>Batterie et chargeur inclus</li>
                <li>Garantie 6 mois · pièces de rechange disponibles</li>
                <li>Livraison partout au Maroc au lancement</li>
              </ul>
            </div>

            <div className="mt-6 flex items-center justify-between rounded-2xl bg-white p-4">
              <span className="text-sm font-semibold text-slate-900">Quantité</span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  aria-label="Diminuer la quantité"
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-cloud text-lg text-slate-700 transition hover:bg-brand-50"
                >
                  −
                </button>
                <span className="w-10 text-center font-semibold">{qty}</span>
                <button
                  type="button"
                  aria-label="Augmenter la quantité"
                  onClick={() => setQty(qty + 1)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-cloud text-lg text-slate-700 transition hover:bg-brand-50"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Barre panier toujours visible */}
      <div className="fixed inset-x-0 bottom-0 z-40 px-4 pb-4 [padding-bottom:max(1rem,env(safe-area-inset-bottom))] sm:px-6">
        <div className="mx-auto flex max-w-xl items-center justify-between gap-4 rounded-full bg-white py-2.5 pr-2.5 pl-7 shadow-xl shadow-slate-900/15">
          <div>
            <p className="text-xs text-slate-400">Prix total</p>
            <p className="font-display text-xl font-bold text-slate-900">
              {total} <span className="text-sm font-semibold text-slate-400">DH</span>
            </p>
          </div>
          <button
            type="button"
            onClick={() => add(product.id, qty)}
            className="flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 font-semibold text-white transition hover:bg-brand-600"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M5 8h14l-1.2 12H6.2L5 8Z" />
              <path d="M9 8a3 3 0 0 1 6 0" />
            </svg>
            Ajouter au panier
          </button>
        </div>
      </div>
    </>
  );
}
