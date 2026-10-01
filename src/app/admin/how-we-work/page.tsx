"use client";

import React, { useState, useEffect } from "react";
import { WorkStep } from "@/data/agencyData";
import { Edit2, CheckCircle2, X } from "lucide-react";
import { useMethodology, useUpdateMethodology } from "@/hooks/useCMS";

export default function AdminMethodologyPage() {
  const { data: steps = [], isLoading } = useMethodology();
  const updateMutation = useUpdateMethodology();
  const [editingStep, setEditingStep] = useState<WorkStep | null>(null);

  // Form State
  const [formTitle, setFormTitle] = useState("");
  const [formTagline, setFormTagline] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [formBullets, setFormBullets] = useState<string[]>([]);
  const [newBullet, setNewBullet] = useState("");

  const handleOpenEdit = (step: WorkStep) => {
    setEditingStep(step);
    setFormTitle(step.title);
    setFormTagline(step.tagline);
    setFormDesc(step.desc);
    setFormBullets([...step.bulletPoints]);
  };

  const handleAddBullet = () => {
    if (!newBullet.trim()) return;
    setFormBullets([...formBullets, newBullet.trim()]);
    setNewBullet("");
  };

  const handleRemoveBullet = (idx: number) => {
    setFormBullets(formBullets.filter((_, i) => i !== idx));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStep) return;

    updateMutation.mutate({
      step: editingStep.step,
      data: {
        title: formTitle,
        tagline: formTagline,
        desc: formDesc,
        bulletPoints: formBullets,
      },
    });

    setEditingStep(null);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-[#E3E5EC] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[#2954F5] text-xs font-bold uppercase tracking-wider block mb-1">
            Methodology Framework
          </span>
          <h1 className="text-2xl font-bold text-[#12151B]">
            4-Stage Workflow CMS
          </h1>
          <p className="text-xs sm:text-sm text-[#5B5F6B]">
            Configure the 4 strategic stages shown on the Home and How We Work pages.
          </p>
        </div>
      </div>

      {/* Steps List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {steps.map((step) => (
          <div
            key={step.step}
            className="bg-white rounded-2xl border border-[#E3E5EC] p-6 space-y-4 hover:border-gray-400 transition-all shadow-xs flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#2954F5] bg-[#2954F5]/10 px-2.5 py-1 rounded">
                  STAGE {step.step}
                </span>
                <button
                  onClick={() => handleOpenEdit(step)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#2954F5] hover:underline cursor-pointer"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
              </div>

              <div>
                <h3 className="text-lg font-bold text-[#12151B]">{step.title}</h3>
                <span className="text-xs font-semibold text-[#E51F25]">
                  {step.tagline}
                </span>
              </div>

              <p className="text-xs text-[#5B5F6B] leading-relaxed">{step.desc}</p>

              {/* Bullet Points */}
              <div className="pt-3 border-t border-[#F4F5F8] space-y-1.5">
                <span className="text-[10px] font-bold uppercase text-[#12151B] block">
                  Deliverables ({step.bulletPoints.length})
                </span>
                <ul className="space-y-1">
                  {step.bulletPoints.map((item, bIdx) => (
                    <li
                      key={bIdx}
                      className="flex items-start gap-1.5 text-xs text-[#5B5F6B] leading-snug"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2954F5] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingStep && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#E3E5EC] max-h-[90vh] overflow-y-auto space-y-5">
            <div className="flex items-center justify-between border-b border-[#E3E5EC] pb-3">
              <h2 className="text-lg font-bold text-[#12151B]">
                Edit Stage {editingStep.step}: {editingStep.title}
              </h2>
              <button
                onClick={() => setEditingStep(null)}
                className="p-1 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-black cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-[#12151B] mb-1">
                  Stage Title *
                </label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full text-xs sm:text-sm border border-[#E3E5EC] rounded-xl px-3.5 py-2.5 outline-none focus:border-[#2954F5]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#12151B] mb-1">
                  Footer Tagline *
                </label>
                <input
                  type="text"
                  required
                  value={formTagline}
                  onChange={(e) => setFormTagline(e.target.value)}
                  className="w-full text-xs sm:text-sm border border-[#E3E5EC] rounded-xl px-3.5 py-2.5 outline-none focus:border-[#2954F5]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#12151B] mb-1">
                  Stage Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  className="w-full text-xs sm:text-sm border border-[#E3E5EC] rounded-xl px-3.5 py-2.5 outline-none focus:border-[#2954F5]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#12151B] mb-1">
                  Deliverables &amp; Milestones
                </label>
                <div className="space-y-2 mb-2">
                  {formBullets.map((bullet, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2 rounded-lg bg-gray-50 border border-[#E3E5EC] text-xs"
                    >
                      <span>{bullet}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveBullet(idx)}
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
                    value={newBullet}
                    onChange={(e) => setNewBullet(e.target.value)}
                    placeholder="New milestone..."
                    className="flex-1 text-xs border border-[#E3E5EC] rounded-xl px-3 py-2 outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddBullet}
                    className="px-3 py-2 bg-[#2954F5] text-white text-xs font-semibold rounded-xl hover:bg-[#1E42D0]"
                  >
                    Add
                  </button>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E3E5EC] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingStep(null)}
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
