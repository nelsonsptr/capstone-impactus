import "./Profil.css";

export function Profil() {
    return (
        <div className="profil-page">
            {/* Container Utama Profil */}
            <div className="profil-container">
                
                {/* Header Profil (Foto & Nama) */}
                <div className="profil-header">
                    <div className="profil-avatar">
                        I
                    </div>
                    <div className="profil-identity">
                        <h1 className="profil-name">Impactus</h1>
                        <p className="profil-group">Kelompok Pejuang Fokus 🔥</p>
                        <p className="profil-description">
                            Bergabung sejak 2026. Target harian: 4 sesi Pomodoro dan menyelesaikan minimal 3 tugas.
                        </p>
                    </div>
                </div>

                <h2 className="profil-section-title">Ringkasan Statistik</h2>
                
                <div className="profil-stats">
                    <div className="profil-stat-card">
                        <div className="profil-stat-icon profil-icon-green">
                            ⏱️
                        </div>
                        <p className="profil-stat-label">Total Waktu Belajar</p>
                        <p className="profil-stat-value">
                            12<span className="profil-stat-unit">j</span> 45<span className="profil-stat-unit">m</span>
                        </p>
                    </div>

                    <div className="profil-stat-card">
                         <div className="profil-stat-icon profil-icon-blue">
                            ✅
                        </div>
                        <p className="profil-stat-label">Tugas Selesai</p>
                        <p className="profil-stat-value">24</p>
                    </div>

                    <div className="profil-stat-card">
                         <div className="profil-stat-icon profil-icon-red">
                            🔥
                        </div>
                        <p className="profil-stat-label">Streak Harian</p>
                        <p className="profil-stat-value">
                            5 <span className="profil-stat-unit">Hari</span>
                        </p>
                    </div>
                </div>

                {/* Info Tambahan */}
                <div className="profil-footer">
                    <p className="profil-note">
                        *Data statistik ini nantinya akan terhubung otomatis dengan aktivitasmu di menu Timer dan Tugas.
                    </p>
                </div>
                
            </div>
        </div>
    );
}