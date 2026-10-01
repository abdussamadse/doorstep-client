"use client";

import React, { useState, useEffect } from "react";
import { PlusCircle, Trash2, X, ExternalLink } from "lucide-react";
import {
  getStoredData,
  setStoredData,
  CMS_KEYS,
  INITIAL_CMS_DATA,
  ClientLogoCMS,
} from "@/lib/cmsStore";
import CloudinaryUploader from "@/components/admin/CloudinaryUploader";

export default function AdminClientsPage() {
  const [clients, setClients] = useState<ClientLogoCMS[]>(INITIAL_CMS_DATA.clients);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formName, setFormName] = useState("");
  const [formLogo, setFormLogo] = useState("");

  useEffect(() => {
    const data = getStoredData<ClientLogoCMS[]>(
      CMS_KEYS.CLIENTS,
      INITIAL_CMS_DATA.clients
    );
    setClients(data);
  }, []);

  const handleOpenAdd = () => {
    setFormName("");
    setFormLogo("/img/somboon.jpeg");
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to remove this client logo?")) return;
    const updated = clients.filter((c) => c.id !== id);
    setClients(updated);
    setStoredData(CMS_KEYS.CLIENTS, updated);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const newClient: ClientLogoCMS = {
      id: `client-${Date.now()}`,
      name: formName,
      logo: formLogo,
    };
    const updated = [...clients, newClient];
    setClients(updated);
    setStoredData(CMS_KEYS.CLIENTS, updated);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-[#E3E5EC] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[#2954F5] text-xs font-bold uppercase tracking-wider block mb-1">
            Social Proof &amp; Partners
          </span>
          <h1 className="text-2xl font-bold text-[#12151B]">Client Brand Logos CMS</h1>
          <p className="text-xs sm:text-sm text-[#5B5F6B]">
            Add or remove brand partner logos shown on the Home Page brand grid.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2954F5] text-white font-semibold text-xs hover:bg-[#1E42D0] transition-colors shadow-sm cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add Brand Logo</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
        {clients.map((client) => (
          <div
            key={client.id}
            className="bg-white rounded-2xl border border-[#E3E5EC] p-4 flex flex-col items-center justify-between hover:border-gray-400 transition-all shadow-xs group"
          >
            <div className="w-full aspect-square flex items-center justify-center p-3 rounded-xl bg-gray-50 border border-gray-100 overflow-hidden mb-3">
              <img
                src={client.logo}
                alt={client.name}
                className="max-h-16 w-auto object-contain transition-transform group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
            </div>

            <div className="w-full text-center">
              <h4 className="font-bold text-xs text-[#12151B] truncate">
                {client.name}
              </h4>

              <button
                onClick={() => handleDelete(client.id)}
                className="mt-2 text-[11px] text-red-600 hover:text-red-700 font-semibold inline-flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3 h-3" />
                <span>Remove</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-[#E3E5EC] space-y-5">
            <div className="flex items-center justify-between border-b border-[#E3E5EC] pb-3">
              <h2 className="text-lg font-bold text-[#12151B]">Add Client Brand Logo</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-black cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-[#12151B] mb-1">
                  Brand / Client Name *
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Mughal Mahal"
                  className="w-full text-xs sm:text-sm border border-[#E3E5EC] rounded-xl px-3.5 py-2.5 outline-none focus:border-[#2954F5]"
                />
              </div>

              <CloudinaryUploader
                label="Upload Logo to Cloudinary"
                folder="doorstep/clients"
                accept="image/*"
                onUploadSuccess={(url) => setFormLogo(url)}
              />

              <div>
                <label className="block text-xs font-bold uppercase text-[#12151B] mb-1">
                  Logo Image Path / Cloudinary URL *
                </label>
                <input
                  type="text"
                  required
                  value={formLogo}
                  onChange={(e) => setFormLogo(e.target.value)}
                  placeholder="/img/somboon.jpeg or Cloudinary CDN link"
                  className="w-full text-xs sm:text-sm border border-[#E3E5EC] rounded-xl px-3.5 py-2.5 outline-none focus:border-[#2954F5]"
                />
              </div>

              <div className="pt-3 border-t border-[#E3E5EC] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-[#E3E5EC] text-xs font-semibold text-gray-700 hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#2954F5] text-white text-xs font-semibold hover:bg-[#1E42D0] transition-colors cursor-pointer"
                >
                  Save Logo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
