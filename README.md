# Catering FE

Landing page catering (Next.js App Router + TypeScript + Tailwind v4), mengikuti konvensi di [CLAUDE.md](CLAUDE.md).

## Menjalankan

```bash
pnpm install
cp .env.example .env.local   # isi nomor WhatsApp & nama brand
pnpm dev
```

Buka http://localhost:3000.

## Script

| Perintah            | Kegunaan           |
| ------------------- | ------------------ |
| `pnpm dev`          | Development server |
| `pnpm build`        | Production build   |
| `pnpm lint`         | ESLint             |
| `pnpm format`       | Prettier write     |
| `pnpm format:check` | Prettier check     |

## Environment

| Variable                      | Keterangan                                         |
| ----------------------------- | -------------------------------------------------- |
| `NEXT_PUBLIC_API_BASE_URL`    | Base URL backend API                               |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Nomor tujuan wa.me, format internasional tanpa `+` |
| `NEXT_PUBLIC_BRAND_NAME`      | Nama brand yang tampil di header, hero, dan footer |

## Struktur

```
src/
├── app/
│   ├── layout.tsx            # root layout + next/font (Fraunces, Plus Jakarta Sans)
│   ├── providers.tsx         # QueryClientProvider
│   ├── globals.css           # Tailwind v4 + design token
│   └── (public)/
│       ├── layout.tsx        # header + footer publik
│       ├── page.tsx          # view landing page
│       ├── hooks.ts          # useHomePage()
│       ├── helper.ts         # konten statis + builder pesan WhatsApp
│       └── components/       # section lokal halaman
├── components/               # komponen shared + ui/ (shadcn-style)
├── services/                 # api.ts + catering.service.ts
├── store/                    # auth-store.ts (Zustand + persist)
├── types/                    # type domain terpusat
├── lib/                      # utils, config, validation
└── hooks/                    # use-media-query.ts
```

## Mengisi konten

Semua teks placeholder (`[NAMA PAKET 1]`, `[HARGA / PORSI]`, dst) ada di
[src/app/(public)/helper.ts](<src/app/(public)/helper.ts>). Saat backend siap, endpoint
`/packages` dan `/testimonials` akan menggantikan data fallback tersebut secara otomatis
lewat TanStack Query — placeholder hanya dipakai bila API belum mengembalikan data.

Slot foto memakai komponen `PhotoPlaceholder`: isi prop `src` (atau field `imageUrl`
dari API) untuk menggantinya dengan `next/image`.
