-- Konten awal landing page.
--
-- Teks placeholder di sini adalah satu-satunya sumber konten bawaan; aplikasi
-- tidak lagi menyimpan salinannya di TypeScript. Bentuknya mengikuti type
-- LandingContent di src/types/index.ts.
--
-- on conflict do nothing membuat berkas ini aman dijalankan ulang: konten yang
-- sudah Anda sunting lewat /admin tidak akan tertimpa.

insert into public.landing_content (id, content)
values (
  'default',
  '{
  "brand": {
    "name": "[NAMA BRAND]",
    "address": "[Alamat singkat / kota]",
    "whatsappNumber": "628120000000",
    "instagram": "[@instagram]",
    "phoneLabel": "[0812-XXXX-XXXX]",
    "email": "[Email]"
  },
  "hero": {
    "eyebrow": "Catering untuk setiap acara",
    "title": "Hidangan hangat untuk acaramu, tanpa repot menyiapkan.",
    "description": "Kami melayani catering harian, kantor, dan acara keluarga. Pilih paket, kirim pesan lewat WhatsApp, lalu kami siapkan dan antar ke tempatmu.",
    "primaryCtaLabel": "Pesan via WhatsApp",
    "secondaryCtaLabel": "Lihat paket",
    "photoLabel": "[FOTO HIDANGAN CATERING · rasio 4:5]"
  },
  "facts": [
    {
      "id": "min-order",
      "label": "Min. pesanan [JUMLAH] porsi"
    },
    {
      "id": "lead-time",
      "label": "Pesan H-[X] sebelum acara"
    },
    {
      "id": "halal",
      "label": "Halal · [NO. SERTIFIKAT]"
    },
    {
      "id": "coverage",
      "label": "Area antar [AREA]"
    }
  ],
  "highlights": {
    "title": "Kenapa banyak yang kembali memesan",
    "description": "Tiga hal sederhana yang kami jaga di setiap pesanan.",
    "items": [
      {
        "id": "bahan-segar",
        "icon": "leaf",
        "title": "Bahan segar, dimasak di hari acara",
        "description": "[Jelaskan sumber bahan dan waktu memasak.]"
      },
      {
        "id": "menu-custom",
        "icon": "flame",
        "title": "Menu bisa disesuaikan",
        "description": "[Jelaskan opsi ganti lauk, pantangan, atau porsi.]"
      },
      {
        "id": "pengantaran",
        "icon": "clock",
        "title": "Diantar sampai tujuan",
        "description": "[Jelaskan pengemasan, jam antar, dan area layanan.]"
      }
    ]
  },
  "packages": {
    "title": "Pilih paket sesuai kebutuhan",
    "note": "Harga per porsi, belum termasuk ongkos antar.",
    "items": [
      {
        "slug": "paket-1",
        "name": "[NAMA PAKET 1]",
        "description": "[Isi paket: nasi, lauk, sayur, dll.]",
        "price": "[HARGA / PORSI]"
      },
      {
        "slug": "paket-2",
        "name": "[NAMA PAKET 2]",
        "description": "[Isi paket: nasi, lauk, sayur, dll.]",
        "price": "[HARGA / PORSI]"
      },
      {
        "slug": "paket-3",
        "name": "[NAMA PAKET 3]",
        "description": "[Isi paket: nasi, lauk, sayur, dll.]",
        "price": "[HARGA / PORSI]"
      }
    ]
  },
  "howToOrder": {
    "title": "Pesan catering semudah kirim chat",
    "description": "[Ceritakan singkat siapa yang memasak dan apa yang kamu jaga di setiap hidangan.]",
    "photoLabel": "[FOTO DAPUR / PENGANTARAN]",
    "steps": [
      {
        "order": 1,
        "title": "Pilih paket",
        "description": "Tentukan paket dan jumlah porsi."
      },
      {
        "order": 2,
        "title": "Kirim pesan lewat WhatsApp",
        "description": "Isi tanggal, jam, dan alamat antar."
      },
      {
        "order": 3,
        "title": "Terima pesanan",
        "description": "Kami konfirmasi harga lalu menyiapkan hidanganmu."
      }
    ]
  },
  "testimonials": {
    "title": "Kata mereka yang sudah mencoba",
    "items": [
      {
        "id": "ulasan-1",
        "quote": "[Tempel ulasan asli pelanggan di sini.]",
        "customerName": "[Nama pelanggan]",
        "city": "[Kota]"
      },
      {
        "id": "ulasan-2",
        "quote": "[Tempel ulasan asli pelanggan di sini.]",
        "customerName": "[Nama pelanggan]",
        "city": "[Kota]"
      },
      {
        "id": "ulasan-3",
        "quote": "[Tempel ulasan asli pelanggan di sini.]",
        "customerName": "[Nama pelanggan]",
        "city": "[Kota]"
      }
    ]
  },
  "cta": {
    "title": "Ada acara? Ceritakan lewat WhatsApp.",
    "description": "Kirim tanggal, jumlah porsi, dan alamat antar. Kami balas dengan penawaran.",
    "buttonLabel": "Chat via WhatsApp"
  }
}'::jsonb
)
on conflict (id) do nothing;
