import { useState } from "react";
import { getRandomIceBreaker } from "../data/IceBreakers";

const TYPE_LABEL = {
    tebak: "🧩 Tebak-tebakan",
    fakta: "💡 Fakta Unik",
    aksi: "🤸 Aksi Singkat",
};

const TYPE_COLOR = {
    tebak: "bg-rose-500/20 text-rose-300 border-rose-500/40",
    fakta: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    aksi: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
};

export default function IceBreaking() {
    const [current, setCurrent] = useState(() => getRandomIceBreaker());
    const [showAnswer, setShowAnswer] = useState(false);

    const handleRefresh = () => {
        setCurrent(getRandomIceBreaker(current));
        setShowAnswer(false);
    };

    return (
        <div className="w-full bg-slate-900/80 border border-slate-700 rounded-2xl p-5 sm:p-6 backdrop-blur-md shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm sm:text-base font-bold text-slate-200">
                    🎉 Ice Breaking
                </h3>
                <button
                    onClick={handleRefresh}
                    title="Ganti ice breaking"
                    className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 transition-all active:scale-95"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                    </svg>
                </button>
            </div>

            {/* Badge tipe */}
            <div className="mb-3">
                <span
                    className={`inline-block text-xs font-semibold px-3 py-1 rounded-lg border ${TYPE_COLOR[current.type] || "bg-slate-700 text-slate-300 border-slate-600"
                        }`}
                >
                    {TYPE_LABEL[current.type] || "✨ Ice Breaking"}
                </span>
            </div>

            {/* Pertanyaan */}
            <p className="text-sm sm:text-base font-semibold text-slate-100 mb-3">
                {current.question}
            </p>

            {/* Jawaban / tombol reveal */}
            {showAnswer ? (
                <div className="p-3 bg-slate-800/60 border border-slate-700 rounded-xl">
                    <p className="text-sm text-slate-300 italic">{current.answer}</p>
                </div>
            ) : (
                <button
                    onClick={() => setShowAnswer(true)}
                    className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold rounded-xl border border-slate-700 transition-all active:scale-95"
                >
                    Lihat Jawaban 👀
                </button>
            )}
        </div>
    );
}