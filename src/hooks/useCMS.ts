import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import {
  CaseStudy,
  ServiceItem,
  WorkStep,
  TeamMember,
  AgencyInfo,
} from "@/data/agencyData";
import {
  InquiryItem,
  ClientLogoCMS,
  INITIAL_CMS_DATA,
  getStoredData,
  setStoredData,
  CMS_KEYS,
} from "@/lib/cmsStore";
import { PageContentData, DEFAULT_PAGE_CONTENT } from "@/data/pageContentData";

/* ========================================================
   1. PORTFOLIO HOOKS
======================================================== */
export function usePortfolios(category?: string) {
  return useQuery<CaseStudy[]>({
    queryKey: ["portfolio", category || "All"],
    queryFn: async () => {
      try {
        const url = category && category !== "All"
          ? `/portfolio?category=${encodeURIComponent(category)}`
          : "/portfolio";
        const res = await api.get(url);
        if (res.data?.success && res.data.data?.length > 0) {
          // Normalize _id to id if necessary
          return res.data.data.map((item: any) => ({
            ...item,
            id: item._id || item.id,
          }));
        }
      } catch (err) {
        console.warn("API portfolio fetch failed, falling back to local cache:", err);
      }
      const local = getStoredData<CaseStudy[]>(CMS_KEYS.PORTFOLIO, INITIAL_CMS_DATA.portfolio);
      if (category && category !== "All") {
        return local.filter((item) => item.category === category);
      }
      return local;
    },
  });
}

export function useCreatePortfolio() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newItem: Partial<CaseStudy>) => {
      try {
        const res = await api.post("/portfolio", newItem);
        if (res.data?.success) return res.data.data;
      } catch (err) {
        console.warn("API create portfolio failed, updating local store:", err);
      }
      // Local fallback
      const current = getStoredData<CaseStudy[]>(CMS_KEYS.PORTFOLIO, INITIAL_CMS_DATA.portfolio);
      const created = { ...newItem, id: `work-${Date.now()}` } as CaseStudy;
      setStoredData(CMS_KEYS.PORTFOLIO, [created, ...current]);
      return created;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolio"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
    },
  });
}

export function useUpdatePortfolio() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<CaseStudy> }) => {
      try {
        const res = await api.put(`/portfolio/${id}`, data);
        if (res.data?.success) return res.data.data;
      } catch (err) {
        console.warn("API update portfolio failed, updating local store:", err);
      }
      const current = getStoredData<CaseStudy[]>(CMS_KEYS.PORTFOLIO, INITIAL_CMS_DATA.portfolio);
      const updated = current.map((item) => (item.id === id ? { ...item, ...data } : item));
      setStoredData(CMS_KEYS.PORTFOLIO, updated);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolio"] });
    },
  });
}

export function useDeletePortfolio() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      try {
        await api.delete(`/portfolio/${id}`);
      } catch (err) {
        console.warn("API delete portfolio failed, updating local store:", err);
      }
      const current = getStoredData<CaseStudy[]>(CMS_KEYS.PORTFOLIO, INITIAL_CMS_DATA.portfolio);
      const updated = current.filter((item) => item.id !== id);
      setStoredData(CMS_KEYS.PORTFOLIO, updated);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolio"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
    },
  });
}

/* ========================================================
   2. SERVICES HOOKS
======================================================== */
export function useServices() {
  return useQuery<ServiceItem[]>({
    queryKey: ["services"],
    queryFn: async () => {
      try {
        const res = await api.get("/services");
        if (res.data?.success && res.data.data?.length > 0) {
          return res.data.data;
        }
      } catch (err) {
        console.warn("API services fetch failed, falling back to local cache:", err);
      }
      return getStoredData<ServiceItem[]>(CMS_KEYS.SERVICES, INITIAL_CMS_DATA.services);
    },
  });
}

export function useUpdateService() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<ServiceItem> }) => {
      try {
        const res = await api.put(`/services/${id}`, data);
        if (res.data?.success) return res.data.data;
      } catch (err) {
        console.warn("API service update failed, updating local store:", err);
      }
      const current = getStoredData<ServiceItem[]>(CMS_KEYS.SERVICES, INITIAL_CMS_DATA.services);
      const updated = current.map((s) => (s.id === id ? { ...s, ...data } : s));
      setStoredData(CMS_KEYS.SERVICES, updated);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
    },
  });
}

