# Flowy - Flower Shop

Flowy is a small online flower shop. You can browse bouquets, add them to a cart, log in with Google and pay with a Stripe test card. I made it as an educational project to learn how a full stack e-commerce app works with Next.js.

Live demo: https://ecommerce-ikboljonme.vercel.app

## Features

- Product list, product page and "similar flowers" section
- Search products by name (live results while you type)
- Cart saved in the browser (localStorage)
- Login with Google (Supabase Auth)
- Save and update your shipping address
- Checkout with Stripe card payment (prices in PLN)
- Order history page
- Protected pages (checkout, address, orders) for logged in users only

## Built with

- Next.js 13 (app router) and React
- Tailwind CSS
- Supabase (Google login and Postgres database)
- Prisma
- Stripe
- Deployed on Vercel

## How to run

You need Node.js 18+, a Supabase project (with Google login turned on) and a Stripe account in test mode.

```bash
git clone https://github.com/IkboljonMe/flowy-flower-shop.git
cd flowy-flower-shop
npm install
cp .env.example .env
# fill in the values in .env (see below)
npx prisma migrate deploy
npx prisma db seed
npm run dev
```

Then open http://localhost:3000.

To pay, use the Stripe test card `4242 4242 4242 4242` with any future date and any CVC.

## Environment variables

| Name | What it is |
| --- | --- |
| `NEXT_PUBLIC_STRIPE_PK_KEY` | Stripe publishable key (`pk_test_...`) |
| `STRIPE_SK_KEY` | Stripe secret key (`sk_test_...`), only used on the server |
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon (public) key |
| `DATABASE_URL` | Postgres connection string for Prisma (I used the Supabase database) |
| `NEXT_PUBLIC_SITE_URL` | Optional. Your site URL in production, used for the login redirect |

In Supabase, add `http://localhost:3000/auth/callback` (and your production URL + `/auth/callback`) to the allowed redirect URLs.

## Structure

```
app/
  api/          API routes (products, address, orders, stripe)
  auth/         login page and auth callback
  components/   UI parts (product card, cart item, ...)
  context/      user and cart state
  hooks/        small helpers for address and loading
  layouts/      header, top menu, footer
  (pages)       home, product, cart, checkout, orders, address, about
prisma/         database schema, migration and seed data
middleware.js   redirects to login for protected pages
```

## Notes

- The cart total is shown in the browser, but the real amount for Stripe is always calculated on the server from the prices in the database.
- Product images are from [bunchovflowers.pl](https://bunchovflowers.pl/en/). This shop is not real, it is only for learning.

## Credits

I started from the [Full Stack eBay Clone tutorial by John Weeks](https://www.youtube.com/watch?v=LtPYuFhYf1w) ([code](https://github.com/John-Weeks-Dev/ebay-clone)) and then changed it into a flower shop with my own design, products and pages.

---

Made by [IkboljonMe](https://github.com/IkboljonMe)
