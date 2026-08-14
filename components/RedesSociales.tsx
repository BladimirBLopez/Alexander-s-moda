import Link from "next/link";

const redes = [
  {
    label: "WhatsApp",
    href: "https://wa.me/59177373235",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.39 1.26 4.81L2 22l5.44-1.42a9.87 9.87 0 004.6 1.17h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm5.79 14.05c-.24.68-1.4 1.3-1.93 1.38-.5.08-1.13.11-1.82-.12-.42-.13-.96-.31-1.65-.6-2.9-1.25-4.79-4.16-4.94-4.35-.14-.19-1.18-1.57-1.18-2.99 0-1.43.75-2.13 1.02-2.42.27-.29.58-.36.78-.36.19 0 .39 0 .55.01.18.01.42-.07.65.5.24.58.83 2 .9 2.14.07.15.11.32.02.51-.09.19-.14.3-.27.46-.14.16-.29.36-.41.48-.14.14-.28.29-.12.57.16.28.71 1.17 1.53 1.9 1.05.94 1.94 1.23 2.22 1.37.28.14.44.12.6-.07.16-.19.68-.79.87-1.06.18-.28.36-.23.6-.14.24.09 1.55.73 1.82.86.27.14.44.2.51.32.07.11.07.65-.17 1.32z"/>
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/alexanders.moda",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@alexanders.moda",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16.6 5.82a4.28 4.28 0 01-1.11-2.91h-3.4v13.62a2.6 2.6 0 11-2.6-2.6c.24 0 .47.03.69.09V10.6a5.98 5.98 0 00-.69-.04A6.02 6.02 0 006 16.58a6.02 6.02 0 0012.04 0V9.4a7.66 7.66 0 004.48 1.44V7.44a4.28 4.28 0 01-3.92-1.62z"/>
      </svg>
    ),
  },
];

export default function RedesSociales() {
  return (
    <div className="flex items-center justify-center gap-4">
      {redes.map((red) => (
        <Link
          key={red.label}
          href={red.href}
          aria-label={red.label}
          className="w-11 h-11 rounded-full bg-[var(--color-hueso)]/15 border border-[var(--color-hueso)]/40 flex items-center justify-center text-[var(--color-hueso)] hover:bg-[var(--color-hueso)]/25 transition"
        >
          {red.icon}
        </Link>
      ))}
    </div>
  );
}
