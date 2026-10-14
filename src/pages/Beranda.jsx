

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export function Beranda() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [userName, setUserName] = useState('Pelajar');

  // Load daftar tugas dari localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('daftarTugas');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setTasks(parsed);
        }
      }
    } catch (err) {
      console.error('Gagal memuat tugas:', err);
    }
  }, []);

  // Simpan kembali jika status tugas diubah dari Beranda
  const handleToggleSelesai = (id) => {
    const updated = tasks.map((t) => {
      if (t.id === id) {
        const nextStatus = t.status === 'Selesai' ? 'Belum Selesai' : 'Selesai';
        return { ...t, status: nextStatus };
      }
      return t;
    });
    setTasks(updated);
    try {
      localStorage.setItem('daftarTugas', JSON.stringify(updated));
    } catch (err) {
      console.error('Gagal memperbarui status tugas:', err);
    }
  };

  // Perhitungan Metrik Statistik
  const totalTugas = tasks.length;
  const tugasSelesai = tasks.filter((t) => t.status === 'Selesai').length;
  const tugasBelumSelesai = totalTugas - tugasSelesai;
  const persentaseSelesai = totalTugas > 0 ? Math.round((tugasSelesai / totalTugas) * 100) : 0;

  // Filter & Urutkan Tugas Prioritas (Prioritas Tinggi diutamakan, lalu Sedang, belum selesai)
  const priorityWeight = { 'Tinggi': 3, 'Sedang': 2, 'Rendah': 1 };

  const tugasPrioritas = tasks
    .filter((t) => t.status !== 'Selesai')
    .sort((a, b) => {
      const weightA = priorityWeight[a.priority] || 1;
      const weightB = priorityWeight[b.priority] || 1;
      if (weightB !== weightA) return weightB - weightA;
      // Jika sama, urutkan berdasarkan deadline terdekat
      if (a.deadline && b.deadline) {
        return new Date(a.deadline) - new Date(b.deadline);
      }
      return 0;
    })
    .slice(0, 3); // Ambil 3 tugas terpenting agar tidak memicu cognitive overload

  // Helper formatting tanggal
  const formatDeadline = (dateString, timeString) => {
    if (!dateString) return 'Tidak ada deadline';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const targetDate = new Date(date);
      targetDate.setHours(0, 0, 0, 0);

      const diffTime = targetDate - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      let badgeLabel = date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });

      if (diffDays === 0) badgeLabel = 'Hari Ini';
      else if (diffDays === 1) badgeLabel = 'Besok';
      else if (diffDays < 0) badgeLabel = `Lewat ${Math.abs(diffDays)} hari`;

      return timeString ? `${badgeLabel} • ${timeString}` : badgeLabel;
    } catch {
      return dateString;
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-10">
      
      {/* ======================================================== */}
      {/* 1. HERO GREETING SECTION (Top Visual Anchor)             */}
      {/* Menggunakan Gutenberg & Z-pattern: Nama -> Motivasi -> CTA */}
      {/* ======================================================== */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 border border-slate-800 p-6 sm:p-8 text-white shadow-xl">
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-1/4 -bottom-12 w-56 h-56 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/80 text-rose-400 text-xs font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              Ruang Belajar & Fokus
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Semangat Belajar, <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-amber-300">{userName}!</span> 👋
            </h1>
            <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
              {tugasBelumSelesai > 0
                ? `Kamu punya ${tugasBelumSelesai} tugas yang menanti. Mulai dari satu langkah kecil sekarang!`
                : 'Luar biasa! Semua tugasmu sudah tuntas. Saatnya rehat sejenak atau susun target baru.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              to="/InputTugas"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 active:scale-95 text-white text-sm font-semibold shadow-lg shadow-rose-950/40 transition-all duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
              </svg>
              Tambah Tugas
            </Link>

            <Link
              to="/Timer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 hover:text-white text-slate-200 border border-slate-700 active:scale-95 text-sm font-semibold transition-all duration-200 shadow-sm"
            >
              <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Buka Timer
            </Link>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. STATISTIK TOTAL TUGAS (Scannable Cards)               */}
      {/* Hierarchy: Big bold number, clear icon, low cognitive load */}
      {/* ======================================================== */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <span>Ringkasan Tugas</span>
              <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-700">
                {totalTugas} Total
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Pantau progres belajarmu secara real-time
            </p>
          </div>
          <Link
            to="/Tugas"
            className="text-xs sm:text-sm font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1 group transition-colors"
          >
            Lihat Semua
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Total Tugas */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Total Tugas
              </p>
              <p className="text-3xl font-black text-slate-900 tracking-tight">
                {totalTugas}
              </p>
              <p className="text-xs text-slate-400">
                Semua tugas terdaftar
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>

          {/* Card 2: Belum Selesai (Active Focus) */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-rose-600 uppercase tracking-wider">
                Perlu Dikerjakan
              </p>
              <p className="text-3xl font-black text-rose-600 tracking-tight">
                {tugasBelumSelesai}
              </p>
              <p className="text-xs text-slate-400">
                Menunggu aksi darimu
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 shrink-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>

          {/* Card 3: Sudah Selesai (Dopamine reward) */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">
                Sudah Selesai
              </p>
              <p className="text-3xl font-black text-emerald-600 tracking-tight">
                {tugasSelesai}
              </p>
              <p className="text-xs text-slate-400">
                Pekerjaan terselesaikan
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>

          {/* Card 4: Progress Bar Rasio */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Tingkat Selesai
              </p>
              <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
                {persentaseSelesai}%
              </span>
            </div>
            <div className="my-2">
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${persentaseSelesai}%` }}
                />
              </div>
            </div>
            <p className="text-xs text-slate-400">
              {totalTugas === 0 ? 'Belum ada data' : `${tugasSelesai} dari ${totalTugas} tugas tuntas`}
            </p>
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. TUGAS PRIORITAS UTAMA (Core Action Driver)             */}
      {/* Dirancang agar pelajar langsung tahu apa yang harus      */}
      {/* dikerjakan tanpa ragu/bingung (Meredakan Decision Fatigue)*/}
      {/* ======================================================== */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                Tugas Prioritas Utama
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Selesaikan tugas penting ini lebih awal untuk mengurangi beban pikiranmu
            </p>
          </div>

          <span className="text-xs text-slate-500 font-medium bg-slate-100 px-3 py-1.5 rounded-xl self-start sm:self-auto">
            Menampilkan {tugasPrioritas.length} tugas paling mendesak
          </span>
        </div>

        {/* Task Cards Container */}
        {tugasPrioritas.length === 0 ? (
          // Empty State jika tidak ada tugas prioritas
          <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-8 sm:p-12 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-3xl">
              🎉
            </div>
            <div className="space-y-1 max-w-sm mx-auto">
              <h3 className="text-base sm:text-lg font-bold text-slate-800">
                Tidak ada tugas prioritas saat ini!
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Semua tugas prioritasmu sudah tuntas, atau kamu belum menambahkan tugas baru.
              </p>
            </div>
            <div className="pt-2 flex justify-center gap-3">
              <Link
                to="/InputTugas"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold transition-colors"
              >
                + Tambah Tugas Baru
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3.5">
            {tugasPrioritas.map((task, idx) => {
              const isTinggi = task.priority === 'Tinggi';
              const isSedang = task.priority === 'Sedang';

              return (
                <div
                  key={task.id}
                  className={`group relative bg-white rounded-2xl border transition-all duration-200 hover:shadow-lg p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                    isTinggi
                      ? 'border-rose-200/80 hover:border-rose-300 bg-gradient-to-r from-rose-50/30 to-white'
                      : isSedang
                      ? 'border-amber-200/80 hover:border-amber-300 bg-gradient-to-r from-amber-50/20 to-white'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {/* Left Indicator Stripe */}
                  <div
                    className={`hidden md:block absolute left-0 top-3 bottom-3 w-1.5 rounded-r-full ${
                      isTinggi ? 'bg-rose-500' : isSedang ? 'bg-amber-500' : 'bg-emerald-500'
                    }`}
                  />

                  {/* Left Side: Checkbox, Badges, Title & Desc */}
                  <div className="flex items-start gap-3.5 flex-1 min-w-0">
                    
                    {/* Quick Complete Button / Checkbox */}
                    <button
                      type="button"
                      onClick={() => handleToggleSelesai(task.id)}
                      title="Tandai Selesai"
                      className="mt-0.5 w-6 h-6 rounded-lg border-2 border-slate-300 hover:border-emerald-500 hover:bg-emerald-50 flex items-center justify-center transition-all duration-150 shrink-0 group-hover:border-slate-400"
                    >
                      <svg className="w-3.5 h-3.5 text-transparent hover:text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                      </svg>
                    </button>

                    <div className="space-y-1.5 flex-1 min-w-0">
                      {/* Row Badge Prioritas & Deadline */}
                      <div className="flex flex-wrap items-center gap-2">
                        {/* Priority Badge */}
                        <span
                          className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                            isTinggi
                              ? 'bg-rose-100/80 text-rose-700 border-rose-200'
                              : isSedang
                              ? 'bg-amber-100/80 text-amber-700 border-amber-200'
                              : 'bg-emerald-100/80 text-emerald-700 border-emerald-200'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isTinggi ? 'bg-rose-600' : isSedang ? 'bg-amber-600' : 'bg-emerald-600'
                            }`}
                          />
                          Prioritas {task.priority || 'Normal'}
                        </span>

                        {/* Deadline Tag */}
                        {(task.deadline || task.tanggal) && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                            <svg className="w-3 h-3 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {formatDeadline(task.deadline || task.tanggal, task.waktu)}
                          </span>
                        )}
                      </div>

                      {/* Judul Tugas */}
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-rose-600 transition-colors truncate">
                        {task.title || task.namaTugas || 'Tanpa Judul'}
                      </h3>

                      {/* Deskripsi (jika ada) */}
                      {(task.description || task.deskripsi) && (
                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                          {task.description || task.deskripsi}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Right Side: Action Trigger (Fokus Sekarang & Detail) */}
                  <div className="flex items-center gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100 justify-end">
                    <button
                      type="button"
                      onClick={() => navigate('/Timer')}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 active:scale-95 text-white text-xs font-semibold shadow-sm transition-all duration-150"
                      title="Mulai sesi Pomodoro untuk tugas ini"
                    >
                      <svg className="w-3.5 h-3.5 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Fokus Sekarang
                    </button>

                    <button
                      type="button"
                      onClick={() => navigate('/Tugas')}
                      className="inline-flex items-center px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
                      title="Buka Papan Tugas"
                    >
                      Detail
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ======================================================== */}
      {/* 4. FOOTER MOTIVATIONAL BANNER (Subtle Encouragement)    */}
      {/* Memberikan penutup visual yang rapi & ramah              */}
      {/* ======================================================== */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
            💡
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-800">
              Tips Belajar Efektif
            </h4>
            <p className="text-xs text-slate-500">
              Gunakan teknik 25 menit Pomodoro untuk menyelesaikan 1 tugas prioritas tanpa gangguan distraksi.
            </p>
          </div>
        </div>

        <Link
          to="/Timer"
          className="text-xs font-bold text-rose-600 hover:text-rose-700 hover:underline shrink-0"
        >
          Coba Teknik Pomodoro &rarr;
        </Link>
      </section>

    </div>
  );
}