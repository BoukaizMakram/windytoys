# WindyToys.ma

Waitlist website for selling RC airplanes in Morocco. The public site does not
take purchases yet: visitors choose a model, join the waitlist, and describe
their budget/payment preference. Leads are stored in Neon Postgres and reviewed
from a protected admin dashboard.

## Stack

- Next.js 16 App Router + TypeScript
- Tailwind CSS v4
- Three.js via react-three-fiber + drei
- GSAP via @gsap/react + ScrollTrigger
- Neon Postgres via @neondatabase/serverless

## Local Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Do not commit real secrets. The waitlist API and admin dashboard need these
server-side variables:

```bash
DATABASE_URL="postgres://..."
ADMIN_USER="admin"
ADMIN_PASSWORD="change-this"
```

The table `aeroplay_waitlist` is created automatically on first submit or admin
load.

## Routes

- `/` - public waitlist site
- `/api/waitlist` - POST endpoint for waitlist submissions
- `/admin` - basic-auth protected dashboard for waitlist leads

## Deployment Notes

1. Connect the Vercel project to GitHub.
2. In Vercel, connect the Neon database named `neon-cinereous-diamond`.
3. Confirm Vercel has `DATABASE_URL` (or `POSTGRES_URL`) available to the app.
4. Add `ADMIN_USER` and `ADMIN_PASSWORD` in Vercel Project Settings.
5. Deploy from the pushed GitHub repository.

## Product Catalog

Products live in `lib/products.ts`; images live in `public/products`. Every
product requires an image, so cards never fall back to placeholder art.
