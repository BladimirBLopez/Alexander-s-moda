import Link from "next/link";

type OEmbedResponse = {
  embed_product_id: string;
};

async function obtenerIdVideo(url: string) {
  try {
    const res = await fetch(
      `https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    const data: OEmbedResponse = await res.json();
    return data.embed_product_id;
  } catch {
    return null;
  }
}

export default async function VideoTikTok({ url }: { url: string }) {
  const videoId = await obtenerIdVideo(url);

  if (!videoId) return null;

  return (
    <div className="w-full flex flex-col items-center">
      <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--color-bronce)] mb-3">
        Mirá nuestro trabajo
      </p>
      <div className="w-full max-w-[280px] rounded-2xl overflow-hidden border-2 border-[var(--color-hueso)]/40 shadow-lg shadow-black/30">
        <iframe
          src={`https://www.tiktok.com/embed/v2/${videoId}?lang=es-ES`}
          style={{ width: "100%", height: "500px", border: "none", display: "block" }}
          allow="encrypted-media;"
          allowFullScreen
          loading="lazy"
          scrolling="no"
        />
      </div>
      <Link
        href={url}
        className="mt-3 text-xs text-[var(--color-hueso)]/70 underline underline-offset-4 hover:text-[var(--color-hueso)]"
      >
        Ver en TikTok
      </Link>
    </div>
  );
}
