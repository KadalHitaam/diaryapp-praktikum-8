# EXECUTION PLAN: Praktikum 08 — Diary App dengan Redux Toolkit (`diary-app8`)

## 1. Instruksi Utama & Acuan Referensi (WAJIB DIBACA AGENT)

Sebelum menulis atau mengubah baris kode apa pun, AI Agent **WAJIB** melakukan hal berikut:

1. **Baca File PDF Modul Terlebih Dahulu:** Buka dan pelajari file PDF modul praktikum (`modul_praktikum_08_react_redux.pdf` atau file PDF modul Praktikum 08 yang tersedia di workspace/lampiran) secara menyeluruh.
2. **Gunakan Kode Modul sebagai Acuan Eksak:** Cocokkan nama variabel, tipe data, struktur `StyleSheet`, teks UI, komponen, serta konfigurasi navigasi agar identik dengan contoh kode pada **Bagian J hingga Bagian V**, lalu lengkapi fitur tambahan sesuai **Bagian AD (Tugas Praktikum)**.
3. **Lewati Inisialisasi Project (`npx create-expo-app`):** Project Expo `diary-app8` **SUDAH DIBUAT** di workspace. Langsung bekerja di dalam direktori project yang sudah ada tanpa membuat folder project baru.

* **Nama Project:** `diary-app8`
* **Platform:** React Native + Expo Router (TypeScript)
* **State Management:** Redux Toolkit (`@reduxjs/toolkit`) + React-Redux (`react-redux`)
* **Sifat Penyimpanan:** *In-memory state* (data kembali ke `initialState` saat aplikasi di-reload/restart).

---

## 2. Batasan Ketat (STRICT GUARDRAILS)

AI Agent **WAJIB** mematuhi batasan berikut dan **DILARANG** melanggarnya:

1. **DILARANG Menjalankan `npx create-expo-app`:**
   * Jangan membuat ulang project atau menimpa konfigurasi dasar Expo yang sudah disiapkan pengguna.
2. **DILARANG Menambah Backend, API, atau Persistent Storage:**
   * Jangan menggunakan REST API, `fetch`, `axios`, MySQL, Firebase, SQLite, `AsyncStorage`, atau `redux-persist`.
   * Seluruh data hanya disimpan di memory Redux Store.
3. **DILARANG Menginstal Library Eksternal di Luar Modul:**
   * Hanya boleh memastikan `@reduxjs/toolkit` dan `react-redux` terpasang di `package.json`.
   * Jangan menambahkan UI library pihak ketiga (seperti NativeWind/Tailwind, React Native Paper, Tamagui, Lucide Icons, atau form/validation library seperti React Hook Form/Zod). Gunakan `StyleSheet.create` bawaan React Native dan *design tokens* persis seperti pada PDF modul.
4. **DILARANG Menggunakan Pola Redux Lama atau Context API:**
   * Jangan menggunakan `createStore()`, `switch(action.type)`, action constants manual, `redux-thunk`, `RTK Query`, atau `DiaryProvider` (Context API).
   * Wajib menggunakan `configureStore()`, `createSlice()`, serta *typed hooks* (`useAppDispatch` dan `useAppSelector`).
5. **DILARANG Memindahkan Local State Form ke Redux:**
   * Input form (`title`, `body`, `mood`) pada layar Create dan Edit wajib tetap menggunakan `useState` lokal. Jangan menyimpan state ketikan form ke Redux Store.
6. **DILARANG Menambah Fitur, Layar, atau Tab di Luar Modul:**
   * Jangan menambahkan fitur login/auth, dark mode, search bar teks, upload foto/kamera, kategori/tag, animasi kompleks, atau tab tambahan.
   * Hanya buat route/screen yang tercantum dalam modul dan tugas praktikum: `(tabs)/index`, `(tabs)/create`, `(tabs)/favorites`, `detail/[id]`, dan `edit/[id]`.

---

## 3. Struktur Direktori Target