/* ========================================================
   3. METHODOLOGY HOOKS
======================================================== */
export function useMethodology() {
  return useQuery<WorkStep[]>({
    queryKey: ["methodology"],
    queryFn: async () => {
      try {
        const res = await api.get("/methodology");
        if (res.data?.success && res.data.data?.length > 0) {
          return res.data.data;
        }
      } catch (err) {
        console.warn("API methodology fetch failed, falling back to local cache:", err);
      }
      return getStoredData<WorkStep[]>(CMS_KEYS.METHODOLOGY, INITIAL_CMS_DATA.methodology);
    },
  });
}

export function useUpdateMethodology() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ step, data }: { step: string; data: Partial<WorkStep> }) => {
      try {
        const res = await api.put(`/methodology/${step}`, data);
        if (res.data?.success) return res.data.data;
      } catch (err) {
        console.warn("API methodology update failed, updating local store:", err);
      }
      const current = getStoredData<WorkStep[]>(CMS_KEYS.METHODOLOGY, INITIAL_CMS_DATA.methodology);
      const updated = current.map((m) => (m.step === step ? { ...m, ...data } : m));
      setStoredData(CMS_KEYS.METHODOLOGY, updated);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["methodology"] });
    },
  });
}

/* ========================================================
   4. TEAM HOOKS
======================================================== */
export function useTeam() {
  return useQuery<TeamMember[]>({
    queryKey: ["team"],
    queryFn: async () => {
      try {
        const res = await api.get("/team");
        if (res.data?.success && res.data.data?.length > 0) {
          return res.data.data.map((m: any) => ({
            ...m,
            id: m._id || m.id,
          }));
        }
      } catch (err) {
        console.warn("API team fetch failed, falling back to local cache:", err);
      }
      return getStoredData<TeamMember[]>(CMS_KEYS.TEAM, INITIAL_CMS_DATA.team);
    },
  });
}

export function useCreateTeamMember() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (member: Partial<TeamMember>) => {
      try {
        const res = await api.post("/team", member);
        if (res.data?.success) return res.data.data;
      } catch (err) {
        console.warn("API add team failed, updating local store:", err);
      }
      const current = getStoredData<TeamMember[]>(CMS_KEYS.TEAM, INITIAL_CMS_DATA.team);
      const created = { ...member, id: `team-${Date.now()}` } as TeamMember;
      setStoredData(CMS_KEYS.TEAM, [...current, created]);
      return created;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
    },
  });
}

export function useUpdateTeamMember() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<TeamMember> }) => {
      try {
        const res = await api.put(`/team/${id}`, data);
        if (res.data?.success) return res.data.data;
      } catch (err) {
        console.warn("API update team failed, updating local store:", err);
      }
      const current = getStoredData<TeamMember[]>(CMS_KEYS.TEAM, INITIAL_CMS_DATA.team);
      const updated = current.map((m) => (m.name === data.name ? { ...m, ...data } : m));
      setStoredData(CMS_KEYS.TEAM, updated);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team"] });
    },
  });
}

export function useDeleteTeamMember() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (identifier: string) => {
      try {
        await api.delete(`/team/${identifier}`);
      } catch (err) {
        console.warn("API delete team failed, updating local store:", err);
      }
      const current = getStoredData<TeamMember[]>(CMS_KEYS.TEAM, INITIAL_CMS_DATA.team);
      const updated = current.filter((m) => m.name !== identifier && (m as any).id !== identifier && (m as any)._id !== identifier);
      setStoredData(CMS_KEYS.TEAM, updated);
      return identifier;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
    },
  });
}

