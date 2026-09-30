# Rules & Konvensi Project Frontend (Next.js)

Dokumen ini mendefinisikan struktur folder, konvensi penamaan, dan pola kode wajib untuk project frontend Next.js baru. Diadaptasi dari struktur project referensi `ie-whistleblowing-fe` (Vite + React), disesuaikan untuk Next.js App Router + Prettier.

**Aturan utama: saat membuat file, komponen, halaman, service, atau store baru, ikuti struktur dan konvensi di dokumen ini secara default — tanpa perlu diarahkan ulang.**

---

## 1. Tech Stack

- **Package manager**: pnpm (wajib — jangan pakai npm/yarn)
- **Framework**: Next.js (App Router), TypeScript
- **Styling**: Tailwind CSS v4 (CSS-first config, tanpa `tailwind.config.js`)
- **UI primitives**: shadcn/ui (Radix UI) + `class-variance-authority` (cva) + `clsx` + `tailwind-merge`
- **State management (client/global)**: Zustand
- **Data fetching**: TanStack Query (`@tanstack/react-query`) untuk client-side fetching; Server Components untuk initial data fetching bila cocok
- **Form**: React Hook Form + Zod (`@hookform/resolvers`)
- **Formatting**: Prettier + `prettier-plugin-tailwindcss`
- **Linting**: ESLint (`next/core-web-vitals`, `next/typescript`) + `eslint-config-prettier`

---

## 2. Struktur Folder

```
src/
├── app/                        # Next.js App Router — routing SEKALIGUS logic (colocated)
│   ├── layout.tsx               # root layout
│   ├── globals.css              # Tailwind v4 import + CSS variable design tokens
│   ├── (public)/
│   │   └── page.tsx             # view halaman public
│   ├── admin/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── hooks.ts               # semua state/effect halaman /admin -> useAdminPage()
│   │   ├── helper.ts               # helper murni khusus halaman ini (opsional)
│   │   ├── components/              # sub-komponen lokal halaman /admin
│   │   └── cases/
│   │       ├── page.tsx
│   │       ├── hooks.ts             # useCasesPage()
│   │       ├── helper.ts             # opsional
│   │       ├── components/
│   │       └── [id]/
│   │           ├── page.tsx
│   │           ├── hooks.ts
│   │           └── components/
│   └── ...                      # segment lain mengikuti struktur URL, pola sama
├── components/                    # komponen shared/reusable (dipakai lintas halaman)
│   ├── Button/index.tsx            # PascalCase folder + index.tsx
│   ├── DataTable/index.tsx
│   ├── form/                        # form-field primitives
│   │   ├── Input/index.tsx
│   │   └── index.ts                  # barrel
│   ├── ui/                            # shadcn/radix primitives — flat, lowercase
│   │   ├── button.tsx
│   │   └── dialog.tsx
│   └── index.ts                       # barrel re-export komponen top-level
├── services/                       # API layer
│   ├── api.ts                       # request<T>() wrapper terpusat
│   ├── admin.service.ts
│   └── case.service.ts
├── store/                            # Zustand stores
│   ├── auth-store.ts
│   └── committee-auth-store.ts
├── types/
│   └── index.ts                       # domain types terpusat (barrel)
├── lib/                                # helper framework-agnostic
│   ├── utils.ts                         # cn() = clsx + tailwind-merge
│   └── validation.ts
└── hooks/                                # custom hooks global lintas-page (opsional)
    └── use-media-query.ts
```

**Prinsip kunci**: ikuti konvensi Next.js App Router apa adanya — setiap route segment adalah folder di `src/app/` berisi `page.tsx`. Yang ditambahkan di atas konvensi bawaan Next.js hanyalah aturan colocation berikut, wajib diterapkan di **setiap folder segment yang punya `page.tsx`**:

- `page.tsx` — view/JSX saja, sesedikit mungkin logic. Import & pakai hook dari `hooks.ts` di folder yang sama.
- `hooks.ts` — WAJIB jika halaman punya state/effect/data-fetching. Semua logic dikumpulkan di sini, diekspor sebagai satu hook `use<NamaHalaman>Page()`.
- `components/` — WAJIB dibuat jika halaman punya sub-komponen yang hanya dipakai di halaman itu sendiri (tidak reusable lintas halaman). Sub-komponen reusable lintas halaman tetap masuk ke `src/components/` (root), bukan di sini.
- `helper.ts` — opsional, hanya dibuat jika ada fungsi murni (non-hook, non-JSX) yang dipakai `hooks.ts`/`page.tsx` di halaman tersebut.
- `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx` — dipakai sesuai kebutuhan, mengikuti konvensi bawaan Next.js.

