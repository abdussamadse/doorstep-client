"use client";

import React, { useState } from "react";
import { UploadCloud, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { API_BASE_URL } from "@/lib/api";

interface CloudinaryUploaderProps {
  label?: string;
  folder?: string;
  currentUrl?: string;
  onUploadSuccess: (url: string) => void;
  accept?: string;
}

export default function CloudinaryUploader({
  label = "Upload Image / Video to Cloudinary",
  folder = "doorstep/cms",
  currentUrl,
  onUploadSuccess,
  accept = "image/*,video/*",
}: CloudinaryUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);
    setSuccess(false);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("doorstep_admin_token")
          : null;
      const headers: Record<string, string> = {};
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const res = await fetch(`${API_BASE_URL}/upload`, {
        method: "POST",
        headers,
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to upload file to Cloudinary");
      }

      onUploadSuccess(data.data.url);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      console.error("Upload error:", err);
      setError(err?.message || "Upload failed. Check backend connection.");
    } finally {
      setUploading(false);
      // Reset input value
      e.target.value = "";
    }
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-[#12151B] uppercase tracking-wider block">
          {label}
        </label>
        {uploading && (
          <span className="text-[11px] text-blue-600 font-medium flex items-center gap-1">
            <Loader2 className="w-3 h-3 animate-spin" /> Uploading to Cloudinary...
          </span>
        )}
        {success && (
          <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Uploaded to Cloudinary!
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        <label className="flex-1 cursor-pointer flex items-center justify-center gap-2 border-2 border-dashed border-[#E3E5EC] hover:border-[#2954F5] bg-gray-50/50 hover:bg-blue-50/20 rounded-xl px-4 py-3 transition-colors text-xs font-semibold text-gray-700">
          <UploadCloud className="w-4 h-4 text-[#2954F5]" />
          <span>{uploading ? "Uploading..." : "Browse file to upload to Cloudinary"}</span>
          <input
            type="file"
            className="hidden"
            accept={accept}
            disabled={uploading}
            onChange={handleFileChange}
          />
        </label>
      </div>

      {error && (
        <div className="flex items-center gap-1.5 text-[11px] text-red-600 font-medium bg-red-50 p-2 rounded-lg border border-red-100">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {currentUrl && (
        <p className="text-[10px] text-gray-500 font-mono truncate">
          Active URL: <span className="text-gray-800">{currentUrl}</span>
        </p>
      )}
    </div>
  );
}
