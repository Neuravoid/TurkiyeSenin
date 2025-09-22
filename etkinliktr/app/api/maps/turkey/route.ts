import { NextResponse } from "next/server";
import { feature } from "topojson-client";

// Küçük (basitleştirilmiş) bir Türkiye TopoJSON'u embed ediyoruz.
// Kaynak: https://cdn.jsdelivr.net/npm/turkey-topojson@1.0.2/geo/turkey-provinces.json
// Not: Üretimde daha detaylı bir veri seti kullanabilirsiniz.

const CANDIDATE_URLS = [
  // jsDelivr (package)
  "https://cdn.jsdelivr.net/npm/turkey-topojson@1.0.2/geo/turkey-provinces.json",
  // jsDelivr (gh)
  "https://cdn.jsdelivr.net/gh/atakanertugrul/turkey-geojson/geo/province/topojson/0.001.json",
  // unpkg (if mirrored)
  "https://unpkg.com/turkey-topojson@1.0.2/geo/turkey-provinces.json",
  // GitHub raw (last resort; lower cacheability)
  "https://raw.githubusercontent.com/atakanertugrul/turkey-geojson/master/geo/province/topojson/0.001.json",
  // Direct GeoJSON fallbacks
  "https://cdn.jsdelivr.net/gh/atakanertugrul/turkey-geojson/geo/province/geojson/0.001.json",
  "https://raw.githubusercontent.com/atakanertugrul/turkey-geojson/master/geo/province/geojson/0.001.json",
];

export async function GET() {
  try {
    let data: any | null = null;
    for (const url of CANDIDATE_URLS) {
      try {
        const controller = new AbortController();
        const t = setTimeout(() => controller.abort(), 6000);
        const res = await fetch(url, {
          cache: "force-cache",
          headers: {
            "User-Agent": "Mozilla/5.0 (compatible; EtkinlikTR/1.0)",
            Accept: "application/json,application/topojson;q=0.9,*/*;q=0.8",
          },
          signal: controller.signal,
        });
        clearTimeout(t);
        if (res.ok) {
          data = await res.json();
          break;
        }
      } catch (_) {
        // try next URL
      }
    }
    if (!data) {
      return NextResponse.json({ error: "map_fetch_failed_all_sources" }, { status: 502 });
    }

    // TopoJSON'u GeoJSON FeatureCollection'a çevir
    let payload: any = data;
    try {
      if (data.type === "Topology" && data.objects) {
        const keys = Object.keys(data.objects);
        // Uygun obje anahtarını seç (geometri sayısı yüksek olan)
        let chosenKey = keys[0];
        let maxCount = 0;
        for (const k of keys) {
          const obj = data.objects[k];
          const count = Array.isArray(obj?.geometries) ? obj.geometries.length : 0;
          if (count > maxCount) {
            maxCount = count;
            chosenKey = k;
          }
        }
        payload = feature(data as any, (data.objects as any)[chosenKey]);
      }
      // Aksi halde zaten GeoJSON ise aynen gönder
    } catch (err) {
      // Dönüşümde hata olursa ham veriyi dön (client tarafı yine deneyebilir)
      payload = data;
    }

    return NextResponse.json(payload, {
      headers: {
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
      },
    });
  } catch (e) {
    return NextResponse.json({ error: "map_fetch_error" }, { status: 500 });
  }
}
