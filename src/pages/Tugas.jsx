import React, { useState } from 'react';

export function Tugas(){
  // 1. Data state tugas (dengan properti deskripsi & prioritas)
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Membuat desain Wireframe',
      status: 'Selesai',
      deadline: '2026-10-18',
      description: 'Buat wireframe low-fidelity untuk 3 halaman utama',
      priority: 'Tinggi',
    },
    {
      id: 2,
      title: 'Membuat Komponen Papan Tugas',
      status: 'Dalam Proses',
      deadline: '2026-10-22',
      description: 'Integrasi komponen React dengan Tailwind CSS',
      priority: 'Sedang',
    },
    {
      id: 3,
      title: 'Testing integrasi fitur',
      status: 'Belum Selesai',
      deadline: '2026-10-25',
      description: 'Cek seluruh alur pengubahan status dan modal edit',
      priority: 'Rendah',
    },
  ]);

  // State untuk Modal Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  // --- FITUR EDIT (MODAL) ---
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
    if (!currentTask.title.trim()) return;

    setTasks(tasks.map((task) => task.id === currentTask.id ? currentTask : task));
    handleCloseModal();
  };

  // --- FITUR UBAH STATUS TUGAS ---
  const handleStatusChange = (id, newStatus) => {
  setTasks(tasks.map((task) => task.id === id ? { ...task, status: newStatus } : task));
  };

  // --- FITUR HAPUS TUGAS ---
  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Helper untuk warna badge prioritas
  const getPriorityBadgeClass = (priority) => {
    switch (priority) {
      case 'Tinggi':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'Sedang':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Rendah':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-xl font-bold mb-4">Papan Daftar Tugas</h1>
        <button className="bg-blue-600 text-white px-2 py-1 rounded text-xs hover:bg-blue-700">+Tambah</button>
      </div>
      {/* DAFTAR TUGAS */}
      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="p-3 border border-gray-200 rounded bg-white space-y-2"
          >
            {/* Header Tugas: Badge Prioritas, Judul, & Tombol Aksi */}
            <div className="flex items-start justify-between gap-2">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded border font-semibold ${getPriorityBadgeClass(
                      task.priority
                    )}`}
                  >
                    {task.priority}
                  </span>
                  <p
                    className={`text-sm font-medium ${
                      task.status === 'Selesai'
                        ? 'line-through text-gray-400'
                        : 'text-gray-800'
                    }`}
                  >
                    {task.title}
                  </p>
                </div>

                {/* Deskripsi Tugas */}
                {task.description && (
                  <p className="text-xs text-gray-600">{task.description}</p>
                )}
              </div>

              {/* Aksi (Edit, Status, Hapus) */}
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => handleOpenEditModal(task)}
                  className="bg-amber-500 text-white px-2 py-1 rounded text-xs hover:bg-amber-600"
                >
                  Edit
                </button>

                <select
                  value={task.status}
                  onChange={(e) => handleStatusChange(task.id, e.target.value)}
                  className="border border-gray-300 p-1 rounded text-xs bg-gray-50 cursor-pointer"
                >
                  <option value="Belum Selesai">Belum Selesai</option>
                  <option value="Dalam Proses">Dalam Proses</option>
                  <option value="Selesai">Selesai</option>
                </select>

                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600"
                >
                  Hapus
                </button>
              </div>
            </div>

            {/* Footer Tugas: Tanggal Deadline */}
            <div className="text-[11px] text-gray-500 border-t border-gray-100 pt-1.5">
              Deadline: <span className="font-medium text-gray-700">{task.deadline}</span>
            </div>
          </div>
        ))}

        {tasks.length === 0 && (
          <p className="text-center text-gray-400 text-sm py-4">
            Belum ada tugas.
          </p>
        )}
      </div>

      {/* --- POP-UP FORM / MODAL EDIT TUGAS --- */}
      {isModalOpen && currentTask && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-5 w-full max-w-sm shadow-lg border border-gray-200">
            <h2 className="text-base font-bold text-gray-800 mb-3">Edit Tugas</h2>

            <form onSubmit={handleSaveEdit} className="space-y-3">
              {/* Field 1: Nama Tugas */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Nama Tugas
                </label>
                <input
                  type="text"
                  value={currentTask.title}
                  onChange={(e) =>
                    setCurrentTask({ ...currentTask, title: e.target.value })
                  }
                  className="w-full border border-gray-300 p-2 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Field 2: Deskripsi Tugas */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Deskripsi Tugas
                </label>
                <textarea
                  rows="2"
                  value={currentTask.description}
                  onChange={(e) =>
                    setCurrentTask({ ...currentTask, description: e.target.value })
                  }
                  className="w-full border border-gray-300 p-2 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Tambahkan penjelasan singkat..."
                />
              </div>

              {/* Field 3: Prioritas */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Prioritas
                </label>
                <select
                  value={currentTask.priority}
                  onChange={(e) =>
                    setCurrentTask({ ...currentTask, priority: e.target.value })
                  }
                  className="w-full border border-gray-300 p-2 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white cursor-pointer"
                >
                  <option value="Tinggi">Tinggi</option>
                  <option value="Sedang">Sedang</option>
                  <option value="Rendah">Rendah</option>
                </select>
              </div>

              {/* Field 4: Tanggal Deadline */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Tanggal Deadline
                </label>
                <input
                  type="date"
                  value={currentTask.deadline}
                  onChange={(e) =>
                    setCurrentTask({ ...currentTask, deadline: e.target.value })
                  }
                  className="w-full border border-gray-300 p-2 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Tombol Aksi Modal */}
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-3 py-1.5 border border-gray-300 text-gray-600 rounded text-xs hover:bg-gray-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-blue-600 text-white rounded text-xs font-medium hover:bg-blue-700"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}