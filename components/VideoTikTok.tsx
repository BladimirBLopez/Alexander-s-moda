type OEmbedResponse = {
  html: string;
};

async function obtenerEmbed(url: string) {
  try {
    const res = await fetch(
      `https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    const data: OEmbedResponse = await res.json();
    return data.html;
  } catch {
    return null;
  }
}

export default async function VideoTikTok({ url }: { url: string }) {
  const html = await obtenerEmbed(url);

  if (!html) return null;

  return (
    <div className="w-full flex flex-col items-center">
      <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--color-bronce)] mb-3">
        Mirá nuestro trabajo
      </p>
      <div
        className="w-full max-w-[280px] rounded-2xl overflow-hidden border-2 border-[var(--color-hueso)]/40 shadow-lg shadow-black/30"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
