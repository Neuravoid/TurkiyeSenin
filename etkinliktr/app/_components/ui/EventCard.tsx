import Link from "next/link";
import type { Route } from "next";
import { EventItem } from "@/lib/data";

export default function EventCard({ e }: { e: EventItem }) {
  return (
    <Link
      href={`/events/${e.id}` as Route}
      className="block bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
    >
      {/* İsteğe bağlı görsel alanı (ileride resim eklenirse) */}
      {/* {e.images?.[0] && (
        <img src={e.images[0]} alt={e.title} className="w-full h-40 object-cover" />
      )} */}
      <div className="p-4 space-y-3">
        <div className="text-sm text-slate-500">
          {new Date(e.start_datetime).toLocaleString("tr-TR")}
        </div>
        <h3 className="text-lg font-semibold text-slate-900 line-clamp-2">{e.title}</h3>
        <div className="text-sm text-slate-600">📍 {e.venue_name}</div>
        <div className="text-sm text-slate-700 flex items-center gap-4">
          <span>💰 {e.is_free ? "Ücretsiz" : `${e.price}₺`}</span>
          <span>👥 {e.current_registrations}/{e.capacity}</span>
        </div>
      </div>
    </Link>
  );
}
