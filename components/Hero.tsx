"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const PlaneScene = dynamic(() => import("./PlaneScene"), {
  ssr: false,
  loading: () => <div className="h-full w-full" />,
});

const STATS = [
  { value: "Early", label: "accès stock" },
  { value: "0 DH", label: "pour s'inscrire" },
  { value: "Maroc", label: "pilotes ciblés" },
];

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out", duration: 1 } });
      tl.from(".hero-line", { yPercent: 110, stagger: 0.12 })
        .from(
          ".hero-fade",
          { y: 24, autoAlpha: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" },
          "-=0.6"
        )
        .from(".hero-canvas", { autoAlpha: 0, scale: 0.92, duration: 1.1 }, "-=0.8");
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="relative flex min-h-svh items-center overflow-hidden"
    >
      {/* Décor */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-brand-100 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 -left-32 h-80 w-80 rounded-full bg-brand-50 blur-3xl" />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-8 px-4 pt-24 pb-12 sm:px-6 lg:grid-cols-2 lg:gap-4 lg:pt-20">
        <div className="text-center lg:text-left">
          <p className="hero-fade inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-1.5 text-sm font-medium text-brand-700">
            🇲🇦 Waitlist ouverte au Maroc
          </p>
          <h1 className="font-display mt-6 text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
            <span className="block overflow-hidden">
              <span className="hero-line block">Fais décoller</span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-line block">
                ta <span className="text-brand">passion</span>.
              </span>
            </span>
          </h1>
          <p className="hero-fade mx-auto mt-6 max-w-md text-lg text-slate-500 lg:mx-0">
            AeroPlay prépare le lancement de ses avions télécommandés au Maroc.
            Choisis ton modèle, donne ton budget, et entre dans la waitlist.
          </p>
          <div className="hero-fade mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <a
              href="#avions"
              className="rounded-full bg-brand px-7 py-3.5 font-semibold text-white shadow-lg shadow-brand/25 transition hover:-translate-y-0.5 hover:bg-brand-600"
            >
              Rejoindre la waitlist
            </a>
            <a
              href="#comment-ca-marche"
              className="rounded-full border border-slate-200 bg-white px-7 py-3.5 font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-brand-300 hover:text-brand"
            >
              Comment ça marche
            </a>
          </div>
          <dl className="hero-fade mt-10 flex items-center justify-center gap-8 lg:justify-start">
            {STATS.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-2xl font-bold text-slate-900">
                  {s.value}
                </dd>
                <dd className="text-sm text-slate-400">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="hero-canvas relative -mx-6 h-[22rem] overflow-visible sm:mx-0 sm:h-[30rem] lg:-mr-10 lg:h-[36rem]">
          <PlaneScene />
        </div>
      </div>
    </section>
  );
}