/* ========================================================
   5. CLIENT LOGOS HOOKS
======================================================== */
export function useClients() {
  return useQuery<ClientLogoCMS[]>({
    queryKey: ["clients"],
    queryFn: async () => {
      try {
        const res = await api.get("/clients");
        if (res.data?.success && res.data.data?.length > 0) {
          return res.data.data.map((c: any) => ({
            id: c._id || c.id,
            name: c.name,
            logo: c.logo,
          }));
        }
      } catch (err) {
        console.warn("API clients fetch failed, falling back to local cache:", err);
      }
      return getStoredData<ClientLogoCMS[]>(CMS_KEYS.CLIENTS, INITIAL_CMS_DATA.clients);
    },
  });
}

export function useCreateClient() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (client: { name: string; logo: string }) => {
      try {
        const res = await api.post("/clients", client);
        if (res.data?.success) return res.data.data;
      } catch (err) {
        console.warn("API create client failed, updating local store:", err);
      }
      const current = getStoredData<ClientLogoCMS[]>(CMS_KEYS.CLIENTS, INITIAL_CMS_DATA.clients);
      const created: ClientLogoCMS = { ...client, id: `client-${Date.now()}` };
      setStoredData(CMS_KEYS.CLIENTS, [...current, created]);
      return created;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
  });
}

export function useDeleteClient() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      try {
        await api.delete(`/clients/${id}`);
      } catch (err) {
        console.warn("API delete client failed, updating local store:", err);
      }
      const current = getStoredData<ClientLogoCMS[]>(CMS_KEYS.CLIENTS, INITIAL_CMS_DATA.clients);
      const updated = current.filter((c) => c.id !== id);
      setStoredData(CMS_KEYS.CLIENTS, updated);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
  });
}

/* ========================================================
   6. INQUIRIES / LEADS HOOKS
======================================================== */
export function useInquiries(status?: string) {
  return useQuery<InquiryItem[]>({
    queryKey: ["inquiries", status || "All"],
    queryFn: async () => {
      try {
        const url = status && status !== "All"
          ? `/inquiries?status=${encodeURIComponent(status)}`
          : "/inquiries";
        const res = await api.get(url);
        if (res.data?.success && res.data.data?.length > 0) {
          return res.data.data.map((item: any) => ({
            ...item,
            id: item._id || item.id,
            createdAt: item.createdAt ? new Date(item.createdAt).toLocaleString() : item.createdAt,
          }));
        }
      } catch (err) {
        console.warn("API inquiries fetch failed, falling back to local cache:", err);
      }
      const local = getStoredData<InquiryItem[]>(CMS_KEYS.INQUIRIES, INITIAL_CMS_DATA.inquiries);
      if (status && status !== "All") {
        return local.filter((i) => i.status === status);
      }
      return local;
    },
  });
}

export function useCreateInquiry() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (inquiry: Partial<InquiryItem>) => {
      try {
        const res = await api.post("/inquiries", inquiry);
        if (res.data?.success) return res.data.data;
      } catch (err) {
        console.warn("API inquiry submission failed, falling back to local storage:", err);
      }
      const current = getStoredData<InquiryItem[]>(CMS_KEYS.INQUIRIES, INITIAL_CMS_DATA.inquiries);
      const created: InquiryItem = {
        id: `inq-${Date.now()}`,
        name: inquiry.name || "Client",
        email: inquiry.email || "",
        phone: inquiry.phone || "",
        serviceNeeded: inquiry.serviceNeeded || "General",
        company: inquiry.company,
        budget: inquiry.budget,
        timeline: inquiry.timeline,
        message: inquiry.message || "",
        status: "New",
        createdAt: new Date().toLocaleString(),
      };
      setStoredData(CMS_KEYS.INQUIRIES, [created, ...current]);
      return created;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inquiries"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
    },
  });
}

export function useUpdateInquiryStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: InquiryItem["status"] }) => {
      try {
        const res = await api.patch(`/inquiries/${id}/status`, { status });
        if (res.data?.success) return res.data.data;
      } catch (err) {
        console.warn("API status update failed, updating local store:", err);
      }
      const current = getStoredData<InquiryItem[]>(CMS_KEYS.INQUIRIES, INITIAL_CMS_DATA.inquiries);
      const updated = current.map((i) => (i.id === id ? { ...i, status } : i));
      setStoredData(CMS_KEYS.INQUIRIES, updated);
      return { id, status };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inquiries"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
    },
  });
}

