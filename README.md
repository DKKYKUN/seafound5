# 🐟 SeaFound — Marketplace Hasil Laut

Modern marketplace yang menghubungkan nelayan langsung dengan pembeli melalui WhatsApp.

## ✨ Tech Stack
- React 18 + Vite + TypeScript
- Tailwind CSS (design tokens HSL)
- React Router v6
- Sonner (toast)
- Lucide Icons

## 🚀 Jalankan Lokal
```bash
npm install
npm run dev
```

## 🔐 Login Admin
- URL: `/admin`
- Username: `admin`
- Password: `admin123`

Admin dapat tambah/edit/hapus ikan, edit stok & harga. Data tersimpan di `localStorage`.

## 📂 Struktur Folder
```
src/
├── components/seafound/    # Navbar, Footer, FishCard, dll
├── data/mockData.ts         # 10 ikan + 6 nelayan dummy
├── hooks/useStore.ts        # State management + localStorage
├── pages/                   # Home, Catalog, Fishermen, About, Contact, Admin
├── App.tsx                  # Router
└── index.css                # Design tokens (navy/turquoise/aqua)
```

## ☁️ Deploy ke Vercel
1. Push ke GitHub
2. Import project di [vercel.com](https://vercel.com)
3. Build command: `npm run build` · Output: `dist`
4. File `vercel.json` sudah disertakan untuk SPA routing
5. Done — auto deploy setiap push

## 🗄️ (Opsional) Setup Supabase
Saat ini app pakai `localStorage`. Untuk migrasi ke Supabase:

### 1. Buat project di [supabase.com](https://supabase.com)
### 2. SQL Schema
```sql
create table fishermen (
  id uuid primary key default gen_random_uuid(),
  name text not null, location text, experience text,
  specialty text, photo text, phone text,
  rating numeric default 5, reviews int default 0,
  created_at timestamptz default now()
);

create table fish (
  id uuid primary key default gen_random_uuid(),
  name text not null, category text not null,
  price numeric not null, stock numeric default 0,
  unit text default 'kg', description text, image text,
  fisherman_id uuid references fishermen(id) on delete cascade,
  badge text, created_at timestamptz default now()
);

alter table fish enable row level security;
alter table fishermen enable row level security;

create policy "public read fish" on fish for select using (true);
create policy "public read fishermen" on fishermen for select using (true);
```

### 3. Environment Variables
Buat file `.env`:
```
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJxxx...
```

### 4. Install client
```bash
npm install @supabase/supabase-js
```

Buat `src/lib/supabase.ts`:
```ts
import { createClient } from "@supabase/supabase-js";
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);
```

Lalu ganti pemanggilan di `src/hooks/useStore.ts` dari `localStorage` menjadi `supabase.from("fish").select()`.

## 📱 Fitur
- ✅ Hero fullscreen + wave animation
- ✅ Katalog 10 ikan + filter kategori + search
- ✅ Profil 6 nelayan terverifikasi
- ✅ Tombol WhatsApp langsung di setiap card
- ✅ Halaman About + Contact dengan form
- ✅ Admin panel CRUD (tambah/edit/hapus ikan)
- ✅ Loading screen + skeleton + lazy image
- ✅ Toast notification (Sonner)
- ✅ Responsive mobile-first
- ✅ Smooth scroll + scroll reveal animation
- ✅ Hover & float animation

## 🎨 Design Tokens
Semua warna/animasi/shadow di `src/index.css` & `tailwind.config.ts`. Edit di sana untuk ganti tema.
