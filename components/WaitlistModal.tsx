"use client";

import {
  type ChangeEvent,
  type FormEvent,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Product } from "@/lib/products";
import { getPaymentRecommendation } from "@/lib/payment";

type WaitlistModalProps = {
  product: Product;
  onClose: () => void;
};

type SubmitState = "idle" | "submitting" | "success" | "error";

const PAYMENT_OPTIONS = [
  "Paiement à la livraison",
  "Acompte puis reste à la livraison",
  "Virement bancaire",
  "Cash Plus / Wafacash",
  "Je veux votre conseil",
];

const PRICE_FEEDBACK = [
  { value: "good", label: "Le prix me va" },
  { value: "too_high", label: "Un peu cher" },
  { value: "need_offer", label: "Je veux une offre" },
] as const;

export default function WaitlistModal({
  product,
  onClose,
}: WaitlistModalProps) {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    phone: "",
    fullName: "",
    email: "",
    city: "",
    preferredPaymentMethod: getPaymentRecommendation(product.price),
    priceFeedback: "good",
    note: "",
  });

  const recommendation = useMemo(
    () => (product ? getPaymentRecommendation(product.price) : ""),
    [product]
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  const updateField =
    (field: keyof typeof form) =>
    (
      event:
        | ChangeEvent<HTMLInputElement>
        | ChangeEvent<HTMLSelectElement>
        | ChangeEvent<HTMLTextAreaElement>
    ) => {
      setForm((current) => ({ ...current, [field]: event.target.value }));
    };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitState("submitting");
    setError("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
          productName: product.name,
          targetPrice: product.price,
          recommendedPaymentMethod: recommendation,
          ...form,
        }),
      });

      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(data.message ?? "Impossible d'ajouter à la waitlist");
      }

      setSubmitState("success");
    } catch (caught) {
      setSubmitState("error");
      setError(
        caught instanceof Error
          ? caught.message
          : "Impossible d'ajouter à la waitlist"
      );
    }
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center bg-slate-950/45 px-3 backdrop-blur-sm sm:items-center sm:px-6">
      <button
        type="button"
        aria-label="Fermer"
        className="absolute inset-0 cursor-default"
        onClick={onClose}
      />

      <div className="relative max-h-[92svh] w-full max-w-2xl overflow-y-auto rounded-t-[2rem] bg-white shadow-2xl shadow-slate-950/20 sm:rounded-[2rem]">
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-slate-100 bg-white/95 px-5 py-5 backdrop-blur sm:px-7">
          <div>
            <p className="text-xs font-semibold tracking-widest text-brand uppercase">
              Waitlist AeroPlay
            </p>
            <h2 className="font-display mt-1 text-2xl font-bold text-slate-900">
              {product.name}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Prix cible : {product.price} DH
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xl leading-none text-slate-600 transition hover:bg-slate-200"
            aria-label="Fermer la waitlist"
          >
            ×
          </button>
        </div>

        {submitState === "success" ? (
          <div className="px-5 py-10 text-center sm:px-10">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-2xl text-emerald-600">
              ✓
            </div>
            <h3 className="font-display mt-5 text-2xl font-bold text-slate-900">
              Tu as été ajouté à notre waitlist.
            </h3>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-500">
              On a sauvegardé ton numéro, tes préférences et ta note. Dès que le
              stock est prêt, AeroPlay te contacte avec l’option de paiement la
              plus simple pour toi.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-7 rounded-full bg-slate-900 px-7 py-3 text-sm font-semibold text-white transition hover:bg-brand"
            >
              Voir les autres avions
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="grid gap-5 px-5 py-6 sm:px-7">
            <div className="rounded-2xl bg-brand-50 p-4">
              <p className="text-sm font-semibold text-slate-900">
                Mode conseillé pour toi
              </p>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">
                {recommendation}. On te confirmera les détails avant toute
                réservation.
              </p>
            </div>

            <label className="grid gap-2">
              <span className="text-sm font-semibold text-slate-800">
                Téléphone WhatsApp
              </span>
              <input
                required
                inputMode="tel"
                autoComplete="tel"
                placeholder="+212 6 00 00 00 00"
                value={form.phone}
                onChange={updateField("phone")}
                className="rounded-2xl border border-slate-200 px-4 py-3 text-slate-900 outline-none transition focus:border-brand-400 focus:ring-4 focus:ring-brand-100"
              />
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-slate-800">Nom</span>
                <input
                  autoComplete="name"
                  placeholder="Ton nom"
                  value={form.fullName}
                  onChange={updateField("fullName")}
                  className="rounded-2xl border border-slate-200 px-4 py-3 text-slate-900 outline-none transition focus:border-brand-400 focus:ring-4 focus:ring-brand-100"
                />
              </label>
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-slate-800">
                  Email
                </span>
                <input
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="toi@email.com"
                  value={form.email}
                  onChange={updateField("email")}
                  className="rounded-2xl border border-slate-200 px-4 py-3 text-slate-900 outline-none transition focus:border-brand-400 focus:ring-4 focus:ring-brand-100"
                />
              </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-slate-800">Ville</span>
                <input
                  autoComplete="address-level2"
                  placeholder="Casablanca, Rabat..."
                  value={form.city}
                  onChange={updateField("city")}
                  className="rounded-2xl border border-slate-200 px-4 py-3 text-slate-900 outline-none transition focus:border-brand-400 focus:ring-4 focus:ring-brand-100"
                />
              </label>
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-slate-800">
                  Paiement préféré
                </span>
                <select
                  value={form.preferredPaymentMethod}
                  onChange={updateField("preferredPaymentMethod")}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-brand-400 focus:ring-4 focus:ring-brand-100"
                >
                  {PAYMENT_OPTIONS.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </label>
            </div>

            <fieldset className="grid gap-2">
              <legend className="text-sm font-semibold text-slate-800">
                Le prix est bon pour toi ?
              </legend>
              <div className="grid gap-2 sm:grid-cols-3">
                {PRICE_FEEDBACK.map((option) => (
                  <label
                    key={option.value}
                    className="flex cursor-pointer items-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 transition has-[:checked]:border-brand-400 has-[:checked]:bg-brand-50 has-[:checked]:text-brand-700"
                  >
                    <input
                      type="radio"
                      name="priceFeedback"
                      value={option.value}
                      checked={form.priceFeedback === option.value}
                      onChange={updateField("priceFeedback")}
                      className="h-4 w-4 accent-brand"
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            </fieldset>

            <label className="grid gap-2">
              <span className="text-sm font-semibold text-slate-800">
                Décris ce que tu veux
              </span>
              <textarea
                rows={4}
                placeholder="Exemple : je veux un avion facile pour débuter, pièces de rechange, budget max 700 DH..."
                value={form.note}
                onChange={updateField("note")}
                className="resize-none rounded-2xl border border-slate-200 px-4 py-3 text-slate-900 outline-none transition focus:border-brand-400 focus:ring-4 focus:ring-brand-100"
              />
            </label>

            {error && (
              <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitState === "submitting"}
              className="rounded-full bg-brand px-7 py-4 font-semibold text-white shadow-lg shadow-brand/25 transition hover:-translate-y-0.5 hover:bg-brand-600 disabled:cursor-wait disabled:opacity-60"
            >
              {submitState === "submitting"
                ? "Ajout en cours..."
                : "Rejoindre la waitlist"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