export function useDeleteInquiry() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      try {
        await api.delete(`/inquiries/${id}`);
      } catch (err) {
        console.warn("API delete inquiry failed, updating local store:", err);
      }
      const current = getStoredData<InquiryItem[]>(CMS_KEYS.INQUIRIES, INITIAL_CMS_DATA.inquiries);
      const updated = current.filter((i) => i.id !== id);
      setStoredData(CMS_KEYS.INQUIRIES, updated);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inquiries"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
    },
  });
}

/* ========================================================
   7. SETTINGS HOOKS
======================================================== */
export function useSettings() {
  return useQuery<AgencyInfo>({
    queryKey: ["settings"],
    queryFn: async () => {
      try {
        const res = await api.get("/settings");
        if (res.data?.success && res.data.data) {
          return res.data.data;
        }
      } catch (err) {
        console.warn("API settings fetch failed, falling back to local cache:", err);
      }
      return getStoredData<AgencyInfo>(CMS_KEYS.SETTINGS, INITIAL_CMS_DATA.settings);
    },
  });
}

export function useUpdateSettings() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newSettings: Partial<AgencyInfo>) => {
      try {
        const res = await api.put("/settings", newSettings);
        if (res.data?.success) return res.data.data;
      } catch (err) {
        console.warn("API settings update failed, updating local store:", err);
      }
      const current = getStoredData<AgencyInfo>(CMS_KEYS.SETTINGS, INITIAL_CMS_DATA.settings);
      const merged = { ...current, ...newSettings };
      setStoredData(CMS_KEYS.SETTINGS, merged);
      return merged;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
  });
}

/* ========================================================
   8. DASHBOARD STATS HOOK
======================================================== */
export function useDashboardStats() {
  return useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      try {
        const res = await api.get("/dashboard/stats");
        if (res.data?.success) {
          return res.data.data;
        }
      } catch (err) {
        console.warn("API stats fetch failed, calculating from local store:", err);
      }
      const portfolios = getStoredData<CaseStudy[]>(CMS_KEYS.PORTFOLIO, INITIAL_CMS_DATA.portfolio);
      const inquiries = getStoredData<InquiryItem[]>(CMS_KEYS.INQUIRIES, INITIAL_CMS_DATA.inquiries);
      const team = getStoredData<TeamMember[]>(CMS_KEYS.TEAM, INITIAL_CMS_DATA.team);
      const services = getStoredData<ServiceItem[]>(CMS_KEYS.SERVICES, INITIAL_CMS_DATA.services);

      return {
        totalPortfolios: portfolios.length,
        totalInquiries: inquiries.length,
        newInquiries: inquiries.filter((i) => i.status === "New").length,
        totalTeam: team.length,
        totalServices: services.length,
        recentInquiries: inquiries.slice(0, 5),
      };
    },
  });
}

/* ========================================================
   9. PAGE STATIC CONTENT HOOKS
======================================================== */
export function usePageContent() {
  return useQuery<PageContentData>({
    queryKey: ["page-content"],
    queryFn: async () => {
      try {
        const res = await api.get("/page-content");
        if (res.data?.success && res.data.data) {
          return res.data.data;
        }
      } catch (err) {
        console.warn("API page content fetch failed, falling back to local cache:", err);
      }
      return getStoredData<PageContentData>(CMS_KEYS.PAGE_CONTENT, DEFAULT_PAGE_CONTENT);
    },
  });
}

export function useUpdatePageContent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newContent: Partial<PageContentData>) => {
      try {
        const res = await api.put("/page-content", newContent);
        if (res.data?.success) return res.data.data;
      } catch (err) {
        console.warn("API page content update failed, updating local store:", err);
      }
      const current = getStoredData<PageContentData>(CMS_KEYS.PAGE_CONTENT, DEFAULT_PAGE_CONTENT);
      const merged = { ...current, ...newContent };
      setStoredData(CMS_KEYS.PAGE_CONTENT, merged);
      return merged;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["page-content"] });
    },
  });
}

