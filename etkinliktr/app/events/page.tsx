"use client";

import { useEffect, useMemo, useState } from "react";
import { getEvents, type EventItem } from "@/lib/data";
import TurkeyMap from "@/app/_components/ui/TurkeyMap";
import EventCard from "@/app/_components/ui/EventCard";

// Not: getEvents server tarafa bağlı; bu sayfayı client'a çevirdiğimiz için
// veriyi bir kez mount sonrasında fetch API ile alacağız (api/events).

export default function EventsPage() {
  const [all, setAll] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [q, setQ] = useState("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch("/api/events");
        const data = await res.json();
        if (mounted) setAll(data.events as EventItem[]);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    const normalize = (s: string) => {
      const map: Record<string, string> = { Ç: 'c', ç: 'c', Ğ: 'g', ğ: 'g', İ: 'i', I: 'i', ı: 'i', Ö: 'o', ö: 'o', Ş: 's', ş: 's', Ü: 'u', ü: 'u' };
      let r = (s || '').toLowerCase();
      for (const [k, v] of Object.entries(map)) r = r.replace(new RegExp(k, 'g'), v);
      return r;
    };
    const sel = normalize(selectedCity || '');
    return all.filter((e) => {
      const inText = !query || e.title.toLowerCase().includes(query) || e.description.toLowerCase().includes(query);
      const citySource = e.city || '';
      const fallbackAddr = e.venue_address || '';
      const inCity = !selectedCity || normalize(citySource).includes(sel) || (!citySource && normalize(fallbackAddr).includes(sel));
      return inText && inCity;
    });
  }, [all, q, selectedCity]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900">Etkinlikleri Haritada Keşfet</h1>
        <div className="flex items-center gap-2">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Etkinlik ara..."
            className="w-56 rounded-lg border border-slate-300 px-3 py-2"
          />
          <button
            onClick={() => {
              setQ("");
              setSelectedCity(null);
            }}
            className="inline-flex items-center rounded-lg bg-slate-600 hover:bg-slate-700 text-white px-4 py-2"
          >
            Filtreyi Temizle
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Sol: Harita */}
        <div className="lg:col-span-3">
          <TurkeyMap selectedCity={selectedCity} onCitySelect={setSelectedCity} />
        </div>

        {/* Sağ: Liste */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm">
            <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
              <div className="text-slate-700 text-sm">
                {selectedCity ? (
                  <>
                    <span className="font-medium">{selectedCity}</span> için etkinlikler
                  </>
                ) : (
                  <>Tüm etkinlikler</>
                )}
              </div>
              <div className="text-xs text-slate-500">{filtered.length} sonuç</div>
            </div>
            <div className="p-4 grid grid-cols-1 gap-4">
              {loading && <div className="text-slate-500">Yükleniyor...</div>}
              {!loading && filtered.length === 0 && (
                <div className="text-slate-500">Sonuç bulunamadı.</div>
              )}
              {!loading && filtered.map((e) => <EventCard key={e.id} e={e} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
