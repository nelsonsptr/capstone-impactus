
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Tugas.css';

function bacaDaftarTugas() {
  try {
    const data = JSON.parse(localStorage.getItem('daftarTugas') || '[]');

    if (!Array.isArray(data)) return [];

    return data.map((task) => ({
      id: task.id ?? Date.now() + Math.random(),
      title: task.title ?? task.namaTugas ?? '',
      status: task.status ?? 'Belum Selesai',
      deadline: task.deadline ?? task.tanggal ?? '',
      description: task.description ?? task.deskripsi ?? '',
      priority: task.priority ?? 'Sedang',
      waktu: task.waktu ?? '',
    }));
  } catch (error) {
    console.error('Gagal membaca daftar tugas:', error);
    return [];
  }
}

export function Tugas() {
  const navigate = useNavigate();
  const location = useLocation();

  const [tasks, setTasks] = useState(bacaDaftarTugas);
  const [pesanPopup, setPesanPopup] = useState('');
  const [konfirmasiHapus, setKonfirmasiHapus] = useState(null);
  const [pesanHapus, setPesanHapus] = useState('');

  const [filterStatus, setFilterStatus] = useState('Semua');
  const [filterPriority, setFilterPriority] = useState('Semua');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  // Notifikasi dari halaman lain
  useEffect(() => {
    if (location.state?.pesan) {
      setPesanPopup(location.state.pesan);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  // Simpan daftar tugas
  useEffect(() => {
    localStorage.setItem('daftarTugas', JSON.stringify(tasks));
  }, [tasks]);

  // Edit tugas
  const handleOpenEditModal = (task) => {
    setCurrentTask({ ...task });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentTask(null);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();

    if (!currentTask?.title.trim()) return;

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === currentTask.id ? currentTask : task
      )
    );

    handleCloseModal();
    setPesanPopup('Perubahan tugas berhasil disimpan.');
  };

  // Ubah status
  const handleStatusChange = (id, newStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  };

  // Hapus tugas dengan konfirmasi
  const handleDeleteTask = (id) => {
    const taskToDelete = tasks.find((task) => task.id === id);

    if (taskToDelete) {
      setKonfirmasiHapus(taskToDelete);
    }
  };

  const konfirmasiHapusTask = () => {
    if (!konfirmasiHapus) return;

    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== konfirmasiHapus.id)
    );

    setKonfirmasiHapus(null);
    setPesanHapus('Tugas berhasil dihapus.');
  };

  const batalHapusTask = () => {
    setKonfirmasiHapus(null);
  };

  // Class badge prioritas
  const getPriorityBadgeClass = (priority) => {
    switch (priority) {
      case 'Tinggi':
        return 'priority-high';
      case 'Sedang':
        return 'priority-medium';
      case 'Rendah':
        return 'priority-low';
      default:
        return 'priority-default';
    }
  };

  // Filter tugas
  const filteredTasks = tasks.filter((task) => {
    const matchStatus =
      filterStatus === 'Semua' || task.status === filterStatus;

    const matchPriority =
      filterPriority === 'Semua' || task.priority === filterPriority;

    return matchStatus && matchPriority;
  });

  // Format tanggal
  const formatDeadline = (deadline) => {
    if (!deadline) return 'Tidak ditentukan';

    const date = new Date(`${deadline}T00:00:00`);

    if (Number.isNaN(date.getTime())) return deadline;

    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="tugas-page">
      {/* Header */}
      <header className="tugas-page-header">
        <div>
          <span className="tugas-eyebrow">MANAJEMEN BELAJAR</span>
          <h1 className="tugas-page-title">Papan Daftar Tugas</h1>
          <p className="tugas-page-description">
            Atur prioritas, pantau progres, dan selesaikan tugasmu.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate('/InputTugas')}
          className="tugas-btn tugas-btn-primary"
        >
          <span aria-hidden="true">+</span> Tambah Tugas
        </button>
      </header>

      {/* Ringkasan */}
      <section className="tugas-summary-grid">
        <article className="tugas-summary-card">
          <span className="tugas-summary-label">Total Tugas</span>
          <strong className="tugas-summary-value">{tasks.length}</strong>
        </article>

        <article className="tugas-summary-card">
          <span className="tugas-summary-label">Belum Selesai</span>
          <strong className="tugas-summary-value">
            {tasks.filter((task) => task.status === 'Belum Selesai').length}
          </strong>
        </article>

        <article className="tugas-summary-card">
          <span className="tugas-summary-label">Dalam Proses</span>
          <strong className="tugas-summary-value">
            {tasks.filter((task) => task.status === 'Dalam Proses').length}
          </strong>
        </article>

        <article className="tugas-summary-card">
          <span className="tugas-summary-label">Selesai</span>
          <strong className="tugas-summary-value tugas-value-success">
            {tasks.filter((task) => task.status === 'Selesai').length}
          </strong>
        </article>
      </section>

      {/* Filter */}
      <section className="tugas-filter-panel">
        <div className="tugas-filter-heading">
          <div>
            <h2 className="tugas-section-title">Daftar Tugas</h2>
            <p className="tugas-muted">
              Menampilkan {filteredTasks.length} dari {tasks.length} tugas
            </p>
          </div>
        </div>

        <div className="tugas-filter-controls">
          <label className="tugas-filter-field">
            <span>Status</span>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="form-control"
            >
              <option value="Semua">Semua Status</option>
              <option value="Belum Selesai">Belum Selesai</option>
              <option value="Dalam Proses">Dalam Proses</option>
              <option value="Selesai">Selesai</option>
            </select>
          </label>

          <label className="tugas-filter-field">
            <span>Prioritas</span>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="form-control"
            >
              <option value="Semua">Semua Prioritas</option>
              <option value="Tinggi">Tinggi</option>
              <option value="Sedang">Sedang</option>
              <option value="Rendah">Rendah</option>
            </select>
          </label>
        </div>
      </section>

      {/* Pesan setelah hapus */}
      {pesanHapus && (
        <div className="tugas-inline-notice" role="status">
          <span>{pesanHapus}</span>
          <button
            type="button"
            onClick={() => setPesanHapus('')}
            aria-label="Tutup notifikasi"
          >
            ×
          </button>
        </div>
      )}

      {/* Daftar tugas */}
      <section className="tugas-list">
        {filteredTasks.map((task) => (
          <article
            key={task.id}
            className={`tugas-card ${
              task.status === 'Selesai' ? 'tugas-card-completed' : ''
            }`}
          >
            <div className="tugas-card-main">
              <div className="tugas-card-badges">
                <span
                  className={`tugas-priority-badge ${getPriorityBadgeClass(
                    task.priority
                  )}`}
                >
                  <span className="tugas-badge-dot" />
                  Prioritas {task.priority}
                </span>

                <span
                  className={`tugas-status-badge ${
                    task.status === 'Selesai'
                      ? 'status-completed'
                      : task.status === 'Dalam Proses'
                        ? 'status-progress'
                        : 'status-pending'
                  }`}
                >
                  {task.status}
                </span>
              </div>

              <h3 className="tugas-card-title">{task.title || 'Tanpa Judul'}</h3>

              {task.description && (
                <p className="tugas-card-description">{task.description}</p>
              )}

              <div className="tugas-card-deadline">
                <span aria-hidden="true">▦</span>
                <span>
                  Deadline: <strong>{formatDeadline(task.deadline)}</strong>
                </span>
                {task.waktu && <span>• {task.waktu}</span>}
              </div>
            </div>

            <div className="tugas-card-actions">
              <label className="tugas-status-field">
                <span>Status tugas</span>
                <select
                  value={task.status}
                  onChange={(e) =>
                    handleStatusChange(task.id, e.target.value)
                  }
                  className="form-control"
                  aria-label={`Status tugas ${task.title}`}
                >
                  <option value="Belum Selesai">Belum Selesai</option>
                  <option value="Dalam Proses">Dalam Proses</option>
                  <option value="Selesai">Selesai</option>
                </select>
              </label>

              <div className="tugas-action-buttons">
                <button
                  type="button"
                  onClick={() => handleOpenEditModal(task)}
                  className="tugas-btn tugas-btn-secondary"
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => handleDeleteTask(task.id)}
                  className="tugas-btn tugas-btn-danger-outline"
                >
                  Hapus
                </button>
              </div>
            </div>
          </article>
        ))}

        {filteredTasks.length === 0 && (
          <div className="tugas-empty-state">
            <div className="tugas-empty-icon" aria-hidden="true">
              {tasks.length === 0 ? '📝' : '🔎'}
            </div>
            <h3>
              {tasks.length === 0
                ? 'Belum ada tugas'
                : 'Tidak ada tugas yang cocok'}
            </h3>
            <p>
              {tasks.length === 0
                ? 'Tambahkan tugas pertamamu untuk mulai mengatur aktivitas belajar.'
                : 'Coba ubah filter status atau prioritas untuk melihat tugas lainnya.'}
            </p>

            {tasks.length === 0 && (
              <button
                type="button"
                onClick={() => navigate('/InputTugas')}
                className="tugas-btn tugas-btn-primary"
              >
                + Tambah Tugas
              </button>
            )}
          </div>
        )}
      </section>

      {/* Modal Edit */}
      {isModalOpen && currentTask && (
        <div
          className="tugas-modal-overlay"
          onClick={handleCloseModal}
        >
          <section
            className="tugas-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="judulEditTugas"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="tugas-modal-header">
              <div>
                <span className="tugas-eyebrow">MANAJEMEN TUGAS</span>
                <h2 id="judulEditTugas" className="tugas-modal-title">
                  Edit Tugas
                </h2>
              </div>
              <button
                type="button"
                className="tugas-modal-close"
                onClick={handleCloseModal}
                aria-label="Tutup modal"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="tugas-modal-form">
              <label className="tugas-form-field">
                <span>Nama Tugas</span>
                <input
                  type="text"
                  value={currentTask.title}
                  onChange={(e) =>
                    setCurrentTask({
                      ...currentTask,
                      title: e.target.value,
                    })
                  }
                  className="form-control"
                  required
                />
              </label>

              <label className="tugas-form-field">
                <span>Deskripsi Tugas</span>
                <textarea
                  rows={3}
                  value={currentTask.description}
                  onChange={(e) =>
                    setCurrentTask({
                      ...currentTask,
                      description: e.target.value,
                    })
                  }
                  className="form-control"
                  placeholder="Tambahkan penjelasan singkat..."
                />
              </label>

              <label className="tugas-form-field">
                <span>Prioritas</span>
                <select
                  value={currentTask.priority}
                  onChange={(e) =>
                    setCurrentTask({
                      ...currentTask,
                      priority: e.target.value,
                    })
                  }
                  className="form-control"
                >
                  <option value="Tinggi">Tinggi</option>
                  <option value="Sedang">Sedang</option>
                  <option value="Rendah">Rendah</option>
                </select>
              </label>

              <label className="tugas-form-field">
                <span>Tanggal Deadline</span>
                <input
                  type="date"
                  value={currentTask.deadline}
                  onChange={(e) =>
                    setCurrentTask({
                      ...currentTask,
                      deadline: e.target.value,
                    })
                  }
                  className="form-control"
                  required
                />
              </label>

              <div className="tugas-modal-actions">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="btn btn-secondary"
                >
                  Batal
                </button>
                <button type="submit" className="btn btn-primary">
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </section>
        </div>
      )}

      {/* Modal notifikasi */}
      {pesanPopup && (
        <div
          className="tugas-modal-overlay"
          onClick={() => setPesanPopup('')}
        >
          <section
            className="tugas-modal tugas-notification-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="judulPemberitahuan"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="tugas-modal-header">
              <h2 id="judulPemberitahuan" className="tugas-modal-title">
                Pemberitahuan
              </h2>
              <button
                type="button"
                className="tugas-modal-close"
                onClick={() => setPesanPopup('')}
                aria-label="Tutup pemberitahuan"
              >
                ×
              </button>
            </div>

            <p className="tugas-modal-message">{pesanPopup}</p>

            <div className="tugas-modal-actions">
              <button
                type="button"
                onClick={() => setPesanPopup('')}
                className="btn btn-primary"
              >
                Oke
              </button>
            </div>
          </section>
        </div>
      )}

      {/* Modal konfirmasi hapus */}
      {konfirmasiHapus && (
        <div
          className="tugas-modal-overlay"
          onClick={batalHapusTask}
        >
          <section
            className="tugas-modal"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="judulKonfirmasiHapus"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="tugas-modal-header">
              <h2
                id="judulKonfirmasiHapus"
                className="tugas-modal-title"
              >
                Konfirmasi Hapus
              </h2>
              <button
                type="button"
                className="tugas-modal-close"
                onClick={batalHapusTask}
                aria-label="Tutup konfirmasi"
              >
                ×
              </button>
            </div>

            <p className="tugas-modal-message">
              Apakah kamu yakin ingin menghapus tugas{' '}
              <strong>{konfirmasiHapus.title || 'Tanpa Judul'}</strong>?
              Tindakan ini tidak dapat dibatalkan.
            </p>

            <div className="tugas-modal-actions">
              <button
                type="button"
                onClick={batalHapusTask}
                className="btn btn-secondary"
              >
                Batal
              </button>

              <button
                type="button"
                onClick={konfirmasiHapusTask}
                className="tugas-btn tugas-btn-danger"
              >
                Ya, Hapus
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
