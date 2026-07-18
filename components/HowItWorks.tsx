import Reveal from "./Reveal";

const STEPS = [
  {
    number: "01",
    title: "Choisis ton avion",
    text: "Parcours les modèles, compare les prix et ouvre le formulaire waitlist sur celui qui te plaît.",
  },
  {
    number: "02",
    title: "Laisse tes infos",
    text: "On te demande d'abord ton téléphone, puis email, ville, préférence de paiement, budget et description.",
  },
  {
    number: "03",
    title: "On te contacte au lancement",
    text: "Tu reçois une proposition claire quand le stock est prêt. Aucun achat n'est forcé depuis le site.",
  },
];

export default function HowItWorks() {
  return (
    <section id="comment-ca-marche" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold tracking-widest text-brand uppercase">
            Comment ça marche
          </p>
          <h2 className="font-display mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Une waitlist simple, sans paiement aujourd&apos;hui
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <Reveal key={step.number} delay={i * 0.1} className="h-full">
              <div className="relative h-full overflow-hidden rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
                <span className="font-display absolute -top-3 -right-1 text-7xl font-bold text-slate-100 select-none">
                  {step.number}
                </span>
                <span className="font-display relative text-sm font-bold text-brand">
                  Étape {i + 1}
                </span>
                <h3 className="font-display relative mt-3 text-xl font-semibold text-slate-900">
                  {step.title}
                </h3>
                <p className="relative mt-3 text-sm leading-relaxed text-slate-500">
                  {step.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 text-center">
          <a
            href="#avions"
            className="inline-block rounded-full bg-brand px-8 py-4 font-semibold text-white shadow-lg shadow-brand/25 transition hover:-translate-y-0.5 hover:bg-brand-600"
          >
            Rejoindre la waitlist
          </a>
        </Reveal>
      </div>
    </section>
  );
}
