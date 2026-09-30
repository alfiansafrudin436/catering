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

| Variable                        | Keterangan                                                      |
| ------------------------------- | --------------------------------------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | URL project Supabase. Kosong = mode lokal                       |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Anon/publishable key Supabase                                   |
| `NEXT_PUBLIC_WHATSAPP_NUMBER`   | Nomor wa.me bawaan, dipakai bila konten belum menyetel nomornya |
| `NEXT_PUBLIC_BRAND_NAME`        | Nama brand bawaan untuk metadata                                |
| `NEXT_PUBLIC_ADMIN_EMAIL`       | Email admin untuk mode tanpa backend (development saja)         |
| `NEXT_PUBLIC_ADMIN_PASSWORD`    | Kata sandi admin untuk mode tanpa backend (development saja)    |

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
│       │   ├── helper.ts           # kredensial mode lokal
│       │   └── components/
│       └── admin/
│           ├── layout.tsx          # AdminGuard
│           ├── page.tsx            # view form
│           ├── hooks.ts            # useAdminPage()
│           ├── helper.ts           # slugify + factory item baru
│           └── components/         # kartu form per section
├── components/                     # komponen shared + form/ + ui/ (shadcn-style)
├── middleware.ts                   # penjagaan /admin di sisi server (mode Supabase)
├── services/                       # auth, content, storage (semuanya lewat Supabase)
├── store/                          # auth-store.ts, landing-content-store.ts
├── types/                          # type domain terpusat (LandingContent, dst)
├── lib/                            # utils, config, validation, image, landing-content
│   └── supabase/                   # config + client browser & server
└── hooks/                          # use-media-query.ts, use-landing-content.ts
```

Berkas migrasi SQL ada di `supabase/migrations/`.

## Supabase

Supabase bersifat opsional dan menentukan dua mode jalannya aplikasi.

|                    | Mode lokal (`NEXT_PUBLIC_SUPABASE_URL` kosong) | Mode Supabase (terisi)                    |
| ------------------ | ---------------------------------------------- | ----------------------------------------- |
| Login              | Kredensial `.env.local`, diperiksa di browser  | Supabase Auth, sesi di cookie             |
| Penjagaan `/admin` | `AdminGuard` di browser                        | `src/middleware.ts` di server             |
| Konten             | `localStorage`, per-browser                    | Tabel `landing_content`, sama untuk semua |
| Foto paket         | Data URL, maksimal 400 KB                      | Bucket `package-photos`, maksimal 2 MB    |

### Menyiapkan Supabase

1. Buat project di [supabase.com](https://supabase.com).
2. Jalankan [supabase/migrations/0001_init.sql](supabase/migrations/0001_init.sql) lewat
   **SQL Editor** di dashboard. Berkas itu membuat tabel `landing_content`, bucket
   `package-photos`, dan seluruh RLS policy-nya.
3. Buat pengguna admin di **Authentication > Users > Add user**. Pendaftaran mandiri tidak
   dipakai, jadi buat akunnya manual.
4. Salin **Project URL** dan **anon key** dari **Project Settings > API** ke `.env.local`.
5. Kosongkan `NEXT_PUBLIC_ADMIN_EMAIL` dan `NEXT_PUBLIC_ADMIN_PASSWORD`.

> Jangan pernah menaruh **service_role key** di variable `NEXT_PUBLIC_*`. Kunci itu melewati
> seluruh RLS, dan apa pun berawalan `NEXT_PUBLIC_` ikut terbundel ke JavaScript yang dikirim
> ke setiap pengunjung.

### Keamanan di kedua mode

Di mode Supabase, `/admin` dijaga `src/middleware.ts`: permintaan tanpa sesi valid dialihkan
ke `/login` sebelum halaman dirender, dan RLS memastikan hanya pengguna terautentikasi yang
bisa menulis konten atau mengunggah foto. Ini perlindungan yang sebenarnya.

Di mode lokal tidak ada penjagaan server. `AdminGuard` hanya menyembunyikan tampilan, dan
kredensial di `NEXT_PUBLIC_*` bisa dibaca lewat devtools. **Jangan dipakai di produksi.**

## Mengelola konten

Buka `/admin` untuk mengubah seluruh isi landing page: brand dan kontak, hero, fakta
layanan, keunggulan, paket, langkah pemesanan, ulasan, dan CTA penutup. Item yang berupa
daftar (fakta, keunggulan, paket, langkah, ulasan) bisa ditambah dan dihapus. Tombol
**Reset** mengembalikan seluruh konten ke nilai bawaan.

### Dari mana konten dibaca

`useLandingContent()` membaca dari Supabase bila ada isinya, lalu `landing-content-store`
(Zustand + `persist`), lalu konten bawaan di
[src/lib/landing-content.ts](src/lib/landing-content.ts).

Di mode lokal, konten hanya hidup di `localStorage` browser yang dipakai, jadi pengunjung
lain tidak melihat perubahan Anda. Admin menyatakan hal ini setelah menyimpan. Di mode
Supabase, konten disimpan ke tabel dan berlaku untuk semua pengunjung.

### Foto paket

Kolom **Foto paket** memakai komponen `ImagePicker`: pilih berkas JPG, PNG, atau WebP dari
perangkat, dan gambar tampil sebagai pratinjau sebelum disimpan.

Di mode Supabase, foto dikompresi ke sisi terpanjang 1600 px lalu diunggah ke bucket
`package-photos`, dan yang disimpan di konten hanyalah URL publiknya.

Di mode lokal tidak ada tempat menyimpan berkas, jadi foto diperkecil ke 1200 px dan
dikompresi sampai di bawah 400 KB lalu disimpan sebagai data URL — batas ini ada karena
`localStorage` hanya menampung sekitar 5 MB untuk seluruh konten. Foto yang tetap terlalu
besar setelah kompresi ditolak dengan pesan, bukan dipotong diam-diam.

Slot foto lain (hero dan cara pesan) masih memakai `PhotoPlaceholder` dengan teks
keterangan; isi prop `src` untuk menggantinya dengan `next/image`.
