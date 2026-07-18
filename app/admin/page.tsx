import { getDatabaseUrl } from "@/lib/db";
import { listWaitlistEntries, type WaitlistEntry } from "@/lib/waitlist";
import Link from "next/link";

export const dynamic = "force-dynamic";

const PRICE_LABELS: Record<WaitlistEntry["priceFeedback"], string> = {
  good: "Prix OK",
  too_high: "Trop cher",
  need_offer: "Veut une offre",
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("fr-MA", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Africa/Casablanca",
  }).format(new Date(value));
}

function countBy(entries: WaitlistEntry[], key: keyof WaitlistEntry) {
  return entries.reduce<Record<string, number>>((acc, entry) => {
    const value = entry[key];
    if (typeof value !== "string" || !value) return acc;
    acc[value] = (acc[value] ?? 0) + 1;
    return acc;
  }, {});
}

function topList(counts: Record<string, number>) {
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
}

export default async function AdminPage() {
  let entries: WaitlistEntry[] = [];
  let error = "";

  if (!getDatabaseUrl()) {
    error = "DATABASE_URL is not configured. Connect Neon in Vercel first.";
  } else {
    try {
      entries = await listWaitlistEntries();
    } catch (caught) {
      error =
        caught instanceof Error
          ? caught.message
          : "Could not load waitlist entries.";
    }
  }

  const productCounts = topList(countBy(entries, "productName"));
  const cityCounts = topList(countBy(entries, "city"));
  const hotLeads = entries.filter((entry) => entry.priceFeedback === "good").length;

  return (
    <main className="min-h-screen bg-cloud px-4 py-8 text-slate-900 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold tracking-widest text-brand uppercase">
              AeroPlay Admin
            </p>
            <h1 className="font-display mt-2 text-4xl font-bold tracking-tight">
              Waitlist dashboard
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Dernières inscriptions stockées dans Neon.
            </p>
          </div>
          <Link
            href="/"
            className="w-fit rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand"
          >
            Retour au site
          </Link>
        </div>

        {error ? (
          <div className="mt-8 rounded-3xl border border-amber-200 bg-amber-50 p-6 text-amber-900">
            <h2 className="font-display text-xl font-bold">Configuration needed</h2>
            <p className="mt-2 text-sm leading-relaxed">{error}</p>
            <p className="mt-3 text-sm leading-relaxed">
              Required env vars: <code>DATABASE_URL</code>,{" "}
              <code>ADMIN_PASSWORD</code>. Optional: <code>ADMIN_USER</code>.
            </p>
          </div>
        ) : (
          <>
            <section className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
                <p className="text-sm font-medium text-slate-500">Total leads</p>
                <p className="font-display mt-2 text-4xl font-bold">
                  {entries.length}
                </p>
              </div>
              <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
                <p className="text-sm font-medium text-slate-500">Prix OK</p>
                <p className="font-display mt-2 text-4xl font-bold">{hotLeads}</p>
              </div>
              <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
                <p className="text-sm font-medium text-slate-500">
                  Produits demandés
                </p>
                <p className="font-display mt-2 text-4xl font-bold">
                  {productCounts.length}
                </p>
              </div>
            </section>

            <section className="mt-6 grid gap-4 lg:grid-cols-2">
              <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
                <h2 className="font-display text-xl font-bold">Top modèles</h2>
                <div className="mt-4 grid gap-3">
                  {productCounts.length ? (
                    productCounts.map(([name, count]) => (
                      <div key={name} className="flex justify-between gap-4 text-sm">
                        <span className="text-slate-600">{name}</span>
                        <span className="font-semibold text-slate-900">{count}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-slate-500">Aucune donnée.</p>
                  )}
                </div>
              </div>
              <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
                <h2 className="font-display text-xl font-bold">Top villes</h2>
                <div className="mt-4 grid gap-3">
                  {cityCounts.length ? (
                    cityCounts.map(([city, count]) => (
                      <div key={city} className="flex justify-between gap-4 text-sm">
                        <span className="text-slate-600">{city}</span>
                        <span className="font-semibold text-slate-900">{count}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-slate-500">Aucune ville saisie.</p>
                  )}
                </div>
              </div>
            </section>

            <section className="mt-6 overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
              <div className="border-b border-slate-100 p-6">
                <h2 className="font-display text-xl font-bold">
                  Inscriptions récentes
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-[1100px] text-left text-sm">
                  <thead className="bg-slate-50 text-xs font-semibold tracking-widest text-slate-500 uppercase">
                    <tr>
                      <th className="px-5 py-4">Date</th>
                      <th className="px-5 py-4">Produit</th>
                      <th className="px-5 py-4">Contact</th>
                      <th className="px-5 py-4">Ville</th>
                      <th className="px-5 py-4">Prix</th>
                      <th className="px-5 py-4">Paiement</th>
                      <th className="px-5 py-4">Note</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {entries.length ? (
                      entries.map((entry) => (
                        <tr key={entry.id} className="align-top">
                          <td className="px-5 py-4 text-slate-500">
                            {formatDate(entry.createdAt)}
                          </td>
                          <td className="px-5 py-4">
                            <p className="font-semibold text-slate-900">
                              {entry.productName}
                            </p>
                            <p className="text-xs text-slate-400">
                              {entry.targetPrice} DH
                            </p>
                          </td>
                          <td className="px-5 py-4">
                            <p className="font-semibold text-slate-900">
                              {entry.fullName || "Sans nom"}
                            </p>
                            <p className="text-slate-500">{entry.phone}</p>
                            {entry.email && (
                              <p className="text-slate-500">{entry.email}</p>
                            )}
                          </td>
                          <td className="px-5 py-4 text-slate-600">
                            {entry.city || "-"}
                          </td>
                          <td className="px-5 py-4">
                            <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                              {PRICE_LABELS[entry.priceFeedback]}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-slate-600">
                            <p>{entry.preferredPaymentMethod || "-"}</p>
                            <p className="mt-1 text-xs text-slate-400">
                              Conseil : {entry.recommendedPaymentMethod}
                            </p>
                          </td>
                          <td className="max-w-xs px-5 py-4 text-slate-600">
                            {entry.note || "-"}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={7}
                          className="px-5 py-10 text-center text-slate-500"
                        >
                          Aucune inscription pour le moment.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
}
