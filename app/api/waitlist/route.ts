import { createWaitlistEntry, parseWaitlistInput } from "@/lib/waitlist";
import { getPaymentRecommendation } from "@/lib/payment";
import { PRODUCTS } from "@/lib/products";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const requestedProductId =
      payload && typeof payload === "object" && "productId" in payload
        ? String(payload.productId)
        : "";
    const product = PRODUCTS.find((item) => item.id === requestedProductId);

    if (!product) {
      return Response.json(
        { ok: false, message: "Produit introuvable" },
        { status: 400 }
      );
    }

    const input = parseWaitlistInput({
      ...payload,
      productId: product.id,
      productName: product.name,
      targetPrice: product.price,
      recommendedPaymentMethod: getPaymentRecommendation(product.price),
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
