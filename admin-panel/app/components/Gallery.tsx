"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Plus, Edit, Trash2, X } from "lucide-react";
import { uploadImage, imageUrl } from "../lib/upload";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function Gallery() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "Production",
    type: "photo",
    image: "",
    thumbnail: "",
    videoUrl: "",
    duration: "",
    featured: false,
    order: 0,
  });
  const [imageUploading, setImageUploading] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get(`${API_URL}/gallery`);
      if (response.data.success) {
        setItems(response.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch gallery:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageUploading(true);
    try {
      const path = await uploadImage(file);
      if (formData.type === "photo") {
        setFormData((prev) => ({ ...prev, image: path }));
      } else {
        setFormData((prev) => ({ ...prev, image: path, thumbnail: path }));
      }
    } catch (err) {
      console.error(err);
      alert("Image upload failed. Please try again.");
    } finally {
      setImageUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.type === "photo" && !formData.image) {
      alert("Please upload an image.");
      return;
    }
    if (formData.type === "video") {
      if (!formData.videoUrl) {
        alert("Please enter Video URL.");
        return;
      }
      if (!formData.image) {
        alert("Please upload a thumbnail image for the video.");
        return;
      }
    }
    try {
      const token = localStorage.getItem("adminToken");
      if (editing) {
        await axios.put(
          `${API_URL}/gallery/${editing._id}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(`${API_URL}/gallery`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      fetchItems();
      setShowModal(false);
      resetForm();
    } catch (error) {
      console.error("Failed to save item:", error);
      alert("Failed to save item");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(`${API_URL}/gallery/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchItems();
    } catch (error) {
      console.error("Failed to delete item:", error);
      alert("Failed to delete item");
    }
  };

  const handleEdit = (item: any) => {
    setEditing(item);
    setFormData({
      title: item.title,
      category: item.category,
      type: item.type,
      image: item.image,
      thumbnail: item.thumbnail || "",
      videoUrl: item.videoUrl || "",
      duration: item.duration || "",
      featured: item.featured || false,
      order: item.order || 0,
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setEditing(null);
    setFormData({
      title: "",
      category: "Production",
      type: "photo",
      image: "",
      thumbnail: "",
      videoUrl: "",
      duration: "",
      featured: false,
      order: 0,
    });
    imageInputRef.current && (imageInputRef.current.value = "");
  };

  if (loading) return <div className="text-center py-12">Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Gallery</h2>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Item</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-zinc-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-zinc-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-600 uppercase">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-600 uppercase">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-600 uppercase">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-600 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200">
            {items.map((item) => (
              <tr key={item._id} className="hover:bg-zinc-50">
                <td className="px-6 py-4 whitespace-nowrap">{item.title}</td>
                <td className="px-6 py-4 whitespace-nowrap capitalize">{item.type}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.category}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-amber-600 hover:text-amber-700"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
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
                  {editing ? "Edit Item" : "Add Item"}
                </h3>
                <button onClick={() => setShowModal(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Type *</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      required
                      className="w-full px-4 py-2 border rounded-lg"
                    >
                      <option value="photo">Photo</option>
                      <option value="video">Video</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Category *</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      required
                      className="w-full px-4 py-2 border rounded-lg"
                    >
                      <option>Production</option>
                      <option>Academy</option>
                      <option>Events</option>
                      <option>BTS</option>
                      <option>Trailers</option>
                      <option>Testimonials</option>
                    </select>
                  </div>
                </div>

                {formData.type === "photo" && (
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
                    {!formData.image && editing && editing.type === "photo" && (
                      <div className="mt-2 flex items-center gap-3">
                        <img src={imageUrl(editing.image)} alt="Current" className="h-20 w-28 object-cover rounded border" />
                        <span className="text-sm text-zinc-500">Current image (upload new to replace)</span>
                      </div>
                    )}
                  </div>
                )}

                {formData.type === "video" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-2">Video URL *</label>
                      <input
                        type="url"
                        value={formData.videoUrl}
                        onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg"
                        placeholder="https://..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Thumbnail image *</label>
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
                          <img src={imageUrl(formData.image)} alt="Thumbnail" className="h-20 w-28 object-cover rounded border" />
                          <span className="text-sm text-zinc-500">Uploaded</span>
                        </div>
                      )}
                      {!formData.image && editing && editing.type === "video" && (
                        <div className="mt-2 flex items-center gap-3">
                          <img src={imageUrl(editing.image)} alt="Current" className="h-20 w-28 object-cover rounded border" />
                          <span className="text-sm text-zinc-500">Current thumbnail (upload new to replace)</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Duration</label>
                      <input
                        type="text"
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        placeholder="e.g., 2:30"
                        className="w-full px-4 py-2 border rounded-lg"
                      />
                    </div>
                  </>
                )}

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
