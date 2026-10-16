
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Beranda.css';

export function Beranda() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [userName] = useState('Pelajar');

  // Memuat daftar tugas dari localStorage
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

  // Menandai tugas selesai atau belum selesai
  const handleToggleSelesai = (id) => {
    const updated = tasks.map((task) => {
      if (task.id === id) {
        const nextStatus =
          task.status === 'Selesai' ? 'Belum Selesai' : 'Selesai';

        return { ...task, status: nextStatus };
      }

      return task;
    });

    setTasks(updated);

    try {
      localStorage.setItem('daftarTugas', JSON.stringify(updated));
    } catch (err) {
      console.error('Gagal memperbarui status tugas:', err);
    }
  };

  // Statistik tugas
  const totalTugas = tasks.length;
  const tugasSelesai = tasks.filter(
    (task) => task.status === 'Selesai'
  ).length;
  const tugasBelumSelesai = totalTugas - tugasSelesai;

  const persentaseSelesai =
    totalTugas > 0
      ? Math.round((tugasSelesai / totalTugas) * 100)
      : 0;

  // Mengurutkan tugas berdasarkan prioritas dan deadline
  const priorityWeight = {
    Tinggi: 3,
    Sedang: 2,
    Rendah: 1,
  };

  const tugasPrioritas = tasks
    .filter((task) => task.status !== 'Selesai')
    .sort((a, b) => {
      const weightA = priorityWeight[a.priority] || 1;
      const weightB = priorityWeight[b.priority] || 1;

      if (weightB !== weightA) {
        return weightB - weightA;
      }

      if (a.deadline && b.deadline) {
        return new Date(a.deadline) - new Date(b.deadline);
      }

      return 0;
    })
    .slice(0, 3);

  // Format tanggal deadline
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
      const diffDays = Math.ceil(
        diffTime / (1000 * 60 * 60 * 24)
      );

      let badgeLabel = date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });

      if (diffDays === 0) badgeLabel = 'Hari Ini';
      else if (diffDays === 1) badgeLabel = 'Besok';
      else if (diffDays < 0) {
        badgeLabel = `Lewat ${Math.abs(diffDays)} hari`;
      }

      return timeString
        ? `${badgeLabel} • ${timeString}`
        : badgeLabel;
    } catch {
      return dateString;
    }
  };

  return (
    <div className="beranda-page">
      {/* ===== 1. Hero ===== */}
      <section className="beranda-hero">
        <div className="beranda-hero-decoration beranda-decoration-one" />
        <div className="beranda-hero-decoration beranda-decoration-two" />

        <div className="beranda-hero-content">
          <div className="beranda-hero-text">
            <div className="beranda-hero-badge">
              <span className="beranda-hero-badge-dot" />
              Ruang Belajar &amp; Fokus
            </div>

            <h1 className="beranda-hero-title">
              Semangat Belajar,{' '}
              <span className="beranda-hero-highlight">
                {userName}!
              </span>{' '}
              👋
            </h1>

            <p className="beranda-hero-description">
              {tugasBelumSelesai > 0
                ? `Kamu punya ${tugasBelumSelesai} tugas yang menanti. Mulai dari satu langkah kecil sekarang!`
                : 'Luar biasa! Semua tugasmu sudah tuntas. Saatnya rehat sejenak atau susun target baru.'}
            </p>
          </div>

          <div className="beranda-hero-actions">
            <Link
              to="/InputTugas"
              className="beranda-btn beranda-btn-primary"
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Tambah Tugas
            </Link>

            <Link
              to="/Timer"
              className="beranda-btn beranda-btn-secondary"
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Buka Timer
            </Link>
          </div>
        </div>
      </section>

      {/* ===== 2. Ringkasan Statistik ===== */}
      <section className="beranda-stats-section">
        <div className="beranda-section-header">
          <div>
            <h2 className="beranda-section-title">
              <span>Ringkasan Tugas</span>
              <span className="beranda-total-badge">
                {totalTugas} Total
              </span>
            </h2>

            <p className="beranda-section-description">
              Pantau progres belajarmu secara real-time
            </p>
          </div>

          <Link to="/Tugas" className="beranda-link">
            Lihat Semua
            <svg
              className="beranda-link-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>

        <div className="beranda-stats-grid">
          {/* Total tugas */}
          <div className="beranda-stat-card">
            <div className="beranda-stat-info">
              <p className="beranda-stat-label">Total Tugas</p>
              <p className="beranda-stat-value">{totalTugas}</p>
              <p className="beranda-stat-note">
                Semua tugas terdaftar
              </p>
            </div>

            <div className="beranda-stat-icon beranda-icon-blue">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
          </div>

          {/* Tugas belum selesai */}
          <div className="beranda-stat-card">
            <div className="beranda-stat-info">
              <p className="beranda-stat-label beranda-text-blue">
                Perlu Dikerjakan
              </p>
              <p className="beranda-stat-value beranda-text-blue">
                {tugasBelumSelesai}
              </p>
              <p className="beranda-stat-note">
                Menunggu aksi darimu
              </p>
            </div>

            <div className="beranda-stat-icon beranda-icon-blue-light">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>

          {/* Tugas selesai */}
          <div className="beranda-stat-card">
            <div className="beranda-stat-info">
              <p className="beranda-stat-label beranda-text-green">
                Sudah Selesai
              </p>
              <p className="beranda-stat-value beranda-text-green">
                {tugasSelesai}
              </p>
              <p className="beranda-stat-note">
                Pekerjaan terselesaikan
              </p>
            </div>

            <div className="beranda-stat-icon beranda-icon-green">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>

          {/* Persentase selesai */}
          <div className="beranda-stat-card beranda-progress-card">
            <div className="beranda-progress-header">
              <p className="beranda-stat-label">Tingkat Selesai</p>
              <span className="beranda-progress-percentage">
                {persentaseSelesai}%
              </span>
            </div>

            <div className="beranda-progress-track">
              <div
                className="beranda-progress-fill"
                style={{ width: `${persentaseSelesai}%` }}
              />
            </div>

            <p className="beranda-stat-note">
              {totalTugas === 0
                ? 'Belum ada data'
                : `${tugasSelesai} dari ${totalTugas} tugas tuntas`}
            </p>
          </div>
        </div>
      </section>

      {/* ===== 3. Tugas Prioritas ===== */}
      <section className="beranda-priority-section">
        <div className="beranda-section-header beranda-priority-header">
          <div>
            <div className="beranda-priority-title-row">
              <span className="beranda-priority-indicator">
                <span className="beranda-priority-indicator-pulse" />
                <span className="beranda-priority-indicator-dot" />
              </span>

              <h2 className="beranda-section-title">
                Tugas Prioritas Utama
              </h2>
            </div>

            <p className="beranda-section-description">
              Selesaikan tugas penting ini lebih awal untuk mengurangi
              beban pikiranmu
            </p>
          </div>

          <span className="beranda-priority-count">
            Menampilkan {tugasPrioritas.length} tugas paling mendesak
          </span>
        </div>

        {tugasPrioritas.length === 0 ? (
          <div className="beranda-empty-state">
            <div className="beranda-empty-icon">🎉</div>

            <div className="beranda-empty-text">
              <h3>Tidak ada tugas prioritas saat ini!</h3>
              <p>
                Semua tugas prioritasmu sudah tuntas, atau kamu belum
                menambahkan tugas baru.
              </p>
            </div>

            <Link
              to="/InputTugas"
              className="beranda-btn beranda-btn-dark"
            >
              + Tambah Tugas Baru
            </Link>
          </div>
        ) : (
          <div className="beranda-priority-list">
            {tugasPrioritas.map((task) => {
              const isTinggi = task.priority === 'Tinggi';
              const isSedang = task.priority === 'Sedang';

              const priorityClass = isTinggi
                ? 'beranda-priority-high'
                : isSedang
                  ? 'beranda-priority-medium'
                  : 'beranda-priority-low';

              return (
                <div
                  key={task.id}
                  className={`beranda-task-card ${priorityClass}`}
                >
                  <span className="beranda-task-stripe" />

                  <div className="beranda-task-main">
                    <button
                      type="button"
                      onClick={() => handleToggleSelesai(task.id)}
                      title="Tandai Selesai"
                      aria-label={`Tandai ${task.title || task.namaTugas || 'tugas'} selesai`}
                      className="beranda-task-checkbox"
                    >
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="3"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </button>

                    <div className="beranda-task-content">
                      <div className="beranda-task-tags">
                        <span className="beranda-priority-badge">
                          <span className="beranda-badge-dot" />
                          Prioritas {task.priority || 'Normal'}
                        </span>

                        {(task.deadline || task.tanggal) && (
                          <span className="beranda-deadline-badge">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                            {formatDeadline(
                              task.deadline || task.tanggal,
                              task.waktu
                            )}
                          </span>
                        )}
                      </div>

                      <h3 className="beranda-task-title">
                        {task.title || task.namaTugas || 'Tanpa Judul'}
                      </h3>

                      {(task.description || task.deskripsi) && (
                        <p className="beranda-task-description">
                          {task.description || task.deskripsi}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="beranda-task-actions">
                    <button
                      type="button"
                      onClick={() => navigate('/Timer')}
                      className="beranda-task-focus-btn"
                      title="Mulai sesi Pomodoro untuk tugas ini"
                    >
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2.5"
                          d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Fokus Sekarang
                    </button>

                    <button
                      type="button"
                      onClick={() => navigate('/Tugas')}
                      className="beranda-task-detail-btn"
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

      {/* ===== 4. Tips Belajar ===== */}
      <section className="beranda-tips-banner">
        <div className="beranda-tips-content">
          <div className="beranda-tips-icon">💡</div>

          <div>
            <h4 className="beranda-tips-title">
              Tips Belajar Efektif
            </h4>
            <p className="beranda-tips-description">
              Gunakan teknik 25 menit Pomodoro untuk menyelesaikan 1 tugas
              prioritas tanpa gangguan distraksi.
            </p>
          </div>
        </div>

        <Link to="/Timer" className="beranda-tips-link">
          Coba Teknik Pomodoro →
        </Link>
      </section>
    </div>
  );
}
