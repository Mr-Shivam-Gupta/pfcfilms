import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
export const IMAGE_BASE = API_URL.replace(/\/api\/?$/, "") || "http://localhost:5000";

export function imageUrl(path: string | undefined | null): string {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${IMAGE_BASE}${path.startsWith("/") ? "" : "/"}${path}`;
}

export async function uploadImage(file: File): Promise<string> {
  const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;
  if (!token) throw new Error("Not authenticated");
  const formData = new FormData();
  formData.append("image", file);
  const { data } = await axios.post<{ success: boolean; path?: string; message?: string }>(
    `${API_URL}/upload/image`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
  if (!data.success || !data.path) throw new Error(data.message || "Upload failed");
  return data.path;
}
