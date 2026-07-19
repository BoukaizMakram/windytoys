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
  product: Pick<Product, "id" | "name" | "price">;
  onClose: () => void;
  /** Note pré-remplie (ex. récapitulatif du panier). */
  defaultNote?: string;
  /** Appelé après une inscription réussie (ex. vider le panier). */
  onSuccess?: () => void;
};

type Step = "contact" | "payment";

type SubmitState = "idle" | "submitting" | "success" | "error";

const PAYMENT_OPTIONS = [
  "Paiement à la livraison",
  "Acompte puis reste à la livraison",
  "Virement bancaire",
  "Cash Plus / Wafacash",
  "Je veux votre conseil",
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function WaitlistModal({
  product,
  onClose,
  defaultNote,
  onSuccess,
}: WaitlistModalProps) {
  const [step, setStep] = useState<Step>("contact");
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    phone: "",
    email: "",
    preferredPaymentMethod:
      product.price >= 1200
        ? "Acompte puis reste à la livraison"
        : "Paiement à la livraison",
  });

  const recommendation = useMemo(
    () => getPaymentRecommendation(product.price),
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
    (field: keyof typeof form) => (event: ChangeEvent<HTMLInputElement>) => {
      setForm((current) => ({ ...current, [field]: event.target.value }));
    };

  const hasValidContact =
    form.phone.replace(/\D/g, "").length >= 9 ||
    EMAIL_REGEX.test(form.email.trim());

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (step === "contact") {
      if (!hasValidContact) {
        setError(
          "Laisse au moins un numéro de téléphone (9 chiffres min) ou un email valide."
        );
        return;
      }
      setStep("payment");
      return;
    }

    setSubmitState("submitting");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
          productName: product.name,
          targetPrice: product.price,
          recommendedPaymentMethod: recommendation,
          note: defaultNote,
          ...form,
        }),
      });

      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(data.message ?? "Impossible d'ajouter à la waitlist");
      }

      setSubmitState("success");
      onSuccess?.();
    } catch (caught) {
      setSubmitState("error");
      setError(
        caught instanceof Error
          ? caught.message
          : "Impossible d'ajouter à la waitlist"
      );
    }
  }

  const stepNumber = step === "contact" ? 1 : 2;

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center bg-slate-950/45 px-3 backdrop-blur-sm sm:items-center sm:px-6">
      <button
        type="button"
        aria-label="Fermer"
        className="absolute inset-0 cursor-default"
        onClick={onClose}
      />

      <div className="relative max-h-[92svh] w-full max-w-xl overflow-y-auto rounded-t-[2rem] bg-white shadow-2xl shadow-slate-950/20 sm:rounded-[2rem]">
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-slate-100 bg-white/95 px-5 py-5 backdrop-blur sm:px-7">
          <div>
            <p className="text-xs font-semibold tracking-widest text-brand uppercase">
              Waitlist WindyToys
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
              Merci, c&apos;est noté !
            </h3>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-500">
              Ton choix est enregistré. L&apos;équipe WindyToys te contacte très
              vite pour confirmer les détails — et rappel : tu n&apos;as rien
              payé aujourd&apos;hui.
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
            {/* Indicateur d'étape */}
            <div className="grid gap-2">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-900">
                  {step === "contact"
                    ? "Tes coordonnées"
                    : "Ton paiement préféré"}
                </span>
                <span className="text-slate-400">Étape {stepNumber} sur 2</span>
              </div>
              <div className="flex gap-1.5">
                <span className="h-1.5 flex-1 rounded-full bg-brand" />
                <span
                  className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                    step === "payment" ? "bg-brand" : "bg-slate-100"
                  }`}
                />
              </div>
            </div>

            {step === "contact" ? (
              <>
                <p className="text-sm leading-relaxed text-slate-500">
                  Laisse ton téléphone <strong>ou</strong> ton email (ou les
                  deux) pour qu&apos;on te contacte au lancement.
                </p>

                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-slate-800">
                    Téléphone WhatsApp
                  </span>
                  <input
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="+212 6 00 00 00 00"
                    value={form.phone}
                    onChange={updateField("phone")}
                    className="rounded-2xl border border-slate-200 px-4 py-3 text-slate-900 outline-none transition focus:border-brand-400 focus:ring-4 focus:ring-brand-100"
                  />
                </label>

                <div className="flex items-center gap-3 text-xs font-semibold text-slate-400">
                  <span className="h-px flex-1 bg-slate-100" />
                  ou
                  <span className="h-px flex-1 bg-slate-100" />
                </div>

                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-slate-800">
                    Email
                  </span>
                  <input
                    type="email"
                    autoComplete="email"
                    placeholder="toi@email.com"
                    value={form.email}
                    onChange={updateField("email")}
                    className="rounded-2xl border border-slate-200 px-4 py-3 text-slate-900 outline-none transition focus:border-brand-400 focus:ring-4 focus:ring-brand-100"
                  />
                </label>

                {error && (
                  <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  className="rounded-full bg-brand px-7 py-4 font-semibold text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={!hasValidContact}
                >
                  Continuer
                </button>
              </>
            ) : (
              <>
                <div className="rounded-2xl bg-emerald-50 p-4">
                  <p className="text-sm font-semibold text-emerald-800">
                    🔒 Aucun paiement aujourd&apos;hui
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-emerald-700">
                    Cette préférence nous aide seulement à préparer ta
                    proposition. Tu ne payes rien maintenant, et rien n&apos;est
                    engageant.
                  </p>
                </div>

                <fieldset className="grid gap-2">
                  <legend className="mb-2 text-sm font-semibold text-slate-800">
                    Comment tu préfères payer au lancement ?
                  </legend>
                  {PAYMENT_OPTIONS.map((option) => (
                    <label
                      key={option}
                      className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 transition has-[:checked]:border-brand-400 has-[:checked]:bg-brand-50 has-[:checked]:text-brand-700"
                    >
                      <input
                        type="radio"
                        name="preferredPaymentMethod"
                        value={option}
                        checked={form.preferredPaymentMethod === option}
                        onChange={updateField("preferredPaymentMethod")}
                        className="h-4 w-4 accent-brand"
                      />
                      <span className="flex-1">{option}</span>
                      {recommendation.startsWith(option.split(" ")[0]) && (
                        <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-semibold text-brand-700">
                          Conseillé
                        </span>
                      )}
                    </label>
                  ))}
                </fieldset>

                {error && (
                  <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">
                    {error}
                  </p>
                )}

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setError("");
                      setStep("contact");
                    }}
                    className="rounded-full border border-slate-200 px-6 py-4 text-sm font-semibold text-slate-600 transition hover:border-brand-300 hover:text-brand"
                  >
                    Retour
                  </button>
                  <button
                    type="submit"
                    disabled={submitState === "submitting"}
                    className="flex-1 rounded-full bg-brand px-7 py-4 font-semibold text-white transition hover:bg-brand-600 disabled:cursor-wait disabled:opacity-60"
                  >
                    {submitState === "submitting"
                      ? "Enregistrement..."
                      : "Confirmer ma place"}
                  </button>
                </div>
              </>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
