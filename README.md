# Catering FE

Landing page catering dengan halaman admin untuk mengelola isinya (Next.js App Router +
TypeScript + Tailwind v4), mengikuti konvensi di [CLAUDE.md](CLAUDE.md).

## Menjalankan

```bash
pnpm install
cp .env.example .env.local   # isi nomor WhatsApp & nama brand
pnpm dev
```

## Rute

Halaman dikelompokkan dengan route group: `(public)` untuk halaman pengunjung dan
`(private)` untuk konsol admin. Tanda kurung membuat nama grup tidak ikut ke URL, jadi
pengelompokan ini murni penataan folder.

| Rute           | Isi                                                       |
| -------------- | --------------------------------------------------------- |
| `/`            | Redirect ke `/landingpage`                                |
| `/landingpage` | Landing page publik                                       |
| `/login`       | Form masuk ke admin                                       |
| `/admin`       | Form pengelolaan seluruh konten landing page (butuh sesi) |

## Script

| Perintah            | Kegunaan           |
| ------------------- | ------------------ |
| `pnpm dev`          | Development server |
| `pnpm build`        | Production build   |
| `pnpm lint`         | ESLint             |
| `pnpm format`       | Prettier write     |
| `pnpm format:check` | Prettier check     |

## Environment

Hanya dua, keduanya wajib. Selebihnya — nama brand, nomor WhatsApp, seluruh teks dan foto —
diatur lewat `/admin` dan disimpan di Supabase, bukan di environment variable.

| Variable                        | Keterangan                    |
| ------------------------------- | ----------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | URL project Supabase          |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Anon/publishable key Supabase |

## Struktur

```
src/
├── app/
│   ├── layout.tsx                  # root layout + next/font (Fraunces, Plus Jakarta Sans)
│   ├── providers.tsx               # QueryClientProvider
│   ├── globals.css                 # Tailwind v4 + design token
│   ├── page.tsx                    # redirect / -> /landingpage
│   ├── (public)/
│   │   ├── layout.tsx              # header + footer publik
│   │   ├── components/             # SiteHeader, SiteFooter
│   │   └── landingpage/
│   │       ├── page.tsx            # view landing page
│   │       ├── hooks.ts            # useLandingPage()
│   │       ├── helper.ts           # builder pesan WhatsApp
│   │       └── components/         # section lokal halaman
│   └── (private)/
│       ├── login/
│       │   ├── page.tsx            # form masuk
│       │   ├── hooks.ts            # useLoginPage()
│       │   ├── helper.ts           # pesan kegagalan masuk
│       │   └── components/
│       └── admin/
│           ├── layout.tsx
│           ├── page.tsx            # view form
│           ├── hooks.ts            # useAdminPage()
│           ├── helper.ts           # slugify + factory item baru
│           └── components/         # kartu form per section
├── components/                     # komponen shared + form/ + ui/ (shadcn-style)
├── middleware.ts                   # penjagaan /admin di sisi server (mode Supabase)
├── services/                       # auth, content, storage (semuanya lewat Supabase)
├── types/                          # type domain terpusat (LandingContent, dst)
├── lib/                            # utils, config, validation, image, landing-content
│   └── supabase/                   # config + client browser & server
└── hooks/                          # use-media-query.ts, use-landing-content.ts
```

Berkas migrasi SQL ada di `supabase/migrations/`.

## Supabase

Supabase adalah satu-satunya backend: autentikasi admin, penyimpanan konten, dan berkas foto.
Tanpa kredensial yang benar, halaman publik tetap tampil dengan konten bawaan, tetapi
`/admin` tertutup.

### Menyiapkan Supabase

1. Buat project di [supabase.com](https://supabase.com).
2. Jalankan [supabase/migrations/0001_init.sql](supabase/migrations/0001_init.sql) lewat
   **SQL Editor** di dashboard. Berkas itu membuat tabel `landing_content`, bucket
   `package-photos`, dan seluruh RLS policy-nya.
3. Buat pengguna admin di **Authentication > Users > Add user**. Pendaftaran mandiri tidak
   dipakai, jadi buat akunnya manual.
4. Salin **Project URL** dan **anon key** dari **Project Settings > API** ke `.env.local`.

> Jangan pernah menaruh **service_role key** di variable `NEXT_PUBLIC_*`. Kunci itu melewati
> seluruh RLS, dan apa pun berawalan `NEXT_PUBLIC_` ikut terbundel ke JavaScript yang dikirim
> ke setiap pengunjung.

### Keamanan

`/admin` dijaga [src/middleware.ts](src/middleware.ts) di sisi server: permintaan tanpa sesi
valid dialihkan ke `/login` sebelum halamannya dirender, termasuk pada navigasi client-side.
Sesi disimpan di cookie lewat `@supabase/ssr`, dan diverifikasi dengan `getUser()` yang
menanyakan token ke server Supabase — bukan `getSession()` yang hanya membaca cookie dan
bisa dipalsukan.

Bila kredensial Supabase kosong, sesi tidak mungkin diverifikasi, jadi `/admin` ditolak.
Gagal dalam keadaan tertutup, bukan terbuka.

Lapisan kedua ada di database: RLS membuat konten bisa dibaca siapa saja tetapi hanya bisa
ditulis pengguna terautentikasi. Jadi meskipun seseorang melewati antarmuka, Supabase tetap
menolak tulisan tanpa sesi.

## Mengelola konten

Buka `/admin` untuk mengubah seluruh isi landing page: brand dan kontak, hero, fakta
layanan, keunggulan, paket, langkah pemesanan, ulasan, dan CTA penutup. Item yang berupa
daftar (fakta, keunggulan, paket, langkah, ulasan) bisa ditambah dan dihapus. Tombol
**Reset** mengembalikan seluruh konten ke nilai bawaan.

### Dari mana konten dibaca

`useLandingContent()` membaca satu baris dari tabel `landing_content` lewat TanStack Query.
Selama permintaan berjalan atau barisnya belum ada, konten bawaan di
[src/lib/landing-content.ts](src/lib/landing-content.ts) yang dipakai, sehingga halaman tidak
pernah kosong. Judul dan deskripsi halaman juga ikut konten ini lewat `generateMetadata`.

### Foto paket

Kolom **Foto paket** memakai komponen `ImagePicker`: pilih berkas JPG, PNG, atau WebP dari
perangkat, dan gambar tampil sebagai pratinjau sebelum disimpan.

Foto dikompresi di browser ke sisi terpanjang 1600 px dan di bawah 2 MB, lalu diunggah ke
bucket `package-photos`. Yang disimpan di konten hanyalah URL publiknya. Foto yang tetap
terlalu besar setelah kompresi ditolak dengan pesan, bukan dipotong diam-diam.

Slot foto lain (hero dan cara pesan) masih memakai `PhotoPlaceholder` dengan teks
keterangan; isi prop `src` untuk menggantinya dengan `next/image`.