Sesuaikan struktur direktori project yang sudah ada agar mengikuti pola *feature-based* pada PDF modul berikut secara persis:

```text
diary-app8/
├── app/
│   ├── _layout.tsx
│   ├── (tabs)/
│   │   ├── _layout.tsx
│   │   ├── index.tsx
│   │   ├── create.tsx
│   │   └── favorites.tsx
│   ├── detail/
│   │   └── [id].tsx
│   └── edit/
│       └── [id].tsx
├── src/
│   ├── app/
│   │   ├── store.ts
│   │   └── hooks.ts
│   ├── features/
│   │   └── diary/
│   │       └── diarySlice.ts
│   ├── components/
│   │   └── DiaryCard.tsx
│   └── styles/
│       └── tokens.ts
└── README.md
```

---

## 4. Langkah Eksekusi Berurutan

### Fase 1: Verifikasi Dependensi & Pembersihan Boilerplate (Tanpa `npx create-expo-app`)

1. Periksa `package.json` pada root project `diary-app8`. Jika `@reduxjs/toolkit` dan `react-redux` belum terpasang, jalankan:
   ```bash
   npm install @reduxjs/toolkit react-redux
   ```
2. Bersihkan file boilerplate bawaan template Expo di dalam folder `app/` (seperti `modal.tsx`, `explore.tsx`, dll.) agar sesuai dengan struktur target pada Bagian 3.

---

### Fase 2: Setup Design Tokens & Fondasi Redux (Referensi Bagian K – O pada PDF)

1. **Buat `src/styles/tokens.ts` (Referensi Bagian K.1):**
   * Definisikan konstanta berikut sesuai PDF modul:
     * `COLORS`: `surface: "#FFFFFF"`, `background: "#F8FAFC"`, `border: "#E5E7EB"`, `text: "#111827"`, `muted: "#6B7280"`, `accent: "#2563EB"`, `danger: "#EF4444"`.
     * `SPACE`: `s: 8`, `m: 12`, `l: 16`, `xl: 24`.
     * `RADIUS`: `card: 14`.
     * `TYPO`: `h1: 26`, `title: 17`, `body: 14`, `caption: 12`.

2. **Buat `src/features/diary/diarySlice.ts` (Referensi Bagian M.1 & AD):**
   * Export type `DiaryEntry`: `{ id: number; title: string; date: string; preview: string; body: string; mood: string; liked: boolean; }`.
   * Definisikan `DiaryState`: `entries: DiaryEntry[]`, `filter: "all" | "favorite"`, dan `moodFilter: string` (untuk kebutuhan filter mood pada Home di Tugas Praktikum).
   * Isi `initialState.entries` dengan 3 data awal persis seperti di PDF (pastikan karakter emoji `mood` terbaca dengan benar dari PDF, misalnya `"😊"`, `"🤩"`, `"😌"`):
     1. `id: 1`, `title: "Pagi yang Tenang"`, `date: "2026-11-15"`, `preview: "Jalan pagi sebelum memulai aktivitas."`, `body: "Pagi ini terasa tenang. Saya berjalan selama 20 menit sebelum memulai aktivitas."`, `liked: false`.
     2. `id: 2`, `title: "Produktif di Kampus"`, `date: "2026-11-14"`, `preview: "Menyelesaikan modul dan berdiskusi dengan tim."`, `body: "Hari ini cukup produktif karena beberapa target perkuliahan selesai."`, `liked: true`.
     3. `id: 3`, `title: "Senja dan Buku"`, `date: "2026-11-13"`, `preview: "Membaca buku sambil menikmati sore."`, `body: "Sore ini saya menikmati waktu membaca buku dengan suasana santai."`, `liked: false`.
   * Implementasikan reducers berikut menggunakan `createSlice`:
     * `addDiary`: menerima `Omit<DiaryEntry, "id" | "liked">`, menambahkan entry baru di awal array (`unshift`) dengan `id: Date.now()` dan `liked: false`.
     * `toggleFavorite`: menerima `id: number`, membalik status boolean `entry.liked`.
     * `deleteDiary`: menerima `id: number`, menghapus entry dari `state.entries`.
     * `setFilter`: menerima `"all" | "favorite"`, mengubah `state.filter`.
     * `editDiary` *(Tugas Praktikum)*: menerima `{ id: number; title: string; body: string; mood: string }`, memperbarui `title`, `body`, `preview` (`body.trim().slice(0, 100)`), dan `mood` pada entry yang sesuai.
     * `clearAllFavorites` *(Tugas Praktikum)*: mengubah `liked = false` pada seluruh item di `state.entries`.
     * `setMoodFilter` *(Tugas Praktikum)*: mengubah filter mood aktif (`"all"` atau emoji mood tertentu).

