"use client";

import React, { useState, useEffect } from "react";
import { TeamMember } from "@/data/agencyData";
import { PlusCircle, Edit2, Trash2, X, User } from "lucide-react";
import {
  getStoredData,
  setStoredData,
  CMS_KEYS,
  INITIAL_CMS_DATA,
} from "@/lib/cmsStore";
import CloudinaryUploader from "@/components/admin/CloudinaryUploader";

export default function AdminTeamPage() {
  const [team, setTeam] = useState<TeamMember[]>(INITIAL_CMS_DATA.team);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);

  // Form State
  const [formName, setFormName] = useState("");
  const [formRole, setFormRole] = useState("");
  const [formBio, setFormBio] = useState("");
  const [formImage, setFormImage] = useState("");
  const [formDept, setFormDept] = useState("Leadership");

  useEffect(() => {
    const data = getStoredData<TeamMember[]>(
      CMS_KEYS.TEAM,
      INITIAL_CMS_DATA.team
    );
    setTeam(data);
  }, []);

  const handleOpenAdd = () => {
    setEditingMember(null);
    setFormName("");
    setFormRole("");
    setFormBio("");
    setFormImage("/img/team/placeholder.jpg");
    setFormDept("Leadership");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (member: TeamMember) => {
    setEditingMember(member);
    setFormName(member.name);
    setFormRole(member.role);
    setFormBio(member.bio || "");
    setFormImage(member.image || "");
    setFormDept(member.dept || "Leadership");
    setIsModalOpen(true);
  };

  const handleDelete = (name: string) => {
    if (!confirm(`Are you sure you want to remove ${name} from team?`)) return;
    const updated = team.filter((m) => m.name !== name);
    setTeam(updated);
    setStoredData(CMS_KEYS.TEAM, updated);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingMember) {
      const updated = team.map((m) =>
        m.name === editingMember.name
          ? {
              ...m,
              name: formName,
              role: formRole,
              bio: formBio,
              image: formImage,
              dept: formDept,
            }
          : m
      );
      setTeam(updated);
      setStoredData(CMS_KEYS.TEAM, updated);
    } else {
      const newMember: TeamMember = {
        id: `team-${Date.now()}`,
        name: formName,
        role: formRole,
        bio: formBio,
        image: formImage,
        dept: formDept,
      };
      const updated = [...team, newMember];
      setTeam(updated);
      setStoredData(CMS_KEYS.TEAM, updated);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-[#E3E5EC] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[#2954F5] text-xs font-bold uppercase tracking-wider block mb-1">
            Human Capital &amp; Leadership
          </span>
          <h1 className="text-2xl font-bold text-[#12151B]">Team Members CMS</h1>
          <p className="text-xs sm:text-sm text-[#5B5F6B]">
            Manage leadership and studio team members shown on `/our-team`.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2954F5] text-white font-semibold text-xs hover:bg-[#1E42D0] transition-colors shadow-sm cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add Team Member</span>
        </button>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {team.map((member, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl border border-[#E3E5EC] p-5 space-y-4 hover:border-gray-400 transition-all shadow-xs flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-100 border border-[#E3E5EC] shrink-0">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = "none";
                    }}
                  />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#12151B]">{member.name}</h3>
                  <p className="text-xs font-semibold text-[#2954F5]">{member.role}</p>
                  {member.dept && (
                    <span className="text-[10px] font-mono bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md mt-1 inline-block">
                      {member.dept}
                    </span>
                  )}
                </div>
              </div>

              <p className="text-xs text-[#5B5F6B] leading-relaxed line-clamp-3">
                {member.bio}
              </p>
            </div>

            <div className="pt-3 border-t border-[#F4F5F8] flex items-center justify-between">
              <button
                onClick={() => handleOpenEdit(member)}
                className="inline-flex items-center gap-1 text-xs text-[#2954F5] font-semibold hover:underline cursor-pointer"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>

              <button
                onClick={() => handleDelete(member.name)}
                className="inline-flex items-center gap-1 text-xs text-red-600 font-semibold hover:underline cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#E3E5EC] max-h-[90vh] overflow-y-auto space-y-5">
            <div className="flex items-center justify-between border-b border-[#E3E5EC] pb-3">
              <h2 className="text-lg font-bold text-[#12151B]">
                {editingMember ? "Edit Team Member" : "Add Team Member"}
              </h2>
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
                  Full Name *
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
                  Role / Designation *
                </label>
                <input
                  type="text"
                  required
                  value={formRole}
                  onChange={(e) => setFormRole(e.target.value)}
                  className="w-full text-xs sm:text-sm border border-[#E3E5EC] rounded-xl px-3.5 py-2.5 outline-none focus:border-[#2954F5]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#12151B] mb-1">
                  Department
                </label>
                <input
                  type="text"
                  value={formDept}
                  onChange={(e) => setFormDept(e.target.value)}
                  className="w-full text-xs sm:text-sm border border-[#E3E5EC] rounded-xl px-3.5 py-2.5 outline-none focus:border-[#2954F5]"
                />
              </div>

              <CloudinaryUploader
                label="Upload Avatar Photo to Cloudinary"
                folder="doorstep/team"
                accept="image/*"
                onUploadSuccess={(url) => setFormImage(url)}
              />

              <div>
                <label className="block text-xs font-bold uppercase text-[#12151B] mb-1">
                  Avatar Image Path / Cloudinary URL *
                </label>
                <input
                  type="text"
                  required
                  value={formImage}
                  onChange={(e) => setFormImage(e.target.value)}
                  placeholder="/img/team/alex.jpg or Cloudinary URL"
                  className="w-full text-xs sm:text-sm border border-[#E3E5EC] rounded-xl px-3.5 py-2.5 outline-none focus:border-[#2954F5]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#12151B] mb-1">
                  Bio / Background *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formBio}
                  onChange={(e) => setFormBio(e.target.value)}
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
                  Save Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
