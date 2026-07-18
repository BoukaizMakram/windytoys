const ITEMS = [
  "Waitlist gratuite",
  "Aucun paiement aujourd'hui",
  "Prix cible visible",
  "Mode de paiement conseillé",
  "Stock choisi selon la demande",
];

export default function Marquee() {
  return (
    <div className="overflow-hidden border-y border-slate-100 bg-cloud py-4">
      <div className="flex w-max animate-marquee">
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-3 pr-10 text-sm font-medium whitespace-nowrap text-slate-500"
          >
            {item}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#273fc5" aria-hidden>
              <path d="M2 12 L22 4 L16 20 L11 14 Z" />
            </svg>
          </span>
        ))}
      </div>
    </div>
  );
}
