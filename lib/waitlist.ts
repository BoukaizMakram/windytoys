import { getSql } from "./db";
import { getPaymentRecommendation } from "./payment";

export type PriceFeedback = "good" | "too_high" | "need_offer";

export type WaitlistInput = {
  productId: string;
  productName: string;
  targetPrice: number;
  phone: string;
  fullName?: string;
  email?: string;
  city?: string;
  recommendedPaymentMethod: string;
  preferredPaymentMethod?: string;
  priceFeedback: PriceFeedback;
  note?: string;
  userAgent?: string;
};

export type WaitlistEntry = {
  id: number;
  createdAt: string;
  updatedAt: string;
  productId: string;
  productName: string;
  targetPrice: number;
  phone: string;
  fullName: string | null;
  email: string | null;
  city: string | null;
  recommendedPaymentMethod: string;
  preferredPaymentMethod: string | null;
  priceFeedback: PriceFeedback;
  note: string | null;
  status: string;
};

type WaitlistRow = {
  id: number;
  created_at: string;
  updated_at: string;
  product_id: string;
  product_name: string;
  target_price: number;
  phone: string;
  full_name: string | null;
  email: string | null;
  city: string | null;
  recommended_payment_method: string;
  preferred_payment_method: string | null;
  price_feedback: PriceFeedback;
  note: string | null;
  status: string;
};

function cleanText(value: unknown, maxLength: number) {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  return trimmed.slice(0, maxLength);
}

function cleanRequiredText(value: unknown, field: string, maxLength: number) {
  const cleaned = cleanText(value, maxLength);
  if (!cleaned) {
    throw new Error(`${field} is required`);
  }
  return cleaned;
}

function normalizePhone(phone: string) {
  return phone.replace(/[^\d+]/g, "").slice(0, 24);
}

export function parseWaitlistInput(payload: unknown): WaitlistInput {
  if (!payload || typeof payload !== "object") {
    throw new Error("Invalid payload");
  }

  const data = payload as Record<string, unknown>;
  const targetPrice = Number(data.targetPrice);
  const priceFeedback = data.priceFeedback;

  if (!Number.isInteger(targetPrice) || targetPrice < 0 || targetPrice > 100000) {
    throw new Error("targetPrice is invalid");
  }

  if (
    priceFeedback !== "good" &&
    priceFeedback !== "too_high" &&
    priceFeedback !== "need_offer"
  ) {
    throw new Error("priceFeedback is invalid");
  }

  const phone = normalizePhone(cleanRequiredText(data.phone, "phone", 32));
  const email = cleanRequiredText(data.email, "email", 160).toLowerCase();

  if (phone.length < 9) {
    throw new Error("phone is too short");
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("email is invalid");
  }

  return {
    productId: cleanRequiredText(data.productId, "productId", 80),
    productName: cleanRequiredText(data.productName, "productName", 160),
    targetPrice,
    phone,
    fullName: cleanText(data.fullName, 120),
    email,
    city: cleanText(data.city, 80),
    recommendedPaymentMethod:
      cleanText(data.recommendedPaymentMethod, 160) ??
      getPaymentRecommendation(targetPrice),
    preferredPaymentMethod: cleanText(data.preferredPaymentMethod, 160),
    priceFeedback,
    note: cleanText(data.note, 1000),
    userAgent: cleanText(data.userAgent, 240),
  };
}

export async function ensureWaitlistTable() {
  const sql = getSql();

  await sql`
    create table if not exists aeroplay_waitlist (
      id bigserial primary key,
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now(),
      product_id text not null,
      product_name text not null,
      target_price integer not null,
      phone text not null,
      full_name text,
      email text,
      city text,
      recommended_payment_method text not null,
      preferred_payment_method text,
      price_feedback text not null,
      note text,
      status text not null default 'new',
      user_agent text
    )
  `;

  await sql`
    create unique index if not exists aeroplay_waitlist_phone_product_idx
      on aeroplay_waitlist (phone, product_id)
  `;

  await sql`
    create index if not exists aeroplay_waitlist_created_at_idx
      on aeroplay_waitlist (created_at desc)
  `;
}

function mapRow(row: WaitlistRow): WaitlistEntry {
  return {
    id: row.id,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    productId: row.product_id,
    productName: row.product_name,
    targetPrice: row.target_price,
    phone: row.phone,
    fullName: row.full_name,
    email: row.email,
    city: row.city,
    recommendedPaymentMethod: row.recommended_payment_method,
    preferredPaymentMethod: row.preferred_payment_method,
    priceFeedback: row.price_feedback,
    note: row.note,
    status: row.status,
  };
}

export async function createWaitlistEntry(input: WaitlistInput) {
  await ensureWaitlistTable();
  const sql = getSql();

  const rows = await sql`
    insert into aeroplay_waitlist (
      product_id,
      product_name,
      target_price,
      phone,
      full_name,
      email,
      city,
      recommended_payment_method,
      preferred_payment_method,
      price_feedback,
      note,
      user_agent
    )
    values (
      ${input.productId},
      ${input.productName},
      ${input.targetPrice},
      ${input.phone},
      ${input.fullName ?? null},
      ${input.email ?? null},
      ${input.city ?? null},
      ${input.recommendedPaymentMethod},
      ${input.preferredPaymentMethod ?? null},
      ${input.priceFeedback},
      ${input.note ?? null},
      ${input.userAgent ?? null}
    )
    on conflict (phone, product_id) do update set
      updated_at = now(),
      product_name = excluded.product_name,
      target_price = excluded.target_price,
      full_name = excluded.full_name,
      email = excluded.email,
      city = excluded.city,
      recommended_payment_method = excluded.recommended_payment_method,
      preferred_payment_method = excluded.preferred_payment_method,
      price_feedback = excluded.price_feedback,
      note = excluded.note,
      user_agent = excluded.user_agent
    returning
      id,
      created_at,
      updated_at,
      product_id,
      product_name,
      target_price,
      phone,
      full_name,
      email,
      city,
      recommended_payment_method,
      preferred_payment_method,
      price_feedback,
      note,
      status
  `;

  const typedRows = rows as unknown as WaitlistRow[];
  return mapRow(typedRows[0]);
}

export async function listWaitlistEntries() {
  await ensureWaitlistTable();
  const sql = getSql();

  const rows = await sql`
    select
      id,
      created_at,
      updated_at,
      product_id,
      product_name,
      target_price,
      phone,
      full_name,
      email,
      city,
      recommended_payment_method,
      preferred_payment_method,
      price_feedback,
      note,
      status
    from aeroplay_waitlist
    order by created_at desc
    limit 500
  `;

  return (rows as unknown as WaitlistRow[]).map(mapRow);
}
