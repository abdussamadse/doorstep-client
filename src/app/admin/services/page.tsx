"use client";

import React, { useState, useEffect } from "react";
import { ServiceItem } from "@/data/agencyData";
import { Edit2, Plus, Trash2, CheckCircle2, Save, X } from "lucide-react";
import {
  getStoredData,
  setStoredData,
  CMS_KEYS,
  INITIAL_CMS_DATA,
} from "@/lib/cmsStore";

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>(INITIAL_CMS_DATA.services);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);

  // Form Fields
  const [formName, setFormName] = useState("");
  const [formShortDesc, setFormShortDesc] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formDeliverables, setFormDeliverables] = useState<string[]>([]);
  const [formTags, setFormTags] = useState<string[]>([]);
  const [newDeliverable, setNewDeliverable] = useState("");
  const [newTag, setNewTag] = useState("");

  useEffect(() => {
    const data = getStoredData<ServiceItem[]>(
      CMS_KEYS.SERVICES,
      INITIAL_CMS_DATA.services
    );
    setServices(data);
  }, []);

  const handleOpenEdit = (service: ServiceItem) => {
    setEditingService(service);
    setFormName(service.name);
    setFormShortDesc(service.shortDesc);
    setFormDescription(service.description);
    setFormDeliverables([...service.deliverables]);
    setFormTags([...service.tags]);
  };

  const handleAddDeliverable = () => {
    if (!newDeliverable.trim()) return;
    setFormDeliverables([...formDeliverables, newDeliverable.trim()]);
    setNewDeliverable("");
  };

  const handleRemoveDeliverable = (idx: number) => {
    setFormDeliverables(formDeliverables.filter((_, i) => i !== idx));
  };

  const handleAddTag = () => {
    if (!newTag.trim()) return;
    setFormTags([...formTags, newTag.trim()]);
    setNewTag("");
  };

  const handleRemoveTag = (idx: number) => {
    setFormTags(formTags.filter((_, i) => i !== idx));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    const updated = services.map((s) =>
      s.id === editingService.id
        ? {
            ...s,
            name: formName,
            shortDesc: formShortDesc,
            description: formDescription,
            deliverables: formDeliverables,
            tags: formTags,
          }
        : s
    );

    setServices(updated);
    setStoredData(CMS_KEYS.SERVICES, updated);
    setEditingService(null);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-[#E3E5EC] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[#2954F5] text-xs font-bold uppercase tracking-wider block mb-1">
            Service Solutions
          </span>
          <h1 className="text-2xl font-bold text-[#12151B]">Core Services CMS</h1>
          <p className="text-xs sm:text-sm text-[#5B5F6B]">
            Edit titles, commercial descriptions, key deliverables, and tags for your agency capabilities.
          </p>
        </div>
      </div>

      {/* Services List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service, sIdx) => (
          <div
            key={service.id}
            className="bg-white rounded-2xl border border-[#E3E5EC] p-6 space-y-4 hover:border-gray-400 transition-all shadow-xs flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#2954F5] bg-[#2954F5]/10 px-2.5 py-1 rounded">
                  Service 0{sIdx + 1}
                </span>
                <button
                  onClick={() => handleOpenEdit(service)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2954F5] hover:underline cursor-pointer"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit Details</span>
                </button>
              </div>

              <div>
                <h3 className="text-lg font-bold text-[#12151B]">{service.name}</h3>
                <p className="text-xs font-semibold text-[#E51F25] mt-0.5">
                  {service.shortDesc}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-[#5B5F6B] leading-relaxed">
                {service.description}
              </p>

              {/* Deliverables */}
              <div className="pt-3 border-t border-[#F4F5F8] space-y-2">
                <span className="text-[10px] font-bold uppercase text-[#12151B] block">
                  Key Deliverables ({service.deliverables.length})
                </span>
                <ul className="space-y-1">
                  {service.deliverables.map((item, dIdx) => (
                    <li key={dIdx} className="flex items-center gap-2 text-xs text-[#5B5F6B]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2954F5] shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {service.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[10px] font-medium bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ========================================================
          EDIT SERVICE MODAL
      ======================================================== */}
      {editingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#E3E5EC] max-h-[90vh] overflow-y-auto space-y-5">
            <div className="flex items-center justify-between border-b border-[#E3E5EC] pb-3">
              <h2 className="text-lg font-bold text-[#12151B]">
                Edit: {editingService.name}
              </h2>
              <button
                onClick={() => setEditingService(null)}
                className="p-1 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-black cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-[#12151B] mb-1">
                  Service Title *
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full text-xs sm:text-sm border border-[#E3E5EC] rounded-xl px-3.5 py-2.5 outline-none focus:border-[#2954F5]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#12151B] mb-1">
                  Short Tagline *
                </label>
                <input
                  type="text"
                  required
                  value={formShortDesc}
                  onChange={(e) => setFormShortDesc(e.target.value)}
                  className="w-full text-xs sm:text-sm border border-[#E3E5EC] rounded-xl px-3.5 py-2.5 outline-none focus:border-[#2954F5]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#12151B] mb-1">
                  Detailed Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full text-xs sm:text-sm border border-[#E3E5EC] rounded-xl px-3.5 py-2.5 outline-none focus:border-[#2954F5]"
                />
              </div>

              {/* Deliverables Editor */}
              <div>
                <label className="block text-xs font-bold uppercase text-[#12151B] mb-1">
                  Deliverables
                </label>
                <div className="space-y-2 mb-2">
                  {formDeliverables.map((deliv, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2 rounded-lg bg-gray-50 border border-[#E3E5EC] text-xs"
                    >
                      <span>{deliv}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveDeliverable(idx)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newDeliverable}
                    onChange={(e) => setNewDeliverable(e.target.value)}
                    placeholder="New deliverable item..."
                    className="flex-1 text-xs border border-[#E3E5EC] rounded-xl px-3 py-2 outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddDeliverable}
                    className="px-3 py-2 bg-[#2954F5] text-white text-xs font-semibold rounded-xl hover:bg-[#1E42D0]"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Tags Editor */}
              <div>
                <label className="block text-xs font-bold uppercase text-[#12151B] mb-1">
                  Tags
                </label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {formTags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-lg"
                    >
                      <span>#{tag}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(idx)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add tag..."
                    className="flex-1 text-xs border border-[#E3E5EC] rounded-xl px-3 py-2 outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="px-3 py-2 bg-gray-800 text-white text-xs font-semibold rounded-xl hover:bg-black"
                  >
                    Add
                  </button>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E3E5EC] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
                  className="px-4 py-2.5 rounded-xl border border-[#E3E5EC] text-xs font-semibold text-gray-700 hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#2954F5] text-white text-xs font-semibold hover:bg-[#1E42D0] transition-colors cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
