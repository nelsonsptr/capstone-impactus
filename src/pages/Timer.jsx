import React, { useState, useEffect } from "react";
import IceBreaking from "../components/IceBreaking";

export function Timer() {
    const DURATIONS = {
        pomodoro: 25 * 60,
        shortBreak: 5 * 60,
        longBreak: 20 * 60,
    };

    const [mode, setMode] = useState("pomodoro");
    const [timeLeft, setTimeLeft] = useState(DURATIONS.pomodoro);
    const [isRunning, setIsRunning] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);
    const [pomodoroCount, setPomodoroCount] = useState(0);
    useEffect(() => {
        let timer = null;
        if (isRunning && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && isRunning) {
            handleNextMode();
        }
        return () => clearInterval(timer);
    }, [isRunning, timeLeft]);

    const handleNextMode = () => {
        if (mode === "pomodoro") {
            const nextCount = pomodoroCount + 1;
            setPomodoroCount(nextCount);

            if (nextCount >= 4) {
                setMode("longBreak");
                setTimeLeft(DURATIONS.longBreak);
                setPomodoroCount(0);
            } else {
                setMode("shortBreak");
                setTimeLeft(DURATIONS.shortBreak);
            }
        } else {
            setMode("pomodoro");
            setTimeLeft(DURATIONS.pomodoro);
        }

        setIsRunning(true);
        setHasStarted(true);
    };
    const handleModeChange = (newMode) => {
        setIsRunning(false);
        setHasStarted(false);
        setMode(newMode);
        setTimeLeft(DURATIONS[newMode]);
    };

    const handleStartPause = () => {
        setIsRunning(!isRunning);
        if (!hasStarted) setHasStarted(true);
    };
    const handleSkip = () => {
        handleNextMode();
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    };

    const getThemeStyles = () => {
        switch (mode) {
            case "shortBreak":
                return {
                    bgCard: "bg-emerald-950/60 border-emerald-800/50",
                    btnActive: "bg-emerald-600 text-white",
                    accentColor: "text-emerald-400",
                    btnStart: "bg-emerald-500 hover:bg-emerald-400 text-emerald-950",
                };
            case "longBreak":
                return {
                    bgCard: "bg-sky-950/60 border-sky-800/50",
                    btnActive: "bg-sky-600 text-white",
                    accentColor: "text-sky-400",
                    btnStart: "bg-sky-500 hover:bg-sky-400 text-sky-950",
                };
            default:
                return {
                    bgCard: "bg-rose-950/60 border-rose-800/50",
                    btnActive: "bg-rose-600 text-white",
                    accentColor: "text-rose-400",
                    btnStart: "bg-rose-500 hover:bg-rose-400 text-rose-950",
                };
        }
    };

    const theme = getThemeStyles();

    return (
        <div className="flex flex-col items-center justify-center p-2 sm:p-4 transition-colors duration-500 w-full">

            {/* Container Utama Kartu Timer */}
            <div className={`w-full max-w-lg ${theme.bgCard} border rounded-3xl p-5 sm:p-8 backdrop-blur-md shadow-2xl flex flex-col items-center transition-all duration-500`}>

                {/* Navigasi 3 Mode */}
                <div className="flex bg-slate-900/80 p-1 sm:p-1.5 rounded-2xl mb-6 sm:mb-8 w-full border border-slate-800/80">
                    <button
                        onClick={() => handleModeChange("pomodoro")}
                        className={`flex-1 py-1.5 sm:py-2 px-1 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-300 ${mode === "pomodoro" ? theme.btnActive : "text-slate-400 hover:text-slate-200"
                            }`}
                    >
                        Pomodoro
                    </button>
                    <button
                        onClick={() => handleModeChange("shortBreak")}
                        className={`flex-1 py-1.5 sm:py-2 px-1 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-300 ${mode === "shortBreak" ? theme.btnActive : "text-slate-400 hover:text-slate-200"
                            }`}
                    >
                        Short Break
                    </button>
                    <button
                        onClick={() => handleModeChange("longBreak")}
                        className={`flex-1 py-1.5 sm:py-2 px-1 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-300 ${mode === "longBreak" ? theme.btnActive : "text-slate-400 hover:text-slate-200"
                            }`}
                    >
                        Long Break
                    </button>
                </div>

                {/* Angka Timer Utama */}
                <div className="text-6xl sm:text-7xl md:text-8xl font-mono font-extrabold tracking-tight my-2 sm:my-4 text-white drop-shadow-md">
                    {formatTime(timeLeft)}
                </div>

                {/* Kontrol Utama: Start & Skip */}
                <div className="flex items-center justify-center gap-3 sm:gap-4 mt-4 sm:mt-6 w-full">
                    <button
                        onClick={handleStartPause}
                        className={`px-8 sm:px-10 py-3 sm:py-4 text-lg sm:text-xl font-black rounded-2xl shadow-lg transition-transform active:scale-95 uppercase tracking-wider ${theme.btnStart}`}
                    >
                        {isRunning ? "PAUSE" : "START"}
                    </button>

                    {/* Tombol Skip: Muncul hanya jika timer sudah pernah di-START */}
                    {hasStarted && (
                        <button
                            onClick={handleSkip}
                            title="Skip ke sesi berikutnya"
                            className="p-3 sm:p-4 bg-slate-800/80 hover:bg-slate-700 text-slate-200 rounded-2xl border border-slate-700 transition-all active:scale-95"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 sm:h-7 sm:w-7"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2.5}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M13 5l7 7-7 7M5 5l7 7-7 7"
                                />
                            </svg>
                        </button>
                    )}
                </div>

                {/* Indikator Status & Counter Sesi */}
                <div className="mt-8 text-center">
                    <p className="text-sm font-medium text-slate-400">
                        #{pomodoroCount + 1}
                    </p>
                    <p className={`text-base font-bold mt-1 ${theme.accentColor}`}>
                        {mode === "pomodoro"
                            ? "Time to focus!"
                            : mode === "shortBreak"
                                ? "Time for a short break!"
                                : "Time for a long break!"}
                    </p>
                </div>

            </div>

            {/* Tampilkan Komponen Ice Breaking HANYA saat Mode Istirahat */}
            {(mode === "shortBreak" || mode === "longBreak") && (
                <div className="w-full max-w-lg mt-6">
                    {/* Komponen dari Anggota 4 */}
                    {typeof IceBreaking !== "undefined" && IceBreaking ? (
                        <IceBreaking />
                    ) : (
                        <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl text-center text-slate-400 text-sm">
                            Area Fitur Ice Breaking (Anggota 4)
                        </div>
                    )}
                </div>
            )}

        </div>
    );
}

// Default export agar kompatibel dengan cara import apa pun
export default Timer;