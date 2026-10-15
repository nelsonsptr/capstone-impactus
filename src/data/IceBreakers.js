// Daftar ice breaking sederhana: tebak-tebakan, fakta unik, aksi singkat
export const iceBreakers = [
    {
        type: "tebak",
        question: "Kenapa programmer suka kopi?",
        answer: "Karena tanpa kopi, kodenya jadi 'undefined' 😴",
    },
    {
        type: "tebak",
        question: "Apa bedanya kucing dan programmer?",
        answer: "Kucing punya 9 nyawa, programmer punya 9 tab browser yang terbuka 🐱",
    },
    {
        type: "tebak",
        question: "Binatang apa yang paling jago coding?",
        answer: "Kumbang... karena suka 'debugging' 🐞",
    },
    {
        type: "tebak",
        question: "Kenapa HTML disebut bukan bahasa pemrograman?",
        answer: "Karena dia cuma 'markup', bukan 'ngoding' 😄",
    },
    {
        type: "fakta",
        question: "Tahukah kamu?",
        answer: "Istirahat 5 menit tiap 25 menit kerja bisa meningkatkan fokus hingga 30% 🧠",
    },
    {
        type: "fakta",
        question: "Fakta unik:",
        answer: "Mata manusia butuh 20 detik melihat objek jauh untuk 'reset' setelah lama menatap layar 👀",
    },
    {
        type: "fakta",
        question: "Fakta unik:",
        answer: "Otak manusia hanya bisa fokus penuh sekitar 45–90 menit sebelum butuh istirahat ⏱️",
    },
    {
        type: "aksi",
        question: "Ayo lakukan!",
        answer: "Berdiri, angkat kedua tangan ke atas, tarik napas 5 detik, buang perlahan. Ulangi 3x 🙆",
    },
    {
        type: "aksi",
        question: "Tantangan 30 detik:",
        answer: "Regangkan leher ke kiri dan kanan, tahan masing-masing 10 detik 🧘",
    },
    {
        type: "aksi",
        question: "Tantangan mata:",
        answer: "Tatap objek paling jauh yang bisa kamu lihat selama 20 detik, lalu kedip 10x 👁️",
    },
];

// Ambil ice breaking acak, hindari pengulangan yang sama dengan sebelumnya
export function getRandomIceBreaker(exclude = null) {
    const pool = exclude
        ? iceBreakers.filter((i) => i.question !== exclude.question)
        : iceBreakers;
    return pool[Math.floor(Math.random() * pool.length)];
}