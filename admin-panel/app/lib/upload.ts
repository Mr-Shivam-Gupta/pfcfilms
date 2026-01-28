import apiClient, { API_URL } from "./api";

export const IMAGE_BASE = API_URL.replace(/\/api\/?$/, "") || "http://localhost:5000";

/**
 * Get the full image URL
 * Supports:
 * - Cloudinary URLs (https://res.cloudinary.com/...)
 * - Vercel Blob URLs (https://...blob.vercel-storage.com/...)
 * - Local file paths (/uploads/images/...)
 * @param path - Image path or URL
 * @returns Full image URL
 */
export function imageUrl(path: string | undefined | null): string {
  if (!path) return "";
  // If it's already a full URL (Cloudinary, Vercel Blob, etc.), return as-is
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  // Otherwise, prepend the API base URL for local files
  return `${IMAGE_BASE}${path.startsWith("/") ? "" : "/"}${path}`;
}

export async function uploadImage(file: File): Promise<string> {
  const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;
  if (!token) throw new Error("Not authenticated");
  const formData = new FormData();
  formData.append("image", file);
  const { data } = await apiClient.post<{ success: boolean; path?: string; message?: string }>(
    "/upload/image",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  if (!data.success || !data.path) throw new Error(data.message || "Upload failed");
  return data.path;
}
