-- BounceUp — Supabase SQL Setup
-- Ausführen in: Supabase Dashboard → SQL Editor → New Query

-- ── Products ──────────────────────────────────────────────────────────────────
create table if not exists products (
  id          text primary key default gen_random_uuid()::text,
  name        text not null,
  description text not null,
  price       numeric not null,
  image_url   text,
  size        text,
  active      boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- RLS aktivieren
alter table public.products enable row level security;

-- Jeder darf Produkte lesen (öffentlicher Katalog)
drop policy if exists "products_public_read" on public.products;
create policy "products_public_read"
  on public.products for select
  to anon, authenticated
  using (true);

-- Nur Service Role (Backend) darf schreiben
-- Das NestJS-Backend nutzt den service_role Key → umgeht RLS automatisch
-- Daher brauchen wir keine INSERT/UPDATE/DELETE Policy für anon/authenticated

-- Rechte für anon-Rolle (nur lesen)
grant select on public.products to anon, authenticated;

-- ── Bookings ──────────────────────────────────────────────────────────────────
create table if not exists bookings (
  id            uuid primary key default gen_random_uuid(),
  customer_name text not null,
  email         text not null,
  phone         text not null,
  address       text not null,
  booking_date  date not null,
  product_id    text not null references products(id),
  notes         text,
  status        text not null default 'PENDING' check (status in ('PENDING','CONFIRMED','CANCELLED')),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  unique (product_id, booking_date)
);

-- RLS aktivieren
alter table public.bookings enable row level security;

-- Buchungen sind NICHT öffentlich lesbar (Datenschutz!)
-- Das NestJS-Backend nutzt service_role Key → umgeht RLS → kann alles lesen/schreiben
-- anon/authenticated dürfen nichts direkt zugreifen
drop policy if exists "bookings_no_public_access" on public.bookings;
create policy "bookings_no_public_access"
  on public.bookings for all
  to anon, authenticated
  using (false);

-- ── Seed products ─────────────────────────────────────────────────────────────
insert into products (name, description, price, image_url, size)
values
  ('Hüpfburg „Schloss"',
   'Elegante weiße Burg – das Highlight für Kindergeburtstage.',
   120,
   'assets/images/castle-placeholder.jpeg',
   '3x3.5m'),
  ('Hüpfburg „Bubble House"',
   'Transparente Glaskuppel – ein magisches Erlebnis.',
   180,
   'assets/images/bubble-house.jpeg',
   '3x4m')
on conflict do nothing;
