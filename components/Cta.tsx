import Reveal from "./Reveal";

export default function Cta() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-brand px-6 py-16 text-center sm:px-16 sm:py-20">
            <div className="pointer-events-none absolute -top-20 -left-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <div className="pointer-events-none absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-brand-900/50 blur-3xl" />

            <span className="relative inline-flex items-center rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium text-white">
              Offre de lancement
            </span>
            <h2 className="font-display relative mt-5 text-3xl font-bold tracking-tight text-white sm:text-5xl">
              Réserve ta place avant le lancement
            </h2>
            <p className="relative mx-auto mt-4 max-w-md text-brand-100">
              Donne-nous le modèle que tu veux, ton téléphone et ton budget. On
              préparera le stock selon la vraie demande au Maroc.
            </p>
            <a
              href="#avions"
              className="relative mt-8 inline-flex items-center gap-3 rounded-full bg-slate-900 py-2.5 pr-2.5 pl-7 font-semibold text-white transition hover:bg-slate-800"
            >
              Choisir un avion
              <span
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-900"
                aria-hidden
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 17 17 7M9 7h8v8" />
                </svg>
              </span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
