# Family Screen

Family send photos, videos and messages from their phones; they play on the TV in a rest home room.

## Pages

| Address | Who | What |
| --- | --- | --- |
| `resthome.<brand>.nz` | Public | Homepage, pricing, sign-up (`/start`), `/privacy`, `/terms` |
| `<name>.resthome.<brand>.nz/tv?k=…` | The TV | Full-screen player: new messages first with a chime, then a loop; clock; quiet hours |
| `<name>…/send?c=…` | Family | Phone page to send photos, a video (up to 90 s) or a message |
| `<name>…/family` | Whoever set it up | Approve people, remove messages, settings, links, QR card, subscription |
| `<name>…/card` | Owner | Printable QR card |

Without `SCREENS_DOMAIN` set, every screen also works at `/s/<name>/…` (handy on a `vercel.app` address).

## Deploy

1. **Database.** Run `sql/schema.sql` in the SQL editor of your Neon/Supabase database.
   Using the same database as the admin is fine: these tables start with `fs_`.
2. **GitHub.** Push this folder to a new private repo (`family-screen`).
3. **Vercel.** New Project → import the repo. Add every variable from `.env.example`.
4. **Storage.** Vercel project → Storage → Create → **Blob** → connect it to this project.
   That adds `BLOB_READ_WRITE_TOKEN` for you. Redeploy.
5. **Stripe.**
   - Products → add "Family Screen" with two recurring prices (monthly and yearly, NZD).
     Put their IDs in `STRIPE_PRICE_MONTHLY` / `STRIPE_PRICE_YEARLY`.
   - Settings → Billing → Customer portal → turn it on (lets families cancel or change card).
   - Developers → Webhooks → add `https://resthome.<brand>.nz/api/stripe/webhook` with
     `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`.
     Its signing secret goes in `STRIPE_WEBHOOK_SECRET`.
   - Also add both price IDs to the admin's Products → Resthome TV (code `resthome`).
6. **Domains.** In the Vercel project add `resthome.<brand>.nz` **and** `*.resthome.<brand>.nz`.
   The wildcard needs the domain's nameservers pointed at Vercel.
7. **Email.** Create a Resend account, verify your domain, set `RESEND_API_KEY` and `FROM_EMAIL`.
8. **Admin.** Copy `HQ_URL`, `HQ_PRODUCT`, `HQ_SECRET` from the admin's Products → Resthome TV (code `resthome`),
   and set the app address there to `https://resthome.<brand>.nz`. Set the product to Live when ready.
9. **Test** with a Stripe test card (4242 4242 4242 4242): sign up, open the TV link on a laptop,
   send a photo from your phone, approve yourself, watch it play.

## How it behaves on the TV

- Checks for new messages every 20 seconds. New ones play first (with a chime) and show "New".
- Otherwise loops the 60 most recent items: photos 12 s, messages longer if they're long, videos play through.
- Quiet hours (default 8pm to 7am) show only a dim clock.
- Keeps playing saved content if the wifi drops (amber dot top-left means reconnecting).
- Reloads itself at 3am, keeps the screen awake where the browser allows, and checks in with the admin every 5 minutes.
- "Press OK to start" unlocks sound; it starts silently by itself after 30 seconds.

## Housekeeping (daily cron)

Keeps each screen's newest 200 items and deletes older files, clears unfinished sign-ups, and reports storage to the admin.

## Before launch

Have the privacy and terms pages checked, and set `SUPPORT_EMAIL` so rest homes can reach you.
