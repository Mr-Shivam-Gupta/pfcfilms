"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Edit, Trash2, X } from "lucide-react";

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
                  <label className="block text-sm font-medium mb-2">Image URL *</label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    required
                    className="w-full px-4 py-2 border rounded-lg"
                  />
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
                  <label className="block text-sm font-medium mb-2">Gallery Images</label>
                  <div className="flex space-x-2 mb-2">
                    <input
                      type="url"
                      value={galleryInput}
                      onChange={(e) => setGalleryInput(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" && (e.preventDefault(), addGalleryItem())
                      }
                      className="flex-1 px-4 py-2 border rounded-lg"
                      placeholder="Add gallery image URL"
                    />
                    <button
                      type="button"
                      onClick={addGalleryItem}
                      className="px-4 py-2 bg-zinc-200 rounded-lg"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.gallery.map((url, index) => (
                      <span
                        key={index}
                        className="bg-zinc-100 px-3 py-1 rounded-lg flex items-center space-x-2"
                      >
                        <span className="text-xs truncate max-w-xs">{url}</span>
                        <button
                          type="button"
                          onClick={() => removeGalleryItem(index)}
                          className="text-red-600"
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