Tidak ada folder `src/pages/` terpisah — semua logic halaman colocated langsung di dalam segment `src/app/` yang bersangkutan.

---

## 3. Konvensi Penamaan

| Jenis                      | Konvensi                                                                                                                                                        | Contoh                                                                |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| Folder komponen (shared)   | PascalCase, isi `index.tsx`                                                                                                                                     | `components/DataTable/index.tsx`                                      |
| Komponen `ui/` (shadcn)    | flat, lowercase file                                                                                                                                            | `components/ui/button.tsx`                                            |
| Folder route segment       | lowercase/kebab-case mengikuti URL (konvensi Next.js)                                                                                                           | `app/admin/cases/[id]/`                                               |
| File logic per segment     | `page.tsx` (view) + `hooks.ts` (logic, wajib jika ada state/effect) + `helper.ts` (fungsi murni, opsional) + `components/` (sub-komponen lokal, wajib jika ada) | `app/admin/cases/hooks.ts`                                            |
| Hook di `hooks.ts`         | camelCase, prefix `use`, suffix `Page`                                                                                                                          | `useCasesPage()`                                                      |
| Hook global lintas-halaman | kebab-case file, `use-xxx.ts`, taruh di `src/hooks/`                                                                                                            | `hooks/use-media-query.ts`                                            |
| Service                    | camelCase stem + `.service.ts`                                                                                                                                  | `case.service.ts`                                                     |
| Fungsi service             | camelCase async                                                                                                                                                 | `listCases()`, `createCase()`                                         |
| Store Zustand              | kebab-case + `-store.ts`                                                                                                                                        | `auth-store.ts`                                                       |
| Hook store                 | camelCase, `use<Name>Store`                                                                                                                                     | `useAuthStore()`                                                      |
| Type/Interface             | `type` (bukan `interface`), PascalCase, TANPA prefix `I`/`T`                                                                                                    | `type CaseRecord = {...}`                                             |
| Props type komponen        | `<ComponentName>Props`, dideklarasikan lokal di file komponen                                                                                                   | `type ButtonProps = {...}`                                            |
| Type domain shared         | terpusat di `types/index.ts`                                                                                                                                    | `ApiEnvelope<T>`, `CaseStatus`                                        |
| Route segment Next.js      | konvensi bawaan Next.js                                                                                                                                         | `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx` |
| Path alias                 | `@/*` → `./src/*`                                                                                                                                               | `import { cn } from '@/lib/utils'`                                    |

Barrel `index.ts` dipakai di level `components/` dan `components/form/` untuk re-export banyak sibling komponen.

---

## 4. Pola Komponen

```tsx
// src/components/Card/index.tsx
import { cn } from '@/lib/utils'

type CardProps = {
  title: string
  className?: string
  children: React.ReactNode
}

export function Card({ title, className, children }: CardProps) {
  return (
    <div className={cn('rounded-lg border p-4', className)}>
      <h3 className="text-sm font-medium">{title}</h3>
      {children}
    </div>
  )
}
```

Untuk primitif shadcn/ui di `components/ui/`, gunakan pola `cva` untuk variant dan `Slot` (Radix) untuk `asChild`, konsisten dengan konvensi shadcn.

---

## 5. State Management & Data Fetching

- **Zustand** untuk state client/global (auth session, UI state lintas halaman). Satu file per store di `src/store/`, suffix `-store.ts`, pakai middleware `persist` untuk state yang perlu bertahan (bukan implementasi manual `sessionStorage`).
- **TanStack Query** WAJIB dipakai untuk semua data fetching client-side — bukan `useEffect` + `useState` manual. Query key & query function memanggil fungsi dari `services/*.service.ts`.
- **Server Components** dipakai untuk initial data fetching di route Next.js bila data tidak butuh interaktivitas client (misal listing awal), kemudian di-hydrate ke Query client jika perlu interaksi lanjutan.
- Logic halaman (state, query, effect) tetap dikumpulkan di `hooks.ts` milik segment tersebut, bukan tersebar di `page.tsx`.

---

## 6. API / Service Layer

`src/services/api.ts` — wrapper fetch terpusat:

