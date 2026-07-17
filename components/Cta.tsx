import Reveal from "./Reveal";

export default function Cta() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 px-6 py-16 text-center sm:px-16 sm:py-20">
            <div className="pointer-events-none absolute -top-20 -left-20 h-64 w-64 rounded-full bg-sky-500/20 blur-3xl" />
            <div className="pointer-events-none absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-orange-500/20 blur-3xl" />

            <h2 className="font-display relative text-3xl font-bold tracking-tight text-white sm:text-5xl">
              Réserve ta place avant le lancement
            </h2>
            <p className="relative mx-auto mt-4 max-w-md text-slate-300">
              Donne-nous le modèle que tu veux, ton téléphone et ton budget. On
              préparera le stock selon la vraie demande au Maroc.
            </p>
            <a
              href="#avions"
              className="relative mt-8 inline-block rounded-full bg-orange-500 px-8 py-4 font-semibold text-white shadow-lg shadow-orange-500/25 transition hover:-translate-y-0.5 hover:bg-orange-600"
            >
              Choisir un avion
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
