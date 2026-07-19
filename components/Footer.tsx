import { NAV_LINKS } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200/70">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-14 sm:px-6 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="font-logo text-3xl font-normal">
            Windy<span className="text-brand">Toys</span>
            <span className="text-slate-400">.ma</span>
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-500">
            Une waitlist pour lancer les avions télécommandés que les pilotes
            marocains veulent vraiment.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold tracking-widest text-slate-900 uppercase">
            Navigation
          </p>
          <ul className="mt-4 flex flex-col gap-2.5">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-slate-500 transition hover:text-brand"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-200/70">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 pt-6 pb-24 text-sm text-slate-400 sm:flex-row sm:px-6">
          <p>© {new Date().getFullYear()} WindyToys.ma — Tous droits réservés</p>
          <p>Construit au Maroc</p>
        </div>
      </div>
    </footer>
  );
}
