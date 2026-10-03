"use client";

import React, { useState, useEffect } from "react";
import { User, Mail, Lock, ShieldCheck, CheckCircle2, AlertCircle, Loader2, KeyRound, Trash2 } from "lucide-react";
import api from "@/lib/api";
import CloudinaryUploader from "@/components/admin/CloudinaryUploader";
import { useToast } from "@/providers/ToastProvider";

export default function AdminProfilePage() {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [role, setRole] = useState("admin");

  // Password state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // UI state
  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState<string | null>(null);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  useEffect(() => {
    // Load current admin from localStorage or API
    const storedUser = localStorage.getItem("doorstep_admin_user");
    if (storedUser) {
      try {
        const u = JSON.parse(storedUser);
        setName(u.name || "");
        setEmail(u.email || "");
        setAvatar(u.avatar || "");
        setRole(u.role || "admin");
      } catch (e) {
        console.error("Failed to parse user:", e);
      }
    }

    // Fetch fresh profile from API
    api.get("/auth/me").then((res) => {
      if (res.data?.success && res.data.user) {
        setName(res.data.user.name);
        setEmail(res.data.user.email);
        setAvatar(res.data.user.avatar || "");
        setRole(res.data.user.role);
        localStorage.setItem("doorstep_admin_user", JSON.stringify(res.data.user));
        window.dispatchEvent(new Event("admin-profile-updated"));
      }
    }).catch((err) => {
      console.warn("Could not fetch remote profile:", err);
    });
  }, []);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileLoading(true);
    setProfileError(null);
    setProfileSuccess(null);

    try {
      const res = await api.put("/auth/profile", { name, email, avatar });
      if (res.data?.success) {
        setProfileSuccess("Profile details updated successfully!");
        toast.success("Admin profile updated successfully!");
        localStorage.setItem("doorstep_admin_user", JSON.stringify(res.data.user));
        window.dispatchEvent(new Event("admin-profile-updated"));
        setTimeout(() => setProfileSuccess(null), 3000);
      } else {
        throw new Error(res.data?.message || "Failed to update profile");
      }
    } catch (err: any) {
      const msg = err.response?.data?.message || err?.message || "Error updating profile";
      setProfileError(msg);
      toast.error(msg);
    } finally {
      setProfileLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordLoading(true);
    setPasswordError(null);
    setPasswordSuccess(null);

    if (newPassword !== confirmPassword) {
      const msg = "New password and confirm password do not match";
      setPasswordError(msg);
      toast.error(msg);
      setPasswordLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      const msg = "New password must be at least 6 characters";
      setPasswordError(msg);
      toast.error(msg);
      setPasswordLoading(false);
      return;
    }

    try {
      const res = await api.put("/auth/password", { currentPassword, newPassword });
      if (res.data?.success) {
        setPasswordSuccess("Password changed successfully!");
        toast.success("Security password changed successfully!");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setTimeout(() => setPasswordSuccess(null), 3000);
      } else {
        throw new Error(res.data?.message || "Failed to change password");
      }
    } catch (err: any) {
      const msg = err.response?.data?.message || err?.message || "Error changing password";
      setPasswordError(msg);
      toast.error(msg);
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-[#E3E5EC] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[#2954F5] text-xs font-bold uppercase tracking-wider block mb-1">
            Account Management
          </span>
          <h1 className="text-2xl font-bold text-[#12151B]">Admin Profile &amp; Security</h1>
          <p className="text-xs sm:text-sm text-[#5B5F6B]">
            Manage your personal profile information and change administrative credentials.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Super Admin</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* ========================================================
            1. EDIT PROFILE FORM
        ======================================================== */}
        <div className="bg-white p-6 rounded-2xl border border-[#E3E5EC] space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-[#E3E5EC]">
            <div className="w-8 h-8 rounded-xl bg-[#2954F5]/10 text-[#2954F5] flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#12151B]">Personal Information</h2>
              <span className="text-[11px] text-gray-500">Update display name and email address</span>
            </div>
          </div>

          {profileSuccess && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{profileSuccess}</span>
            </div>
          )}

          {profileError && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-medium">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{profileError}</span>
            </div>
          )}

          <form onSubmit={handleUpdateProfile} className="space-y-4">
            {/* Profile Picture Uploader */}
            <div className="space-y-3 pb-4 border-b border-[#F4F6F9]">
              <label className="block text-xs font-bold uppercase text-[#12151B]">
                Profile Picture
              </label>

              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full border-2 border-[#E3E5EC] overflow-hidden bg-gray-100 flex items-center justify-center shrink-0 shadow-xs">
                  {avatar ? (
                    <img
                      src={avatar}
                      alt={name || "Admin"}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-xl font-bold text-[#2954F5]">
                      {name ? name.charAt(0).toUpperCase() : "A"}
                    </span>
                  )}
                </div>

                <div className="flex-1 space-y-2">
                  <CloudinaryUploader
                    label="Upload Avatar Photo"
                    folder="doorstep/admin"
                    accept="image/*"
                    onUploadSuccess={(url) => setAvatar(url)}
                  />

                  {avatar && (
                    <button
                      type="button"
                      onClick={() => setAvatar("")}
                      className="inline-flex items-center gap-1 text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove Photo</span>
                    </button>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-500 mb-1">
                  Or Direct Image URL
                </label>
                <input
                  type="text"
                  placeholder="https://... or /img/..."
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#E3E5EC] text-xs outline-none focus:border-[#2954F5]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[#12151B] mb-1">
                Full Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Doorstep Admin"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E3E5EC] text-sm outline-none focus:border-[#2954F5]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[#12151B] mb-1">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@doorstep.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E3E5EC] text-sm outline-none focus:border-[#2954F5]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[#12151B] mb-1">
                Account Role
              </label>
              <input
                type="text"
                disabled
                value={role.toUpperCase()}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3E5EC] bg-gray-100 text-gray-500 text-sm font-mono cursor-not-allowed"
              />
            </div>

            <button
              type="submit"
              disabled={profileLoading}
              className="w-full py-2.5 px-4 rounded-xl bg-[#2954F5] text-white text-xs font-semibold hover:bg-[#1E42D0] transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {profileLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              <span>Save Profile Changes</span>
            </button>
          </form>
        </div>

        {/* ========================================================
            2. CHANGE PASSWORD FORM
        ======================================================== */}
        <div className="bg-white p-6 rounded-2xl border border-[#E3E5EC] space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-[#E3E5EC]">
            <div className="w-8 h-8 rounded-xl bg-[#E51F25]/10 text-[#E51F25] flex items-center justify-center">
              <KeyRound className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#12151B]">Change Password</h2>
              <span className="text-[11px] text-gray-500">Ensure account security with a strong password</span>
            </div>
          </div>

          {passwordSuccess && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{passwordSuccess}</span>
            </div>
          )}

          {passwordError && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-medium">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{passwordError}</span>
            </div>
          )}

          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-[#12151B] mb-1">
                Current Password *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Current password"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E3E5EC] text-sm outline-none focus:border-[#2954F5]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[#12151B] mb-1">
                New Password *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E3E5EC] text-sm outline-none focus:border-[#2954F5]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[#12151B] mb-1">
                Confirm New Password *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat new password"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E3E5EC] text-sm outline-none focus:border-[#2954F5]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={passwordLoading}
              className="w-full py-2.5 px-4 rounded-xl bg-[#12151B] text-white text-xs font-semibold hover:bg-black transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {passwordLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              <span>Update Password</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
