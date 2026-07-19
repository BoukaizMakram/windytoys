"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useCart } from "@/lib/cart";

const SECTIONS = ["avions", "pourquoi", "faq"] as const;

type SectionId = "accueil" | (typeof SECTIONS)[number];

const iconProps = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.9,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const LINKS: { id: SectionId; label: string; href: string; icon: ReactNode }[] =
  [
    {
      id: "accueil",
      label: "Accueil",
      href: "#",
      icon: (
        <svg {...iconProps}>
          <path d="M3 10.5 12 3l9 7.5" />
          <path d="M5 9.5V21h5v-6h4v6h5V9.5" />
        </svg>
      ),
    },
    {
      id: "avions",
      label: "Avions",
      href: "#avions",
      icon: (
        <svg {...iconProps}>
          <path d="M2 12 22 4l-6 16-5-6z" />
          <path d="M11 14l11-10" />
        </svg>
      ),
    },
    {
      id: "pourquoi",
      label: "Pourquoi",
      href: "#pourquoi",
      icon: (
        <svg {...iconProps}>
          <path d="M12 20.5s-7.5-4.6-9.3-9A5.2 5.2 0 0 1 12 6.6a5.2 5.2 0 0 1 9.3 4.9c-1.8 4.4-9.3 9-9.3 9Z" />
        </svg>
      ),
    },
    {
      id: "faq",
      label: "FAQ",
      href: "#faq",
      icon: (
        <svg {...iconProps}>
          <circle cx="12" cy="12" r="9" />
          <path d="M9.6 9.2a2.4 2.4 0 1 1 3.4 2.6c-.8.4-1 .9-1 1.7" />
          <path d="M12 16.8h.01" />
        </svg>
      ),
    },
  ];

export default function BottomNav() {
  const { count, setOpen } = useCart();
  const [active, setActive] = useState<SectionId>("accueil");

  useEffect(() => {
    let raf = 0;

    const update = () => {
      raf = 0;
      const center = window.innerHeight / 2;
      let current: SectionId = "accueil";
      for (const id of SECTIONS) {
        const section = document.getElementById(id);
        if (!section) continue;
        const rect = section.getBoundingClientRect();
        if (rect.top <= center && rect.bottom >= center) {
          current = id;
          break;
        }
      }
      setActive(current);
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <nav
      aria-label="Navigation rapide"
      className="fixed inset-x-0 bottom-0 z-40 px-4 pb-4 [padding-bottom:max(1rem,env(safe-area-inset-bottom))] sm:px-6"
    >
      <div className="mx-auto flex w-max items-center gap-1 rounded-full bg-white p-2 shadow-xl shadow-slate-900/15">
        {LINKS.map((link) => {
          const isActive = active === link.id;
          return (
            <a
              key={link.id}
              href={link.href}
              aria-current={isActive ? "true" : undefined}
              className={`flex h-11 items-center rounded-full px-3 transition-colors duration-300 ${
                isActive
                  ? "bg-cloud text-brand"
                  : "text-slate-500 hover:text-brand"
              }`}
            >
              {link.icon}
              <span
                className={`overflow-hidden text-sm font-semibold whitespace-nowrap text-slate-900 transition-all duration-300 ${
                  isActive ? "ml-2 max-w-24 opacity-100" : "ml-0 max-w-0 opacity-0"
                }`}
              >
                {link.label}
              </span>
            </a>
          );
        })}

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={`Ouvrir le panier (${count} article${count > 1 ? "s" : ""})`}
          className="relative flex h-11 w-11 items-center justify-center rounded-full text-slate-500 transition-colors duration-300 hover:text-brand"
        >
          <svg {...iconProps}>
            <path d="M5 8h14l-1.2 12H6.2L5 8Z" />
            <path d="M9 8a3 3 0 0 1 6 0" />
          </svg>
          {count > 0 && (
            <span className="absolute top-0.5 right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand px-1 text-[10px] font-bold text-white">
              {count}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}
