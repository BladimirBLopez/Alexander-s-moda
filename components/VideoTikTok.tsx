import Link from "next/link";

const VIDEO_URL = "https://res.cloudinary.com/dkq95jus0/video/upload/v1786745176/Video-uniforme.mp4";
const CUENTA_TIKTOK = "https://www.tiktok.com/@alexanders.moda";

export default function VideoTikTok() {
  return (
    <div className="w-full flex flex-col items-center">
      <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--color-bronce)] mb-3">
        Mirá nuestro trabajo
      </p>
      <div className="w-full max-w-[280px] rounded-2xl overflow-hidden border-2 border-[var(--color-hueso)]/40 shadow-lg shadow-black/30">
        <video
          src={VIDEO_URL}
          controls
          playsInline
          preload="metadata"
          className="w-full h-auto block"
        />
      </div>
      <Link
        href={CUENTA_TIKTOK}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center gap-2 bg-black text-white text-xs font-semibold uppercase tracking-[0.08em] px-5 py-2.5 rounded-full shadow-md hover:opacity-90 transition"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.592 2.592 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48Z" />
        </svg>
        Ver en TikTok
      </Link>
    </div>
  );
}
