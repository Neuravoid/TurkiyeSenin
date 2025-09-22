"use client";

import { useEffect } from "react";
import { useAdminContent } from "./hooks/useElementById";

/**
 * AdminDomReady runs once on mount and gives you a safe place to interact
 * with the admin content container after hydration.
 * Usage: place <AdminDomReady onReady={(el) => {...}} /> inside any admin page.
 */
export function AdminDomReady({ onReady }: { onReady: (el: HTMLDivElement) => void }) {
  const contentEl = useAdminContent();

  useEffect(() => {
    if (!contentEl) return;
    onReady(contentEl);
  }, [contentEl, onReady]);

  return null;
}
