"use client";

import { useState } from "react";
import { PRODUCTS, type Product } from "@/lib/products";
import ProductCard from "./ProductCard";
import Reveal from "./Reveal";
import WaitlistModal from "./WaitlistModal";

export default function Products() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <section id="avions" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold tracking-widest text-brand uppercase">
            Waitlist
          </p>
          <h2 className="font-display mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Choisis l&apos;avion que tu veux réserver
          </h2>
          <p className="mt-4 text-slate-500">
            Les commandes directes ne sont pas encore ouvertes. Rejoins la liste
            d&apos;attente, dis-nous ton budget et on te contacte dès que le stock est prêt.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((product, i) => (
            <Reveal key={product.id} delay={(i % 3) * 0.08} className="h-full">
              <ProductCard
                product={product}
                onJoinWaitlist={setSelectedProduct}
              />
            </Reveal>
          ))}
        </div>
      </div>

      {selectedProduct && (
        <WaitlistModal
          key={selectedProduct.id}
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  );
}
