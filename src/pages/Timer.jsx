
import React, { useState, useEffect } from "react";
import IceBreaking from "../components/IceBreaking";
import "./Timer.css";

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
        setIsRunning((prev) => !prev);

        if (!hasStarted) {
            setHasStarted(true);
        }
    };

    const handleSkip = () => {
        handleNextMode();
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;

        return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    };

    const getModeLabel = () => {
        switch (mode) {
            case "shortBreak":
                return "Short Break";
            case "longBreak":
                return "Long Break";
            default:
                return "Pomodoro";
        }
    };

    const getModeMessage = () => {
        switch (mode) {
            case "shortBreak":
                return "Saatnya beristirahat sejenak.";
            case "longBreak":
                return "Kerja bagus! Nikmati istirahat panjangmu.";
            default:
                return "Fokus pada satu hal dan selesaikan.";
        }
    };

    return (
        <main className="timer-page">
            <header className="timer-page-header">
                <p className="timer-eyebrow">PRODUCTIVITY TOOL</p>
                <h1 className="timer-page-title">Focus Timer</h1>
                <p className="timer-page-description">
                    Atur waktu fokusmu, selesaikan tugas, dan jangan lupa
                    beristirahat.
                </p>
            </header>

            <section
                className="timer-card card"
                aria-label="Pomodoro timer"
            >
                <div className="timer-mode-tabs" aria-label="Pilih mode timer">
                    <button
                        type="button"
                        onClick={() => handleModeChange("pomodoro")}
                        className={`timer-mode-button ${
                            mode === "pomodoro" ? "active" : ""
                        }`}
                        aria-pressed={mode === "pomodoro"}
                    >
                        Pomodoro
                    </button>

                    <button
                        type="button"
                        onClick={() => handleModeChange("shortBreak")}
                        className={`timer-mode-button ${
                            mode === "shortBreak" ? "active" : ""
                        }`}
                        aria-pressed={mode === "shortBreak"}
                    >
                        Short Break
                    </button>

                    <button
                        type="button"
                        onClick={() => handleModeChange("longBreak")}
                        className={`timer-mode-button ${
                            mode === "longBreak" ? "active" : ""
                        }`}
                        aria-pressed={mode === "longBreak"}
                    >
                        Long Break
                    </button>
                </div>

                <div className="timer-session-label">
                    <span className="timer-status-dot" />
                    {getModeLabel()}
                </div>

                <div
                    className="timer-display"
                    role="timer"
                    aria-label={`Sisa waktu ${formatTime(timeLeft)}`}
                >
                    {formatTime(timeLeft)}
                </div>

                <p className="timer-message">{getModeMessage()}</p>

                <div className="timer-progress-track">
                    <div
                        className="timer-progress-bar"
                        style={{
                            width: `${
                                ((DURATIONS[mode] - timeLeft) /
                                    DURATIONS[mode]) *
                                100
                            }%`,
                        }}
                    />
                </div>

                <div className="timer-controls">
                    <button
                        type="button"
                        onClick={handleStartPause}
                        className="btn btn-primary timer-start-button"
                    >
                        {isRunning ? "Pause" : "Start"}
                    </button>

                    {hasStarted && (
                        <button
                            type="button"
                            onClick={handleSkip}
                            title="Lewati ke sesi berikutnya"
                            aria-label="Lewati ke sesi berikutnya"
                            className="btn btn-secondary timer-skip-button"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                            >
                                <path d="m5 4 10 8-10 8V4Z" />
                                <path d="M19 5v14" />
                            </svg>
                            Skip
                        </button>
                    )}
                </div>

                <div className="timer-session-summary">
                    <div className="timer-session-number">
                        <span className="timer-summary-value">
                            {pomodoroCount + 1}
                        </span>
                        <span className="timer-summary-label">
                            Sesi fokus berikutnya
                        </span>
                    </div>

                    <div className="timer-session-divider" />

                    <div className="timer-session-number">
                        <span className="timer-summary-value">
                            {isRunning ? "Berjalan" : "Jeda"}
                        </span>
                        <span className="timer-summary-label">
                            Status timer
                        </span>
                    </div>
                </div>
            </section>

            {(mode === "shortBreak" || mode === "longBreak") && (
                <section className="timer-ice-breaking">
                    {IceBreaking ? (
                        <IceBreaking />
                    ) : (
                        <div className="timer-ice-breaking-fallback card">
                            <h2>Waktunya menyegarkan pikiran!</h2>
                            <p>
                                Nikmati waktu istirahat sebelum kembali fokus.
                            </p>
                        </div>
                    )}
                </section>
            )}

            <p className="timer-footer-note">
                Tip: setelah empat sesi Pomodoro, kamu akan masuk ke sesi
                istirahat panjang.
            </p>
        </main>
    );
}

export default Timer;