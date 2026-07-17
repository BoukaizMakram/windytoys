import type { ReactNode } from "react";
import Reveal from "./Reveal";

type Feature = {
  title: string;
  text: string;
  icon: ReactNode;
};

const iconProps = {
  width: 26,
  height: 26,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const FEATURES: Feature[] = [
  {
    title: "Facile à piloter",
    text: "Stabilisation gyroscopique et mode débutant : tu voles dès le premier jour, sans stress.",
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="3" />
        <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
      </svg>
    ),
  },
  {
    title: "Paiement conseillé",
    text: "Le formulaire recommande le mode le plus logique selon le prix : livraison, acompte ou conseil personnalisé.",
    icon: (
      <svg {...iconProps}>
        <rect x="2.5" y="6" width="19" height="12" rx="2.5" />
        <circle cx="12" cy="12" r="2.8" />
        <path d="M6 9.5h.01M18 14.5h.01" />
      </svg>
    ),
  },
  {
    title: "Stock selon la demande",
    text: "La waitlist nous aide à importer les bons modèles pour Casablanca, Rabat, Marrakech, Tanger, Agadir et plus.",
    icon: (
      <svg {...iconProps}>
        <path d="M2.5 7h11v10h-11z" />
        <path d="M13.5 10h4l3 3v4h-7" />
        <circle cx="6.5" cy="17.5" r="1.8" />
        <circle cx="16.5" cy="17.5" r="1.8" />
      </svg>
    ),
  },
  {
    title: "Besoin précis",
    text: "Chaque inscription garde une note libre : budget, niveau, ville, pièces de rechange ou modèle rêvé.",
    icon: (
      <svg {...iconProps}>
        <path d="M21 12a9 9 0 1 0-3.5 7.1L21 20l-.7-3.2A8.9 8.9 0 0 0 21 12Z" />
        <path d="M8 10.5h8M8 14h5" />
      </svg>
    ),
  },
];

export default function Features() {
  return (
    <section id="pourquoi" className="scroll-mt-24 bg-cloud py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold tracking-widest text-sky-600 uppercase">
            Pourquoi AeroPlay ?
          </p>
          <h2 className="font-display mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Pensé pour lancer avec les pilotes marocains
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature, i) => (
            <Reveal key={feature.title} delay={i * 0.08} className="h-full">
              <div className="h-full rounded-3xl border border-slate-100 bg-white p-7 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-600">
                  {feature.icon}
                </div>
                <h3 className="font-display mt-5 text-lg font-semibold text-slate-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  {feature.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
