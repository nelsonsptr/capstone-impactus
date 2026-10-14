
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './InputTugas.css';

export function InputTugas() {
  const navigate = useNavigate();

  const [namaTugas, setNamaTugas] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [waktu, setWaktu] = useState('');
  const [pesanPopup, setPesanPopup] = useState('');

  function handleSimpan(e) {
    e.preventDefault();

    if (!namaTugas.trim() || !tanggal || !waktu) {
      setPesanPopup(
        'Nama tugas, tanggal dan waktu deadline wajib diisi.'
      );
      return;
    }

    let dataLama = [];

    try {
      const tersimpan = JSON.parse(
        localStorage.getItem('daftarTugas') || '[]'
      );

      if (Array.isArray(tersimpan)) {
        dataLama = tersimpan;
      }
    } catch (error) {
      console.error('Gagal membaca daftar tugas:', error);
      setPesanPopup(
        'Data tugas gagal dibaca. Silakan periksa penyimpanan browser.'
      );
      return;
    }

    const tugasBaru = {
      id: Date.now(),
      title: namaTugas.trim(),
      status: 'Belum Selesai',
      deadline: tanggal,
      description: deskripsi.trim(),
      priority: 'Sedang',
      waktu: waktu,
    };

    const dataBaru = [...dataLama, tugasBaru];

    try {
      localStorage.setItem(
        'daftarTugas',
        JSON.stringify(dataBaru)
      );

      setPesanPopup('Deadline tugas berhasil disimpan!');
    } catch (error) {
      console.error('Gagal menyimpan daftar tugas:', error);
      setPesanPopup('Tugas gagal disimpan. Silakan coba lagi.');
    }
  }

  function handleBatal() {
    setNamaTugas('');
    setDeskripsi('');
    setTanggal('');
    setWaktu('');
    setPesanPopup('Input deadline berhasil dibatalkan.');
  }

  function tutupPopup() {
    setPesanPopup('');
  }

  return (
    <section className="input-tugas-page">
      <header className="input-tugas-header">
        <h1>Deadline Tugas</h1>
        <p>
          Catat tenggat waktumu agar tugas selesai tepat waktu.
        </p>
      </header>

      <div className="input-tugas-top-action">
        <button
          type="button"
          className="input-tugas-list-button"
          onClick={() => navigate('/Tugas')}
        >
          Lihat Seluruh Daftar Tugas
        </button>
      </div>

      <form className="input-tugas-form" onSubmit={handleSimpan}>
        <div className="input-tugas-field">
          <label htmlFor="namaTugas">Nama Tugas</label>
          <input
            id="namaTugas"
            type="text"
            placeholder="Masukkan nama tugas"
            value={namaTugas}
            onChange={(e) => setNamaTugas(e.target.value)}
          />
        </div>

        <div className="input-tugas-field">
          <label htmlFor="deskripsi">Deskripsi Tugas</label>
          <textarea
            id="deskripsi"
            placeholder="Jelaskan detail tugas yang perlu dikerjakan"
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
            rows={4}
          />
        </div>

        <div className="input-tugas-field">
          <label htmlFor="tanggalDeadline">Tanggal Deadline</label>
          <input
            id="tanggalDeadline"
            type="date"
            value={tanggal}
            onChange={(e) => setTanggal(e.target.value)}
          />
        </div>

        <div className="input-tugas-field">
          <label htmlFor="waktuDeadline">Waktu Deadline</label>
          <input
            id="waktuDeadline"
            type="time"
            value={waktu}
            onChange={(e) => setWaktu(e.target.value)}
          />
        </div>

        <div className="input-tugas-actions">
          <button type="submit" className="input-tugas-save">
            Simpan
          </button>

          <button
            type="button"
            className="input-tugas-cancel"
            onClick={handleBatal}
          >
            Batal
          </button>
        </div>
      </form>

      {pesanPopup && (
        <div className="input-tugas-overlay">
          <div
            className="input-tugas-popup"
            role="dialog"
            aria-modal="true"
            aria-labelledby="judulPopup"
          >
            <h2 id="judulPopup">Informasi</h2>
            <p>{pesanPopup}</p>
            <button type="button" onClick={tutupPopup}>
              Oke
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
