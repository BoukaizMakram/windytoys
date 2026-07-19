import { createWaitlistEntry, parseWaitlistInput } from "@/lib/waitlist";
import { getPaymentRecommendation } from "@/lib/payment";
import { PRODUCTS } from "@/lib/products";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const data =
      payload && typeof payload === "object"
        ? (payload as Record<string, unknown>)
        : {};
    const requestedProductId = String(data.productId ?? "");
    const product = PRODUCTS.find((item) => item.id === requestedProductId);

    // "panier" = commande groupée depuis le panier : le nom et le total
    // viennent du client, le détail des articles est dans la note.
    const isCartOrder = requestedProductId === "panier";

    if (!product && !isCartOrder) {
      return Response.json(
        { ok: false, message: "Produit introuvable" },
        { status: 400 }
      );
    }

    const productName = product ? product.name : String(data.productName ?? "");
    const targetPrice = product ? product.price : Number(data.targetPrice);

    const input = parseWaitlistInput({
      ...data,
      productId: product ? product.id : "panier",
      productName,
      targetPrice,
      recommendedPaymentMethod: getPaymentRecommendation(targetPrice),
      userAgent: request.headers.get("user-agent") ?? undefined,
    });
    const entry = await createWaitlistEntry(input);

    return Response.json({
      ok: true,
      entry,
      message: "Tu as été ajouté à notre waitlist.",
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Impossible d'ajouter à la waitlist";
    const status = message.includes("DATABASE_URL") ? 503 : 400;

    return Response.json({ ok: false, message }, { status });
  }
}
