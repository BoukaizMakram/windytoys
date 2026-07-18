import { CONTACT_EMAIL, NAV_LINKS } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-cloud">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-display text-xl font-bold tracking-tight">
            Aero<span className="text-brand">Play</span>
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
            <li>
              <a
                href="/admin"
                className="text-sm text-slate-500 transition hover:text-brand"
              >
                Admin
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold tracking-widest text-slate-900 uppercase">
            Contact
          </p>
          <ul className="mt-4 flex flex-col gap-2.5 text-sm text-slate-500">
            <li>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="transition hover:text-brand"
              >
                {CONTACT_EMAIL}
              </a>
            </li>
            <li className="flex gap-4 pt-1">
              <a href="#" className="transition hover:text-brand">
                Instagram
              </a>
              <a href="#" className="transition hover:text-brand">
                TikTok
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-100">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-sm text-slate-400 sm:flex-row sm:px-6">
          <p>© {new Date().getFullYear()} AeroPlay.ma — Tous droits réservés</p>
          <p>Construit au Maroc</p>
        </div>
      </div>
    </footer>
  );
}