3. **Buat `src/app/store.ts` (Referensi Bagian L.1):**
   * Konfigurasi store dengan `configureStore({ reducer: { diary: diaryReducer } })`.
   * Export type `RootState = ReturnType<typeof store.getState>` dan `AppDispatch = typeof store.dispatch`.

4. **Buat `src/app/hooks.ts` (Referensi Bagian O.1):**
   * Export `useAppDispatch = useDispatch.withTypes<AppDispatch>()` dan `useAppSelector = useSelector.withTypes<RootState>()`.

---

### Fase 3: Konfigurasi Navigasi & Provider (Referensi Bagian P – Q pada PDF)

1. **Update `app/_layout.tsx` (Referensi Bagian P.1):**
   * Bungkus root `<Stack>` dengan `<Provider store={store}>`.
   * Daftarkan `<Stack.Screen name="(tabs)" options={{ headerShown: false }} />`, `<Stack.Screen name="detail/[id]" options={{ title: "Detail Diary" }} />`, dan `<Stack.Screen name="edit/[id]" options={{ title: "Edit Diary" }} />`.

2. **Update `app/(tabs)/_layout.tsx` (Referensi Bagian Q.1):**
   * Konfigurasi `<Tabs screenOptions={{ headerShown: false }}>` dengan 3 tab persis seperti modul: `index` (`title: "Home"`), `create` (`title: "Tambah"`), dan `favorites` (`title: "Favorite"`).

---

### Fase 4: Implementasi Komponen & Seluruh Screen (Referensi Bagian R – V & AD pada PDF)

1. **Buat `src/components/DiaryCard.tsx` (Referensi Bagian R.1):**
   * Gunakan props, struktur JSX, dan `StyleSheet` persis seperti di Bagian R.1 PDF (`moodBox`, `title`, `date`, `preview` dengan `numberOfLines={2}`, dan tombol hati `"♥"` / `"♡"`).

2. **Buat `app/(tabs)/index.tsx` — Home Screen (Referensi Bagian S.1 & AD):**
   * Gunakan struktur dan styling dasar dari Bagian S.1 PDF (`header: "Buku Harian"`, `counter`, `FlatList` dengan `DiaryCard`).
   * Lengkapi dengan fitur Tugas Praktikum (Bagian AD):
     * Statistik *derived state* **Total Diary** (`entries.length`) dan **Total Favorite** (`entries.filter(e => e.liked).length`) tanpa menambah state baru di Redux Store.
     * Filter mood (`Semua` + pilihan emoji mood) untuk menyaring `entries` yang ditampilkan di `FlatList`.
     * `ListEmptyComponent` yang informatif saat daftar diary kosong atau tidak ada hasil yang cocok dengan filter mood.

3. **Buat `app/(tabs)/create.tsx` — Create Screen (Referensi Bagian T.1 & AD):**
   * Gunakan local `useState` untuk `title`, `body`, dan `mood`, serta styling dari Bagian T.1 PDF (`heading: "Tambah Diary"`, tombol `"Simpan ke Redux"`).
   * Sesuaikan array `MOODS` dengan 4 emoji valid dari PDF (misal `["😊", "😌", "🤔", "😢"]`).
   * Terapkan validasi Bagian T.1 + Tugas Praktikum: `title` dan `body` tidak boleh kosong, dan **`title.trim().length >= 3`** (tampilkan `Alert.alert` jika gagal).
   * Dispatch `addDiary(...)`, reset local state form, lalu navigasi dengan `router.replace("/")`.

