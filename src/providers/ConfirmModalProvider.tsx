"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { AlertTriangle, Trash2, LogOut, Loader2, X } from "lucide-react";

export interface ConfirmOptions {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning" | "primary";
  icon?: "trash" | "logout" | "alert";
  onConfirm: () => Promise<void> | void;
}

interface ConfirmContextType {
  confirm: (options: ConfirmOptions) => void;
  closeConfirm: () => void;
}

const ConfirmContext = createContext<ConfirmContextType | undefined>(undefined);

export function ConfirmModalProvider({ children }: { children: React.ReactNode }) {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    options: ConfirmOptions | null;
    isLoading: boolean;
  }>({
    isOpen: false,
    options: null,
    isLoading: false,
  });

  const confirm = useCallback((options: ConfirmOptions) => {
    setModalState({
      isOpen: true,
      options,
      isLoading: false,
    });
  }, []);

  const closeConfirm = useCallback(() => {
    if (modalState.isLoading) return; // Prevent closing while processing
    setModalState((prev) => ({ ...prev, isOpen: false }));
  }, [modalState.isLoading]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && modalState.isOpen && !modalState.isLoading) {
        closeConfirm();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [modalState.isOpen, modalState.isLoading, closeConfirm]);

  const handleConfirmAction = async () => {
    if (!modalState.options) return;

    try {
      setModalState((prev) => ({ ...prev, isLoading: true }));
      await modalState.options.onConfirm();
      setModalState({ isOpen: false, options: null, isLoading: false });
    } catch (error) {
      console.error("Action confirmation error:", error);
      setModalState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const options = modalState.options;
  const variant = options?.variant || "danger";
  const iconType = options?.icon || (variant === "danger" ? "trash" : "alert");

  return (
    <ConfirmContext.Provider value={{ confirm, closeConfirm }}>
      {children}

      {/* Confirmation Modal Backdrop & Dialog */}
      {modalState.isOpen && options && (
        <div
          className="fixed inset-0 z-[99998] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={closeConfirm}
        >
          <div
            className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-gray-100 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeConfirm}
              disabled={modalState.isLoading}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 p-1.5 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer disabled:opacity-40"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex flex-col items-center text-center space-y-4">
              {/* Badge Icon */}
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center border shadow-sm ${
                  iconType === "trash"
                    ? "bg-red-50 text-red-600 border-red-100"
                    : iconType === "logout"
                    ? "bg-amber-50 text-amber-600 border-amber-100"
                    : "bg-blue-50 text-blue-600 border-blue-100"
                }`}
              >
                {iconType === "trash" && <Trash2 className="w-7 h-7" />}
                {iconType === "logout" && <LogOut className="w-7 h-7" />}
                {iconType === "alert" && <AlertTriangle className="w-7 h-7" />}
              </div>

              {/* Title & Message */}
              <div className="space-y-1.5">
                <h3 className="text-lg sm:text-xl font-bold text-[#12151B] tracking-tight">
                  {options.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#5B5F6B] leading-relaxed max-w-sm">
                  {options.message}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 w-full pt-3">
                <button
                  type="button"
                  onClick={closeConfirm}
                  disabled={modalState.isLoading}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm font-semibold text-gray-700 hover:bg-gray-50 active:scale-[0.98] transition-all cursor-pointer disabled:opacity-40"
                >
                  {options.cancelText || "Cancel"}
                </button>

                <button
                  type="button"
                  onClick={handleConfirmAction}
                  disabled={modalState.isLoading}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white active:scale-[0.98] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 ${
                    variant === "danger"
                      ? "bg-red-600 hover:bg-red-700 shadow-red-500/20"
                      : variant === "warning"
                      ? "bg-amber-600 hover:bg-amber-700 shadow-amber-500/20"
                      : "bg-[#2954F5] hover:bg-[#1E42D0] shadow-blue-500/20"
                  }`}
                >
                  {modalState.isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <span>{options.confirmText || "Confirm"}</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </ConfirmContext.Provider>
  );
}

export function useConfirm() {
  const context = useContext(ConfirmContext);
  if (!context) {
    throw new Error("useConfirm must be used within a ConfirmModalProvider");
  }
  return context.confirm;
}
