"use client";

import { useEffect, useState } from "react";

export function useElementById<T extends HTMLElement = HTMLElement>(id: string) {
  const [el, setEl] = useState<T | null>(null);

  useEffect(() => {
    // SSR/RSC'de document yok; client mount sonrası çalışır
    setEl(document.getElementById(id) as T | null);
  }, [id]);

  return el;
}

export function useAdminApp() {
  return useElementById<HTMLDivElement>("admin-app");
}

export function useAdminRoot() {
  return useElementById<HTMLDivElement>("admin-root");
}

export function useAdminContent() {
  return useElementById<HTMLDivElement>("admin-content");
}
