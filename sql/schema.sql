-- Family Screen tables. Run once in your Neon / Supabase SQL editor.
-- They're prefixed fs_ so they can share a database with the admin. Safe to re-run.

create table if not exists fs_screens (
  slug                   text primary key,               -- grandpa-joe
  resident_name          text not null,                  -- shown on the TV: "Grandpa Joe"
  owner_name             text not null,
  owner_email            text not null,
  status                 text not null default 'pending',-- pending | active | lapsed | disabled
  plan                   text not null default 'yearly', -- monthly | yearly
  stripe_customer_id     text,
  stripe_subscription_id text,
  checkout_session_id    text,
  owner_token            text not null,                  -- family admin link
  invite_code            text not null,                  -- in the QR / send link
  tv_key                 text not null,                  -- in the TV link
  require_approval       boolean not null default true,  -- new senders need approving
  chime                  boolean not null default true,
  quiet_start            int not null default 20,        -- hour, 24h clock
  quiet_end              int not null default 7,
  timezone               text not null default 'Pacific/Auckland',
  last_seen_at           timestamptz,                    -- TV last checked in
  created_at             timestamptz not null default now(),
  activated_at           timestamptz
);

create table if not exists fs_senders (
  id         bigserial primary key,
  slug       text not null references fs_screens(slug) on delete cascade,
  name       text not null,
  token      text not null unique,                        -- stored in the sender's phone cookie
  status     text not null default 'pending',             -- pending | approved | blocked
  created_at timestamptz not null default now()
);
create index if not exists fs_senders_slug_idx on fs_senders (slug);

create table if not exists fs_messages (
  id         bigserial primary key,
  slug       text not null references fs_screens(slug) on delete cascade,
  sender_id  bigint references fs_senders(id) on delete set null,
  kind       text not null,                               -- photo | video | text
  media_url  text,
  text       text,
  bytes      bigint not null default 0,
  status     text not null default 'live',                -- live | pending | removed
  played_at  timestamptz,                                 -- first time it showed on the TV
  created_at timestamptz not null default now()
);
create index if not exists fs_messages_slug_idx on fs_messages (slug, id desc);
