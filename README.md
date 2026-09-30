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

| Variable                      | Keterangan                                                      |
| ----------------------------- | --------------------------------------------------------------- |
| `NEXT_PUBLIC_API_BASE_URL`    | Base URL backend API                                            |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Nomor wa.me bawaan, dipakai bila konten belum menyetel nomornya |
| `NEXT_PUBLIC_BRAND_NAME`      | Nama brand bawaan untuk metadata                                |
| `NEXT_PUBLIC_ADMIN_EMAIL`     | Email admin untuk mode tanpa backend (development saja)         |
| `NEXT_PUBLIC_ADMIN_PASSWORD`  | Kata sandi admin untuk mode tanpa backend (development saja)    |

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
│   ├── login/
│   │   ├── page.tsx                # form masuk
│   │   ├── hooks.ts                # useLoginPage()
│   │   ├── helper.ts               # kredensial mode lokal
│   │   └── components/
│   └── admin/
│       ├── layout.tsx
│       ├── page.tsx                # view form
│       ├── hooks.ts                # useAdminPage()
│       ├── helper.ts               # slugify + factory item baru
│       └── components/             # kartu form per section
├── components/                     # komponen shared + form/ + ui/ (shadcn-style)
├── services/                       # api.ts + content.service.ts
├── store/                          # auth-store.ts, landing-content-store.ts
├── types/                          # type domain terpusat (LandingContent, dst)
├── lib/                            # utils, config, validation, landing-content
└── hooks/                          # use-media-query.ts, use-landing-content.ts
```

## Masuk ke admin

`/admin` dijaga `AdminGuard`: tanpa sesi, halaman mengarahkan ke `/login?next=/admin`.
Form login memanggil `POST /auth/login`.

Selama backend belum ada, login jatuh ke kredensial di `.env.local`
(`NEXT_PUBLIC_ADMIN_EMAIL` dan `NEXT_PUBLIC_ADMIN_PASSWORD`).

> **Ini bukan pengamanan.** `AdminGuard` hanya menyembunyikan tampilan di browser, dan
> variable `NEXT_PUBLIC_*` ikut terbundel ke JavaScript yang dikirim ke pengunjung,
> sehingga kredensialnya bisa dibaca lewat devtools. Sebelum dipakai di produksi,
> kosongkan kedua variable itu, sediakan `/auth/login` sungguhan, dan pastikan backend
> memeriksa token di setiap endpoint konten.

## Mengelola konten

Buka `/admin` untuk mengubah seluruh isi landing page: brand dan kontak, hero, fakta
layanan, keunggulan, paket, langkah pemesanan, ulasan, dan CTA penutup. Item yang berupa
daftar (fakta, keunggulan, paket, langkah, ulasan) bisa ditambah dan dihapus. Tombol
**Reset** mengembalikan seluruh konten ke nilai bawaan.

### Dari mana konten dibaca

Sumber konten saat ini adalah `landing-content-store` (Zustand + `persist`), sehingga
perubahan bertahan di browser yang dipakai. Nilai awalnya diambil dari
[src/lib/landing-content.ts](src/lib/landing-content.ts).

Karena tersimpan di `localStorage`, konten bersifat per-browser: yang Anda ubah di satu
perangkat tidak terlihat oleh pengunjung lain. Saat menyimpan, admin juga mengirim
`PUT /landing-content` lewat [content.service.ts](src/services/content.service.ts). Selama
endpoint itu belum ada, admin menampilkan pemberitahuan bahwa perubahan hanya tersimpan
lokal. Begitu backend tersedia, konten menjadi bersama untuk semua pengunjung tanpa
mengubah komponen halaman.

### Foto paket

Kolom **Foto paket** memakai komponen `ImagePicker`: pilih berkas JPG, PNG, atau WebP dari
perangkat, dan gambar tampil sebagai pratinjau sebelum disimpan.

Gambar diperkecil di browser ke sisi terpanjang 1200 px lalu dikompresi ke JPEG sampai di
bawah 400 KB, karena konten disimpan di `localStorage` yang kuotanya sekitar 5 MB. Kalau
sebuah foto tetap terlalu besar setelah kompresi, picker menolaknya dan meminta foto
beresolusi lebih kecil.

Slot foto lain (hero dan cara pesan) masih memakai `PhotoPlaceholder` dengan teks
keterangan; isi prop `src` untuk menggantinya dengan `next/image`.
