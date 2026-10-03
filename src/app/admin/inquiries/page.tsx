"use client";

import React, { useState, useEffect } from "react";
import {
  Inbox,
  Mail,
  Phone,
  Trash2,
  CheckCircle2,
  Clock,
  Archive,
  Search,
  Building,
  DollarSign,
  Calendar,
} from "lucide-react";
import {
  useInquiries,
  useUpdateInquiryStatus,
  useDeleteInquiry,
} from "@/hooks/useCMS";
import { InquiryItem } from "@/lib/cmsStore";
import { useToast } from "@/providers/ToastProvider";
import { useConfirm } from "@/providers/ConfirmModalProvider";

export default function AdminInquiriesPage() {
  const { toast } = useToast();
  const confirm = useConfirm();
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: inquiries = [], isLoading } = useInquiries(statusFilter);
  const updateStatusMutation = useUpdateInquiryStatus();
  const deleteMutation = useDeleteInquiry();

  const handleUpdateStatus = (id: string, newStatus: InquiryItem["status"]) => {
    updateStatusMutation.mutate(
      { id, status: newStatus },
      {
        onSuccess: () => {
          toast.success(`Inquiry status updated to "${newStatus}"`);
        },
        onError: () => {
          toast.error("Failed to update inquiry status.");
        },
      }
    );
  };

  const handleDelete = (id: string, clientName?: string) => {
    confirm({
      title: "Delete Inquiry Lead?",
      message: `Are you sure you want to permanently delete ${clientName ? `"${clientName}'s"` : "this"} inquiry lead?`,
      confirmText: "Yes, Delete",
      cancelText: "Keep Lead",
      variant: "danger",
      icon: "trash",
      onConfirm: () => {
        deleteMutation.mutate(id, {
          onSuccess: () => {
            toast.success("Inquiry deleted successfully!");
          },
          onError: () => {
            toast.error("Failed to delete inquiry.");
          },
        });
      },
    });
  };

  const filtered = inquiries.filter((item) => {
    const matchesStatus =
      statusFilter === "All" ? true : item.status === statusFilter;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.company &&
        item.company.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.serviceNeeded.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-[#E3E5EC] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[#2954F5] text-xs font-bold uppercase tracking-wider block mb-1">
            CRM &amp; Lead Capture
          </span>
          <h1 className="text-2xl font-bold text-[#12151B]">
            Client Inquiries &amp; Leads
          </h1>
          <p className="text-xs sm:text-sm text-[#5B5F6B]">
            All submissions from `/contact` form with status tracking and contact shortcuts.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
            Total {inquiries.length} Inquiries
          </span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#E3E5EC]">
        {/* Status Tabs */}
        <div className="flex flex-wrap items-center gap-1.5">
          {["All", "New", "Contacted", "In Progress", "Archived"].map((st) => {
            const count =
              st === "All"
                ? inquiries.length
                : inquiries.filter((i) => i.status === st).length;
            const isActive = statusFilter === st;

            return (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#2954F5] text-white shadow-xs"
                    : "bg-gray-100 text-[#5B5F6B] hover:text-black hover:bg-gray-200"
                }`}
              >
                <span>{st}</span>
                <span className="ml-1 text-[10px] opacity-80">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative max-w-xs w-full">
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, email, service..."
            className="w-full text-xs border border-[#E3E5EC] rounded-xl pl-9 pr-3.5 py-2 outline-none focus:border-[#2954F5]"
          />
        </div>
      </div>

      {/* Inquiries List */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#E3E5EC] p-12 text-center text-[#5B5F6B]">
            <Inbox className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-sm font-semibold">No inquiries found matching criteria.</p>
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-[#E3E5EC] p-6 space-y-4 hover:border-gray-400 transition-all shadow-xs"
            >
              {/* Top Row: Client Info & Status */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#F4F5F8]">
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <h3 className="font-bold text-base text-[#12151B]">
                      {item.name}
                    </h3>
                    {item.company && (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-[#5B5F6B] bg-gray-100 px-2 py-0.5 rounded-md">
                        <Building className="w-3 h-3 text-gray-400" />
                        <span>{item.company}</span>
                      </span>
                    )}
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        item.status === "New"
                          ? "bg-red-100 text-red-700 font-bold"
                          : item.status === "Contacted"
                          ? "bg-blue-100 text-blue-700"
                          : item.status === "In Progress"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <div className="text-xs font-semibold text-[#2954F5]">
                    Service: {item.serviceNeeded}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#5B5F6B] font-mono mr-2">
                    {item.createdAt}
                  </span>

                  <select
                    value={item.status}
                    onChange={(e) =>
                      handleUpdateStatus(
                        item.id,
                        e.target.value as InquiryItem["status"]
                      )
                    }
                    className="text-xs font-semibold border border-[#E3E5EC] rounded-xl px-3 py-1.5 bg-white cursor-pointer outline-none"
                  >
                    <option value="New">Status: New</option>
                    <option value="Contacted">Status: Contacted</option>
                    <option value="In Progress">Status: In Progress</option>
                    <option value="Archived">Status: Archived</option>
                  </select>

                  <button
                    onClick={() => handleDelete(item.id, item.name)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 cursor-pointer"
                    title="Delete Inquiry"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Message Content */}
              <div className="p-4 rounded-xl bg-gray-50/70 border border-[#E3E5EC]/60 text-xs sm:text-sm text-[#12151B] leading-relaxed">
                {item.message}
              </div>

              {/* Contact Metadata Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-1 text-xs">
                <div className="flex flex-wrap items-center gap-4">
                  {/* Email Link */}
                  <a
                    href={`mailto:${item.email}`}
                    className="inline-flex items-center gap-1.5 text-[#2954F5] font-semibold hover:underline"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>{item.email}</span>
                  </a>

                  {/* Phone Link */}
                  <a
                    href={`tel:${item.phone}`}
                    className="inline-flex items-center gap-1.5 text-gray-700 font-medium hover:text-black hover:underline"
                  >
                    <Phone className="w-3.5 h-3.5 text-gray-400" />
                    <span>{item.phone}</span>
                  </a>

                  {/* Budget */}
                  {item.budget && (
                    <span className="inline-flex items-center gap-1 text-[#5B5F6B]">
                      <DollarSign className="w-3.5 h-3.5 text-gray-400" />
                      <span>Budget: {item.budget}</span>
                    </span>
                  )}

                  {/* Timeline */}
                  {item.timeline && (
                    <span className="inline-flex items-center gap-1 text-[#5B5F6B]">
                      <Calendar className="w-3.5 h-3.5 text-gray-400" />
                      <span>Timeline: {item.timeline}</span>
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`mailto:${item.email}?subject=Regarding your brief with Doorstep Limited`}
                    className="px-3 py-1.5 rounded-lg bg-[#2954F5] text-white text-xs font-semibold hover:bg-[#1E42D0]"
                  >
                    Reply via Email
                  </a>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
