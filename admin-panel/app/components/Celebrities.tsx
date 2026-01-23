"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Plus, Edit, Trash2, X } from "lucide-react";
import { uploadImage, imageUrl } from "../lib/upload";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function Celebrities() {
  const [celebrities, setCelebrities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    role: "",
    bio: "",
    gallery: [] as string[],
    featured: false,
    order: 0,
  });
  const [galleryInput, setGalleryInput] = useState("");
  const [imageUploading, setImageUploading] = useState(false);
  const [galleryUploading, setGalleryUploading] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchCelebrities();
  }, []);

  const fetchCelebrities = async () => {
    try {
      const response = await axios.get(`${API_URL}/celebrities`);
      if (response.data.success) {
        setCelebrities(response.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch celebrities:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.image) {
      alert("Please upload an image.");
      return;
    }
    try {
      const token = localStorage.getItem("adminToken");
      if (editing) {
        await axios.put(
          `${API_URL}/celebrities/${editing._id}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(`${API_URL}/celebrities`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      fetchCelebrities();
      setShowModal(false);
      resetForm();
    } catch (error) {
      console.error("Failed to save celebrity:", error);
      alert("Failed to save celebrity");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this celebrity?")) return;
    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(`${API_URL}/celebrities/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCelebrities();
    } catch (error) {
      console.error("Failed to delete celebrity:", error);
      alert("Failed to delete celebrity");
    }
  };

  const handleEdit = (celebrity: any) => {
    setEditing(celebrity);
    setFormData({
      name: celebrity.name,
      image: celebrity.image,
      role: celebrity.role,
      bio: celebrity.bio || "",
      gallery: celebrity.gallery || [],
      featured: celebrity.featured || false,
      order: celebrity.order || 0,
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setEditing(null);
    setFormData({
      name: "",
      image: "",
      role: "",
      bio: "",
      gallery: [],
      featured: false,
      order: 0,
    });
    setGalleryInput("");
    imageInputRef.current && (imageInputRef.current.value = "");
    galleryInputRef.current && (galleryInputRef.current.value = "");
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageUploading(true);
    try {
      const path = await uploadImage(file);
      setFormData((prev) => ({ ...prev, image: path }));
    } catch (err) {
      console.error(err);
      alert("Image upload failed. Please try again.");
    } finally {
      setImageUploading(false);
    }
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setGalleryUploading(true);
    try {
      const path = await uploadImage(file);
      setFormData((prev) => ({ ...prev, gallery: [...prev.gallery, path] }));
      e.target.value = "";
    } catch (err) {
      console.error(err);
      alert("Image upload failed. Please try again.");
    } finally {
      setGalleryUploading(false);
    }
  };

  const addGalleryItem = () => {
    if (galleryInput.trim()) {
      setFormData({
        ...formData,
        gallery: [...formData.gallery, galleryInput.trim()],
      });
      setGalleryInput("");
    }
  };

  const removeGalleryItem = (index: number) => {
    setFormData({
      ...formData,
      gallery: formData.gallery.filter((_, i) => i !== index),
    });
  };

  if (loading) return <div className="text-center py-12">Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Celebrities</h2>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Celebrity</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-zinc-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-zinc-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-600 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-600 uppercase">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-600 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200">
            {celebrities.map((celebrity) => (
              <tr key={celebrity._id} className="hover:bg-zinc-50">
                <td className="px-6 py-4 whitespace-nowrap">{celebrity.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{celebrity.role}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(celebrity)}
                      className="text-amber-600 hover:text-amber-700"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(celebrity._id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">
                  {editing ? "Edit Celebrity" : "Add Celebrity"}
                </h3>
                <button onClick={() => setShowModal(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Role *</label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    required
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Image *</label>
                  <input
                    ref={imageInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/gif,image/webp"
                    onChange={handleImageChange}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                  {imageUploading && <p className="text-sm text-amber-600 mt-1">Uploading...</p>}
                  {formData.image && (
                    <div className="mt-2 flex items-center gap-3">
                      <img src={imageUrl(formData.image)} alt="Preview" className="h-20 w-28 object-cover rounded border" />
                      <span className="text-sm text-zinc-500">Uploaded</span>
                    </div>
                  )}
                  {!formData.image && editing && (
                    <div className="mt-2 flex items-center gap-3">
                      <img src={imageUrl(editing.image)} alt="Current" className="h-20 w-28 object-cover rounded border" />
                      <span className="text-sm text-zinc-500">Current image (upload new to replace)</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Bio</label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Gallery Images (upload files)</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <input
                      ref={galleryInputRef}
                      type="file"
                      accept="image/jpeg,image/png,image/gif,image/webp"
                      onChange={handleGalleryUpload}
                      className="hidden"
                      id="gallery-upload"
                    />
                    <label
                      htmlFor="gallery-upload"
                      className="px-4 py-2 bg-zinc-200 rounded-lg cursor-pointer hover:bg-zinc-300"
                    >
                      {galleryUploading ? "Uploading..." : "Upload image"}
                    </label>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.gallery.map((path, index) => (
                      <span
                        key={index}
                        className="bg-zinc-100 rounded-lg flex items-center space-x-2 overflow-hidden"
                      >
                        <img src={imageUrl(path)} alt="" className="h-10 w-10 object-cover" />
                        <span className="text-xs truncate max-w-[120px] px-1">{path}</span>
                        <button
                          type="button"
                          onClick={() => removeGalleryItem(index)}
                          className="text-red-600 px-2"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="mr-2"
                  />
                  <label>Featured</label>
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600"
                  >
                    {editing ? "Update" : "Create"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
