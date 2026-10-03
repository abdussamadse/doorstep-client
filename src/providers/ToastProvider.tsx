"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from "lucide-react";

export type ToastType = "success" | "error" | "info" | "warning";

export interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastContextType {
  toast: {
    success: (message: string, duration?: number) => void;
    error: (message: string, duration?: number) => void;
    info: (message: string, duration?: number) => void;
    warning: (message: string, duration?: number) => void;
  };
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Event-based bridge for triggering toasts outside React components
export const showToast = (message: string, type: ToastType = "success", duration = 3500) => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("doorstep-toast", {
        detail: { message, type, duration },
      })
    );
  }
};

export const toast = {
  success: (msg: string, dur?: number) => showToast(msg, "success", dur),
  error: (msg: string, dur?: number) => showToast(msg, "error", dur),
  info: (msg: string, dur?: number) => showToast(msg, "info", dur),
  warning: (msg: string, dur?: number) => showToast(msg, "warning", dur),
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((message: string, type: ToastType, duration = 3500) => {
    const id = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    const newToast: ToastItem = { id, message, type, duration };

    setToasts((prev) => [newToast, ...prev.slice(0, 4)]); // Keep max 5 visible

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, [removeToast]);

  useEffect(() => {
    const handleCustomToast = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.message) {
        addToast(detail.message, detail.type || "success", detail.duration || 3500);
      }
    };

    window.addEventListener("doorstep-toast", handleCustomToast);
    return () => window.removeEventListener("doorstep-toast", handleCustomToast);
  }, [addToast]);

  const toastMethods = {
    success: (msg: string, dur?: number) => addToast(msg, "success", dur),
    error: (msg: string, dur?: number) => addToast(msg, "error", dur),
    info: (msg: string, dur?: number) => addToast(msg, "info", dur),
    warning: (msg: string, dur?: number) => addToast(msg, "warning", dur),
  };

  return (
    <ToastContext.Provider value={{ toast: toastMethods, removeToast }}>
      {children}

      {/* Floating Toast Container */}
      <div
        className="fixed top-5 right-5 z-[99999] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0"
        aria-live="polite"
      >
        {toasts.map((item) => {
          let icon = <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />;
          let borderClass = "border-emerald-500/25";
          let bgClass = "bg-emerald-50/95";
          let textClass = "text-emerald-950";
          let badgeBg = "bg-emerald-500";

          if (item.type === "error") {
            icon = <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />;
            borderClass = "border-red-500/25";
            bgClass = "bg-red-50/95";
            textClass = "text-red-950";
            badgeBg = "bg-red-500";
          } else if (item.type === "warning") {
            icon = <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />;
            borderClass = "border-amber-500/25";
            bgClass = "bg-amber-50/95";
            textClass = "text-amber-950";
            badgeBg = "bg-amber-500";
          } else if (item.type === "info") {
            icon = <Info className="w-5 h-5 text-blue-500 shrink-0" />;
            borderClass = "border-blue-500/25";
            bgClass = "bg-blue-50/95";
            textClass = "text-blue-950";
            badgeBg = "bg-blue-500";
          }

          return (
            <div
              key={item.id}
              className={`pointer-events-auto flex items-start gap-3 p-4 rounded-2xl border shadow-xl backdrop-blur-md transition-all duration-300 animate-in slide-in-from-top-3 fade-in ${borderClass} ${bgClass}`}
              style={{
                boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
              }}
            >
              {icon}
              <div className="flex-1 min-w-0 pt-0.5">
                <p className={`text-xs sm:text-sm font-semibold leading-snug ${textClass}`}>
                  {item.message}
                </p>
              </div>
              <button
                onClick={() => removeToast(item.id)}
                className="text-gray-400 hover:text-gray-700 transition-colors p-1 -mr-1 -mt-1 rounded-lg hover:bg-black/5 cursor-pointer"
                title="Dismiss"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    // Return fallback to global event dispatcher if outside provider
    return {
      toast,
      removeToast: () => {},
    };
  }
  return context;
}
