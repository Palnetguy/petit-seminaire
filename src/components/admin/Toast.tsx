"use client";

import { useCallback, useEffect, useState } from "react";

export type ToastMsg = { ok: boolean; message: string } | null;

export function useToast() {
  const [toast, setToast] = useState<ToastMsg>(null);
  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), toast.ok ? 3000 : 6000);
    return () => clearTimeout(id);
  }, [toast]);
  const show = useCallback((t: ToastMsg) => setToast(t), []);
  return { toast, show };
}

export function Toast({ toast }: { toast: ToastMsg }) {
  if (!toast) return null;
  return (
    <div
      role="status"
      className={`fixed right-4 bottom-4 z-50 max-w-sm rounded-2xl px-5 py-3.5 text-sm font-semibold shadow-2xl page-enter ${
        toast.ok ? "bg-green text-white" : "bg-imigongo text-white"
      }`}
    >
      {toast.ok ? "✓ " : "⚠ "}
      {toast.message}
    </div>
  );
}
