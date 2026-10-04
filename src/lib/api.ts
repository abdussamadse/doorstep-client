import axios from "axios";

/**
 * Determines and normalizes the API base URLs for local development and production.
 * Supports:
 * - Production: https://api.doorstepltdbd.com/
 * - Local: http://localhost:5001/
 *
 * Intelligently handles:
 * - Trailing slashes (e.g. 'https://api.doorstepltdbd.com/' -> 'https://api.doorstepltdbd.com')
 * - Missing or duplicated '/api' prefix
 * - Automatic fallback based on NODE_ENV (development vs production)
 */
const getRawApiUrl = (): string => {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  // Production default fallback
  if (process.env.NODE_ENV === "production") {
    return "https://api.doorstepltdbd.com/api";
  }
  // Local development default fallback
  return "http://localhost:5001/api";
};

// Normalize URL: trim and remove any trailing slashes
const normalizedUrl = getRawApiUrl().trim().replace(/\/+$/, "");

// Root server host URL without '/api' (e.g. "https://api.doorstepltdbd.com" or "http://localhost:5001")
export const API_SERVER_URL = normalizedUrl.endsWith("/api")
  ? normalizedUrl.slice(0, -4)
  : normalizedUrl;

// API endpoint base URL always ending with '/api' (e.g. "https://api.doorstepltdbd.com/api" or "http://localhost:5001/api")
export const API_BASE_URL = normalizedUrl.endsWith("/api")
  ? normalizedUrl
  : `${normalizedUrl}/api`;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

// Interceptor to attach auth token if available in localStorage
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("doorstep_admin_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;