4. **Buat `app/(tabs)/favorites.tsx` — Favorites Screen (Referensi Bagian U.1 & AD):**
   * Gunakan *derived state* `favoriteEntries = useAppSelector((state) => state.diary.entries.filter((entry) => entry.liked))` dan styling dari Bagian U.1 PDF.
   * Tambahkan tombol aksi untuk menjalankan `dispatch(clearAllFavorites())` (tampilkan saat `favoriteEntries.length > 0`).
   * Tingkatkan `ListEmptyComponent` agar lebih informatif sesuai Tugas Praktikum.

5. **Buat `app/detail/[id].tsx` — Detail Screen (Referensi Bagian V.1 & AD):**
   * Gunakan struktur dan styling dari Bagian V.1 PDF (`useLocalSearchParams<{ id: string }>()`, pesan `"Diary tidak ditemukan."`, tombol toggle favorite, dan konfirmasi `Alert.alert` untuk `"Hapus Diary"`).
   * Tambahkan tombol navigasi ke `/edit/[id]` membawa parameter `id` untuk fitur Edit Diary.

6. **Buat `app/edit/[id].tsx` — Edit Screen (Tugas Praktikum Bagian AD):**
   * Ambil `id` lewat `useLocalSearchParams<{ id: string }>()`, baca data entry awal dari Redux Store.
   * Inisialisasi local `useState` untuk `title`, `body`, dan `mood` dari data entry tersebut.
   * Terapkan validasi yang sama (`title.trim().length >= 3` dan `body` wajib diisi) serta konsistensi desain menggunakan `tokens.ts`.
   * Saat disimpan, `dispatch(editDiary({ id: entry.id, title: title.trim(), body: body.trim(), mood }))` lalu kembali dengan `router.back()`.

7. **Buat `README.md` (Tugas Praktikum Bagian AD):**
   * Dokumentasikan panduan menjalankan aplikasi (`npm install` & `npx expo start`) serta penjelasan konseptual mengenai perbedaan **Local State (`useState`)**, **Global Redux State (`Redux Toolkit`)**, dan **Persistent Database**.

---

## 5. Checklist Verifikasi Akhir (Pengujian Praktikum)

Sebelum menyelesaikan tugas, AI Agent wajib memverifikasi seluruh poin berikut:

* [ ] Kode dan tampilan sesuai dengan struktur dan *design tokens* pada PDF modul praktikum.
* [ ] Tidak ada project baru yang dibuat; perubahan dilakukan langsung pada project `diary-app8` yang sudah ada.
* [ ] `@reduxjs/toolkit` dan `react-redux` terpasang dan terhubung lewat `<Provider store={store}>` di `app/_layout.tsx`.
* [ ] Seluruh screen membaca dan mengubah state hanya menggunakan `useAppSelector` dan `useAppDispatch`.
* [ ] `HomeScreen` menampilkan `initialState`, filter mood berfungsi, serta statistik Total Diary dan Total Favorite sinkron secara real-time.
* [ ] `CreateScreen` memvalidasi judul minimal 3 karakter, menyimpan ke Redux, mereset form lokal, dan kembali ke Home.
* [ ] `FavoritesScreen` menampilkan daftar diary dengan `liked === true`, tombol `clearAllFavorites` berfungsi, dan empty state informatif tampil saat kosong.
* [ ] `DetailScreen` dan `EditScreen` (`edit/[id].tsx`) dapat memperbarui serta menghapus diary di Redux Store dengan sinkron di semua tab.
* [ ] `README.md` telah diisi penjelasan perbedaan local state, global Redux state, dan persistent database.