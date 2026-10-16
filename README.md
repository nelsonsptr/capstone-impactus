# 📚 Impactus — Ruang Belajar & Fokus

> Aplikasi web manajemen tugas dan produktivitas belajar berbasis teknik Pomodoro, dibangun oleh **Tim Impactus** sebagai proyek Capstone.

---

## 🌟 Tentang Proyek

Aplikasi ini berupa web yang dirancang untuk membantu pelajar mengelola tugas, memantau progres belajar, dan meningkatkan fokus menggunakan teknik Pomodoro. Dengan antarmuka yang bersih dan intuitif, Impactus hadir sebagai ruang belajar digital yang produktif.

---

## ✨ Fitur Utama

| Fitur | Deskripsi |
|---|---|
| 🏠 **Beranda** | Dashboard ringkasan tugas, statistik progres, dan tugas prioritas utama |
| 📋 **Manajemen Tugas** | Tambah, kelola, dan tandai tugas berdasarkan prioritas & deadline |
| ⏱️ **Timer Pomodoro** | Sesi belajar fokus 25 menit dengan jeda terstruktur |
| 👤 **Profil** | Halaman profil pengguna |
| 📱 **Responsif** | Tampilan optimal di desktop maupun perangkat mobile |

---

## 🛠️ Tech Stack

- **Framework:** [React 19](https://react.dev/) + [Vite 8](https://vite.dev/)
- **Routing:** [React Router DOM v7](https://reactrouter.com/)
- **Linting:** ESLint

---

## 🚀 Cara Menjalankan Proyek

### Prasyarat
Pastikan sudah menginstal **Node.js** (v18 ke atas) dan **npm**.

### Langkah Instalasi

```bash
# 1. Clone repositori ini
git clone <url-repositori>
cd capstone-impactus

# 2. Install dependensi
npm install

# 3. Jalankan development server
npm run dev
```

Buka browser dan akses: **`http://localhost:5173`**

### Script yang Tersedia

```bash
npm run dev       # Menjalankan development server
npm run build     # Build untuk produksi
npm run preview   # Preview hasil build
npm run lint      # Menjalankan ESLint
```

---

## 📁 Struktur Proyek

```
capstone-impactus/
├── public/                 # Aset statis
├── src/
│   ├── components/         # Komponen reusable (Header, Layout, dll.)
│   ├── pages/              # Halaman utama (Beranda, Tugas, Timer, Profil)
│   ├── data/               # Data statis (IceBreakers, dll.)
│   ├── App.jsx             # Root komponen & konfigurasi routing
│   ├── main.jsx            # Entry point aplikasi
│   └── index.css           # Global styles
├── index.html
├── vite.config.js
└── package.json
```

---

## 👥 Tim Impactus

| Nama | Peran |
|---|---|
| Aslam Fadholi Safkha | Mentor |
| Nelson Saputra | Front-End Developer |
| Zukovski Tangguh Dirgantara | Front-End Developer |
| Visqya Pebriola Assyura | Front-End Developer |
| Muhammad Finlandia Rahman Mawlaa | Front-End Developer |
| Fil Ardhi | Front-End Developer |

---

## 📄 Lisensi

Proyek ini proyek sederhana yang dibangun untuk memenuhi tugas Capstone Informatics Summit Bootcamp 2026 oleh Tim Impactus.

---

<p align="center">Dibuat dengan ❤️ oleh <strong>Tim Impactus</strong></p>
