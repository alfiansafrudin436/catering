-- Skema awal catering-fe.
-- Jalankan lewat SQL Editor di dashboard Supabase, atau `supabase db push`.

-- ---------------------------------------------------------------------------
-- Tabel konten landing page
-- ---------------------------------------------------------------------------
-- Seluruh konten disimpan sebagai satu dokumen JSONB pada satu baris. Bentuknya
-- mengikuti type LandingContent di src/types/index.ts. Satu baris dipilih karena
-- halaman memang diambil dan disimpan utuh dalam sekali operasi.

create table if not exists public.landing_content (
  id text primary key,
  content jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.landing_content enable row level security;

-- Pengunjung yang belum masuk hanya boleh membaca.
drop policy if exists "landing_content dapat dibaca siapa saja" on public.landing_content;
create policy "landing_content dapat dibaca siapa saja"
  on public.landing_content
  for select
  to anon, authenticated
  using (true);

-- Menulis hanya untuk pengguna yang sudah masuk lewat Supabase Auth.
drop policy if exists "landing_content hanya ditulis pengguna terautentikasi" on public.landing_content;
create policy "landing_content hanya ditulis pengguna terautentikasi"
  on public.landing_content
  for all
  to authenticated
  using (true)
  with check (true);

-- ---------------------------------------------------------------------------
-- Bucket foto paket
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('package-photos', 'package-photos', true)
on conflict (id) do nothing;

drop policy if exists "foto paket dapat dilihat siapa saja" on storage.objects;
create policy "foto paket dapat dilihat siapa saja"
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'package-photos');

drop policy if exists "foto paket hanya diunggah pengguna terautentikasi" on storage.objects;
create policy "foto paket hanya diunggah pengguna terautentikasi"
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'package-photos');

drop policy if exists "foto paket hanya dihapus pengguna terautentikasi" on storage.objects;
create policy "foto paket hanya dihapus pengguna terautentikasi"
  on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'package-photos');
