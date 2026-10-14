export function Profil() {
    return (
        <div className="flex flex-col items-center justify-center p-4 w-full transition-colors duration-500">
            {/* Container Utama Profil */}
            <div className="w-full max-w-3xl bg-slate-900/60 border border-slate-800/80 rounded-3xl p-8 backdrop-blur-md shadow-2xl">
                
                {/* Header Profil (Foto & Nama) */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8 border-b border-slate-800/80 pb-8 text-center md:text-left">
                    <div className="w-28 h-28 bg-rose-600 rounded-full flex items-center justify-center text-5xl font-black text-white shadow-lg shadow-rose-900/50 shrink-0 border-4 border-slate-800">
                        I
                    </div>
                    <div className="mt-2 md:mt-4">
                        <h1 className="text-3xl font-extrabold text-white tracking-tight">Impactus</h1>
                        <p className="text-slate-400 mt-1 font-medium">Kelompok Pejuang Fokus 🔥</p>
                        <p className="text-sm text-slate-500 mt-3 leading-relaxed max-w-md">
                            Bergabung sejak 2026. Target harian: 4 sesi Pomodoro dan menyelesaikan minimal 3 tugas.
                        </p>
                    </div>
                </div>

                <h2 className="text-xl font-bold text-white mb-6 tracking-wide">Ringkasan Statistik</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="bg-slate-950/50 border border-slate-800/60 rounded-2xl p-6 text-center hover:bg-slate-800/50 transition-colors shadow-inner">
                        <div className="w-10 h-10 bg-emerald-900/50 rounded-xl flex items-center justify-center mx-auto mb-3 text-emerald-400">
                            ⏱️
                        </div>
                        <p className="text-slate-400 text-sm font-semibold mb-1 uppercase tracking-wider">Total Waktu Belajar</p>
                        <p className="text-3xl font-black text-emerald-400 drop-shadow-md">
                            12<span className="text-lg text-emerald-500/70 font-bold">j</span> 45<span className="text-lg text-emerald-500/70 font-bold">m</span>
                        </p>
                    </div>

                    <div className="bg-slate-950/50 border border-slate-800/60 rounded-2xl p-6 text-center hover:bg-slate-800/50 transition-colors shadow-inner">
                         <div className="w-10 h-10 bg-sky-900/50 rounded-xl flex items-center justify-center mx-auto mb-3 text-sky-400">
                            ✅
                        </div>
                        <p className="text-slate-400 text-sm font-semibold mb-1 uppercase tracking-wider">Tugas Selesai</p>
                        <p className="text-3xl font-black text-sky-400 drop-shadow-md">24</p>
                    </div>

                    <div className="bg-slate-950/50 border border-slate-800/60 rounded-2xl p-6 text-center hover:bg-slate-800/50 transition-colors shadow-inner">
                         <div className="w-10 h-10 bg-rose-900/50 rounded-xl flex items-center justify-center mx-auto mb-3 text-rose-400">
                            🔥
                        </div>
                        <p className="text-slate-400 text-sm font-semibold mb-1 uppercase tracking-wider">Streak Harian</p>
                        <p className="text-3xl font-black text-rose-400 drop-shadow-md">
                            5 <span className="text-lg text-rose-500/70 font-bold">Hari</span>
                        </p>
                    </div>
                </div>

                {/* Info Tambahan */}
                <div className="mt-8 pt-6 border-t border-slate-800/80 text-center">
                    <p className="text-xs text-slate-500 italic">
                        *Data statistik ini nantinya akan terhubung otomatis dengan aktivitasmu di menu Timer dan Tugas.
                    </p>
                </div>
                
            </div>
        </div>
    );
}