"use client";

import { useState } from "react";
import Reveal from "./Reveal";

const FAQS = [
  {
    q: "Est-ce que je paye maintenant ?",
    a: "Non. La waitlist sert seulement à réserver ton intérêt et comprendre ton budget. On te contacte avant toute confirmation.",
  },
  {
    q: "Pourquoi vous demandez mon téléphone ?",
    a: "C'est le moyen le plus simple pour confirmer le modèle, le stock, la ville et l'option de paiement quand AeroPlay lance les ventes.",
  },
  {
    q: "Quel paiement est recommandé ?",
    a: "Pour les petits modèles, paiement à la livraison. Pour les modèles chers, on recommande souvent un acompte de réservation puis le reste à la livraison.",
  },
  {
    q: "Je peux décrire un modèle précis ?",
    a: "Oui. Le formulaire a une zone libre pour ton niveau, ton budget, la couleur, les pièces voulues ou un modèle que tu as vu ailleurs.",
  },
  {
    q: "Vous livrerez dans ma ville ?",
    a: "L'objectif est de couvrir tout le Maroc. La waitlist nous aide justement à voir où la demande est la plus forte avant le lancement.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-24 bg-cloud py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Reveal className="text-center">
          <p className="text-sm font-semibold tracking-widest text-sky-600 uppercase">
            FAQ
          </p>
          <h2 className="font-display mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Les questions sur la waitlist
          </h2>
        </Reveal>

        <Reveal className="mt-12">
          <div className="flex flex-col gap-3">
            {FAQS.map((faq, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={faq.q}
                  className="rounded-2xl border border-slate-100 bg-white shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left"
                  >
                    <span className="font-semibold text-slate-900">{faq.q}</span>
                    <span
                      className={`shrink-0 text-xl leading-none text-sky-500 transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                      aria-hidden
                    >
                      +
                    </span>
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 text-sm leading-relaxed text-slate-500">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
