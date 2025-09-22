"use client";

import { useEffect, useMemo, useState } from 'react';

type Scholarship = {
  id: string;
  title: string;
  description?: string;
  eligibilityCriteria?: string;
  applicationStart?: string;
  applicationEnd?: string;
  quota?: number;
  link?: string;
  educationLevel?: string;
  status: string;
  municipality: { id: string; name: string; city: string; district?: string | null };
};

export default function ScholarshipsPage() {
  const [items, setItems] = useState<Scholarship[]>([]);
  const [q, setQ] = useState("");
  const [city, setCity] = useState("");
  const [level, setLevel] = useState("");

  useEffect(() => {
    (async () => {
      const params = new URLSearchParams();
      if (q) params.set('q', q);
      if (city) params.set('city', city);
      if (level) params.set('educationLevel', level);
      params.set('activeOnly', 'true');
      const res = await fetch(`/api/scholarships?${params.toString()}`);
      const data = await res.json();
      setItems(data.scholarships || []);
    })();
  }, [q, city, level]);

  const visible = useMemo(() => items, [items]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900">Belediye Bursları</h1>
        <div className="flex gap-2">
          <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Burs ara..." className="w-56 rounded-lg border border-slate-300 px-3 py-2" />
          <input value={city} onChange={(e)=>setCity(e.target.value)} placeholder="İl" className="w-40 rounded-lg border border-slate-300 px-3 py-2" />
          <input value={level} onChange={(e)=>setLevel(e.target.value)} placeholder="Eğitim seviyesi" className="w-48 rounded-lg border border-slate-300 px-3 py-2" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {visible.length === 0 && (
          <div className="text-slate-500">Kriterlere uygun burs bulunamadı.</div>
        )}
        {visible.map((s) => (
          <a key={s.id} href={`/scholarships/${s.id}`} className="block bg-white border border-slate-200 rounded-xl p-4 hover:shadow-sm">
            <div className="text-sm text-slate-600">{s.municipality.city} • {s.municipality.name}</div>
            <h3 className="text-lg font-semibold text-slate-900">{s.title}</h3>
            {s.educationLevel && <div className="text-sm text-slate-600">🎓 {s.educationLevel}</div>}
            <div className="text-sm text-slate-600">
              {s.applicationStart && <>Başlangıç: {new Date(s.applicationStart).toLocaleDateString('tr-TR')} </>}
              {s.applicationEnd && <>• Bitiş: {new Date(s.applicationEnd).toLocaleDateString('tr-TR')}</>}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
