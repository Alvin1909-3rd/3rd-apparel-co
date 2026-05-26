# 3rd Apparel Co — Site

Baltimore streetwear brand. [@3rdapparelco](https://instagram.com/3rdapparelco)

**Live site:** [www.3rdapparelco.com](https://www.3rdapparelco.com)

---

## Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| Database | Supabase (PostgreSQL) |
| Storage | Supabase Storage |
| Payments | Stripe (hosted checkout) |
| Email | Resend |
| Hosting | Vercel |
| Analytics | Meta Pixel |

---

## Local Dev Setup

```bash
npm install
npm run dev
```

Site runs at `http://localhost:3000`

### Required Environment Variables

Create a `.env.local` file in the project root:

```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# Resend
RESEND_API_KEY=

# Instagram (optional — powers feed display)
INSTAGRAM_ACCESS_TOKEN=
INSTAGRAM_USER_ID=

# Admin
ADMIN_PASSWORD=

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Meta Pixel
NEXT_PUBLIC_META_PIXEL_ID=1079854902525600
```

All of these must also be set in **Vercel → Settings → Environment Variables** for production.

---

## Adding Products

Products are managed through the admin panel — no code changes needed.

1. Go to `www.3rdapparelco.com/admin`
2. Log in with the admin password
3. Click **New Product**
4. Fill in: name, slug, price, description, category, sizes, inventory quantities
5. Upload product images
6. Save — the product page at `/shop/[slug]` is live immediately

### Product Schema

| Field | Type | Notes |
|---|---|---|
| `name` | string | Display name |
| `slug` | string | URL identifier e.g. `classic-baseball-cap` |
| `price` | number | In dollars |
| `description` | string | Product description |
| `category` | string | e.g. `Apparel`, `Accessories` |
| `sizes` | string[] | e.g. `["S","M","L","XL"]` |
| `inventory` | object | e.g. `{"S":10,"M":15,"L":15}` |
| `images` | string[] | Public Supabase Storage URLs |
| `featured` | boolean | Shows on homepage if true |

---

## Checkout Flow

1. Customer adds item to cart (localStorage)
2. Goes to `/checkout` — fills in shipping info
3. Redirected to Stripe hosted checkout
4. On payment completion, Stripe fires `checkout.session.completed`
5. Webhook at `/api/webhook` receives event and:
   - Marks order status `paid` in Supabase
   - Sends confirmation email via Resend
   - Decrements product inventory

### Stripe Webhook Setup

- Endpoint: `https://www.3rdapparelco.com/api/webhook`
- Event: `checkout.session.completed`
- Copy the signing secret into `STRIPE_WEBHOOK_SECRET` in Vercel

---

## Meta Pixel

Pixel ID: `1079854902525600`

Tracked events:

| Event | Trigger |
|---|---|
| `PageView` | Every page/route change |
| `ViewContent` | Product page load |
| `AddToCart` | Add to cart button click |
| `InitiateCheckout` | Checkout page load |
| `Purchase` | Order confirmation page |

Pixel helpers are in `src/lib/pixel.ts`.

---

## Admin Panel

Located at `/admin`. Protected by `ADMIN_PASSWORD` env var.

| Route | Purpose |
|---|---|
| `/admin` | Dashboard |
| `/admin/products` | List all products |
| `/admin/products/new` | Add a new product |
| `/admin/products/[id]/edit` | Edit existing product |
| `/admin/orders` | View all orders |
| `/admin/feed` | Manage Instagram feed photos |

---

## Deployment

Hosted on Vercel. Deploys automatically on push to `main` branch on GitHub (`Alvin1909-3rd/3rd-apparel-co`).

> Vercel Hobby plan — repo must remain **public** for automatic deployments to work.
