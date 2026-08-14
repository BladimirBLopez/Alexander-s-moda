import Link from "next/link";

const VIDEO_URL = "https://res.cloudinary.com/dkq95jus0/video/upload/juan-santiago/video-uniforme.mp4";
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
        className="mt-3 text-xs text-[var(--color-hueso)]/70 underline underline-offset-4 hover:text-[var(--color-hueso)]"
      >
        Ver en TikTok
      </Link>
    </div>
  );
}