```ts
export type ApiEnvelope<T> = {
  success: boolean
  data: T
  message: string
  statusCode: number
}

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8080/api/v1'

export async function request<T>(path: string, options?: RequestInit): Promise<T> {
  // attach Authorization header dari store terkait, handle 401 -> logout, parse ApiEnvelope<T>
}
```

Satu file per resource di `src/services/` (`case.service.ts`, `admin.service.ts`, dst), masing-masing mengekspor fungsi async kecil yang memanggil `request<T>()` dan mengembalikan tipe hasil yang sudah didefinisikan di `types/index.ts`.

---

## 7. Styling

- Tailwind CSS v4, config CSS-first: `src/app/globals.css` diawali `@import "tailwindcss";` lalu definisikan CSS variable design tokens di `:root` (`--background`, `--foreground`, `--primary`, dst) — pola shadcn/ui.
- Komposisi class lewat `cn()` (`clsx` + `tailwind-merge`) di `src/lib/utils.ts`.
- Variant styling lewat `cva` (`class-variance-authority`).
- Tidak pakai CSS Modules atau styled-components — Tailwind utility classes saja.
- Gunakan `next/image` untuk gambar dan `next/font` untuk font, sesuai konvensi Next.js.

---

## 8. Package Manager (pnpm)

Project ini memakai **pnpm**. Lockfile resmi hanya `pnpm-lock.yaml` — `package-lock.json` dan `yarn.lock` tidak boleh ada di repo.

Perintah yang dipakai:

```bash
pnpm install                  # install dependency
pnpm add <pkg>                # tambah dependency
pnpm add -D <pkg>             # tambah dev dependency
pnpm remove <pkg>             # hapus dependency
pnpm dlx <cli>                # jalankan CLI sekali pakai (pengganti npx)
pnpm dev / build / start      # jalankan script package.json
```

Aturan:

- Jangan pernah menjalankan `npm install`/`yarn` di project ini — lockfile jadi tidak konsisten.
- Pakai `pnpm dlx`, bukan `npx`, untuk menjalankan CLI sekali pakai (misal `pnpm dlx shadcn@latest add button`).
- Field `packageManager` di `package.json` menjadi sumber kebenaran versi pnpm; jangan diubah tanpa alasan.
- Semua contoh perintah di README maupun dokumentasi ditulis dengan `pnpm`.

---

## 9. Prettier & ESLint

`.prettierrc.json`:

```json
{
  "semi": false,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 100,
  "tabWidth": 2,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

`.prettierignore`: standar (`node_modules`, `.next`, `dist`, `pnpm-lock.yaml`).

ESLint (`eslint.config.mjs`, flat config Next.js 15+):

```js
import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat()

export default [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  ...compat.extends('eslint-config-prettier'),
]
```

Semua kode baru harus lolos `pnpm format:check` (Prettier) dan `pnpm lint` (ESLint) sebelum dianggap selesai.

---

## 10. Environment Variables

- Prefix wajib `NEXT_PUBLIC_*` untuk variable yang dipakai di client.
- Contoh `.env.example`:

```
# Base URL backend API
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api/v1
```

- `.env`, `.env.local`, `.env.*.local` masuk `.gitignore`.

---

## 11. Git Commit Convention

Gunakan Conventional Commits ringkas:

```
feat: tambah halaman review kasus admin
fix: perbaiki validasi form pelaporan
refactor: pindahkan logic auth ke hooks.ts
chore: update dependency zustand
docs: update README instalasi
```

---

## 12. Ringkasan untuk Claude

Saat diminta membuat komponen, halaman, service, store, atau type baru di project ini:

1. Tempatkan file sesuai struktur folder di §2.
2. Ikuti konvensi penamaan di §3 tanpa terkecuali.
3. Halaman baru: buat folder segment di `src/app/` berisi `page.tsx` (view) + `hooks.ts` (logic, wajib jika ada state/effect) + `components/` (wajib jika ada sub-komponen lokal) + `helper.ts` (opsional, fungsi murni).
4. Gunakan `type`, bukan `interface`. Props type lokal bernama `<ComponentName>Props`.
5. Data fetching client-side pakai TanStack Query, bukan `useEffect` manual.
6. Semua perintah package manager memakai `pnpm` (§8) — bukan `npm` atau `yarn`.
7. Semua kode baru harus format Prettier-compliant sebelum selesai.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
