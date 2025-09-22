"use client";

import { memo, useEffect, useMemo, useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { feature } from "topojson-client";

// Yerel dosyayı önce dene, yoksa API proxy kullan
const LOCAL_GEO_PATH = "/maps/turkey-provinces.json"; // public/maps altına yerleştirilebilir
const API_PROXY_PATH = "/api/maps/turkey";

export type TurkeyMapProps = {
  selectedCity: string | null;
  onCitySelect: (city: string | null) => void;
};

const TurkeyMap = ({ selectedCity, onCitySelect }: TurkeyMapProps) => {
  const [hovered, setHovered] = useState<string | null>(null);
  const [geoData, setGeoData] = useState<any | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const tryFetch = async (url: string) => {
        const controller = new AbortController();
        const t = setTimeout(() => controller.abort(), 8000);
        const res = await fetch(url, { cache: "force-cache", signal: controller.signal });
        clearTimeout(t);
        if (!res.ok) throw new Error("fetch_failed:" + url + ":" + res.status);
        return res.json();
      };
      try {
        let data: any = null;
        // Aday kaynaklar: local -> api proxy -> GitHub raw -> jsDelivr mirror
        const candidates = [
          LOCAL_GEO_PATH,
          API_PROXY_PATH,
          "https://raw.githubusercontent.com/cihadturhan/tr-geojson/master/geo/tr-cities-utf8.json",
          "https://cdn.jsdelivr.net/gh/cihadturhan/tr-geojson/geo/tr-cities-utf8.json",
          "https://raw.githubusercontent.com/cihadturhan/tr-geojson/master/geo/tr-cities-ansi.json",
        ];
        for (const url of candidates) {
          try {
            data = await tryFetch(url);
            if (data) break;
          } catch (_) {
            // sonraki adaya geç
          }
        }
        if (!data) throw new Error("no_map_source_available");
        // TopoJSON ise GeoJSON'a çevir
        if (data && data.type === "Topology" && data.objects) {
          const keys = Object.keys(data.objects);
          let chosenKey = keys[0];
          let maxCount = 0;
          for (const k of keys) {
            const obj = (data.objects as any)[k];
            const count = Array.isArray(obj?.geometries) ? obj.geometries.length : 0;
            if (count > maxCount) {
              maxCount = count;
              chosenKey = k;
            }
          }
          const fc = feature(data as any, (data.objects as any)[chosenKey]);
          if (mounted) setGeoData(fc);
        } else {
          if (mounted) setGeoData(data);
        }
      } catch (err: any) {
        if (mounted) setLoadError(err?.message || "Harita verisi yüklenemedi.");
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const styles = useMemo(
    () => ({
      default: {
        fill: "#E2E8F0", // slate-200
        outline: "none",
        stroke: "#CBD5E1",
        strokeWidth: 0.5,
      },
      hover: {
        fill: "#A5B4FC", // indigo-300
        outline: "none",
      },
      selected: {
        fill: "#6366F1", // indigo-500
        outline: "none",
      },
    }),
    []
  );

  return (
  <div className="w-full bg-white border border-slate-200 rounded-xl shadow-sm p-3">
      <div className="flex items-center justify-between px-2 py-1">
        <div className="text-sm text-slate-600">
          {hovered ? `Üzerinde: ${hovered}` : selectedCity ? `Seçili: ${selectedCity}` : "Bir il seçin"}
        </div>
        {selectedCity && (
          <button
            onClick={() => onCitySelect(null)}
            className="text-xs px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
          >
            Filtreyi Temizle
          </button>
        )}
      </div>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 2200, center: [35, 39] }}
        width={800}
        height={500}
        style={{ width: "100%", height: "auto" }}
      >
        <Geographies geography={geoData || { type: "FeatureCollection", features: [] }}>
          {({ geographies }: { geographies: any[] }) =>
            (geographies?.length ? geographies : []).map((geo: any) => {
              // TopoJSON propertilerinde il adı farklı anahtarlarla gelebilir; yaygın olan NAME_1, name, TRK_ADI vb.
              const name =
                (geo.properties?.NAME_1 as string) ||
                (geo.properties?.name as string) ||
                (geo.properties?.TRK_ADI as string) ||
                (geo.properties?.il_adi as string) ||
                "";

              const isSelected = selectedCity && name && selectedCity.toLowerCase() === name.toLowerCase();

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => setHovered(name)}
                  onMouseLeave={() => setHovered((prev) => (prev === name ? null : prev))}
                  onClick={() => onCitySelect(isSelected ? null : name)}
                  style={{
                    default: isSelected ? styles.selected : styles.default,
                    hover: styles.hover,
                    pressed: styles.selected,
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
      {loadError && (
        <div className="mt-2 text-sm text-red-600">
          Harita verisi yüklenemedi. Lütfen ağı kontrol edin veya <code className="px-1 py-0.5 bg-slate-100 rounded">public/maps/turkey-provinces.json</code> dosyasını ekleyin.
        </div>
      )}
    </div>
  );
};

export default memo(TurkeyMap);
