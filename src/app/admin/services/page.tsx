"use client";

import React, { useState } from "react";
import { ServiceItem } from "@/data/agencyData";
import { Edit2, Plus, Trash2, Save, X, AlertTriangle } from "lucide-react";
import { useServices, useCreateService, useUpdateService, useDeleteService } from "@/hooks/useCMS";
import { useToast } from "@/providers/ToastProvider";
import CloudinaryUploader from "@/components/admin/CloudinaryUploader";

export default function AdminServicesPage() {
  const { toast } = useToast();
  const { data: services = [], isLoading } = useServices();
  const createMutation = useCreateService();
  const updateMutation = useUpdateService();
  const deleteMutation = useDeleteService();

  // Modal States
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [deletingService, setDeletingService] = useState<ServiceItem | null>(null);

  // Form Fields - exactly matching what the website displays: Title, Subtitle, Image
  const [formName, setFormName] = useState("");
  const [formShortDesc, setFormShortDesc] = useState("");
  const [formImage, setFormImage] = useState("");

  const handleOpenCreate = () => {
    setFormName("");
    setFormShortDesc("");
    setFormImage("/img/services/creative-content.jpg");
    setIsCreateOpen(true);
  };

  const handleOpenEdit = (service: ServiceItem) => {
    setEditingService(service);
    setFormName(service.name || "");
    setFormShortDesc(service.shortDesc || "");
    setFormImage(service.image || "/img/services/creative-content.jpg");
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (isCreateOpen) {
      createMutation.mutate(
        {
          name: formName.trim(),
          shortDesc: formShortDesc.trim(),
          image: formImage.trim() || "/img/services/creative-content.jpg",
          description: "",
          deliverables: [],
          tags: [],
          icon: "Briefcase",
        },
        {
          onSuccess: () => {
            toast.success(`Capability "${formName}" created successfully!`);
            setIsCreateOpen(false);
          },
          onError: () => {
            toast.error("Failed to create capability. Please try again.");
          },
        }
      );
    } else if (editingService) {
      updateMutation.mutate(
        {
          id: editingService.id,
          data: {
            name: formName.trim(),
            shortDesc: formShortDesc.trim(),
            image: formImage.trim(),
            description: editingService.description || "",
            deliverables: editingService.deliverables || [],
            tags: editingService.tags || [],
          },
        },
        {
          onSuccess: () => {
            toast.success(`Capability "${formName}" updated successfully!`);
            setEditingService(null);
          },
          onError: () => {
            toast.error("Failed to update capability. Please try again.");
          },
        }
      );
    }
  };

  const handleConfirmDelete = () => {
    if (!deletingService) return;

    deleteMutation.mutate(deletingService.id, {
      onSuccess: () => {
        toast.success(`Capability "${deletingService.name}" removed successfully!`);
        setDeletingService(null);
      },
      onError: () => {
        toast.error("Failed to delete capability. Please try again.");
      },
    });
  };

  const isModalOpen = isCreateOpen || !!editingService;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-[#E3E5EC] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[#2954F5] text-xs font-bold uppercase tracking-wider block mb-1">
            Home Page Capabilities
          </span>
          <h1 className="text-2xl font-bold text-[#12151B]">
            Capabilities &amp; Services CMS
          </h1>
          <p className="text-xs sm:text-sm text-[#5B5F6B]">
            Manage, add, and remove capability cards shown under &ldquo;Integrated Capabilities for Brand Dominance&rdquo; on the Home Page.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-blue-50 text-[#2954F5] border border-blue-100 hidden sm:inline-block">
            {services.length} Active
          </span>
          <button
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2954F5] text-white text-xs sm:text-sm font-semibold hover:bg-[#1E42D0] transition-colors shadow-md cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Capability</span>
          </button>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {services.map((service, sIdx) => (
          <div
            key={service.id}
            className="bg-white rounded-2xl border border-[#E3E5EC] overflow-hidden hover:border-[#2954F5] transition-all shadow-xs flex flex-col justify-between group"
          >
            {/* Card Image Banner */}
            <div className="w-full aspect-[16/10] bg-gray-900 relative overflow-hidden">
              <img
                src={service.image || "/img/services/creative-content.jpg"}
                alt={service.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-3 left-3">
                <span className="text-[11px] font-mono font-bold bg-black/60 text-white backdrop-blur-xs px-2.5 py-1 rounded-md">
                  0{sIdx + 1}
                </span>
              </div>
            </div>

            {/* Card Content: Title & Subtitle */}
            <div className="p-5 flex flex-col grow justify-between gap-4">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#12151B] group-hover:text-[#2954F5] transition-colors">
                  {service.name}
                </h3>
                <p className="text-xs font-semibold text-[#E51F25] uppercase tracking-wider mt-1">
                  {service.shortDesc}
                </p>
              </div>

              {/* Action Buttons: Edit and Delete */}
              <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => setDeletingService(service)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-red-600 hover:bg-red-50 text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>

                <button
                  onClick={() => handleOpenEdit(service)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#2954F5]/10 text-[#2954F5] hover:bg-[#2954F5] hover:text-white transition-all text-xs font-semibold cursor-pointer"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ========================================================
          CREATE / EDIT CAPABILITY MODAL
      ======================================================== */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#E3E5EC] max-h-[92vh] overflow-y-auto space-y-5 animate-in fade-in">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#E3E5EC] pb-3">
              <div>
                <span className="text-[11px] font-bold text-[#2954F5] uppercase tracking-wider block">
                  {isCreateOpen ? "Create New" : "Edit Existing"}
                </span>
                <h2 className="text-lg font-bold text-[#12151B]">
                  {isCreateOpen ? "Add New Capability" : `Edit: ${editingService?.name}`}
                </h2>
              </div>
              <button
                onClick={() => {
                  setIsCreateOpen(false);
                  setEditingService(null);
                }}
                className="p-1 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-black cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              {/* 1. Service Title */}
              <div>
                <label className="block text-xs font-bold uppercase text-[#12151B] mb-1">
                  1. Service Title (Name) *
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Digital Marketing"
                  className="w-full text-xs sm:text-sm border border-[#E3E5EC] rounded-xl px-3.5 py-2.5 outline-none focus:border-[#2954F5] bg-white transition-all shadow-xs"
                />
              </div>

              {/* 2. Service Subtitle */}
              <div>
                <label className="block text-xs font-bold uppercase text-[#12151B] mb-1">
                  2. Service Subtitle (Short Tagline) *
                </label>
                <input
                  type="text"
                  required
                  value={formShortDesc}
                  onChange={(e) => setFormShortDesc(e.target.value)}
                  placeholder="e.g. Social Media, Content"
                  className="w-full text-xs sm:text-sm border border-[#E3E5EC] rounded-xl px-3.5 py-2.5 outline-none focus:border-[#2954F5] bg-white transition-all shadow-xs"
                />
              </div>

              {/* 3. Service Image */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase text-[#12151B]">
                  3. Service Image *
                </label>

                <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                  <div className="flex-1 w-full">
                    <input
                      type="text"
                      required
                      value={formImage}
                      onChange={(e) => setFormImage(e.target.value)}
                      placeholder="https://res.cloudinary.com/... or /img/services/..."
                      className="w-full text-xs sm:text-sm border border-[#E3E5EC] rounded-xl px-3.5 py-2.5 outline-none focus:border-[#2954F5] bg-white shadow-xs"
                    />
                  </div>
                  <div className="shrink-0">
                    <CloudinaryUploader
                      label="Upload New Image"
                      accept="image/*"
                      folder="doorstep/services"
                      onUploadSuccess={(url) => setFormImage(url)}
                    />
                  </div>
                </div>

                {/* Live Card Preview (as shown on Home Page #services) */}
                <div className="pt-2">
                  <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide block mb-1.5">
                    Live Home Page Card Preview:
                  </span>
                  <div className="bg-[#111420] rounded-xl overflow-hidden border border-white/15 max-w-sm mx-auto shadow-lg">
                    <div className="w-full aspect-[16/10] bg-black/40 relative overflow-hidden">
                      {formImage ? (
                        <img
                          src={formImage}
                          alt={formName || "Preview"}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs">
                          No Image Selected
                        </div>
                      )}
                    </div>
                    <div className="p-3.5 text-center">
                      <h4 className="text-white font-bold text-sm truncate">
                        {formName || "Service Title Preview"}
                      </h4>
                      <p className="text-[10px] font-semibold text-blue-200/80 uppercase tracking-wider mt-1 truncate">
                        {formShortDesc || "Short subtitle preview"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="pt-3 border-t border-[#E3E5EC] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreateOpen(false);
                    setEditingService(null);
                  }}
                  className="px-4 py-2.5 rounded-xl border border-[#E3E5EC] text-xs font-semibold text-gray-700 hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createMutation.isPending || updateMutation.isPending}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2954F5] text-white text-xs font-semibold hover:bg-[#1E42D0] transition-colors cursor-pointer shadow-md disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>
                    {createMutation.isPending || updateMutation.isPending
                      ? "Saving..."
                      : isCreateOpen
                      ? "Create Capability"
                      : "Save Changes"}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          DELETE CONFIRMATION MODAL (Custom Modal)
      ======================================================== */}
      {deletingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-[#E3E5EC] space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#12151B]">
                  Delete Capability
                </h3>
                <p className="text-xs text-[#5B5F6B]">
                  This action cannot be undone.
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#5B5F6B] leading-relaxed">
              Are you sure you want to permanently delete{" "}
              <strong className="text-[#12151B]">&ldquo;{deletingService.name}&rdquo;</strong>? This capability card will be removed from the Home Page.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setDeletingService(null)}
                className="px-4 py-2.5 rounded-xl border border-[#E3E5EC] text-xs font-semibold text-gray-700 hover:bg-gray-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={deleteMutation.isPending}
                className="px-5 py-2.5 rounded-xl bg-red-600 text-white text-xs font-semibold hover:bg-red-700 transition-colors cursor-pointer shadow-md disabled:opacity-50"
              >
                {deleteMutation.isPending ? "Deleting..." : "Confirm Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
